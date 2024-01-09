import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import { RectangleCreateBox } from "../../components/Boxes";


export default function SelectAnimalGrid() {
  return (
      <Grid container spacing={3}>
        <Grid xs={6}>
          <RectangleCreateBox>
            <Link to="/create/dog">
              <img src="/dog.jpeg" alt="강아지" />
            </Link>
            <Typography component="span" color='primary' sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>
              강아지
            </Typography>
          </RectangleCreateBox>
        </Grid>
        <Grid xs={6}>
          <RectangleCreateBox>
            <Link to="/create/cat" className="photo">
              <img src="/dog.jpeg" alt="고양이" />
            </Link>
            <Typography component="span" color='primary' sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>
              고양이
            </Typography>
          </RectangleCreateBox>
        </Grid>
      </Grid>
  )
}


