import * as Yup from "yup";


export default function getValidationSchema (name) {
    return Yup.object().shape({
        [name]: Yup.string().required('This field must be filled!')
    })
};
