import { useMemo, useState } from 'react';
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
  IconButton,
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
  const [mode, setMode] = useState('dark');
  const theme = useMemo(() => getTheme(mode), [mode]);
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'Photography', href: '#photography' },
  ];

  const getTechIcon = (tag) => {
    switch (tag) {
      case 'React.js':
        return <Code sx={{ fontSize: 32, color: '#61DAFB' }} />;
      case 'CSS':
        return <Css sx={{ fontSize: 32, color: '#1572B6' }} />;
      case 'HTML':
        return <Html sx={{ fontSize: 32, color: '#E34F26' }} />;
      case 'JavaScript':
        return <Javascript sx={{ fontSize: 32, color: '#F7DF1E' }} />;
      case 'Git':
        return <GitHub sx={{ fontSize: 32, color: '#181717' }} />;
      case 'npm':
        return <Terminal sx={{ fontSize: 32, color: '#CB3837' }} />;
      default:
        return <Code sx={{ fontSize: 32, color: '#61DAFB' }} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <AppBar position="sticky" color="transparent" elevation={0} sx={{ py: 1 }}> 
          <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box component="img" src="/Images/coffee-cup(3).png" alt="Connor logo" sx={{ width: 40, height: 40 }} />
              <Typography variant="h6" sx={{ fontWeight: 500, letterSpacing: 1 }}>
                CONNOR GRIEVES
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              {!smallScreen && (
                <Stack direction="row" spacing={3}>
                  {navItems.map((item) => (
                    <Button key={item.href} href={item.href} color="inherit" sx={{ color: 'text.secondary' }}>
                      {item.label}
                    </Button>
                  ))}
                </Stack>
              )}
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Brightness7 sx={{ color: '#F4D775' }} />
                <Switch
                  checked={mode === 'dark'}
                  onChange={() => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                  color="secondary"
                />
                <Brightness4 sx={{ color: '#B794F6' }} />
              </Stack>
            </Stack>
          </Container>
        </AppBar>

        <Box component="main" id="home" sx={{ pt: 8, pb: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h2" gutterBottom>
              Hi, I'm Connor.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720, lineHeight: 1.8 }}>
              I'm currently in working in Newcastle as a Software Developer at Recite Me, helping to make the internet a more accessible place.
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg" id="about" sx={{ py: 8 }}>
          <Typography variant="h6" color="secondary.main" gutterBottom>
            // A bit about me
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Box sx={{ borderRadius: 3, border: 1, borderColor: 'divider', overflow: 'hidden', bgcolor: 'background.paper' }}>
                <Box sx={{ backgroundColor: '#3c3c41', p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#EC6A5F' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#F5BF4F' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#296018' }} />
                </Box>
                <Box sx={{ p: 4, bgcolor: 'background.default' }}>
                  <Box component="pre" sx={{ fontFamily: 'source-code-pro, monospace', color: 'text.primary', whiteSpace: 'pre-wrap', fontSize: 16, m: 0 }}>
                    <Box component="span" sx={{ color: '#6284b8' }}>const</Box> me = <Box component="span" sx={{ color: 'yellow' }}>{'{'}</Box>
                    {'\n'}    <Box component="span" sx={{ color: '#a56745' }}>name</Box>: <Box component="span" sx={{ color: '#89cd89' }}>'Connor Grieves'</Box>,
                    {'\n'}    <Box component="span" sx={{ color: '#a56745' }}>age</Box>: <Box component="span" sx={{ color: '#89cd89' }}>30</Box>,
                    {'\n'}    <Box component="span" sx={{ color: '#a56745' }}>location</Box>: <Box component="span" sx={{ color: '#89cd89' }}>'United Kingdom'</Box>,
                    {'\n'}    <Box component="span" sx={{ color: '#a56745' }}>favoriteDrink</Box>: <Box component="span" sx={{ color: '#89cd89' }}>'Flat White'</Box>
                    {'\n'}<Box component="span" sx={{ color: 'yellow' }}>{'}'}</Box>;
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="body1" paragraph>
                The majority of my experience is in the JavaScript tech stack, having worked on JavaScript-heavy projects for the last two years.
              </Typography>
              <Typography variant="body1" paragraph>
                I've worked as part of multiple startups, delivering innovative tech as a member of agile product teams. I enjoy clear design, accessible interfaces, and polished interactions.
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Container id="projects" maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h6" color="secondary.main" gutterBottom>
            // Free tools & games
          </Typography>
          <Grid container spacing={4}>
            {projects.map((project) => (
              <Grid key={project.title} item xs={12} md={6}>
                <Card>
                  <CardMedia component="img" height="320" image={project.image} alt={project.title} />
                  <CardContent>
                    <Typography variant="h2" sx={{ fontSize: 24, mb: 1 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {project.tags.map((tag) => (
                        <Button key={tag} size="small" variant="outlined" color="secondary" sx={{ textTransform: 'none', mb: 1, minWidth: 'auto', px: 1 }}>
                          {getTechIcon(tag)}
                        </Button>
                      ))}
                    </Stack>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button href={project.live} target="_blank" rel="noreferrer" size="small">
                      Live Site
                    </Button>
                    <Button href={project.code} target="_blank" rel="noreferrer" size="small">
                      GitHub
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box component="footer" sx={{ py: 4, textAlign: 'center', bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Divider sx={{ mb: 3 }} />
            <Typography variant="body2" color="text.secondary">
              © 2026 Connor Grieves
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
