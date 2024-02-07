import Box from '@mui/material/Box';
import CheckRoundedIcon from '../../../../../../assets/check.svg?react';
import { Link, useParams } from 'react-router-dom';
import BaseImgBox from '../../../../../../components/Boxes';
import { LinkButton } from '../../../../../../components/LinkComponents';
import SvgIcon from '@mui/material/SvgIcon';
import Grid from '@mui/material/Unstable_Grid2';
import { isMobile } from 'react-device-detect';



export default function Notice() {

  const { theme, animal, breed } = useParams()

  return (
    <>
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) =>
          <Grid xs={3} key={idx}><BaseImgBox key={idx} src={`/notice${idx}.png`} square={true} /></Grid>)}
        <Grid xs={12}>
          <Box display="flex" width="full" justifyContent="center">
            <LinkButton
              component={Link}
              sx={{ marginTop: '8px' }}
              to={`/create/${theme}/${animal}/${breed}/upload`}
              variant={isMobile ?'contained' :"reverseContained"} color="petimage" startIcon={<SvgIcon component={CheckRoundedIcon} />}>
              상기 내용을 확인하였습니다.
            </LinkButton>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

