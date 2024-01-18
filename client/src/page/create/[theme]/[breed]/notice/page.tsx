import Typography from '@mui/material/Typography';
import styled from '@emotion/styled'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { LinkButton } from '../../../../../components/LinkComponents';
import { Link, useParams } from 'react-router-dom';
import { RoundPaper, SingleSection } from '../../../../../components/Containers';
import BaseImgBox from '../../../../../components/Boxes';


export default function Notice() {

  const { theme, breed } = useParams()

  return (
    <SingleSection>
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
          <BaseImgBox src="/notice1.png" square={true} />
          <BaseImgBox src="/notice2.png" square={true} />
          <BaseImgBox src="/notice3.png" square={true} />
          <BaseImgBox src="/notice4.png" square={true} />
        </ImgWrraper>
        <LinkButton
          component={Link}
          to={`/create/${theme}/${breed}/upload`}
          variant="reverseContained" color="petimage" startIcon={<CheckRoundedIcon />}>
          상기 내용을 확인하였습니다.
        </LinkButton>
      </RoundPaper >
    </SingleSection>
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

