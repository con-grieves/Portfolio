import { createTheme } from '@mui/material/styles';

const sharedTypography = {
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
};

const sharedComponents = {
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
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        transition: 'background-color 0.5s ease, color 0.5s ease',
      },
    },
  },
};

export const getShellStyles = (mode) => {
  const isDark = mode === 'dark';

  return {
    pageBackground: isDark
      ? 'linear-gradient(180deg, #090a11 0%, #11141f 100%)'
      : 'linear-gradient(180deg, #f6f8ff 0%, #e8eef9 100%)',
    appBarBackground: isDark ? 'rgba(9, 10, 17, 0.88)' : 'rgba(255, 255, 255, 0.82)',
    transition: 'background 0.5s ease, color 0.5s ease, border-color 0.5s ease',
  };
};

export const getTheme = (mode) => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#EDEFFF' : '#12182B',
      },
      secondary: {
        main: isDark ? '#6be8de' : '#0D8F86',
      },
      background: {
        default: isDark ? '#090A11' : '#F6F8FF',
        paper: isDark ? '#11151F' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F7F8FF' : '#12182B',
        secondary: isDark ? '#A0A7BF' : '#5B6478',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 24, 43, 0.1)',
      action: {
        hover: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 24, 43, 0.05)',
      },
      reciteme: {
        main: '#e9302d',
      },
    },
    typography: sharedTypography,
    components: {
      ...sharedComponents,
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 28,
            boxShadow: isDark
              ? '0 30px 60px rgba(0, 0, 0, 0.12)'
              : '0 24px 48px rgba(15, 24, 43, 0.08)',
          },
        },
      },
    },
  });
};
