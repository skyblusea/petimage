import styled from '@emotion/styled'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Typography from '@mui/material/Typography';
import CustomImage from './CustomImage';
import { Stack } from '@mui/material';
import { LinkBox } from './LinkComponents';
import { Link, LinkProps } from "react-router-dom";



export default function BaseImgBox({
  children,
  src,
  alt,
  success,
  error,
  square,
  ratio,
  to,
  inValid,
}: {
  children?: React.ReactNode
  src: string,
  alt?: string,
  success?: boolean,
  error?: boolean,
  square?: boolean,
  ratio?: string,
  to?: LinkProps['to'];
  inValid?: boolean
}) {

  return (
    <BaseCreateBox
      component={to ? Link : 'div'}
      to={to}
      ratio={square ? '1/1' : ratio}
    >
      <ImgWrraper>
        <CustomImage src={src} alt={alt} />
        {success && <CheckCircleOutlineRoundedIcon fontSize="medium" color="success" />}
        {error && <HighlightOffRoundedIcon fontSize="medium" color="error" />}
      </ImgWrraper>
      {children && <Typography variant='body3'>{children}</Typography>}
    </BaseCreateBox>
  )
}


const ImgWrraper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
  svg {
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
`

type BaseCreateBoxProps = {
  ratio?: string
}


export const BaseCreateBox = styled(LinkBox)<BaseCreateBoxProps>` 
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--gap-md);
  img{
    aspect-ratio: ${props => props.ratio};
  }
`


export const SquareCreateBox = styled(BaseCreateBox)`
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
