import { keyframes } from '@emotion/react';
import { Box, useMediaQuery } from '@mui/material';

const barPulse = keyframes`
  0%, 100% { transform: scaleY(0.35); opacity: 0.45; }
  50% { transform: scaleY(1); opacity: 1; }
`;

const BAR_DELAYS = ['0ms', '120ms', '240ms', '360ms', '480ms'];

export function SoundWave({ isPlaying }) {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <Box
      aria-hidden
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
        width: 22,
        height: 16,
        mx: 0.5,
      }}
    >
      {BAR_DELAYS.map((delay, index) => (
        <Box
          key={delay}
          sx={{
            width: 3,
            height: 14,
            borderRadius: 999,
            bgcolor: isPlaying ? 'secondary.main' : 'text.secondary',
            opacity: isPlaying ? 1 : 0.35,
            transformOrigin: 'center bottom',
            transform: 'scaleY(0.35)',
            animation:
              isPlaying && !reduceMotion
                ? `${barPulse} 0.9s ease-in-out infinite`
                : 'none',
            animationDelay: delay,
          }}
        />
      ))}
    </Box>
  );
}
