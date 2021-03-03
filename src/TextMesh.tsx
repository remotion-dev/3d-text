import React, {createRef, Fragment, useMemo} from 'react';
import {useFrame} from 'react-three-fiber';
import {interpolate, spring} from 'remotion';
import * as THREE from 'three';
import JSONfont from './Bold.json';

const text = 'remotion';
const characters = text.split('');
const letterSpacing = 0.1;

export const TextMesh: React.FC<{frame: number; fps: number}> = ({
	frame,
	fps,
}) => {
	const surfaceRefs = useMemo(
		() =>
			new Array(characters.length)
				.fill(true)
				.map(() => createRef<JSX.IntrinsicElements['mesh']>()),
		[]
	);
	const characterRefs = useMemo(
		() =>
			new Array(characters.length)
				.fill(true)
				.map(() => createRef<JSX.IntrinsicElements['mesh']>()),
		[]
	);

	// load in font
	const font = useMemo(() => new THREE.FontLoader().parse(JSONfont), []);
	const height = 50;
	const progress = (i: number) =>
		spring({
			frame: frame - i,
			fps,
			config: {
				damping: 15,
				mass: 1.4,
			},
		});
	const z = (i: number) => interpolate(progress(i), [0, 1], [-40, 0]);
	const size = 2.3;

	// actions to perform in current frame
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
	const rotateY = interpolate(
		spring({
			frame,
			fps,
			config: {
				damping: 200,
				mass: 6,
			},
		}),
		[0, 1],
		[-Math.PI / 10, Math.PI / 10]
	);

	return (
		<>
			<scene rotation={[rotateX, rotateY, 0.09]} position={[0.5, 0, 0]}>
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
								<meshBasicMaterial color="rgb(29, 127, 192)" />
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
