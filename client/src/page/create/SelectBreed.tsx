import { Link, useLoaderData, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { SquareCreateBox } from "./Grids";
import Grid from '@mui/material/Unstable_Grid2';
import { breedsQuery } from "../../util/loader";
import { useQuery } from "@tanstack/react-query";
import CustomImage from "../../components/CustomImage";



export default function SelectBreed() {

  // const breeds = useLoaderData() 
  // console.log(breeds)
  const animal = useParams().animal ?? 'dog';
  const breeds = useQuery(breedsQuery(animal)).data;

  return (
    <Grid container spacing={3}>
      {breeds?.map((breed) => (
        <Grid xs={4} md={3} lg={12 / 5} key={breed._id}>
          <SquareCreateBox >
            <Link to={`/create/dog/${breed.code}`}>
              {/* <img src={breed.img} alt="강아지" /> */}
              <CustomImage src={breed.img} alt={breed.name} />
            </Link>
            <Typography component="span" sx={{
              color: 'primary',
              typography: { xs: 'subtitle2', lg: 'subtitle1' }
            }}>
              {breed.name}
            </Typography>
          </SquareCreateBox>
        </Grid>
      ))}
    </Grid>
  )
}




