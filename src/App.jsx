import { useCallback, useMemo, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { getShellStyles, getTheme } from './theme.js';
import { projects } from './data.js';
import { Jukebox } from './components/Jukebox.jsx';
import { ThemeToggle } from './components/ThemeToggle.jsx';
import { ToolCard } from './components/ToolCard.jsx';
import { useJukebox } from './hooks/useJukebox.js';

const THEME_STORAGE_KEY = 'portfolio-theme-mode';

function getInitialMode() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

function App() {
  const [mode, setMode] = useState(getInitialMode);
  const [page, setPage] = useState('home');
  const theme = useMemo(() => getTheme(mode), [mode]);
  const shellStyles = useMemo(() => getShellStyles(mode), [mode]);
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const jukebox = useJukebox();

  const toggleMode = useCallback(() => {
    setMode((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Products', page: 'products' },
    { label: 'Photography', page: 'photography' },
  ];

  const renderPageContent = () => {
    if (page === 'home') {
      return (
        <>
          <Box component="main" id="home" className="hero-section" sx={{ py: { xs: 10, md: 14 } }}>
            <Container maxWidth="lg">
              <Box className="hero-content" sx={{ mx: 'auto', maxWidth: 760, px: { xs: 2, md: 0 }, textAlign: { xs: 'left', md: 'center' } }}>
                <Typography variant="overline" sx={{ display: 'block', mb: 3, letterSpacing: 2, color: 'secondary.main' }}>
                  Software Engineer / Indie Hacker
                </Typography>
                <Typography variant="h1" component="h1" sx={{ mb: 3, lineHeight: 1.02, letterSpacing: '-0.03em' }}>
                  Hi, I'm Connor !
                </Typography>
                <Typography variant="h2" component="h2" sx={{ mb: 3, letterSpacing: '-0.02em', color: 'primary.main' }}>
                  I write code and take photos.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: { xs: 0, md: 'auto' }, mb: 4, lineHeight: 1.8 }}>
                  I'm currently developing field-leading Accessibility Tools as a Software Engineer at{' '}
                  <Link
                    href="https://reciteme.com/"
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'reciteme.main',
                      fontWeight: 700,
                      transition: 'color 200ms ease, transform 200ms ease',
                      '&:hover': { color: 'secondary.main', transform: 'translateY(-1px)' },
                    }}
                  >
                    Recite Me
                  </Link>
                   {' '}and building cool stuff in my own time.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent={{ md: 'center' }}>
                  <Button
                    onClick={() => setPage('products')}
                    variant="outlined"
                    size="large"
                  >
                    View Products
                  </Button>
                  <Button
                    onClick={() => setPage('photography')}
                    variant="outlined"
                    size="large"
                    color="secondary"
                  >
                    My Photography
                  </Button>
                </Stack>
              </Box>
            </Container>
          </Box>

          {/* <Container maxWidth="lg" id="about" className="about-section" sx={{ py: { xs: 8, md: 10 }, px: { xs: 2, md: 0 } }}>
            <Box sx={{ mx: 'auto', maxWidth: 900 }}>
              <Typography variant="h6" color="secondary.main" sx={{ mb: 4, letterSpacing: 1.2, textTransform: 'uppercase' }}>
                // About
              </Typography>

              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={8}>
                  <Card
                    className="code-snippet-card"
                    sx={{
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'divider',
                      overflow: 'hidden',
                      bgcolor: 'background.paper',
                    }}
                  >
                    <Box sx={{ bgcolor: '#0f1320', p: { xs: 3, md: 4 } }}>
                      <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#EC6A5F' }} />
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#F5BF4F' }} />
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#296018' }} />
                      </Box>
                      <Box component="pre" sx={{ fontFamily: 'source-code-pro, monospace', color: 'text.primary', whiteSpace: 'pre-wrap', fontSize: 16, m: 0, lineHeight: 1.8 }}>
                        <Box component="span" sx={{ color: '#6284b8' }}>const</Box> me = <Box component="span" sx={{ color: '#F9E16C' }}>{'{'}</Box>
                        {'\n'}    <Box component="span" sx={{ color: '#a56745' }}>name</Box>: <Box component="span" sx={{ color: '#89cd89' }}>'Connor Grieves'</Box>,
                        {'\n'}    <Box component="span" sx={{ color: '#a56745' }}>age</Box>: <Box component="span" sx={{ color: '#89cd89' }}>30</Box>,
                        {'\n'}    <Box component="span" sx={{ color: '#a56745' }}>location</Box>: <Box component="span" sx={{ color: '#89cd89' }}>'United Kingdom'</Box>,
                        {'\n'}    <Box component="span" sx={{ color: '#a56745' }}>favoriteDrink</Box>: <Box component="span" sx={{ color: '#89cd89' }}>'Flat White'</Box>
                        {'\n'}<Box component="span" sx={{ color: '#F9E16C' }}>{'}'}</Box>;
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              </Grid>

              <Box className="bio-copy" sx={{ mt: 5, maxWidth: 700, mx: 'auto', display: 'grid', gap: 3 }}>
                <Typography variant="body1">
                  I specialise in modern JavaScript experiences with a focus on accessibility, usability, and subtle motion. My work blends clean UI patterns with practical functionality.
                </Typography>
                <Typography variant="body1">
                  I've been part of agile teams and fast-moving startups, delivering polished front-end products that feel premium without being overdesigned.
                </Typography>
              </Box>
            </Box>
          </Container> */}

          <Container maxWidth="lg" id="projects" className="projects-section" sx={{ py: { xs: 8, md: 10 }, px: { xs: 2, md: 0 } }}>
            <Box sx={{ mx: 'auto', maxWidth: 900 }}>
              <Typography variant="overline" sx={{ display: 'block', textAlign: 'center', mb: 3, letterSpacing: 2, color: 'secondary.main' }}>
                Free tools and games
              </Typography>

              <Grid container spacing={3} justifyContent="center">
                {projects.map((project) => (
                  <Grid key={project.title} item xs={12} sm={6} md={6} lg={5}>
                    <ToolCard {...project} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </>
      );
    }

    const pageLabels = {
      products: {
        overline: 'Products',
        title: 'Product pages coming soon',
        description: 'A clean, modern product experience is being prepared. Come back soon to explore the latest tools and releases.',
      },
      photography: {
        overline: 'Photography',
        title: 'Photography coming soon',
        description: 'A showcase of my latest work is almost ready. Check back soon for the new gallery.',
      },
    };

    const currentPage = pageLabels[page];

    return (
      <Box component="main" sx={{ py: { xs: 14, md: 18 } }}>
        <Container maxWidth="lg">
          <Box sx={{ mx: 'auto', maxWidth: 740, px: { xs: 2, md: 0 }, textAlign: 'center' }}>
            <Typography variant="overline" sx={{ display: 'block', mb: 3, letterSpacing: 2, color: 'secondary.main' }}>
              {currentPage.overline}
            </Typography>
            <Typography variant="h1" component="h1" sx={{ mb: 3, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              {currentPage.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5, lineHeight: 1.8 }}>
              {currentPage.description}
            </Typography>
            <Button variant="outlined" size="large" color="secondary" onClick={() => setPage('home')}>
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        className="page-shell"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: shellStyles.pageBackground,
          color: 'text.primary',
          transition: shellStyles.transition,
        }}
      >
        <AppBar
          className="header-appbar"
          position="sticky"
          color="transparent"
          elevation={0}
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            backdropFilter: 'blur(16px)',
            backgroundColor: shellStyles.appBarBackground,
            py: 1.25,
            transition: shellStyles.transition,
          }}
        >
          <Container
            className="header-container"
            maxWidth="lg"
            disableGutters
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexShrink: 0 }}>
              <Typography
                variant="button"
                sx={{
                  letterSpacing: 2,
                  fontWeight: 700,
                  color: 'primary.main',
                  transition: 'color 0.5s ease',
                }}
              >
                CONNOR GRIEVES
              </Typography>
            </Stack>

            <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }} alignItems="center" sx={{ flexShrink: 0 }}>
              {!smallScreen && (
                <Stack direction="row" spacing={3} sx={{ mr: { sm: 1, md: 2 } }}>
                  {navItems.map((item) => (
                    <Button
                      key={item.page}
                      onClick={() => setPage(item.page)}
                      color="inherit"
                      sx={{
                        color: page === item.page ? 'primary.main' : 'text.secondary',
                        fontWeight: 600,
                        letterSpacing: 0.6,
                        transition: 'color 0.5s ease, background-color 0.5s ease',
                        bgcolor: 'transparent',
                        '&:hover': {
                          color: 'primary.main',
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Stack>
              )}

              <ThemeToggle mode={mode} onToggle={toggleMode} />
              <Jukebox {...jukebox} />
            </Stack>
          </Container>
        </AppBar>

        {renderPageContent()}

        <Box
          component="footer"
          className="footer-section"
          sx={{
            py: 6,
            textAlign: 'center',
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider',
            transition: 'background-color 0.5s ease, border-color 0.5s ease',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="caption" color="text.secondary">
              © 2026 Connor Grieves. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;