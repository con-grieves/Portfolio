import { useCallback, useState } from 'react';
import { Box, Button, Container, Link, SvgIcon, Typography } from '@mui/material';
import { instagramUrl } from '../data.js';
import { usePhotosWithMetadata } from '../hooks/usePhotosWithMetadata.js';
import { MasonryGrid } from './MasonryGrid.jsx';
import { PhotoLightbox } from './PhotoLightbox.jsx';

function InstagramIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.227-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </SvgIcon>
  );
}

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
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.75,
              maxWidth: 520,
              mx: 'auto',
              lineHeight: 1.8,
            }}
          >
            View more on my
            <Link
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connor Grieves on Instagram"
              underline="none"
              sx={{
                display: 'inline-flex',
                color: 'text.secondary',
                transition: 'color 0.5s ease, transform 0.5s ease',
                '&:hover': {
                  color: 'secondary.main',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              <InstagramIcon sx={{ fontSize: 22 }} />
            </Link>
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
