import {extend, useFrame} from '@react-three/fiber';
import React, {createRef, Fragment, useMemo, useRef, useState} from 'react';
import {interpolate, spring, staticFile} from 'remotion';
import {LineGeometry, LineMaterial, TextGeometry} from 'three-stdlib';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js';
import JSONfont from './Bold.json';
import {Center, Text, Text3D} from '@react-three/drei';
import { DoubleSide, Shape } from 'three';


extend({TextGeometry})

const font = new FontLoader().parse(JSONfont);

const shapes = font.generateShapes('4', 2)
shapes[0].extractPoints(1)


const squareShape = new Shape();
squareShape.moveTo( -3, -1 );
squareShape.lineTo( -3, 1 );
squareShape.lineTo( 3, 1 );
squareShape.lineTo( 3, -1 );
squareShape.lineTo( -3, -1 );

const depth = 1

export const TextMesh: React.FC<{
	frame: number;
}> = ({frame,   }) => {


	const rotateX =  frame / 10;

	return (
			<group scale={0.5} rotation={[ 0, rotateX, 0]}>
				<mesh position={[0, 0, -depth]}>
					<extrudeGeometry args={[squareShape, {
						depth
					}]} />
					<meshStandardMaterial color={0xffffff}  />
				</mesh>
				<mesh position={[0, 0, 0.22]}>
					<shapeGeometry args={[squareShape]} />
					<meshBasicMaterial side={DoubleSide} color="#0b84f3"  />
				</mesh>
				<Text font={staticFile('bold.ttf')} color="white" position={[0, 0, 0.23 ]}   fontSize={0.7}>Render video</Text>
			</group>
	);
};

