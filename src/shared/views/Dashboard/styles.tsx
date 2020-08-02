import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: `2px solid ${theme.palette.secondary.dark}`,
            borderRadius: 20,
            overflow: 'hidden',
        },
        cardItem: {
            display: 'flex',
            height: 60,
        },
        itemColumn: {
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            wordBreak: 'break-all',
        },
        leftColumn: {
            width: 150,
            borderRight: '2px solid #ededed',
        },
    })
);
