import { Canvas } from '@react-three/fiber'
import { Box, Stats, OrbitControls } from '@react-three/drei'
import { CatmullRomCurve3 } from 'three';
import * as THREE from "three";

export default function One() {
    const points = [
        new THREE.Vector3(-2, -1, 0),
        new THREE.Vector3(-1, 2, 0),
        new THREE.Vector3(1, -1, 0),
        new THREE.Vector3(2, 2, 0),
    ];

    const curve = new CatmullRomCurve3(points);
    curve.curveType = "chordal"

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas>
                <mesh>
                    <tubeGeometry args={[curve, 200, 0.2, 8, false]} />
                    <meshBasicMaterial color="blue" />
                </mesh>

                {/* Optional: Add lights and camera */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls />
            </Canvas>
        </div >
    )
}