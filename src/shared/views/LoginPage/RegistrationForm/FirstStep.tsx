import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import classNames from 'classnames';
import useApi from 'api';
import Button from 'components/Button';
import TextField from 'components/TextField';
import useStyles from './styles';

interface IFirstStep {
    nextStep: () => void;
    submitForm: (payload: IFormInput) => void;
}

type IFormInput = {
    firstname: string;
    surname: string;
    login: string;
    password: string;
    passwordConfirmation?: string;
};

const FirtsStep: React.FC<IFirstStep> = ({ nextStep, submitForm }) => {
    const classes = useStyles();
    const { control, handleSubmit, errors, getValues } = useForm<IFormInput>();
    const { checkUserLogin } = useApi();

    const onSubmit = (data: IFormInput) => {
        const { passwordConfirmation, ...formData } = data;
        nextStep();
        submitForm(formData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div
                className={classNames(
                    classes.formItem,
                    { withError: !!errors.firstname || !!errors.surname },
                    'row'
                )}
            >
                <Controller
                    as={TextField}
                    name="firstname"
                    label="Firstname"
                    variant="outlined"
                    size="small"
                    fullWidth
                    control={control}
                    rules={{ required: 'Firstname is required' }}
                    error={!!errors.firstname}
                    helperText={errors.firstname?.message}
                    required
                />
                <Controller
                    as={TextField}
                    name="surname"
                    label="Surname"
                    variant="outlined"
                    size="small"
                    fullWidth
                    control={control}
                    rules={{ required: 'Surname is required' }}
                    error={!!errors.surname}
                    helperText={errors.surname?.message}
                    required
                />
            </div>
            <div className={classNames(classes.formItem, { withError: !!errors.login })}>
                <Controller
                    as={TextField}
                    name="login"
                    label="Login"
                    variant="outlined"
                    size="small"
                    control={control}
                    rules={{
                        required: 'Login is required',
                        validate: (value: string) => {
                            return checkUserLogin(value).then((result) => {
                                return result || 'This login is busy';
                            });
                        },
                    }}
                    error={!!errors.login}
                    helperText={errors.login?.message}
                    required
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
                    rules={{
                        required: 'Password is required',
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/gm,
                            message:
                                'Minimum of 8 characters and must contain at least 1 uppercase and lowercase letters and 1 number', // <p>error message</p>
                        },
                    }}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    required
                    fullWidth
                />
            </div>
            <div
                className={classNames(classes.formItem, {
                    withError: !!errors.passwordConfirmation,
                })}
            >
                <Controller
                    as={TextField}
                    name="passwordConfirmation"
                    type="password"
                    label="Confirm password"
                    variant="outlined"
                    size="small"
                    control={control}
                    rules={{
                        required: 'Field is required',
                        validate: (value: string) => {
                            const values = getValues();
                            return value === values.password || 'Password mismatch';
                        },
                    }}
                    error={!!errors.passwordConfirmation}
                    helperText={errors.passwordConfirmation?.message}
                    required
                    fullWidth
                />
            </div>
            <div className={classNames(classes.formItem)}>
                <Button type={'submit'} variant="contained" color="secondary" fullWidth>
                    Continue
                </Button>
            </div>
        </form>
    );
};

export default FirtsStep;
