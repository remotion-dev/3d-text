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
		flat
			orthographic
			width={width}
			height={height}
			style={{
				backgroundColor: 'yellow',
			}}
			camera={{
				zoom: 90,
				near: -40,
			}}
			onCreated={onCreated}
		>
			<TextMesh  frame={frame - 5}  text="4" />
		</ThreeCanvas>
	);
};
