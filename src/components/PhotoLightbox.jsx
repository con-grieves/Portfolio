import { useEffect } from 'react';
import { Box, Dialog, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight, Close } from '@mui/icons-material';
import { PhotoExifOverlay } from './PhotoExifOverlay.jsx';
import {
  blockImageContextMenu,
  blockImageDrag,
  protectedImageSx,
  protectedImageWrapperSx,
} from '../utils/imageProtection.js';

export function PhotoLightbox({ open, photo, photos, onClose, onPrev, onNext }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < photos.length - 1;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft' && hasPrev) onPrev();
      if (event.key === 'ArrowRight' && hasNext) onNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, hasPrev, hasNext, onPrev, onNext]);

  if (!photo) return null;

  const downloadFilename =
    photo.downloadFilename ?? photo.src.split('/').pop() ?? `${photo.id}.jpg`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth={false}
      PaperProps={{
        sx: {
          bgcolor: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none',
          overflow: 'hidden',
          m: 0,
          maxWidth: '100vw',
          maxHeight: '100vh',
          width: '100vw',
          height: fullScreen ? '100dvh' : 'auto',
          borderRadius: 0,
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(8px)',
          bgcolor: 'rgba(0, 0, 0, 0.72)',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        aria-label="Close"
        sx={{
          position: 'fixed',
          top: 12,
          right: 12,
          zIndex: 3,
          color: 'rgba(255, 255, 255, 0.95)',
          bgcolor: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(4px)',
          transition: 'background-color 0.5s ease',
          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.65)' },
        }}
      >
        <Close />
      </IconButton>

      {hasPrev && (
        <IconButton
          onClick={onPrev}
          aria-label="Previous photo"
          sx={{
            position: 'fixed',
            left: { xs: 8, sm: 16 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 3,
            color: 'rgba(255, 255, 255, 0.95)',
            bgcolor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(4px)',
            transition: 'background-color 0.5s ease',
            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.65)' },
          }}
        >
          <ChevronLeft />
        </IconButton>
      )}

      {hasNext && (
        <IconButton
          onClick={onNext}
          aria-label="Next photo"
          sx={{
            position: 'fixed',
            right: { xs: 8, sm: 16 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 3,
            color: 'rgba(255, 255, 255, 0.95)',
            bgcolor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(4px)',
            transition: 'background-color 0.5s ease',
            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.65)' },
          }}
        >
          <ChevronRight />
        </IconButton>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: fullScreen ? '100dvh' : '100vh',
          p: { xs: 2, sm: 4 },
          boxSizing: 'border-box',
        }}
      >
        <Box
          onContextMenu={blockImageContextMenu}
          sx={{
            position: 'relative',
            maxWidth: '100%',
            maxHeight: '100%',
            ...protectedImageWrapperSx,
          }}
        >
          <Box
            component="img"
            src={photo.src}
            alt={photo.alt || photo.title || ''}
            draggable={false}
            onContextMenu={blockImageContextMenu}
            onDragStart={blockImageDrag}
            sx={{
              display: 'block',
              maxWidth: { xs: 'calc(100vw - 32px)', sm: 'calc(100vw - 128px)' },
              maxHeight: { xs: 'calc(100dvh - 32px)', sm: 'calc(100vh - 64px)' },
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: 1,
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
          <PhotoExifOverlay
            camera={photo.camera}
            lens={photo.lens}
            focalLength={photo.focalLength}
            downloadable={photo.downloadable}
            downloadHref={photo.src}
            downloadFilename={downloadFilename}
          />
        </Box>
      </Box>
    </Dialog>
  );
}
