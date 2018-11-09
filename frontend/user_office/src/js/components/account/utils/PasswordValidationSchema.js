import * as Yup from "yup";


const PasswordValidationSchema = Yup.object().shape({
    old_password: Yup.mixed()
        .required("This field must be filled!"),
    new_password1: Yup.mixed()
        .required("This field must be filled!"),
    new_password2: Yup.mixed()
        .required("This field must be filled!")
        .test('match', 'The passwords do not match!', function(confirmEmail) {
            return confirmEmail === this.parent.new_password1;
        })
});


export default PasswordValidationSchema;
