import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export function ThemeToggle({ mode, onToggle }) {
  const isDark = mode === 'dark';

  return (
    <Tooltip title={isDark ? 'Switch to day mode' : 'Switch to night mode'} enterDelay={400}>
      <IconButton
        onClick={onToggle}
        aria-label={isDark ? 'Switch to day mode' : 'Switch to night mode'}
        sx={{
          width: 40,
          height: 40,
          color: isDark ? '#B794F6' : '#E6A82A',
          transition: 'transform 0.35s ease, color 0.5s ease, background-color 0.35s ease',
          '&:hover': {
            transform: 'scale(1.12) rotate(-10deg)',
            bgcolor: 'action.hover',
          },
          '&:active': {
            transform: 'scale(0.9)',
          },
        }}
      >
        {isDark ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
}
