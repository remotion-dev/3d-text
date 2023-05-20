import {Composition} from 'remotion';
import {ThreeDText} from './3DText';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="3DText"
				component={ThreeDText}
				durationInFrames={120}
				fps={30}
				width={1080}
				height={1080}
			/>
		</>
	);
};
