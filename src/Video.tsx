import {Composition} from 'remotion';
import {ThreeDText} from './3DText';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="3DText"
				component={ThreeDText}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
