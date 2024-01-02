import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { SquareCreateBox } from "./Grids";
import Grid from '@mui/material/Unstable_Grid2';



export default function SelectBreed() {

  const breeds = ['닥스훈트', '리트리버', '진돗개', '삽살개', '닥스훈트', '리트리버', '진돗개', '삽살개']


  return (
    <Grid container spacing={3}>
      {breeds.map((breed, index) => (
        <Grid xs={4} md={3} lg={12 / 5}>
          <SquareCreateBox key={index} >
            <Link to={`/create/dog/${index}`}>
              <img src="/dog.jpeg" alt="강아지" />
            </Link>
            <Typography component="span" sx={{
              color: 'primary',
              typography: { xs: 'subtitle2', lg: 'subtitle1' }
            }}>
              {breed}
            </Typography>
          </SquareCreateBox>
        </Grid>
      ))}
    </Grid>
  )
}




