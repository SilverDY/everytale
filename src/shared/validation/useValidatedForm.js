import useForm from 'react-hook-form';

export const useValidatedForm = ({ ...props }) => {
    const result = useForm({
        mode: 'onBlur',
        ...props,
    });

    const focusFirstError = () => {
        const { errors } = result;
        const firstError = errors[Object.keys(errors)[0]];

        if (firstError) {
            firstError.ref.focus();
        }
    };

    return {
        ...result,
        focusFirstError,
    };
};

export default useValidatedForm;
