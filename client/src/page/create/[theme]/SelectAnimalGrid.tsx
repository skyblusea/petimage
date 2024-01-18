import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import { BaseCreateBox } from "../../../components/Boxes";


export default function SelectAnimalGrid() {
  const { theme } = useParams();
  return (
    <Grid container spacing={3}>
      <Grid xs={6}>
        <BaseCreateBox>
          <Link to={`/create/${theme}/dog`}>
            <img src="/dog.jpeg" alt="강아지" />
          </Link>
          <Typography component="span" color='primary' sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>
            강아지
          </Typography>
        </BaseCreateBox>
      </Grid>
      <Grid xs={6}>
        <BaseCreateBox>
          <Link to={`/create/${theme}/cat`}>
            <img src="/dog.jpeg" alt="고양이" />
          </Link>
          <Typography component="span" color='primary' sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>
            고양이
          </Typography>
        </BaseCreateBox>
      </Grid>
    </Grid>
  )
}


