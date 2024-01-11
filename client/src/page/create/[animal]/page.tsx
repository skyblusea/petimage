import { Link, useLocation, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from "@tanstack/react-query";
import CustomImage from "../../../components/CustomImage";
import { SquareCreateBox } from "../../../components/Boxes";
import { breedsQuery } from "../../../util/loaders/breedLoader";



export default function SelectBreed() {

  const pathname = useLocation().pathname;
  const animal = useParams().animal ?? 'dog';
  const breeds = useQuery(breedsQuery(animal)).data;

  return (
    <Grid container spacing={3}>
      {breeds?.map((breed) => (
        <Grid xs={4} md={3} lg={12 / 5} key={breed._id}>
          <SquareCreateBox >
            <Link to={`${pathname}/${breed.code}/notice`}>
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




