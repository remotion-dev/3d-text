import {Canvas} from 'react-three-fiber';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import './index.css';
import {TextMesh} from './TextMesh';

export const ThreeDText: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return (
		<Canvas
			orthographic
			style={{
				width: '100%',
				height: '100%',
				background: 'linear-gradient(#41EAF7, #4285DF)',
			}}
			camera={{
				zoom: 50,
				near: -40,
			}}
		>
			<TextMesh frame={frame} fps={fps} />
		</Canvas>
	);
};
