import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
    createStyles({
        '@global': {
            'body, html, #app': {
                minHeight: '100%',
            },
            'body': {
                position: 'relative',
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.fontSize,
                maxWidth: '100%',
                height: '100vh',
                margin: 0,
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                overflowX: 'hidden',
            },
            'h1': theme.typography.h1,
            'h2': theme.typography.h2,
            'h3': theme.typography.h3,
        },
    })
);
