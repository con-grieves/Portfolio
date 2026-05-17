import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#EDEFFF',
      },
      secondary: {
        main: '#6be8de',
      },
      background: {
        default: mode === 'dark' ? '#090A11' : '#F8F9FF',
        paper: mode === 'dark' ? '#11151F' : '#FFFFFF',
      },
      text: {
        primary: mode === 'dark' ? '#F7F8FF' : '#111827',
        secondary: mode === 'dark' ? '#A0A7BF' : '#6B7280',
      },
      reciteme: {
        main: '#e9302d',
      },
    },
    typography: {
      fontFamily: ['Ubuntu', 'Roboto', 'Arial', 'sans-serif'].join(','),
      h1: {
        fontWeight: 800,
        fontSize: 'clamp(3rem, 6vw, 4.25rem)',
      },
      h2: {
        fontWeight: 700,
        fontSize: '2rem',
      },
      h6: {
        fontWeight: 700,
        letterSpacing: 1,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.8,
      },
      button: {
        textTransform: 'none',
        fontWeight: 700,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 28,
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
  });
