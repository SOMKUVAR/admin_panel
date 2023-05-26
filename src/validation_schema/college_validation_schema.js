import * as Yup from 'yup';
import { REQUIRED_ADDRESS, REQUIRED_COLLEGE_NAME, REQUIRED_CONTACT_NUMBER, REQUIRED_EMAIL, REQUIRED_REGISTRATION_NUMBER, SELECT_UNIVERSITY_NAME, VALID_CONTACT_NUMBER, VALID_EMAIL } from '../constants';
import { NUMBER_VALIDATION_REGEX } from '../constants/regex';
const validation_schema = Yup.object({
    university_id : Yup.number().min(1,SELECT_UNIVERSITY_NAME),
    college_name : Yup.string().required(REQUIRED_COLLEGE_NAME),
    email: Yup.string().email(VALID_EMAIL).required(REQUIRED_EMAIL),
    registration_number: Yup.string().required(REQUIRED_REGISTRATION_NUMBER),
    contact_number: Yup.string().matches(NUMBER_VALIDATION_REGEX, VALID_CONTACT_NUMBER).required(REQUIRED_CONTACT_NUMBER),
    address : Yup.string().required(REQUIRED_ADDRESS)
})

export default validation_schema;