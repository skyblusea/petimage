import styled from '@emotion/styled'
import Grid from '@mui/material/Unstable_Grid2';



export const CreateBox = styled.div` 
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--gap-md);
  img{
    border-radius: var(--border-radius-lg);
    width: 100%;
    height: auto;
    aspect-ratio: 3/4;
    object-fit: cover;
  }
`



export const SquareCreateBox = styled(CreateBox)`
  img {
    aspect-ratio: 1/1;
  }
`
export const CreateContainer = styled(Grid)(() => ({
  width: '100%',
  padding: 'var(--gap-lg) 0',
  // margin: 0,
  minHeight: '400px',
}));

