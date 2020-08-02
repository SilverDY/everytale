import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'relative',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        post: {
            position: 'relative',
            padding: 16,
            width: 400,
            border: `2px solid ${theme.palette.secondary.dark}`,
            borderRadius: 20,
            backgroundColor: theme.palette.secondary.main,
        },
        logoutButton: {
            marginTop: 30,
        },
    })
);
