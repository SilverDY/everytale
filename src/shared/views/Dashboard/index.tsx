import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { UserContext } from 'contexts/user';
import useStyles from './styles';

const constants = {
    male: 'Male',
    female: 'Female',
    weakTyping: 'Weak typing',
};

const Dashboard: React.FC = () => {
    const classes = useStyles();
    const { loadUserInfo, userInfo } = useContext(UserContext);

    useEffect(() => {
        loadUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.cardItem}>
                <div className={classNames(classes.itemColumn, classes.leftColumn)}>Name</div>
                <div className={classNames(classes.itemColumn)}>
                    {userInfo?.firstname} {userInfo?.surname}
                </div>
            </div>
            <div className={classes.cardItem}>
                <div className={classNames(classes.itemColumn, classes.leftColumn)}>Gender</div>
                <div className={classNames(classes.itemColumn)}>{constants[userInfo?.gender]}</div>
            </div>
            <div className={classes.cardItem}>
                <div className={classNames(classes.itemColumn, classes.leftColumn)}>Country</div>
                <div className={classNames(classes.itemColumn)}>{userInfo?.country?.name}</div>
            </div>
        </div>
    );
};

export default Dashboard;
