import { makeStyles, createStyles } from '@material-ui/core/styles';

export default makeStyles(() =>
    createStyles({
        formContainer: {
            width: '100%',
            padding: '0 32px',
        },
        formHeader: {
            fontSize: '1.7rem',
            marginBottom: 20,
            textAlign: 'center',
        },
        formItem: {
            'marginBottom': 23,

            '&.withError': {
                marginBottom: 0,
            },
            '&.row': {
                'display': 'flex',

                '& > :first-child': {
                    marginRight: 5,
                },
            },
        },
    })
);
