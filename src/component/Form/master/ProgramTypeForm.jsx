import {Form, Formik } from "formik";
import Button from "../../UI/Button";
import {FormInput} from "../FormControl";
import validation_schema from "../../../validation_schema/program_type";


const ProgramTypeForm = (props) => {
   const {initialValues,onSubmit} = props;
  return (
    <div className="p-5">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validation_schema}
      >
        <Form>
          <FormInput label='Program Type' name='program_type'/>
           <div className="flex justify-center">
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ProgramTypeForm;
