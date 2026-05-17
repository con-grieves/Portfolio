import { useEffect, useMemo, useRef, useState } from 'react';
import { keyframes } from '@emotion/react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Link,
  Stack,
  Switch,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Code, Css, Html, Javascript, GitHub, Terminal } from '@mui/icons-material';
import { getTheme } from './theme.js';
import { projects } from './data.js';

function App() {
  const [mode] = useState('dark');
  const [page, setPage] = useState('home');
  const [attemptedDay, setAttemptedDay] = useState(false);
  const resetNudge = useRef(null);
  const theme = useMemo(() => getTheme(mode), [mode]);
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Products', page: 'products' },
    { label: 'Photography', page: 'photography' },
  ];

  const angryShake = keyframes`
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    25% { transform: translate(calc(-50% - 1px), -50%) rotate(-1deg); }
    50% { transform: translate(calc(-50% + 1px), -50%) rotate(1deg); }
    75% { transform: translate(calc(-50% - 1px), -50%) rotate(-1deg); }
    100% { transform: translate(-50%, -50%) rotate(0deg); }
  `;

  const showNudge = () => {
    setAttemptedDay(true);
    window.clearTimeout(resetNudge.current);
    resetNudge.current = window.setTimeout(() => {
      setAttemptedDay(false);
    }, 900);
  };

  useEffect(() => {
    return () => window.clearTimeout(resetNudge.current);
  }, []);

  const getTechIcon = (tag) => {
    switch (tag) {
      case 'React.js':
        return <Code sx={{ fontSize: 28, color: '#61DAFB' }} />;
      case 'CSS':
        return <Css sx={{ fontSize: 28, color: '#1572B6' }} />;
      case 'HTML':
        return <Html sx={{ fontSize: 28, color: '#E34F26' }} />;
      case 'JavaScript':
        return <Javascript sx={{ fontSize: 28, color: '#F7DF1E' }} />;
      case 'Git':
        return <GitHub sx={{ fontSize: 28, color: '#181717' }} />;
      case 'npm':
        return <Terminal sx={{ fontSize: 28, color: '#CB3837' }} />;
      default:
        return <Code sx={{ fontSize: 28, color: '#61DAFB' }} />;
    }
  };

  const renderPageContent = () => {
    if (page === 'home') {
      return (
        <>
          <Box component="main" id="home" className="hero-section" sx={{ py: { xs: 10, md: 14 } }}>
            <Container maxWidth="lg">
              <Box className="hero-content" sx={{ mx: 'auto', maxWidth: 760, px: { xs: 2, md: 0 }, textAlign: { xs: 'left', md: 'center' } }}>
                <Typography variant="overline" sx={{ display: 'block', mb: 3, letterSpacing: 2, color: 'secondary.main' }}>
                  Software Developer / Indie Hacker
                </Typography>
                <Typography variant="h1" component="h1" sx={{ mb: 3, lineHeight: 1.02, letterSpacing: '-0.03em' }}>
                  Hi, I'm Connor!
                </Typography>
                <Typography variant="h2" component="h2" sx={{ mb: 3, letterSpacing: '-0.02em', color: 'primary.main' }}>
                  Based in the North-East of England, I'm writing code, building products and taking photos.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: { xs: 0, md: 'auto' }, mb: 5, lineHeight: 1.8 }}>
                  I'm currently building field-leading Accessibility Tools as a Software Developer at{' '}
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
                  , whilst also creating succinct, user-focused products and applications in my own time.
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

              <Grid container spacing={4} justifyContent="center">
                {projects.map((project) => (
                  <Grid key={project.title} item xs={12} sm={6} md={4}>
                    <Card
                      className="project-card"
                      sx={{
                        mx: 'auto',
                        maxWidth: 380,
                        width: '100%',
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'transform 0.28s ease, box-shadow 0.28s ease',
                        '&:hover': {
                          boxShadow: '0 32px 80px rgba(0, 0, 0, 0.22)',
                        },
                      }}
                    >
                      <CardMedia component="img" height="240" image={project.image} alt={project.title} />
                      <CardContent>
                        <Typography variant="h2" sx={{ fontSize: 22, mb: 1 }}>
                          {project.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                          {project.description}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {project.tags?.map((tag) => (
                            <Button
                              key={tag}
                              size="small"
                              variant="outlined"
                              color="secondary"
                              sx={{ textTransform: 'none', mb: 1, minWidth: 'auto', px: 1.25, borderRadius: '16px' }}
                            >
                              {getTechIcon(tag)}
                            </Button>
                          ))}
                        </Stack>
                      </CardContent>
                      <Divider />
                      <CardActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
                        <Button href={project.live} target="_blank" rel="noreferrer" size="small">
                          Live
                        </Button>
                        <Button href={project.code} target="_blank" rel="noreferrer" size="small">
                          Code
                        </Button>
                      </CardActions>
                    </Card>
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
          background: 'linear-gradient(180deg, #090a11 0%, #11141f 100%)',
          color: 'text.primary',
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
            backgroundColor: 'rgba(9, 10, 17, 0.88)',
            py: 1.25,
          }}
        >
          <Container
            className="header-container"
            maxWidth="lg"
            disableGutters
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, sm: 3, md: 4 } }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              {/* <Box component="img" src="/Images/coffee-cup(3).png" alt="Connor logo" sx={{ width: 38, height: 38 }} /> */}
              <Typography variant="button" sx={{ letterSpacing: 2, fontWeight: 700, color: 'primary.main' }}>
                CONNOR GRIEVES
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              {!smallScreen && (
                <Stack direction="row" spacing={3}>
                  {navItems.map((item) => (
                    <Button
                      key={item.page}
                      onClick={() => setPage(item.page)}
                      color="inherit"
                      sx={{
                        color: page === item.page ? 'primary.main' : 'text.secondary',
                        fontWeight: 600,
                        letterSpacing: 0.6,
                        transition: 'color 180ms ease, backgroundColor 180ms ease',
                        bgcolor: 'transparent',
                        '&:hover': {
                          color: 'primary.main',
                          bgcolor: 'rgba(255,255,255,0.06)',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Stack>
              )}

                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ position: 'relative', width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Brightness7
                      sx={{
                        color: '#F4D775',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: attemptedDay ? 0 : 1,
                        transition: 'opacity 200ms ease',
                      }}
                    />
                    <Typography
                      component="span"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: attemptedDay ? 1 : 0,
                        transition: 'opacity 200ms ease',
                        fontSize: 22,
                        lineHeight: 1,
                        animation: attemptedDay ? `${angryShake} 0.6s ease-in-out infinite` : 'none',
                      }}
                    >
                      ☝️
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', ml: 1, mr: 1 }}>
                    <Switch
                      checked={!attemptedDay}
                      onChange={showNudge}
                      color="secondary"
                    />
                  </Box>
                  <Brightness4 sx={{ color: '#B794F6' }} />
                </Box>
            </Stack>
          </Container>
        </AppBar>

        {renderPageContent()}

        <Box component="footer" className="footer-section" sx={{ py: 6, textAlign: 'center', bgcolor: 'background.paper' }}>
          <Container className="footer-container" maxWidth="lg">
            <Divider sx={{ borderColor: 'divider', mb: 3 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 1000 }}>
              © 2026 Connor Grieves
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;