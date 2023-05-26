import { ErrorMessage, Field } from 'formik';
import {TextArea,Label} from '../FormElement';

const FormTextArea = (props) => {
  const {label,name}  = props;
  return (
    <div className="grid grid-cols-12 items-center gap-2 mb-4">
    <div className="col-span-4">
      <Label>{label} :</Label>
    </div>
    <div className="col-span-8">
      <Field as={TextArea} name={name} />
      <ErrorMessage name={name} render={msg => <div className='text-red-500 text-sm'>{msg}</div>}/>
    </div>
  </div>
  )
}

export default FormTextArea;
