bl_info = {
    "name": "Export Vertices with Group To JSON(AKT)",
    "author": "Class Outside",
    "version": (1, 0),
    "blender": (2, 80, 0),
    "description": "Exports vertices to a JSON file(AKT).",
    "warning": "",
    "doc_url": "",
    "category": "Add Mesh",
}
import bpy
import json
import os

class ExportVerticesOperator(bpy.types.Operator):
    bl_idname = "export.vertices"
    bl_label = "Export Vertices"
    bl_description = "Export vertices as a JSON file(AKT)"

    filepath: bpy.props.StringProperty(subtype='FILE_PATH')
    filter_glob: bpy.props.StringProperty(default="*.json", options={'HIDDEN'})

    use_selection: bpy.props.BoolProperty(
        name="Export Selected",
        description="Export only selected objects",
        default=True
    )

    closed: bpy.props.BoolProperty(
        name="Closed Curve",
        description="Indicate if the curve is closed",
        default=False
    )

    @classmethod
    def poll(cls, context):
        return context.selected_objects

    def invoke(self, context, event):
        selected_objects = bpy.context.selected_objects
        if len(selected_objects) != 1:
            bpy.context.window_manager.popup_menu(draw_error_message, title="Export Error", icon='ERROR')
            return {'CANCELLED'}

        default_path = bpy.data.filepath
        if default_path:
            default_name = os.path.splitext(os.path.basename(default_path))[0] + ".json"
            self.filepath = os.path.join(os.path.dirname(default_path), default_name)
        else:
            self.filepath = ".json"
        context.window_manager.fileselect_add(self)
        return {'RUNNING_MODAL'}

    def execute(self, context):
        export_vertices(self.filepath, self.use_selection, self.closed)
        return {'FINISHED'}

def export_vertices(filepath, use_selection, closed):
    points = []
    vertex_groups = []
    edges = []

    if use_selection:
        selected_objects = bpy.context.selected_objects
    else:
        selected_objects = bpy.context.scene.objects

    for obj in selected_objects:
        if obj.type == 'MESH':
            mesh = obj.data
            for group in obj.vertex_groups:
                print("Vertex Group:", group.name)
        
                # Get the vertices assigned to this group
                vertices_in_group = {
                    "group_name":group.name,
                    "group_index":group.index,
                    "vertices_ids":[v.index for v in mesh.vertices if group.index in [g.group for g in v.groups]]
                }
        
                print("Vertices in Group:", vertices_in_group)
                vertex_groups.append(vertices_in_group)
            for vertex in obj.data.vertices:
                point = {
                    "id": vertex.index,
                    "x": vertex.co.x,
                    "y": vertex.co.z,   # Swap y and z axes
                    "z": -1 * vertex.co.y  # Swap y and z axes - Times negative one to face proper direction
                }
                points.append(point)
            for edge in mesh.edges:
                edge_line = {
                    "id":edge.index,
                    "vertices":[v for v in edge.vertices]
                }
                edges.append(edge_line)

    data = {
        "points": points,
        "edges":edges,
        "vertex_groups":vertex_groups,
        "closed": closed
    }

    # Change the file extension to .json
    filepath = os.path.splitext(filepath)[0] + ".json"

    with open(filepath, 'w') as file:
        json.dump(data, file, indent=4)

def draw_error_message(self, context):
    self.layout.label(text="Please select only one object to export.")

def menu_func_export(self, context):
    self.layout.operator(ExportVerticesOperator.bl_idname, text="Export Vertices to JSON(AKT)")

def register():
    bpy.utils.register_class(ExportVerticesOperator)
    bpy.types.TOPBAR_MT_file_export.append(menu_func_export)

def unregister():
    bpy.utils.unregister_class(ExportVerticesOperator)
    bpy.types.TOPBAR_MT_file_export.remove(menu_func_export)

if __name__ == "__main__":
    register()
