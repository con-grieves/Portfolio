import { Box } from '@mui/material';
import { PhotoTile } from './PhotoTile.jsx';

export function MasonryGrid({ photos, onPhotoClick }) {
  return (
    <Box
      sx={{
        columnCount: { xs: 1, sm: 2, md: 3 },
        columnGap: '12px',
        '& > *': {
          breakInside: 'avoid',
          mb: '12px',
        },
      }}
    >
      {photos.map((photo, index) => (
        <PhotoTile key={photo.id} photo={photo} onClick={() => onPhotoClick(index)} />
      ))}
    </Box>
  );
}
