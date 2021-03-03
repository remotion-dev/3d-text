import {useCallback, useState} from 'react';
import {Canvas} from 'react-three-fiber';
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
	const {fps} = useVideoConfig();
	const onCreated = useCallback(() => {
		continueRender(handle);
	}, [handle]);
	return (
		<Canvas
			orthographic
			style={{
				width: '100%',
				height: '100%',
				background: 'linear-gradient(#41EAF7, #4285DF)',
			}}
			camera={{
				zoom: 90,
				near: -40,
			}}
			onCreated={onCreated}
		>
			<TextMesh frame={frame} fps={fps} />
		</Canvas>
	);
};
