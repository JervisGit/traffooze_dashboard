import { 
    createTheme as createMuiTheme,
    filledInputClasses,
    inputLabelClasses,
    outlinedInputClasses,
    paperClasses,
    tableCellClasses
} from '@mui/material';
import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

// colors.js
const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.30),
    alpha50: alpha(color.main, 0.50)
  };
};

export const neutral = {
    50: '#F8F9FA',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D2D6DB',
    400: '#9DA4AE',
    500: '#6C737F',
    600: '#4D5761',
    700: '#2F3746',
    800: '#1C2536',
    900: '#111927'
};
  
export const indigo = withAlphas({
    //lightest: '#F5F7FF',
    //light: '#EBEEFE',
    main: '#6A5ACD',
    //dark: '#4338CA',
    //darkest: '#312E81',
    contrastText: '#FFFFFF'
});
  
export const success = withAlphas({
    lightest: '#F0FDF9',
    light: '#3FC79A',
    main: '#10B981',
    dark: '#0B815A',
    darkest: '#134E48',
    contrastText: '#FFFFFF'
});
  
export const info = withAlphas({
    lightest: '#ECFDFF',
    light: '#CFF9FE',
    main: '#06AED4',
    dark: '#0E7090',
    darkest: '#164C63',
    contrastText: '#FFFFFF'
});
  
export const warning = withAlphas({
    lightest: '#FFFAEB',
    light: '#FEF0C7',
    main: '#F79009',
    dark: '#B54708',
    darkest: '#7A2E0E',
    contrastText: '#FFFFFF'
});
  
export const error = withAlphas({
    lightest: '#FEF3F2',
    light: '#FEE4E2',
    main: '#F04438',
    dark: '#B42318',
    darkest: '#7A271A',
    contrastText: '#FFFFFF'
});

// create-component.js
const muiTheme = createMuiTheme();

