import React, { useState, useMemo } from 'react';
import { useTransition, animated } from 'react-spring';
import LoginBg from 'shared/assets/login_bg.jpg';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import useStyles from './styles';

interface IFormModes {
    [index: string]: typeof LoginForm | typeof RegistrationForm;
    login: typeof LoginForm;
    registration: typeof RegistrationForm;
}

const formModes: IFormModes = {
    login: LoginForm,
    registration: RegistrationForm,
};

const LoginPage: React.FC = () => {
    const classes = useStyles();
    const [formMode, setFormMode] = useState<string>('login');

    const transitions = useTransition(formMode, (v) => v, {
        trail: 400,
        from: { opacity: 0, transform: 'translateY(80px)' },
        enter: { opacity: 1, transform: 'translateY(0px)' },
        leave: { opacity: 0, transform: 'translateY(-80px)' },
        // @ts-ignore
        order: ['leave', 'enter', 'update'],
    });

    const createChangeFormModeHandler = (newMode: string): (() => void) => () => {
        setFormMode(newMode);
    };

    const currentYear = useMemo(() => new Date().getFullYear(), []);

    return (
        <div className={classes.container}>
            <div className={classes.backgroundContainer}>
                <div className={classes.backgroundBackdrop} />
                <div
                    className={classes.backgroundCover}
                    style={{
                        backgroundImage: `url(${LoginBg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                />
                <img
                    className={classes.appLogo}
                    src="https://app.everytale.net/static/media/imageLogo.d61ecedd.svg"
                />
            </div>
            <div className={classes.formBar}>
                <div className={classes.formBarHeader}>
                    <div>Welcome to</div>
                    <div className={classes.formBarHeaderBrand}>Everytale</div>
                </div>
                {transitions.map(({ item, props, key }) => {
                    // eslint-disable-next-line security/detect-object-injection
                    const Form = (formModes as IFormModes)[item];
                    return (
                        <animated.div key={key} style={props} className={classes.transItem}>
                            <Form
                                changeFormMode={createChangeFormModeHandler(
                                    item === 'login' ? 'registration' : 'login'
                                )}
                            />
                        </animated.div>
                    );
                })}
                <div className={classes.formBarFooter}>
                    <div>© {currentYear} «Everytale Team»</div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
