import * as Yup from "yup";


const getValidationSchema = (schemaName) => {

    const schemaOpts = {
        investInput: Yup.string().required('This field must be filled!'),
        newTicket: {
            title: Yup.string().required("This field must be filled!").max(60, 'Length of the subject can\'t exceed 60 characters!'),
            description: Yup.string().required("This field must be filled!").max(1000, 'Length of the message can\'t exceed 1000 characters!')
        },
        newComment: {
            comment: Yup.string().required("This field must be filled!").max(1000, 'Length of the message can\'t exceed 1000 characters!'),
        },
        password: {
            old_password: Yup.mixed()
                .required("This field must be filled!"),
            new_password1: Yup.mixed()
                .required("This field must be filled!"),
            new_password2: Yup.mixed()
                .required("This field must be filled!")
                .test('match', 'The passwords do not match!', function(confirmEmail) {
                    return confirmEmail === this.parent.new_password1;
                })
        },
        email: {
            old_email: Yup.string(),
            email: Yup.string()
                .required("This field must be filled!")
                .email('You wrote invalid email!')
                .test('match', 'This is your current email!', function(email) {
                    return email !== this.parent.old_email;
                })
        },
        kycNatural: {
            firstname: Yup.string().nullable().required(`This field must be filled!`),
            middlename: Yup.string(),
            lastname: Yup.string().nullable().required(`This field must be filled!`),
            place_of_birth: Yup.string().nullable().required(`This field must be filled!`),
            birthdate: Yup.string().nullable().required(`This field must be filled!`).min(10, 'Please, write full date!'),
            personal_id: Yup.string().nullable().required(`This field must be filled!`),
            phone_number: Yup.string().nullable().required(`This field must be filled!`),
            email: Yup.string().nullable().required(`This field must be filled!`).email('This email is invalid!'),
            place_of_residence: Yup.string().nullable().required(`This field must be filled!`),
            profession: Yup.string().nullable().required(`This field must be filled!`),
            confirmInvestor: Yup.boolean().oneOf([true],`You must confirm the statement!`),
            confirm: Yup.boolean().oneOf([true],`You must confirm the statement!`),
        },
        kycLegal: {
            business_name: Yup.string().nullable().required(`This field must be filled!`),
            registration_number: Yup.string().nullable().required(`This field must be filled!`),
            registration_date: Yup.string().nullable().required(`This field must be filled!`).min(10, 'Please, write full date!'),
            phone_number: Yup.string().nullable().required(`This field must be filled!`),
            address: Yup.string().nullable().required(`This field must be filled!`),
            field_of_activity: Yup.string().nullable().required(`This field must be filled!`),
            director_firstname: Yup.string().nullable().required(`This field must be filled!`),
            director_lastname: Yup.string().nullable().required(`This field must be filled!`),
            email: Yup.string().nullable().required(`This field must be filled!`).email('This email is invalid!'),
            
            beneficial_fullname: Yup.string().nullable().required(`This field must be filled!`),
            beneficial_personal_id: Yup.string().nullable().required(`This field must be filled!`),
            beneficial_place_of_birth: Yup.string().nullable().required(`This field must be filled!`),
            beneficial_birthdate: Yup.string().nullable().required(`This field must be filled!`).min(10, 'Please, write full date!'),
            beneficial_place_of_residence: Yup.string().nullable().required(`This field must be filled!`),
        
            confirm: Yup.boolean().oneOf([true],`You must confirm the statement!`)
        },
    }

    if (!schemaOpts[schemaName]) throw new Error(`${schemaName} validation schema doesn't exist!`);
    return Yup.object().shape(schemaOpts[schemaName]);
}

export default getValidationSchema;
