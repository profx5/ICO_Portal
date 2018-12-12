import * as Yup from "yup";


const VerificationValidation = ({type}) => type === 'Natural' ? Yup.object().shape({

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
}) : Yup.object().shape({

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
});

export default VerificationValidation;
