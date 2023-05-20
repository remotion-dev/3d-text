import {extend, useFrame} from '@react-three/fiber';
import React, {createRef, Fragment, useMemo, useRef, useState} from 'react';
import {interpolate, spring} from 'remotion';
import {TextGeometry} from 'three-stdlib';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js';
import JSONfont from './Bold.json';
import {  DoubleSide } from 'three';

extend({TextGeometry});

export const TextMesh: React.FC<{
	frame: number;
	text: string;
}> = ({frame,  text, }) => {
	const surfaceRefs = useRef<JSX.IntrinsicElements['mesh']>();
	const characterRef = useRef<JSX.IntrinsicElements['mesh']>();
	const [shape, setShape] = useState(null)

	// Load in font
	const font = useMemo(() => new FontLoader().parse(JSONfont), []);
	const depth = 0.5;
	const size = 2;

	const group = useRef<JSX.IntrinsicElements['group']>(null);


	// Actions to perform in current frame
	useFrame(() => {
			const geometry = characterRef.current?.geometry;

			geometry?.computeBoundingBox();
			const width =
				(geometry?.boundingBox?.max?.x as number) -
				(geometry?.boundingBox?.min?.x as number);
				const height =
				(geometry?.boundingBox?.max?.y as number) -
				(geometry?.boundingBox?.min?.y as number);
			surfaceRefs.current.position.x = -width / 2;
			surfaceRefs.current.position.y = -height / 2;
			surfaceRefs.current.position.z =  0.01;
			characterRef.current.position.x =  -width / 2;
			characterRef.current.position.y = -height / 2;
			characterRef.current.position.z = -depth;


			// Shape const holeShapes = [];
			const [shape] = font.generateShapes( '4', 2 );

			const holeShapes = [];


						if ( shape.holes && shape.holes.length > 0 ) {

							for ( let j = 0; j < shape.holes.length; j ++ ) {

								const hole = shape.holes[ j ];
								holeShapes.push( hole );

								const points = shape.getPoints();
								setShape(points)

								if (bufGeo.current) {
									bufGeo.current.setFromPoints(points)
									lineRef.current.position.x = -width / 2
									lineRef.current.position.y = -height / 2
									lineRef.current.position.z = -depth - 0.000001;

								}

							}

						}

	});

	const bufGeo = useRef();
	const lineRef = useRef();

	const rotateX = -Math.PI / 10 * frame / 10;

	return (
		<>
			<group ref={group} rotation={[ 0, rotateX, 0]} >
							<mesh ref={characterRef}>
								<textGeometry
									args={[
										text,
										{
											font,
											size,
											height: depth,
										},
									]}
								/>
								<meshBasicMaterial color={0xff0000} />
							</mesh>
							<mesh ref={surfaceRefs} >
								<textGeometry
									args={[
										text,
										{
											font,
											size,
											height: 0,
										},
									]}
								/>
								<meshBasicMaterial color={0xFFFFFF00} />
							</mesh>
							{shape ? (

<object3D>

							<line  ref={lineRef}>
								<bufferGeometry ref={bufGeo} attach="geometry"  />
								<lineBasicMaterial linewidth={0.01} color={0x000000} />
							</line>
</object3D>
							) : null}
			</group>
		</>
	);
};
