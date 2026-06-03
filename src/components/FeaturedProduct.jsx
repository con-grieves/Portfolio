import { Box, Button, Grid, Typography } from '@mui/material';
import { ArrowForward, RocketLaunchOutlined } from '@mui/icons-material';

export function FeaturedProduct({
  overline,
  title,
  tagline,
  description,
  price,
  ctaLabel,
  ctaUrl,
  image,
}) {
  return (
    <Box
      component="article"
      className="featured-product"
      sx={{
        borderRadius: 3,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        transition: 'border-color 0.5s ease, box-shadow 0.5s ease, transform 0.28s ease',
        '&:hover': {
          borderColor: 'secondary.main',
          transform: 'translateY(-2px)',
          boxShadow: (t) =>
            t.palette.mode === 'dark'
              ? '0 16px 40px rgba(107, 232, 222, 0.08)'
              : '0 16px 40px rgba(13, 143, 134, 0.12)',
          '& .featured-product-title': {
            color: 'secondary.main',
          },
        },
      }}
    >
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              aspectRatio: { xs: '16 / 10', md: 'auto' },
              minHeight: { md: 320 },
              height: { md: '100%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: (t) =>
                t.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(107, 232, 222, 0.08) 0%, rgba(17, 21, 31, 0.6) 100%)'
                  : 'linear-gradient(135deg, rgba(13, 143, 134, 0.1) 0%, rgba(246, 248, 255, 0.9) 100%)',
              borderRight: { md: '1px solid' },
              borderBottom: { xs: '1px solid', md: 'none' },
              borderColor: 'divider',
            }}
          >
            {image ? (
              <Box
                component="img"
                src={image}
                alt={title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: 3,
                  border: '1px dashed',
                  borderColor: 'divider',
                  bgcolor: (t) =>
                    t.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 24, 43, 0.04)',
                }}
              >
                <RocketLaunchOutlined sx={{ fontSize: 36, color: 'secondary.main', opacity: 0.8 }} />
              </Box>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: { xs: 3, sm: 4 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography
              variant="overline"
              sx={{ display: 'block', mb: 1.5, letterSpacing: 2, color: 'secondary.main' }}
            >
              {overline}
            </Typography>

            <Typography
              className="featured-product-title"
              variant="h5"
              component="h3"
              sx={{
                mb: 1,
                fontWeight: 700,
                lineHeight: 1.25,
                color: 'primary.main',
                transition: 'color 0.5s ease',
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ mb: 2, fontWeight: 600, color: 'primary.main', lineHeight: 1.4 }}
            >
              {tagline}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.75 }}>
              {description}
            </Typography>

            {price && (
              <Typography
                variant="body2"
                sx={{ mb: 3, fontWeight: 700, color: 'secondary.main' }}
              >
                {price}
              </Typography>
            )}

            <Box>
              <Button
                href={ctaUrl}
                variant="outlined"
                color="secondary"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  transition: 'border-color 0.5s ease, background-color 0.5s ease',
                }}
              >
                {ctaLabel}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
