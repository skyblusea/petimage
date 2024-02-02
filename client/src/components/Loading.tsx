import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

export default function Loading({
  height,
  width
}: {
  height?: string
  width?: string
}) {
  return (
    <DotLottiePlayer
      style={{ height: height ??'200px', width: width ?? '200px' }}
      loop
      src="/loading.lottie"
      autoplay
    >
    </DotLottiePlayer>
  )
}