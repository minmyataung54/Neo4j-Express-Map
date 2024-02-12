import React, { useRef } from 'react'
import { Canvas , useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei'
import * as THREE from "three";

export default function Two() {
    const groupRef = useRef()
    const { nodes, materials } = useGLTF('./testroom.gltf')
    const gltf = useLoader(GLTFLoader, './testroom.gltf')
    console.log(nodes);
    console.log(gltf);
    return (
        <div>Two</div>
        // <group ref={groupRef} {...props} dispose={null}>
        //   <mesh castShadow receiveShadow geometry={nodes.Curve007_1.geometry} material={materials['Material.001']} />
        //   <mesh castShadow receiveShadow geometry={nodes.Curve007_2.geometry} material={materials['Material.002']} />
        // </group>
    )

}