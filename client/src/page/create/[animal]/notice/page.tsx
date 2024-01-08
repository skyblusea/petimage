import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import SquareImgBoxWIcon from "../../../../components/Boxes";
import styled from '@emotion/styled'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import LinkButton from '../../../../components/LinkButton';
import { useParams } from 'react-router-dom';


export default function Notice() {

  const { animal, breed } = useParams() as { animal: string, breed: string }

  return (
    <RoundPaper elevation={3}>
      <Typography variant='h5' color='error'>
        업로드 전 안내사항
      </Typography>
      <Typography variant='body1' sx={{ textAlign: 'center' }}>
          Petimage에서 제공하는 AI는 계속해서 학습을 진행중인 단계로 AI가 제공하는 일부 결과물이 만족스럽지못할 수 있습니다.
      </Typography>
      <Typography variant='body1' sx={{ textAlign: 'center' }}>
          발생할 수 있는 결함에 대한 너른 양해를 부탁드리며, 계속하실 경우 결과물에 대해 동의하는 것으로 간주됩니다.
      </Typography>
      <ImgWrraper>
        <SquareImgBoxWIcon src="/notice1.png" />
        <SquareImgBoxWIcon src="/notice2.png" />
        <SquareImgBoxWIcon src="/notice3.png" />
        <SquareImgBoxWIcon src="/notice4.png" />
      </ImgWrraper>
      <LinkButton
        to={`/create/${animal}/${breed}/upload`}
        variant="reverseContained" color="petimage" startIcon={<CheckRoundedIcon />}>
        상기 내용을 확인하였습니다.
      </LinkButton>
    </RoundPaper >
  )
}

const ImgWrraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: var(--gap-lg);
  img{
    width: 100%;
    height: auto;
  }
`

export const RoundPaper = styled(Paper)`
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--gap-md);
  padding: var(--gap-lg);
`