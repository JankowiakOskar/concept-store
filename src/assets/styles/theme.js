export const breakpoints = {
  huge: '1700',
  bigDekstop: '1440',
  desktop: '1150',
  bigTablet: '1020',
  tablet: '767',
  bigPhone: '400',
  phone: '320',
}

export const colors = {
  primary: 'hsl(233, 57%, 37%)',
  primaryLight: 'hsl(236, 71%, 69%)',
  primaryDark: 'hsl(221, 100%, 26%)',
  grey100: 'hsl(0, 0%, 25%)',
  grey200: 'hsl(0, 0%, 74%)',
  grey300: 'hsl(0, 0%, 87%)',
  grey400: 'hsl(0, 0%, 91%)',
  grey500: 'hsl(0, 0%, 97%)',
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 10%)',
}

export const font = {
  size: {
    small: '1.4rem',
    button: '1.5rem',
    regular: '1.6rem',
    medium: '1.8rem',
    siteHeader: '2.5rem',
    large: '2.9rem',
    xxl: '6rem',
  },
  weight: {
    thin: '300',
    regular: '400',
    semiBold: '600',
    bold: '800',
  },
}

export const mq = Object.keys(breakpoints).reduce((acc, breakpoint) => {
  acc[breakpoint] = `@media(min-width: ${breakpoints[breakpoint]}px)`

  return acc
}, {})

export const theme = {
  ...colors,
  font,
  mq,
  layout: {
    searchBarHeight: '80px',
    mobileSidesPadding: '20px',
  },
  zIndex: {
    level1: '1000',
    level2: '2000',
    level3: '3000',
    level4: '4000',
    level5: '5000',
    level6: '6000',
    level7: '7000',
    level8: '8000',
    level9: '9000',
    level10: '10000',
  },
}
