import {ThreeCanvas} from '@remotion/three';
import {useCallback, useState} from 'react';
import {
	continueRender,
	delayRender,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import './index.css';
import {TextMesh} from './TextMesh';

export const ThreeDText: React.FC = () => {
	const [handle] = useState(() => delayRender());
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const onCreated = useCallback(() => {
		continueRender(handle);
	}, [handle]);
	return (
		<ThreeCanvas
			linear
			orthographic
			width={width}
			height={height}
			style={{
				backgroundColor: 'white',
			}}
			camera={{
				zoom: 90,
				near: -40,
			}}
			onCreated={onCreated}
		>
			<TextMesh position={2} frame={frame} fps={fps} text="Text" />
			<TextMesh position={-0.5} frame={frame - 5} fps={fps} text="in" />
			<TextMesh position={-3} frame={frame - 10} fps={fps} text="3D" />
		</ThreeCanvas>
	);
};
