import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from '@emotion/styled'
import CheckRoundedIcon from '../../../../../../assets/check.svg?react';
import { Link, useParams } from 'react-router-dom';
import { RoundPaper, SingleSection } from '../../../../../../components/Containers';
import BaseImgBox from '../../../../../../components/Boxes';
import { LinkButton } from '../../../../../../components/LinkComponents';
import SvgIcon from '@mui/material/SvgIcon';



export default function Notice() {

  const { theme, animal, breed } = useParams()

  return (
    <SingleSection center>
      <RoundPaper2 elevation={3}>
        <Typography variant='h5' color='error'>
          업로드 전 안내사항
        </Typography>
        <Box>
          <Typography variant='body1' sx={{ textAlign: 'center' }}>
            Petimage에서 제공하는 AI는 계속해서 학습을 진행중인 단계로 AI가 제공하는 일부 결과물이 만족스럽지못할 수 있습니다.
          </Typography>
          <Typography variant='body1' sx={{ textAlign: 'center' }}>
            발생할 수 있는 결함에 대한 너른 양해를 부탁드리며, 계속하실 경우 결과물에 대해 동의하는 것으로 간주됩니다.
          </Typography>
        </Box>
        <ImgWrraper>
          <BaseImgBox src="/notice1.png" square={true} />
          <BaseImgBox src="/notice2.png" square={true} />
          <BaseImgBox src="/notice3.png" square={true} />
          <BaseImgBox src="/notice4.png" square={true} />
        </ImgWrraper>
        <LinkButton
          component={Link}
          sx={{ marginTop: '8px'}}
          to={`/create/${theme}/${animal}/${breed}/upload`}
          variant="reverseContained" color="petimage" startIcon={<SvgIcon component={CheckRoundedIcon}/>}>
          상기 내용을 확인하였습니다.
        </LinkButton>
      </RoundPaper2 >
    </SingleSection>
  )
}

const ImgWrraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: var(--gap-sm);
  img{
    width: 100%;
    height: auto;
  }
`

const RoundPaper2 = styled(RoundPaper)`
  padding-top: 24px;
  padding-Bottom: 24px;
`