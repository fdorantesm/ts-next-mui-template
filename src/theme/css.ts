import type { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function bgGradient(props: {
  direction?: string;
  imgUrl?: string;
  startColor?: string;
  endColor?: string;
}) {
  const { direction = 'to bottom', startColor, endColor, imgUrl } = props;

  if (imgUrl) {
    return {
      backgroundImage: `linear-gradient(${direction}, ${startColor || 'transparent'}, ${
        endColor || 'transparent'
      }), url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    };
  }

  return {
    backgroundImage: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
  };
}

// ----------------------------------------------------------------------

export function bgBlur(props: {
  color?: string;
  blur?: number;
  opacity?: number;
  imgUrl?: string;
}) {
  const { blur = 6, opacity = 0.8, color, imgUrl } = props;

  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: color
          ? `${color}${Math.round(opacity * 255).toString(16)}`
          : `rgba(0, 0, 0, ${opacity})`,
      },
    };
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: color
      ? `${color}${Math.round(opacity * 255).toString(16)}`
      : `rgba(0, 0, 0, ${opacity})`,
  };
}

// ----------------------------------------------------------------------

export function paper(props: {
  theme: Theme;
  bgcolor?: string;
  color?: string;
  elevation?: number;
}) {
  const { theme, bgcolor, color, elevation = 1 } = props;

  return {
    backgroundColor: bgcolor || theme.palette.background.paper,
    color: color || theme.palette.text.primary,
    boxShadow: theme.shadows[elevation],
    transition: theme.transitions.create(['box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
  };
}

// ----------------------------------------------------------------------

export const hideScroll = {
  x: {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  y: {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
};
