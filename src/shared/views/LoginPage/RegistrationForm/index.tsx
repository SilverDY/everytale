import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useApi from 'api';
import { UserContext } from 'contexts/user';
import Button from 'components/Button';
import FirtsStep from './FirstStep';
import SecondStep from './SecondStep';
import useStyles from './styles';

interface IRegistrationForm {
    changeFormMode: () => void;
}

const steps: (typeof FirtsStep | typeof SecondStep)[] = [FirtsStep, SecondStep];

const RegistrationForm: React.FC<IRegistrationForm> = ({ changeFormMode }) => {
    const classes = useStyles();
    const [stepIndex, setStepIndex] = useState<number>(0);
    const [formData, setFormData] = useState<object>({});
    const history = useHistory();

    const { loginUser } = useContext(UserContext);

    const { submitRegistraton } = useApi();

    const createChangeStepHandler = (newIndex: number): (() => void) => () => {
        setStepIndex(newIndex < steps.length ? newIndex : 0);
    };

    const handleSubmitForm = <T extends {}>(payload: T) => {
        const newData = { ...formData, ...payload };

        if (stepIndex === steps.length - 1) {
            submitRegistraton(newData as any).then((data) => {
                loginUser((data as unknown) as { token: string; gender: 'weakTyping' });
                history.push('/');
            });
        }

        setFormData(newData);
    };

    const StepComponent = steps[stepIndex]; // eslint-disable-line security/detect-object-injection

    return (
        <div className={classes.formContainer}>
            <div className={classes.formHeader}>Registration</div>
            <StepComponent
                nextStep={createChangeStepHandler((stepIndex as number) + 1)}
                submitForm={handleSubmitForm}
            />
            <div className={classes.goToButton}>
                <Button onClick={changeFormMode} color="primary" fullWidth>
                    Go back to login
                </Button>
            </div>
        </div>
    );
};

export default RegistrationForm;
