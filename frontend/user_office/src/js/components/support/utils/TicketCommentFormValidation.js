import * as Yup from "yup";


const ValidationSchema = Yup.object().shape({
    comment: Yup.string()
    .required("This field must be filled!")
});


export default ValidationSchema;
