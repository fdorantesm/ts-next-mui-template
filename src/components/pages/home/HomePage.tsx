'use client';

import type { JSX } from 'react';
import { Box, Container, Stack, Typography, keyframes } from '@mui/material';
import {
  BunDark,
  MaterialUIDark,
  NextJSDark,
  ReactDark,
  TypeScript,
} from '@fdorantesm/react-skill-icons';

const techIcons = [
  { label: 'React', Icon: ReactDark },
  { label: 'TypeScript', Icon: TypeScript },
  { label: 'Next.js', Icon: NextJSDark },
  { label: 'Material UI', Icon: MaterialUIDark },
  { label: 'Bun', Icon: BunDark },
];

const pulse = keyframes`
  0% { transform: scale(0.9); }
  50% { transform: scale(1); }
  100% { transform: scale(0.9); }
`;

const swing = keyframes`
  0% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
  60% { transform: translateY(3px); }
  100% { transform: translateY(0); }
`;

/**
 * Landing page showing project tech stack.
 */
export function HomePage(): JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
            {techIcons.map(({ label, Icon }, index) => (
              <Box
                key={label}
                sx={{
                  animation: `${pulse} 2s ease-in-out ${index * 0.2}s infinite`,
                  '&:hover': {
                    animation: `${swing} 0.6s ease-in-out`,
                  },
                }}
              >
                <Icon width={64} height={64} aria-label={label} />
              </Box>
            ))}
          </Stack>

          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)'
                  : 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Next.js + MUI Template
          </Typography>

          <Typography variant="body1" color="text.secondary">
            A modern template with Next.js 15 App Router, Material-UI, and TypeScript
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
            {techIcons.map(({ label }) => (
              <Box
                key={label}
                component="span"
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: 'action.hover',
                  fontSize: '0.875rem',
                }}
              >
                {label}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
