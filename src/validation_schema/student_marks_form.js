import * as Yup from 'yup';
import { SELECT_BRANCH, SELECT_COLLEGE_NAME, SELECT_PROGRAM, SELECT_STUDENT} from '../constants';

const validation_schema = Yup.object({
    college_id:Yup.number().min(1,SELECT_COLLEGE_NAME),
    college_program_id:Yup.number().min(1,SELECT_PROGRAM),
    subject_subtype_id:Yup.number().min(1,SELECT_BRANCH),
    college_branch_id:Yup.number().min(1,SELECT_BRANCH),
    student_id:Yup.number().min(1,SELECT_STUDENT)
})

export default validation_schema;