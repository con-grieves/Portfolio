import { keyframes } from '@emotion/react';
import { useRef, useState } from 'react';
import {
  Box,
  ClickAwayListener,
  Fade,
  IconButton,
  Paper,
  Popper,
  Slider,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  MusicNote,
  Pause,
  PlayArrow,
  Replay,
  SkipNext,
  VolumeDown,
  VolumeMute,
  VolumeUp,
} from '@mui/icons-material';
import { SoundWave } from './SoundWave.jsx';

const iconSx = {
  color: 'text.secondary',
  transition: 'color 180ms ease',
  '&:hover': { color: 'primary.main' },
};

const DROPDOWN_TRANSITION_MS = 500;

const musicPulse = keyframes`
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(-5deg); }
  75% { transform: scale(1.1) rotate(5deg); }
`;

export function Jukebox({
  audioRef,
  currentTrack,
  isPlaying,
  volume,
  setVolume,
  toggle,
  restart,
  next,
}) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const handleToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const VolumeIcon = volume === 0 ? VolumeMute : volume < 0.5 ? VolumeDown : VolumeUp;

  return (
    <Box className="jukebox-menu" sx={{ position: 'relative' }}>
      <audio ref={audioRef} preload="metadata" />

      <Tooltip title={open ? 'Close player' : 'Open player'} enterDelay={400}>
        <IconButton
          ref={anchorRef}
          onClick={handleToggleOpen}
          aria-label={open ? 'Close music player' : 'Open music player'}
          aria-expanded={open}
          aria-haspopup="true"
          sx={{
            width: 40,
            height: 40,
            color: open || isPlaying ? 'secondary.main' : 'text.secondary',
            transition: 'transform 0.35s ease, color 0.5s ease, background-color 0.35s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              bgcolor: 'action.hover',
            },
            '&:active': {
              transform: 'scale(0.92)',
            },
          }}
        >
          <MusicNote
            sx={{
              animation: isPlaying && !reduceMotion ? `${musicPulse} 1.4s ease-in-out infinite` : 'none',
            }}
          />
        </IconButton>
      </Tooltip>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal
        sx={{ zIndex: (t) => t.zIndex.appBar + 2 }}
        modifiers={[{ name: 'offset', options: { offset: [0, 10] } }]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={DROPDOWN_TRANSITION_MS}>
            <Box>
              <ClickAwayListener onClickAway={handleClose}>
                <Paper
                  role="group"
                  aria-label="Music player"
                  elevation={8}
                  sx={{
                    mt: 0.5,
                    minWidth: 260,
                    p: 2,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: (t) =>
                      t.palette.mode === 'dark' ? 'rgba(17, 21, 31, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(16px)',
                    transition: 'background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
                    boxShadow: (t) =>
                      t.palette.mode === 'dark'
                        ? '0 20px 48px rgba(0, 0, 0, 0.45)'
                        : '0 20px 48px rgba(15, 24, 43, 0.14)',
                  }}
                >
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', letterSpacing: 1, textTransform: 'uppercase', mb: 0.5 }}
                        >
                          Now playing
                        </Typography>
                        <Typography variant="body2" fontWeight={700} noWrap>
                          {currentTrack?.title ?? '—'}
                        </Typography>
                      </Box>
                      <SoundWave isPlaying={isPlaying} />
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
                      <Tooltip title="Restart track" enterDelay={400}>
                        <IconButton size="small" onClick={restart} aria-label="Restart track" sx={iconSx}>
                          <Replay fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={isPlaying ? 'Pause' : 'Play'} enterDelay={400}>
                        <IconButton
                          size="medium"
                          onClick={toggle}
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                          sx={{
                            ...iconSx,
                            color: 'secondary.main',
                            '&:hover': { color: 'secondary.main' },
                          }}
                        >
                          {isPlaying ? <Pause /> : <PlayArrow />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Next track" enterDelay={400}>
                        <IconButton size="small" onClick={next} aria-label="Next track" sx={iconSx}>
                          <SkipNext fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <VolumeIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                      <Slider
                        size="small"
                        value={volume}
                        min={0}
                        max={1}
                        step={0.01}
                        aria-label="Volume"
                        onChange={(_, value) => setVolume(value)}
                        sx={{
                          color: 'secondary.main',
                          '& .MuiSlider-thumb': {
                            transition: 'box-shadow 0.5s ease',
                          },
                          '& .MuiSlider-rail': {
                            transition: 'background-color 0.5s ease',
                          },
                        }}
                      />
                    </Stack>
                  </Stack>
                </Paper>
              </ClickAwayListener>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
