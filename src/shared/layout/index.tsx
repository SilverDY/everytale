import React, { useContext } from 'react';
import { UserContext } from 'contexts/user';
import Button from 'components/Button';
import useStyles from './styles';

const Layout: React.FC = ({ children }) => {
    const classes = useStyles();
    const { logoutUser } = useContext(UserContext);

    return (
        <div className={classes.container}>
            <div className={classes.post}>{children}</div>
            <Button
                className={classes.logoutButton}
                color="secondary"
                variant="contained"
                onClick={logoutUser}
            >
                Logout
            </Button>
        </div>
    );
};

export default Layout;
