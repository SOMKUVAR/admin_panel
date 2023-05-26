import {Form, Formik } from "formik";
import Button from "../../UI/Button";
import {FormInput, FormSelect} from "../FormControl";
import validation_schema from "../../../validation_schema/branch";
import { useEffect, useState } from "react";
import { fetchPrograms } from "../../../api";


const BranchForm = (props) => {
   const {initialValues,onSubmit} = props;
   const[programOptions,setProgramOptions] = useState([]);

   useEffect(()=>{
     getPrograms();
   },[]);
   const getPrograms = async() => {
       let data = await fetchPrograms();
       data = data.map(item => {
        return {name:item.program_name,value:item.program_id}
       });
       data = [{name:"Select Program",value:0},...data];
       setProgramOptions(data);
   }

  return (
    <div className="p-5">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validation_schema}
      >
        <Form>
          <FormSelect label="Program" name="program_id" options={programOptions}/>
          <FormInput label='Branch' name='branch_name'/>
           <div className="flex justify-center">
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BranchForm;
