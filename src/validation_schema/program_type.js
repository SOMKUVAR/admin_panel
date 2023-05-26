import * as Yup from 'yup';
import { REQUIRED_PROGRAM_TYPE } from '../constants';

const validation_schema = Yup.object({
    program_type : Yup.string().required(REQUIRED_PROGRAM_TYPE)
})

export default validation_schema;