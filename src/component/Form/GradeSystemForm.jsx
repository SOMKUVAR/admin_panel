import { Form, Formik } from 'formik'
import React from 'react'
import validationSchema from '../../validation_schema/grade_system'
import { Button } from '../UI'
import { FormInput } from './FormControl'

const GradeSystemForm = (props) => {
  return (
    <div>
       <Formik initialValues={props.initialValues} onSubmit={props.onSubmit}
                  validationSchema={validationSchema}>
            <Form>
                <FormInput label="Min Percentage" type="number" name="minPercentage"></FormInput>
                <FormInput label="Max Percentage" type="number" name="maxPercentage"></FormInput>
                <FormInput label="Grade" name="grade"/>
                <FormInput label="Description" name="description"/>
                <div className="flex justify-center">
                    <Button type="submit">Save</Button>
                </div>
            </Form>
       </Formik>
    </div>
  )
}

export default GradeSystemForm