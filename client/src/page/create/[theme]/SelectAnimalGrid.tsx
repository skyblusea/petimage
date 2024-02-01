import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import BaseImgBox from "../../../components/Boxes";


export default function SelectAnimal() {
  const { theme } = useParams();
  return (
    <Grid container spacing={10} >
      <Grid xs={6} display="flex">
        <BaseImgBox hover square to={`/create/${theme}/dog`} src="/dog.png" alt="강아지">
          <Typography component="span" color='primary' sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>
            강아지
          </Typography>
        </BaseImgBox>
      </Grid>
      <Grid xs={6} display="flex">
        <BaseImgBox hover square to={`/create/${theme}/cat`} src="/cat.png" alt="고양이">
          <Typography component="span" color='primary' sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>
            고양이
          </Typography>
        </BaseImgBox>
      </Grid>
    </Grid>
  )
}


