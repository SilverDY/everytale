import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#FEA53E',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
    breakpoints: {
        values: {
            xs: 320,
            sm: 450,
            md: 768,
            lg: 1024,
            xl: 1920,
        },
    },
});

export default theme;
