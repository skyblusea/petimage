import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import { CreateBox } from "./Grids";


export default function SelectAnimal() {
  return (
      <Grid container spacing={3}>
        <Grid xs={6}>
          <CreateBox>
            <Link to="/create/dog">
              <img src="/dog.jpeg" alt="강아지" />
            </Link>
            <Typography component="span" color='primary' sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>
              강아지
            </Typography>
          </CreateBox>
        </Grid>
        <Grid xs={6}>
          <CreateBox>
            <Link to="/create/cat" className="photo">
              <img src="/dog.jpeg" alt="고양이" />
            </Link>
            <Typography component="span" color='primary' sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>
              고양이
            </Typography>
          </CreateBox>
        </Grid>
      </Grid>
  )
}


