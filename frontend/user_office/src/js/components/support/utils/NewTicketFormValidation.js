import * as Yup from "yup";


const ValidationSchema = Yup.object().shape({
    title: Yup.string()
        .required("This field must be filled!")
        .max(60, 'Length of the subject can\'t exceed 60 characters!'),
    description: Yup.string()
        .required("This field must be filled!")
        .max(1000, 'Length of the message can\'t exceed 1000 characters!'),
});


export default ValidationSchema;
