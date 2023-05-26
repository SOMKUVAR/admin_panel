import {Form, Formik } from "formik";
import validation_Schema from "../../validation_schema/university_validation_schema";
import Button from "../UI/Button";
import {FormInput,FormTextArea} from "./FormControl";


const UniversityForm = (props) => {
  const {intialValues } = props;
  const onSubmit = (event) => {
    props.onSubmit(event);
  };
  return (
    <div className="p-5">
      <Formik
        initialValues={intialValues}
        onSubmit={onSubmit}
        validationSchema={validation_Schema}
      >
        <Form>
          <FormInput label='Name ' name='university_name'/>
          <FormInput label='Registration Number ' name='registration_number'/>
          <FormInput label='Email Id ' name='email'/>
          <FormInput label='Contact Number ' name='contact_number'/>
          <FormTextArea label='Address' name='address'/>
          <FormInput label="Password" name='password' type='password'/>
          <div className="flex justify-center">
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UniversityForm;
