import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import classNames from 'classnames';
import fetch from 'cross-fetch';
import Button from 'components/Button';
import TextField from 'components/TextField';
import RadioGroup from 'components/RadioGroup';
import Radio from 'components/Radio';
import Checkbox from 'components/Checkbox';
import FormControlLabel from 'components/FormControlLabel';
import CircularProgress from 'components/CircularProgress';
import Autocomplete from 'components/Autocomplete';
import useStyles from './styles';

interface ISecondStep {
    nextStep: () => void;
    submitForm: (payload: IFormInput) => void;
}

type IFormInput = {
    gender: string;
    country: string;
    sendSms?: boolean;
};

interface CountryType {
    name: string;
}

const SecondStep: React.FC<ISecondStep> = ({ nextStep, submitForm }) => {
    const classes = useStyles();
    const [countries, setCountries] = React.useState<CountryType[]>([]);
    const { control, handleSubmit, errors } = useForm<IFormInput>({
        defaultValues: { gender: 'weakTyping', sendSms: false },
    });

    const loading = countries.length === 0;

    React.useEffect(() => {
        if (!loading) {
            return undefined;
        }

        fetch('https://country.register.gov.uk/records.json?page-size=5000').then((response) => {
            response.json().then((data) => {
                setCountries(
                    // eslint-disable-next-line security/detect-object-injection
                    Object.keys(data).map((key) => data[key].item[0]) as CountryType[]
                );
            });
        });
    }, [loading]);

    const onSubmit = (data: IFormInput) => {
        const { sendSms, ...formData } = data; // just extract sendSMS from data
        nextStep();
        submitForm(formData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={classNames(classes.formItem, { withError: !!errors.country })}>
                <Controller
                    name="country"
                    control={control}
                    rules={{ required: 'Country is required' }}
                    render={(props: { onChange: (data: any) => void }) => (
                        <Autocomplete
                            {...props}
                            options={countries}
                            getOptionLabel={(option: any) => (option as CountryType).name}
                            size="small"
                            loading={loading}
                            renderInput={(
                                params:
                                    | (JSX.IntrinsicAttributes &
                                          import('@material-ui/core').StandardTextFieldProps)
                                    | (JSX.IntrinsicAttributes &
                                          import('@material-ui/core').FilledTextFieldProps)
                                    | (JSX.IntrinsicAttributes &
                                          import('@material-ui/core').OutlinedTextFieldProps)
                            ) => (
                                <TextField
                                    {...params}
                                    label="Select your country"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loading ? (
                                                    <CircularProgress color="inherit" size={20} />
                                                ) : null}
                                                {params?.InputProps?.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                    required
                                    error={!!errors.country}
                                    helperText={errors.country?.message}
                                />
                            )}
                            onChange={(_, data) => props.onChange(data)}
                        />
                    )}
                />
            </div>
            <div
                className={classNames(classes.formItem, {
                    withError: !!errors.gender,
                })}
            >
                <Controller
                    as={
                        <RadioGroup aria-label="gender" className={classes.flexRow}>
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel
                                value="weakTyping"
                                control={<Radio />}
                                label="Weak typing"
                            />
                        </RadioGroup>
                    }
                    control={control}
                    name="gender"
                />
            </div>
            <div
                className={classNames(classes.formItem, {
                    withError: !!errors.sendSms,
                })}
            >
                <Controller
                    name="sendSms"
                    control={control}
                    render={(params: { value: boolean; onChange: (checked: boolean) => void }) => {
                        return (
                            <FormControlLabel
                                checked={params.value || false}
                                onChange={(_e: React.ChangeEvent<object>, checked: boolean) =>
                                    params.onChange(checked)
                                }
                                control={<Checkbox />}
                                label="Send SMS"
                            />
                        );
                    }}
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

export default SecondStep;