export function createComponents(config) {
  const { palette } = config;

  return {
    MuiAvatar: {
        styleOverrides: {
          root: {
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 0
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            textTransform: 'none'
          },
          sizeSmall: {
            padding: '6px 16px'
          },
          sizeMedium: {
            padding: '8px 20px'
          },
          sizeLarge: {
            padding: '11px 24px'
          },
          textSizeSmall: {
            padding: '7px 12px'
          },
          textSizeMedium: {
            padding: '9px 16px'
          },
          textSizeLarge: {
            padding: '12px 16px'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            [`&.${paperClasses.elevation1}`]: {
              boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)'
            }
          }
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '32px 24px',
            '&:last-child': {
              paddingBottom: '32px'
            }
          }
        }
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: {
            variant: 'h6'
          },
          subheaderTypographyProps: {
            variant: 'body2'
          }
        },
        styleOverrides: {
          root: {
            padding: '32px 24px 16px'
          }
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box'
          },
          html: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%'
          },
          body: {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%'
          },
          '#__next': {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            height: '100%',
            width: '100%'
          },
          '#nprogress': {
            pointerEvents: 'none'
          },
          '#nprogress .bar': {
            backgroundColor: palette.primary.main,
            height: 3,
            left: 0,
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 2000
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&::placeholder': {
              opacity: 1
            }
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          input: {
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '24px',
            '&::placeholder': {
              color: palette.text.secondary
            }
          }
        }
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            borderRadius: 8,
            borderStyle: 'solid',
            borderWidth: 1,
            overflow: 'hidden',
            borderColor: palette.neutral[200],
            transition: muiTheme.transitions.create([
              'border-color',
              'box-shadow'
            ]),
            '&:hover': {
              backgroundColor: palette.action.hover
            },
            '&:before': {
              display: 'none'
            },
            '&:after': {
              display: 'none'
            },
            [`&.${filledInputClasses.disabled}`]: {
              backgroundColor: 'transparent'
            },
            [`&.${filledInputClasses.focused}`]: {
              backgroundColor: 'transparent',
              borderColor: palette.primary.main,
              boxShadow: `${palette.primary.main} 0 0 0 2px`
            },
            [`&.${filledInputClasses.error}`]: {
              borderColor: palette.error.main,
              boxShadow: `${palette.error.main} 0 0 0 2px`
            }
          },
          input: {
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '24px'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: palette.action.hover,
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: palette.neutral[200]
              }
            },
            [`&.${outlinedInputClasses.focused}`]: {
              backgroundColor: 'transparent',
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: palette.primary.main,
                boxShadow: `${palette.primary.main} 0 0 0 2px`
              }
            },
            [`&.${filledInputClasses.error}`]: {
              [`& .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: palette.error.main,
                boxShadow: `${palette.error.main} 0 0 0 2px`
              }
            }
          },
          input: {
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '24px',
          },
          notchedOutline: {
            borderColor: palette.neutral[200],
            transition: muiTheme.transitions.create([
              'border-color',
              'box-shadow'
            ])
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: 14,
            fontWeight: 500,
            [`&.${inputLabelClasses.filled}`]: {
              transform: 'translate(12px, 18px) scale(1)'
            },
            [`&.${inputLabelClasses.shrink}`]: {
              [`&.${inputLabelClasses.standard}`]: {
                transform: 'translate(0, -1.5px) scale(0.85)'
              },
              [`&.${inputLabelClasses.filled}`]: {
                transform: 'translate(12px, 6px) scale(0.85)'
              },
              [`&.${inputLabelClasses.outlined}`]: {
                transform: 'translate(14px, -9px) scale(0.85)'
              }
            }
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.71,
            minWidth: 'auto',
            paddingLeft: 0,
            paddingRight: 0,
            textTransform: 'none',
            '& + &': {
              marginLeft: 24
            }
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottomColor: palette.divider,
            padding: '15px 16px'
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            borderBottom: 'none',
            [`& .${tableCellClasses.root}`]: {
              borderBottom: 'none',
              backgroundColor: palette.neutral[50],
              color: palette.neutral[700],
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: 0.5,
              textTransform: 'uppercase'
            },
            [`& .${tableCellClasses.paddingCheckbox}`]: {
              paddingTop: 4,
              paddingBottom: 4
            }
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          variant: 'filled'
        }
      }
    };
  }


// create-palette.js
export function createPalette() {
    return {
        action: {
          active: neutral[500],
          disabled: alpha(neutral[900], 0.38),
          disabledBackground: alpha(neutral[900], 0.12),
          focus: alpha(neutral[900], 0.16),
          hover: alpha(neutral[900], 0.04),
          selected: alpha(neutral[900], 0.12)
        },
        background: {
          default: common.white,
          paper: common.white
        },
        divider: '#F2F4F7',
        error,
        info,
        mode: 'light',
        neutral,
        primary: indigo,
        success,
        text: {
          primary: neutral[900],
          secondary: neutral[500],
          disabled: alpha(neutral[900], 0.38)
        },
        warning
      };
}

// create-typography.js
export const createTypography = () => {
    return {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        body1: {
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.5
        },
        body2: {
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: 1.57
        },
        button: {
          fontWeight: 600
        },
        caption: {
          fontSize: '0.75rem',
          fontWeight: 500,
          lineHeight: 1.66
        },
        subtitle1: {
          fontSize: '1rem',
          fontWeight: 500,
          lineHeight: 1.57
        },
        subtitle2: {
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 1.57
        },
        overline: {
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.5px',
          lineHeight: 2.5,
          textTransform: 'uppercase'
        },
        h1: {
          fontFamily: '\'Plus Jakarta Sans\', sans-serif',
          fontWeight: 700,
          fontSize: '3.5rem',
          lineHeight: 1.2
        },
        h2: {
          fontFamily: '\'Plus Jakarta Sans\', sans-serif',
          fontWeight: 700,
          fontSize: '3rem',
          lineHeight: 1.2
        },
        h3: {
          fontFamily: '\'Plus Jakarta Sans\', sans-serif',
          fontWeight: 700,
          fontSize: '2.25rem',
          lineHeight: 1.2
        },
        h4: {
          fontFamily: '\'Plus Jakarta Sans\', sans-serif',
          fontWeight: 700,
          fontSize: '2rem',
          lineHeight: 1.2
        },
        h5: {
          fontFamily: '\'Plus Jakarta Sans\', sans-serif',
          fontWeight: 700,
          fontSize: '1.5rem',
          lineHeight: 1.2
        },
        h6: {
          fontFamily: '\'Plus Jakarta Sans\', sans-serif',
          fontWeight: 700,
          fontSize: '1.125rem',
          lineHeight: 1.2
        }
      };
};

// index.js
export function createTheme() {
  const palette = createPalette();
  const components = createComponents({ palette });
  //const shadows = createShadows();
  const typography = createTypography();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440
      }
    },
    components,
    palette,
    //shadows,
    shape: {
      borderRadius: 8
    },
    typography
  });
}
