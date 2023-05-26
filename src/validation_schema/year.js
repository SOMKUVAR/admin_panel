import * as Yup from 'yup';
const validation_schema = Yup.object({
    year : Yup.number().min(1),
 })

export default validation_schema;