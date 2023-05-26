import * as Yup from 'yup';
import { SELECT_BRANCH, SELECT_COLLEGE_NAME, SELECT_PROGRAM, SELECT_UNIVERSITY_NAME} from '../constants';

const validation_schema = Yup.object({
    university_id : Yup.number().min(1,SELECT_UNIVERSITY_NAME),
    college_id:Yup.number().min(1,SELECT_COLLEGE_NAME),
    program_id:Yup.number().min(1,SELECT_PROGRAM),
    branch_id:Yup.number().min(1,SELECT_BRANCH)
  })

export default validation_schema;