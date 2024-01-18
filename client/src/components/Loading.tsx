import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

export default function Loading() {
  return (
    <DotLottiePlayer
      style={{ height: '200px', width: '200px' }}
      loop
      src="/loading.lottie"
      autoplay
    >
    </DotLottiePlayer>
  )
}