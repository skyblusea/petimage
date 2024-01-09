import styled from '@emotion/styled'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Typography from '@mui/material/Typography';
import CustomImage from './CustomImage';
import { Stack } from '@mui/material';


export default function SquareImgBoxWIcon({
  children,
  src,
  alt,
  success,
  error,
}: {
  children?: React.ReactNode
  src: string,
  alt?: string,
  success?: boolean,
  error?: boolean,
}) {
  return (
    <SquareCreateBox>
      <ImgWrraper>
        <CustomImage src={src} alt={alt} />
        {success && <CheckCircleOutlineRoundedIcon fontSize="medium" color="success" />}
        {error && <HighlightOffRoundedIcon fontSize="medium" color="error" />}
      </ImgWrraper>
      {children && <Typography variant='body3'>{children}</Typography>}
    </SquareCreateBox>
  )
}


const ImgWrraper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
  svg {
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
`


export const RectangleCreateBox = styled.div` 
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--gap-md);
  img{
    border-radius: var(--border-radius-lg);
    width: 100%;
    height: auto;
    aspect-ratio: 3/4;
    object-fit: cover;
  }
`


export const SquareCreateBox = styled(RectangleCreateBox)`
  img {
    aspect-ratio: 1/1;
  }
`

export const CollectionBox = styled(Stack)` 
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid var(--petimage);
  border-radius: var(--border-radius-sm);
  padding: 2.12rem 2.94rem;
  width: 100%;
  gap: var(--gap-md);
`
