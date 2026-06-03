import { useCallback, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { usePhotosWithMetadata } from '../hooks/usePhotosWithMetadata.js';
import { MasonryGrid } from './MasonryGrid.jsx';
import { PhotoLightbox } from './PhotoLightbox.jsx';

export function PhotographyPage({ onBack }) {
  const { photos } = usePhotosWithMetadata();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const activePhoto = photos[activeIndex] ?? null;

  const openLightbox = useCallback((index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => Math.min(photos.length - 1, i + 1));
  }, [photos.length]);

  return (
    <Box component="main" className="photography-page" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 0 } }}>
        <Box sx={{ mx: 'auto', maxWidth: 960, mb: { xs: 5, md: 6 }, textAlign: 'center' }}>
          <Typography
            variant="overline"
            sx={{ display: 'block', mb: 2, letterSpacing: 2, color: 'secondary.main' }}
          >
            Photography
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{ mb: 2, lineHeight: 1.05, letterSpacing: '-0.03em' }}
          >
            Gallery
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}>

          </Typography>
        </Box>

        {photos.length > 0 ? (
          <MasonryGrid photos={photos} onPhotoClick={openLightbox} />
        ) : (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No photos yet — add images to public/photos/ and list them in src/photos.js.
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: { xs: 6, md: 8 }, textAlign: 'center' }}>
          <Button variant="text" size="large" color="secondary" onClick={onBack}>
            Back to Home
          </Button>
        </Box>
      </Container>

      <PhotoLightbox
        open={lightboxOpen}
        photo={activePhoto}
        photos={photos}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />
    </Box>
  );
}
