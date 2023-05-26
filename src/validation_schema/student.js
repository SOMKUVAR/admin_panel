import * as Yup from 'yup';
import { REQUIRED_EMAIL, REQUIRED_FATHER_NAME, REQUIRED_PASSWORD, REQUIRED_ROLL_NUMBER, REQUIRED_STUDENT_NAME, 
SELECT_BRANCH, SELECT_COLLEGE_NAME, SELECT_PROGRAM, VALID_EMAIL, VALID_PASSWORD} from '../constants';
import { PASSWORD_VALIDATION_REGEX } from '../constants/regex';

const validation_schema = Yup.object({
    college_id:Yup.number().min(1,SELECT_COLLEGE_NAME),
    program_id:Yup.number().min(1,SELECT_PROGRAM),
    branch_id:Yup.number().min(1,SELECT_BRANCH),
    student_name:Yup.string().required(REQUIRED_STUDENT_NAME),
    roll_number:Yup.string().required(REQUIRED_ROLL_NUMBER),
    father_name:Yup.string().required(REQUIRED_FATHER_NAME),
    email: Yup.string().email(VALID_EMAIL).required(REQUIRED_EMAIL),
    password: Yup.string().matches(PASSWORD_VALIDATION_REGEX,VALID_PASSWORD).required(REQUIRED_PASSWORD),
})

export default validation_schema;