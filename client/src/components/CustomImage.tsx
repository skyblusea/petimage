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
      {/* <Placeholder src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII=" loaded={false}/> */}
      <Image src={props.src} alt={props.alt} ref={imgEl} loaded={loaded} />
      {!loaded && <Placeholder src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII=" loaded={loaded} />}
    </>
  )
}

interface PlaceholderProps {
  loaded: boolean
}

const Placeholder = styled.img<PlaceholderProps>`
  object-fit: cover !important;
  /* width: 500px !important; */
  flex-grow: 1;
  display: ${({ loaded }) => loaded ? 'none' : 'block'};
`


const Image = styled.img<PlaceholderProps>`
  border-radius: var(--border-radius-lg);
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${({ loaded }) => loaded ? 'block' : 'none'};
`