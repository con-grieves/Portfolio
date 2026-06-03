import { Box, IconButton, Typography } from '@mui/material';
import { Download } from '@mui/icons-material';

const overlayTextSx = {
  display: 'block',
  color: 'rgba(255, 255, 255, 0.95)',
  fontFamily: 'Roboto Mono, monospace',
  fontSize: '0.7rem',
  letterSpacing: 0.4,
  lineHeight: 1.5,
  textAlign: 'right',
};

const overlayTextMutedSx = {
  ...overlayTextSx,
  color: 'rgba(255, 255, 255, 0.75)',
  fontSize: '0.65rem',
};

export function PhotoExifOverlay({
  camera,
  lens,
  focalLength,
  downloadable,
  downloadHref,
  downloadFilename,
}) {
  const lines = [
    camera && { key: 'camera', text: camera, sx: overlayTextSx },
    lens && { key: 'lens', text: lens, sx: overlayTextMutedSx },
    focalLength && { key: 'focal', text: focalLength, sx: overlayTextMutedSx },
  ].filter(Boolean);

  const showDownload = downloadable !== false && downloadHref;
  if (lines.length === 0 && !showDownload) return null;

  const downloadButtonSx = {
    width: 36,
    height: 36,
    color: 'rgba(255, 255, 255, 0.95)',
    bgcolor: 'rgba(0, 0, 0, 0.45)',
    backdropFilter: 'blur(4px)',
    transition: 'background-color 0.5s ease, color 0.5s ease',
    '&:hover': {
      bgcolor: 'rgba(0, 0, 0, 0.65)',
      color: 'secondary.main',
    },
  };

  return (
    <>
      {showDownload && (
        <IconButton
          component="a"
          href={downloadHref}
          download={downloadFilename}
          aria-label="Download photo"
          size="small"
          sx={{
            position: 'absolute',
            left: 10,
            bottom: 10,
            zIndex: 1,
            ...downloadButtonSx,
          }}
        >
          <Download sx={{ fontSize: 20 }} />
        </IconButton>
      )}

      {lines.length > 0 && (
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            maxWidth: 'calc(100% - 20px)',
            zIndex: 1,
            px: 1.25,
            py: 0.75,
            borderRadius: 1,
            bgcolor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {lines.map(({ key, text, sx }) => (
            <Typography key={key} variant="caption" sx={sx}>
              {text}
            </Typography>
          ))}
        </Box>
      )}
    </>
  );
}
