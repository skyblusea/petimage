import styled from '@emotion/styled'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { Typography } from '@mui/material';

export default function SquareImgBox({
  children,
  src,
  success,
  error,
}: {
  children?: React.ReactNode
  src: string,
  success?: boolean,
  error?: boolean,
}) {
  return (
    <SquareCreateBox>
      <ImgWrraper>
        <img src={src} alt="강아지" />
        {success && <CheckCircleOutlineRoundedIcon fontSize="medium" color="success" />}
        {error && <HighlightOffRoundedIcon fontSize="medium" color="error" />}
      </ImgWrraper>
      <Typography variant='body3'>
        {children}
      </Typography>
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


export const CreateBox = styled.div` 
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


export const SquareCreateBox = styled(CreateBox)`
  img {
    aspect-ratio: 1/1;
  }
`
