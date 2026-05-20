import { Box, Link, Typography } from '@mui/material';
import { ArrowForward, CalculateOutlined, CasinoOutlined } from '@mui/icons-material';

const ICONS = {
  calculator: CalculateOutlined,
  dice: CasinoOutlined,
};

export function ToolCard({ title, description, footerStat, icon, live, code }) {
  const Icon = ICONS[icon] ?? CalculateOutlined;

  return (
    <Box
      component="article"
      className="tool-card"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: { xs: 2.5, sm: 3 },
        borderRadius: 3,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'border-color 0.5s ease, box-shadow 0.5s ease, transform 0.28s ease',
        '&:hover': {
          borderColor: 'secondary.main',
          transform: 'translateY(-2px)',
          boxShadow: (t) =>
            t.palette.mode === 'dark'
              ? '0 16px 40px rgba(107, 232, 222, 0.08)'
              : '0 16px 40px rgba(13, 143, 134, 0.12)',
          '& .tool-card-title': {
            color: 'secondary.main',
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
          borderRadius: 2,
          mb: 2.5,
          bgcolor: (t) =>
            t.palette.mode === 'dark' ? 'rgba(107, 232, 222, 0.12)' : 'rgba(13, 143, 134, 0.1)',
        }}
      >
        <Icon sx={{ fontSize: 24, color: 'secondary.main' }} />
      </Box>

      <Typography
        className="tool-card-title"
        variant="h6"
        component="h3"
        sx={{
          mb: 1.5,
          fontWeight: 700,
          fontSize: '1.125rem',
          lineHeight: 1.3,
          color: 'primary.main',
          transition: 'color 0.5s ease',
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ flex: 1, mb: 3, lineHeight: 1.75, fontSize: '0.9375rem' }}
      >
        {description}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          pt: 0.5,
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
          {footerStat}
        </Typography>
        <Link
          href={live}
          target="_blank"
          rel="noreferrer"
          underline="none"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'secondary.main',
            fontWeight: 700,
            fontSize: '0.875rem',
            whiteSpace: 'nowrap',
            transition: 'color 0.5s ease, gap 0.28s ease',
            '&:hover': {
              gap: 0.75,
            },
          }}
        >
          Try it free
          <ArrowForward sx={{ fontSize: 16 }} />
        </Link>
      </Box>

      {code && (
        <Link
          href={code}
          target="_blank"
          rel="noreferrer"
          variant="caption"
          color="text.secondary"
          sx={{
            mt: 1.5,
            display: 'inline-block',
            transition: 'color 0.5s ease',
            '&:hover': { color: 'secondary.main' },
          }}
        >
          View source
        </Link>
      )}
    </Box>
  );
}
