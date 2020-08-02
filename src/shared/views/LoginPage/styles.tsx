import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const formBarWidth = 400;

export default makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'relative',
            display: 'flex',
            alignItems: 'stretch',
            minHeight: '100vh',
        },
        appLogo: {
            position: 'absolute',
            top: 30,
            left: 30,
            filter: 'drop-shadow(1px 3px 1px black)',

            [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                margin: 'auto',
            },
        },
        backgroundContainer: {
            position: 'relative',
            width: `calc(100% - ${formBarWidth}px)`,

            [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
                width: '100%',
                height: '50vh',
            },
        },
        backgroundCover: {
            width: '100%',
            height: '100%',
        },
        backgroundBackdrop: {
            position: 'absolute',
            background: 'linear-gradient(145.05deg,#ffcc40,#ff983d)',
            height: '100%',
            width: '100%',
            opacity: '0.6',
        },
        formBar: {
            position: 'absolute',
            right: 0,
            height: '100%',
            width: formBarWidth,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
            overflow: 'hidden',

            [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
                width: '100%',
                height: '50vh',
                bottom: 0,
                overflow: 'scroll',
            },
        },
        formBarHeader: {
            position: 'absolute',
            top: '10%',
            left: 0,
            width: '100%',
            textAlign: 'center',
            fontSize: '1.3rem',
            letterSpacing: 2,
            zIndex: 1,

            [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
                display: 'none',
            },
        },
        formBarHeaderBrand: {
            fontSize: '2.3rem',
            fontWeight: 'bold',
            color: theme.palette.secondary.main,
        },
        formBarFooter: {
            position: 'absolute',
            color: theme.palette.text.secondary,
            fontSize: '0.8rem',
            bottom: 20,
            width: '100%',
            textAlign: 'center',

            [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
                display: 'none',
            },
        },
        transItem: {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            willChange: 'transform, opacity',

            [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
                alignItems: 'flex-start',
                padding: '12px 0',
                height: 'auto',
            },
        },
    })
);
