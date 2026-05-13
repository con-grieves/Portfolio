import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#EEF2FF',
      },
      secondary: {
        main: '#F95959',
      },
      background: {
        default: mode === 'dark' ? '#2A2A2B' : '#F7F9FC',
        paper: mode === 'dark' ? '#35363B' : '#FFFFFF',
      },
      text: {
        primary: mode === 'dark' ? '#EEF2FF' : '#1F2937',
        secondary: mode === 'dark' ? '#F95959' : '#4B5563',
      },
    },
    typography: {
      fontFamily: ['Ubuntu', 'Roboto', 'Arial', 'sans-serif'].join(','),
      h1: {
        fontWeight: 700,
        fontSize: '3.5rem',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
      },
      h6: {
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 14,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: '0 18px 48px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
  });
