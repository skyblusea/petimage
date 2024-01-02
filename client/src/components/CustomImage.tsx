import styled from "@emotion/styled";
import React from "react";

export default function CustomImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  //Next Image component 의 placeholder 속성을 사용하기 위해 만든 컴포넌트
  const imgEl = React.useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = React.useState(false);

  const onImageLoaded = (e) => {
    if (e.target.complete) {
      setLoaded(true);
    }
  };

  React.useEffect(() => {
    const imgElCurrent = imgEl.current;
    if (imgElCurrent) {
      imgElCurrent.addEventListener('load', onImageLoaded);
      return () => imgElCurrent.removeEventListener('load', onImageLoaded);
    }
  }, [imgEl]);


  return (
    <>
      <Image src={props.src} alt={props.alt} ref={imgEl} loaded={loaded} />
      <Placeholder src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII=" loaded={loaded}/>
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