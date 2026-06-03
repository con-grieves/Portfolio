import { useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ChevronLeft, ChevronRight, Close, Download } from '@mui/icons-material';

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
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: (t) =>
            t.palette.mode === 'dark' ? 'rgba(9, 10, 17, 0.96)' : 'rgba(246, 248, 255, 0.98)',
          backdropFilter: 'blur(16px)',
          backgroundImage: 'none',
          boxShadow: 'none',
          m: fullScreen ? 0 : 2,
          borderRadius: fullScreen ? 0 : 3,
          border: fullScreen ? 'none' : '1px solid',
          borderColor: 'divider',
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
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          color: 'text.primary',
          bgcolor: 'action.hover',
          transition: 'background-color 0.5s ease',
          '&:hover': { bgcolor: 'action.selected' },
        }}
      >
        <Close />
      </IconButton>

      {hasPrev && (
        <IconButton
          onClick={onPrev}
          aria-label="Previous photo"
          sx={{
            position: 'absolute',
            left: { xs: 8, sm: 16 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            color: 'text.primary',
            bgcolor: 'action.hover',
            transition: 'background-color 0.5s ease',
            '&:hover': { bgcolor: 'action.selected' },
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
            position: 'absolute',
            right: { xs: 8, sm: 16 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            color: 'text.primary',
            bgcolor: 'action.hover',
            transition: 'background-color 0.5s ease',
            '&:hover': { bgcolor: 'action.selected' },
          }}
        >
          <ChevronRight />
        </IconButton>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: fullScreen ? '100vh' : 'auto',
          p: { xs: 2, sm: 4 },
          pt: { xs: 7, sm: 5 },
        }}
      >
        <Box
          component="img"
          src={photo.src}
          alt={photo.alt || photo.title || ''}
          sx={{
            maxWidth: '100%',
            maxHeight: { xs: '60vh', sm: '75vh', md: '85vh' },
            objectFit: 'contain',
            borderRadius: 1,
          }}
        />

        <Stack
          spacing={1}
          sx={{
            mt: 3,
            width: '100%',
            maxWidth: 640,
            alignItems: { xs: 'center', sm: 'flex-start' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          {photo.title && (
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {photo.title}
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary">
            {[photo.location, photo.date, photo.camera].filter(Boolean).join(' · ')}
          </Typography>

          <Button
            component="a"
            href={photo.src}
            download={downloadFilename}
            variant="outlined"
            color="secondary"
            startIcon={<Download />}
            sx={{ mt: 1, transition: 'border-color 0.5s ease, background-color 0.5s ease' }}
          >
            Download
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
