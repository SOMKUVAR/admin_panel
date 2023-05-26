import { Form, Formik } from 'formik';
import React from 'react'
import validation_schema from '../../../validation_schema/year';
import { FormInput } from '../FormControl';
import { Button } from '../../UI';

const yearForm = (props) => {
    const {initialValues,onSubmit} = props;
    return (
      <div className="p-5">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validation_schema}
        >
          <Form>
            <FormInput label='Year' name='year' type="number"/>
             <div className="flex justify-center">
              <Button type="submit">Save</Button>
            </div>
          </Form>
        </Formik>
      </div>
    );
}

export default yearForm