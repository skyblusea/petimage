import styled from "@emotion/styled";
import React, { useLayoutEffect } from "react";

export default function CustomImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  //placeholder 이미지 컴포넌트
  //이미지 로딩 되는 동안 레이아웃이 깨지는 것 방지

  const imgEl = React.useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = React.useState(false);

  const onImageLoaded = (e) => {
    if (e.target.complete) {
      setLoaded(true);
    }
  };

  useLayoutEffect(() => {
    const imgElCurrent = imgEl.current;
    if (imgElCurrent) {
      imgElCurrent.addEventListener('load', onImageLoaded);
      return () => imgElCurrent.removeEventListener('load', onImageLoaded);
    }
  }, [imgEl]);


  return (
    <>
      <Image src={props.src} alt={props.alt} ref={imgEl} loaded={loaded} />
      {!loaded && <Placeholder src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII=" loaded={loaded}/>}
    </>
  )
}

interface PlaceholderProps {
  loaded: boolean
}

const Placeholder = styled.img<PlaceholderProps>`
  object-fit: cover !important;
  width: 300px !important;
  max-width: 100%;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  display: ${({ loaded }) => loaded ? 'none' : 'block'};
`


const Image = styled.img<PlaceholderProps>`
  display: ${({ loaded }) => loaded ? 'block' : 'none'};
`