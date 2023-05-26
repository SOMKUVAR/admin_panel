import * as Yup from "yup";
import { REQUIRED_ADDRESS, REQUIRED_CONTACT_NUMBER, REQUIRED_EMAIL, REQUIRED_PASSWORD, REQUIRED_REGISTRATION_NUMBER, REQUIRED_UNIVERSITY_NAME, VALID_CONTACT_NUMBER, VALID_EMAIL, VALID_PASSWORD } from "../constants";
import {NUMBER_VALIDATION_REGEX,PASSWORD_VALIDATION_REGEX} from "../constants/regex";

const validation_Schema = Yup.object({
    university_name: Yup.string().required(REQUIRED_UNIVERSITY_NAME),
    email: Yup.string().email(VALID_EMAIL).required(REQUIRED_EMAIL),
    registration_number: Yup.string().required(REQUIRED_REGISTRATION_NUMBER),
    contact_number: Yup.string().matches(NUMBER_VALIDATION_REGEX, VALID_CONTACT_NUMBER).required(REQUIRED_CONTACT_NUMBER),
    password: Yup.string().matches(PASSWORD_VALIDATION_REGEX,VALID_PASSWORD).required(REQUIRED_PASSWORD),
    address : Yup.string().required(REQUIRED_ADDRESS)
  });

  export default validation_Schema;