import styled from "@emotion/styled"


interface ImageProps {
  src: string
  alt: string
  width?: string
  height?: string
}


export default function Image({ src, alt, width, height }: ImageProps) {
  return <Img src={src} alt={alt} width={width} height={height} />
}


const Img = styled.img<ImageProps>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'auto'};
`