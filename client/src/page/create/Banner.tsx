import { Theme } from "../../types";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BaseImgBox from '../../components/Boxes';
import { RoundPaper } from '../../components/Containers';
import { Link } from 'react-router-dom';

export default function Banner({
  content,
  idx
}: {
  content: Theme;
  idx: number;
}) {


  return (
    <Box padding="var(--pd-sm)" paddingBottom="calc(var(--gap-lg) + 20px)">
      <Link to={`/create/${content.name}`}>
        <RoundPaper elevation={3}>
          <BaseImgBox src={content.sample[0]} alt={`banner${idx}`} />
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <Typography variant="h4" component="h1" sx={{ typography: { xs: 'subtitle0' }, fontWeight: '700' }}>
              {content.name}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'error.main',
                typography: { xs: 'subtitle1', lg: 'subtitle0' }
              }}>
              {content.price} 원
            </Typography>
          </Box>
          <Box display="flex" width="100%" >
            <Typography variant="body1" sx={{ typography: { xs: 'body2', md: 'body1' } }}>
              <span dangerouslySetInnerHTML={{ __html: content.desc }} />
            </Typography>
          </Box>
        </RoundPaper>
      </Link>
    </Box>
  )
}