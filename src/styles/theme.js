import { createMuiTheme } from '@material-ui/core/styles'

// Notes : Create a theme instance.
const theme = createMuiTheme({
  // Overrides
  overrides: {
    MuiChip: {
      colorPrimary: {
        color: '#fff',
        backgroundColor: '#10B981',
      },
      colorSecondary: {
        color: '#fff',
        backgroundColor: '#EF4444',
      },
    },
  },
  // Breakpoints
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg'],
    values: {
      xs: 0,
      sm: 320,
      md: 480,
      lg: 768,
    },
  },
  // Typography
  typography: {
    fontFamily: ['Nunito', 'Poppins', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '36px',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '28px',
      fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: '20px',
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
    },
  },
  // Colors Palette
  palette: {
    primary: {
      main: '#2563EB',
    },
    secondary: {
      main: '#19857b',
    },
    success: {
      main: '#10B981',
    },
    error: {
      main: '#EF4444',
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
