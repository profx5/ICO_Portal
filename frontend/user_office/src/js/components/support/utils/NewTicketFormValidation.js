import * as Yup from "yup";


const ValidationSchema = Yup.object().shape({
    title: Yup.string()
    .required("This field must be filled!"),
    description: Yup.string()
    .required("This field must be filled!"),
});


export default ValidationSchema;
