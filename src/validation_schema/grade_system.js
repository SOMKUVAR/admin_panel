import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
    minPercentage: Yup.number().min(0).required('This field is required.'),
    maxPercentage: Yup.number().min(0).required('This field is required.'),
    grade:Yup.string().required("This is required"),
    description:Yup.string().required("This is required")
});

export default validationSchema;
