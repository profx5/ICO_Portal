import * as Yup from "yup";


const EmailValidationSchema = () => {
    return Yup.object().shape({
        old_email: Yup.string(),
        email: Yup.string()
            .required("This field must be filled!")
            .email('You wrote invalid email!')
            .test('match', 'This is your current email!', function(email) {
                return email !== this.parent.old_email;
            })
    });
}


export default EmailValidationSchema;
