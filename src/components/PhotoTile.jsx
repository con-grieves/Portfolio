import { Box, Typography } from '@mui/material';
import {
  blockImageContextMenu,
  blockImageDrag,
  protectedImageSx,
  protectedImageWrapperSx,
} from '../utils/imageProtection.js';

export function PhotoTile({ photo, onClick }) {
  const metaParts = [photo.location, photo.date].filter(Boolean);
  const ariaLabel = [photo.title, ...metaParts].filter(Boolean).join(', ');

  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      onContextMenu={blockImageContextMenu}
      aria-label={ariaLabel || photo.alt}
      sx={{
        position: 'relative',
        display: 'block',
        width: '100%',
        p: 0,
        border: 'none',
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        bgcolor: 'background.paper',
        textAlign: 'left',
        transition: 'transform 0.4s ease',
        ...protectedImageWrapperSx,
        '&:hover': {
          transform: 'scale(1.02)',
          '& .photo-tile-meta': {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        component="img"
        src={photo.src}
        alt={photo.alt || photo.title || ''}
        loading="lazy"
        draggable={false}
        onContextMenu={blockImageContextMenu}
        onDragStart={blockImageDrag}
        sx={{
          display: 'block',
          width: '100%',
          height: 'auto',
          ...protectedImageSx,
        }}
      />

      <Box
        aria-hidden
        onContextMenu={blockImageContextMenu}
        onDragStart={blockImageDrag}
        sx={{
          position: 'absolute',
          inset: 0,
        }}
      />

      {(photo.location || photo.date || photo.camera) && (
        <Box
          className="photo-tile-meta"
          sx={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            px: 1.25,
            py: 0.75,
            borderRadius: 1,
            bgcolor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(4px)',
            opacity: 0,
            transition: 'opacity 0.5s ease',
            maxWidth: 'calc(100% - 20px)',
          }}
        >
          {photo.location && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.95)',
                fontFamily: 'Roboto Mono, monospace',
                fontSize: '0.7rem',
                letterSpacing: 0.4,
                lineHeight: 1.4,
              }}
            >
              {photo.location}
            </Typography>
          )}
          {photo.date && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.75)',
                fontFamily: 'Roboto Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: 0.3,
                lineHeight: 1.4,
              }}
            >
              {photo.date}
              {photo.camera ? ` · ${photo.camera}` : ''}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
