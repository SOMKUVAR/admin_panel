import * as Yup from 'yup';
import { SELECT_BRANCH, SELECT_COLLEGE_NAME, SELECT_PROGRAM} from '../constants';

const validation_schema = Yup.object({
    college_id:Yup.number().min(1,SELECT_COLLEGE_NAME),
    college_program_id:Yup.number().min(1,SELECT_PROGRAM),
    subject_subtype_id:Yup.number().min(1,SELECT_BRANCH),
    college_branch_id:Yup.number().min(1,SELECT_BRANCH),
    subject_name:Yup.string().required(),
    subject_code:Yup.string().required(),
    theory_marks:Yup.number().required(),
    practical_marks:Yup.number().required()
})

export default validation_schema;