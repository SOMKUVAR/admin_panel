import * as Yup from 'yup';
import { REQUIRED_PROGRAM_NAME, SELECT_PROGRAM_TYPE} from '../constants';
const validation_schema = Yup.object({
    program_type_id : Yup.number().min(1,SELECT_PROGRAM_TYPE),
    program_name : Yup.string().required(REQUIRED_PROGRAM_NAME),
    duration:Yup.number().min(1)
})

export default validation_schema;