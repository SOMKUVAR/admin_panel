import * as Yup from 'yup';
import { REQUIRED_BRANCH_NAME, SELECT_PROGRAM} from '../constants';
const validation_schema = Yup.object({
    program_id : Yup.number().min(1,SELECT_PROGRAM),
    branch_name : Yup.string().required(REQUIRED_BRANCH_NAME)
})

export default validation_schema;