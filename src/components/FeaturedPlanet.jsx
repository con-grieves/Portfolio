import { Box, useTheme } from '@mui/material';

/**
 * Minimal cartoon planet tucked into the bottom-right —
 * left half of the frame is open space with stars and distant galaxies.
 */
export function FeaturedPlanet() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const ocean = isDark ? '#1c4f82' : '#2a6cb0';
  const oceanDeep = isDark ? '#153d66' : '#1f5690';
  const land = isDark ? '#3d6b42' : '#4a8548';
  const landLight = isDark ? '#5a8f52' : '#6ba85e';
  const cloud = isDark ? 'rgba(255, 255, 255, 0.38)' : 'rgba(255, 255, 255, 0.55)';
  const cloudSoft = isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.35)';
  const highlight = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.28)';
  const atmosphereInner = isDark ? 'rgba(120, 190, 255, 0.35)' : 'rgba(100, 170, 240, 0.4)';
  const atmosphereOuter = isDark ? 'rgba(80, 160, 255, 0.18)' : 'rgba(90, 170, 245, 0.22)';
  const atmosphereRim = isDark ? 'rgba(170, 220, 255, 0.55)' : 'rgba(140, 200, 255, 0.5)';
  const star = isDark ? 'rgba(237, 239, 255, 0.4)' : 'rgba(18, 24, 43, 0.22)';
  const starDim = isDark ? 'rgba(237, 239, 255, 0.18)' : 'rgba(18, 24, 43, 0.12)';
  const galaxyCore = isDark ? 'rgba(107, 232, 222, 0.22)' : 'rgba(13, 143, 134, 0.18)';
  const galaxyArm = isDark ? 'rgba(180, 160, 255, 0.14)' : 'rgba(80, 60, 140, 0.1)';
  const galaxyHaze = isDark ? 'rgba(107, 232, 222, 0.06)' : 'rgba(13, 143, 134, 0.05)';

  const stars = [
    [12, 18, 1.0], [34, 8, 0.7], [58, 22, 0.85], [78, 14, 0.55],
    [22, 42, 0.65], [48, 36, 0.5], [68, 48, 0.75], [88, 32, 0.45],
    [8, 62, 0.6], [38, 58, 0.4], [62, 72, 0.55], [82, 64, 0.35],
    [18, 88, 0.5], [52, 82, 0.65], [74, 92, 0.4], [42, 12, 0.35],
    [6, 34, 0.3], [90, 52, 0.28], [28, 74, 0.32], [56, 6, 0.38],
    [118, 24, 0.35], [142, 48, 0.28], [128, 72, 0.25],
  ];

  const dimStars = [
    [16, 28, 0.35], [44, 18, 0.3], [70, 38, 0.28], [26, 52, 0.25],
    [54, 66, 0.22], [76, 78, 0.2], [10, 78, 0.24], [64, 14, 0.26],
    [36, 44, 0.2], [86, 42, 0.18], [48, 92, 0.22], [20, 96, 0.2],
    [132, 16, 0.2], [108, 56, 0.18], [156, 36, 0.16],
  ];

  return (
    <Box
      component="svg"
      viewBox="0 0 200 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    >
      <defs>
        <clipPath id="featured-planet-frame">
          <rect x="0" y="0" width="200" height="100" />
        </clipPath>
        <radialGradient id="featured-planet-ocean" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor={ocean} />
          <stop offset="100%" stopColor={oceanDeep} />
        </radialGradient>
        <radialGradient id="featured-planet-atmo-halo" cx="50%" cy="50%" r="50%">
          <stop offset="78%" stopColor={atmosphereOuter} stopOpacity="0" />
          <stop offset="92%" stopColor={atmosphereInner} stopOpacity="0.5" />
          <stop offset="100%" stopColor={atmosphereOuter} stopOpacity="0.65" />
        </radialGradient>
        <radialGradient id="featured-planet-atmo-limb" cx="50%" cy="50%" r="50%">
          <stop offset="88%" stopColor="transparent" />
          <stop offset="96%" stopColor={atmosphereInner} stopOpacity="0.45" />
          <stop offset="100%" stopColor={atmosphereRim} stopOpacity="0.7" />
        </radialGradient>
      </defs>

      <g opacity={isDark ? 0.9 : 0.85}>
        <ellipse cx="28" cy="38" rx="22" ry="10" fill={galaxyHaze} transform="rotate(-32 28 38)" />
        <ellipse cx="28" cy="38" rx="14" ry="5" fill={galaxyArm} transform="rotate(-32 28 38)" />
        <ellipse cx="28" cy="38" rx="4" ry="2.5" fill={galaxyCore} transform="rotate(-32 28 38)" />
        <path
          d="M 18 36 Q 28 32 38 38 Q 28 44 18 36"
          fill="none"
          stroke={galaxyArm}
          strokeWidth="0.6"
          transform="rotate(-32 28 38)"
        />

        <ellipse cx="72" cy="22" rx="16" ry="7" fill={galaxyHaze} transform="rotate(18 72 22)" />
        <ellipse cx="72" cy="22" rx="10" ry="4" fill={galaxyArm} transform="rotate(18 72 22)" />
        <circle cx="72" cy="22" r="2.2" fill={galaxyCore} />

        <ellipse cx="52" cy="72" rx="18" ry="8" fill={galaxyHaze} transform="rotate(-8 52 72)" />
        <ellipse cx="52" cy="72" rx="11" ry="5" fill={galaxyArm} transform="rotate(-8 52 72)" />
        <ellipse cx="52" cy="72" rx="3" ry="1.8" fill={galaxyCore} transform="rotate(-8 52 72)" />
      </g>

      {dimStars.map(([cx, cy, r]) => (
        <circle key={`dim-${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={starDim} />
      ))}
      {stars.map(([cx, cy, r]) => (
        <circle key={`star-${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={star} />
      ))}

      <g clipPath="url(#featured-planet-frame)">
        <g transform="translate(192 100)">
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="28s"
              repeatCount="indefinite"
            />

            {/* Outer atmosphere glow */}
            <circle cx="0" cy="0" r="86" fill="url(#featured-planet-atmo-halo)" />

            {/* Planet body */}
            <circle cx="0" cy="0" r="78" fill="url(#featured-planet-ocean)" />

            {/* Continents */}
            <ellipse cx="-28" cy="-18" rx="22" ry="16" fill={land} transform="rotate(-18 -28 -18)" />
            <ellipse cx="-8" cy="-42" rx="14" ry="10" fill={landLight} transform="rotate(12 -8 -42)" />
            <ellipse cx="48" cy="-12" rx="12" ry="9" fill={landLight} transform="rotate(24 48 -12)" />
            <ellipse cx="-52" cy="8" rx="16" ry="11" fill={land} transform="rotate(-8 -52 8)" />
            <ellipse cx="-14" cy="-8" rx="10" ry="7" fill={landLight} transform="rotate(8 -14 -8)" />

            {/* Clouds */}
            <ellipse cx="-32" cy="-22" rx="20" ry="6" fill={cloudSoft} transform="rotate(-12 -32 -22)" />
            <ellipse cx="-24" cy="-18" rx="14" ry="5" fill={cloud} transform="rotate(-8 -24 -18)" />
            <ellipse cx="-40" cy="-14" rx="11" ry="4" fill={cloudSoft} transform="rotate(-20 -40 -14)" />
            <ellipse cx="12" cy="-38" rx="16" ry="5" fill={cloudSoft} transform="rotate(6 12 -38)" />

            {/* Limb atmosphere + daylight highlight */}
            <circle cx="0" cy="0" r="78" fill="url(#featured-planet-atmo-limb)" />
            <ellipse cx="-24" cy="-36" rx="18" ry="12" fill={highlight} transform="rotate(-25 -24 -36)" />
          </g>
        </g>
      </g>
    </Box>
  );
}
