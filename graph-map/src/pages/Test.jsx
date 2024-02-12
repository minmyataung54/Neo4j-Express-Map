import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber'
import { Box, Stats, OrbitControls } from '@react-three/drei'
import * as THREE from 'three';
import Css from "./css/index.module.css"

export default function index(params) {

    function decimalToBinaryFixedLength(number, length) {
        const binaryString = number.toString(2);
        const paddedBinary = '0'.repeat(length - binaryString.length) + binaryString;

        return paddedBinary.split('').map(Number);
    }

    const points = []
    points.push(new THREE.Vector3(-10, 0, 0))
    points.push(new THREE.Vector3(0, 10, 0))
    points.push(new THREE.Vector3(10, 0, 0))

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

    const box1Ref = useRef();
    const box2Ref = useRef();

    const rangeArray = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => start + index);
    let range_list = rangeArray(0, 7);
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas>
                {range_list.map((num) => {
                    let bi = decimalToBinaryFixedLength(num, 3)
                    let x = parseInt(bi[0])
                    let y = parseInt(bi[1])
                    let z = parseInt(bi[2])
                    console.log(x + " : " + y + " : " + z);
                    return (
                        <mesh position={[x, y, z]}>
                            <boxGeometry args={[.8, .8, .8]} />
                            <meshStandardMaterial color="red" />
                        </mesh>
                    )
                })}

                <line geometry={lineGeometry}>
                    <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
                </line>


                {/* Optional: Add lights and camera */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                {/* Optional: OrbitControls for interaction */}
                <OrbitControls />
            </Canvas>
        </div>
    )
}