import * as yup from 'yup';

export const patientSchema = yup.object().shape({
    name: yup.string().required(),
    nic: yup.string().max(10).required()
})