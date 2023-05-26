import { Formik,Form } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button } from '../../UI';
import { FormInput } from '../FormControl';

const MarksheetForm = (props) => {
  const [initialValues,setIntialValues] = useState({});
  const {subjects} = props;

  useEffect(()=>{
    const newIntialValues = initialValues;
    subjects.map(subject => {
      if(subject.theory_marks > 0) 
       {
        const key = subject.subject_id+"-T";
        newIntialValues[`${key}`] = 0;
       }
       if(subject.practical_marks > 0) 
       {
        const key = subject.subject_id+"-P";
        newIntialValues[`${key}`] = 0;
       }
       return null;
     } )
     setIntialValues(newIntialValues);
  },[subjects,initialValues])

 

            
 
  const onSubmit = (data)=>{
       const ans =   subjects.map(subject => {
            const theory_marks = data[`${subject.subject_id}-T`] || 0;
            const practical_marks = data[`${subject.subject_id}-P`] || 0;
            let obj = {subject_id:subject.subject_id,theory_marks,practical_marks}
            return obj;
        })
       props.onSubmit(ans);
  }
  return (
    <div>
      <Formik onSubmit={onSubmit} initialValues={initialValues}
      enableReinitialize={true}>
        <Form>
          <table>
           <thead className='font-semibold mb-4'>
            <td className='px-3'>Subjects</td>
            <td className='px-3'>Marks</td>
            <td>Total Marks</td>
           </thead>
          {
              subjects.map(subject => { 
                 if(subject.theory_marks > 0)
                 return <tr key={subject.subject_id+"-T"}>
                   <td className='px-3'>{subject.subject_name} [T]</td>
                   <td className='px-3'> <FormInput type='number' max={subject.theory_marks}  
                   name={`${subject.subject_id}-T`}/></td>
                   <td className='px-3 pb-4'>{subject.theory_marks}</td>
                  </tr>

                 return null;
              
            })
          }

            {
              subjects.map(subject => { 
                 if(subject.practical_marks > 0)
                 return <tr key={subject.subject_id+"-P"}>
                   <td className='px-3'>{subject.subject_name} [P]</td>
                   <td className='px-3'> <FormInput type='number' max={subject.practical_marks}  
                       name={`${subject.subject_id}-P`}/></td>
                   <td className='px-3  pb-4'>{subject.practical_marks}</td>
                  </tr>
                 return null;
            })
          }

          </table>
          <Button type="submit">Save Marksheet</Button>
        </Form>
      </Formik>
    </div>
  )
}

export default MarksheetForm