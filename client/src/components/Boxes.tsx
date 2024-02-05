import styled from '@emotion/styled'
import CorrectIcon from '../assets/correct.svg?react';
import IncorrectIcon from '../assets/incorrect.svg?react';
import Typography from '@mui/material/Typography';
import CustomImage from './CustomImage';
import { Stack } from '@mui/material';
import { LinkBox } from './LinkComponents';
import { Link, LinkProps } from "react-router-dom";
import SvgIcon from '@mui/material/SvgIcon';



export default function BaseImgBox({
  children,
  src,
  alt,
  success,
  error,
  square,
  ratio,
  to,
  hover,
  view,
  onClick,
}: {
  children?: React.ReactNode
  src: string,
  alt?: string,
  success?: boolean,
  error?: boolean,
  square?: boolean,
  ratio?: string,
  to?: LinkProps['to'];
  hover?: boolean;
  view?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>
}) {

  return (
    <BaseCreateBox
      component={to ? Link : 'div'}
      to={to}
      ratio={square ? '1/1' : ratio}
      hover={hover}
      view={view}
      onClick={onClick}
    >
      <ImgWrraper>
        <CustomImage src={src} alt={alt} />
        {success && <SvgIcon component={CorrectIcon} fontSize="medium" color="success" />}
        {error && <SvgIcon component={IncorrectIcon} fontSize="medium" color="error" />}
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
  border-radius: var(--border-radius-sm);
  svg {
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
`

type BaseCreateBoxProps = {
  ratio?: string
  hover?: boolean
  view?: boolean
}


export const BaseCreateBox = styled(LinkBox) <BaseCreateBoxProps>` 
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--gap-xs);
  ${props => props.view && `      
    cursor: zoom-in;
    `}
  img{
    ${props => props.hover && `      
      :hover {
        transform: scale(1.1);
        transition: transform 0.5s;
      }
    `}
    aspect-ratio: ${props => props.ratio};
  }
`


export const SquareCreateBox = styled(BaseCreateBox)`
  img {
    aspect-ratio: 1/1;
  }
`

interface CollectionBoxProps {
  isMobile?: boolean
}

export const CollectionBox = styled(Stack)<CollectionBoxProps>` 
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid var(--petimage);
  border-radius: var(--border-radius-sm);
  padding: ${props => props.isMobile ? 'var(--gap-md) var(--gap-lg)' : '2.12rem 2.94rem'};
  width: 100%;
  gap: var(--gap-md);
`
