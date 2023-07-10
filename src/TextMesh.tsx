import {extend, useFrame} from '@react-three/fiber';
import React, {createRef, Fragment, useMemo} from 'react';
import {interpolate, spring} from 'remotion';
import {TextGeometry} from 'three-stdlib';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js';
import JSONfont from './Bold.json';

extend({TextGeometry});

export const TextMesh: React.FC<{
	frame: number;
	fps: number;
	text: string;
	position: number;
}> = ({frame, fps, text, position}) => {
	const characters = text.split('');
	const letterSpacing = 0.1;
	const surfaceRefs = useMemo(
		() =>
			new Array(characters.length)
				.fill(true)
				.map(() => createRef<JSX.IntrinsicElements['mesh']>()),
		[characters.length],
	);
	const characterRefs = useMemo(
		() =>
			new Array(characters.length)
				.fill(true)
				.map(() => createRef<JSX.IntrinsicElements['mesh']>()),
		[characters.length],
	);

	// Load in font
	const font = useMemo(() => new FontLoader().parse(JSONfont), []);
	const height = 60;
	const progress = (i: number) =>
		spring({
			frame,
			fps,
			config: {
				damping: 15,
				mass: 1,
			},
		});
	const z = (i: number) => interpolate(progress(i), [0, 1], [-40, 0]);
	const size = 2;

	// Actions to perform in current frame
	useFrame(() => {
		const widths: number[] = [];
		characters.forEach((char, i) => {
			const geometry = characterRefs[i].current?.geometry;

			geometry?.computeBoundingBox();
			const width =
				(geometry?.boundingBox?.max?.x as number) -
				(geometry?.boundingBox?.min?.x as number);
			widths.push(width);
		});
		const totalWidth =
			widths.reduce((a, b) => a + b + letterSpacing, 0) + letterSpacing;
		for (let i = 0; i < characters.length; i++) {
			const pos =
				widths.slice(0, i).reduce((a, b) => a + b, 0) +
				i * letterSpacing -
				totalWidth / 2;
			surfaceRefs[i].current.position.x = pos;
			surfaceRefs[i].current.position.z = z(i) + 0.01;
			characterRefs[i].current.position.x = pos;
			characterRefs[i].current.position.z = -height + z(i);
		}
	});

	const rotateX = -Math.PI / 10;
	const rotateY = Math.PI / 10;

	return (
		<>
			<scene rotation={[rotateX, rotateY, 0.1]} position={[0.5, position, 0]}>
				{characters.map((char, i) => {
					return (
						<Fragment key={i}>
							<mesh ref={characterRefs[i]}>
								<textGeometry
									args={[
										char,
										{
											font,
											size,
											height,
										},
									]}
								/>
								<meshBasicMaterial color="#03adfc" />
							</mesh>
							<mesh ref={surfaceRefs[i]}>
								<textGeometry
									args={[
										char,
										{
											font,
											size,
											height: 0,
										},
									]}
								/>
								<meshBasicMaterial color="white" />
							</mesh>
						</Fragment>
					);
				})}
			</scene>
		</>
	);
};
