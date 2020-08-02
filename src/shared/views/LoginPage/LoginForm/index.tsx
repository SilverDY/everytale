import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import classNames from 'classnames';
import useApi from 'api';
import { UserContext } from 'contexts/user';
import Button from 'components/Button';
import TextField from 'components/TextField';
import useStyles from './styles';

interface ILoginForm {
    changeFormMode: () => void;
}

type IFormInput = {
    login: string;
    password: string;
};

const LoginForm: React.FC<ILoginForm> = ({ changeFormMode }) => {
    const classes = useStyles();
    const { control, handleSubmit, errors } = useForm<IFormInput>();
    const { loginUser } = useContext(UserContext);
    const { submitLogin } = useApi();
    const history = useHistory();

    const onSubmit = (payload: IFormInput) => {
        submitLogin(payload.login, payload.password).then((data) => {
            loginUser(data);
            history.push('/');
        });
    };

    return (
        <div className={classes.formContainer}>
            <div className={classes.formHeader}>Login</div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={classNames(classes.formItem, { withError: !!errors.login })}>
                    <Controller
                        as={TextField}
                        name="login"
                        label="Login"
                        variant="outlined"
                        size="small"
                        control={control}
                        rules={{ required: 'Login is required' }}
                        error={!!errors.login}
                        helperText={errors.login?.message}
                        fullWidth
                    />
                </div>
                <div className={classNames(classes.formItem, { withError: !!errors.password })}>
                    <Controller
                        as={TextField}
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        size="small"
                        control={control}
                        rules={{ required: 'Password is required' }}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                    />
                </div>
                <div className={classNames(classes.formItem)}>
                    <Button type={'submit'} variant="contained" color="secondary" fullWidth>
                        Continue
                    </Button>
                </div>
                <div className={classNames(classes.formItem)}>
                    <Button onClick={changeFormMode} color="primary" fullWidth>
                        Create account
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
