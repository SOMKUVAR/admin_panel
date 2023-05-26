import React, { useEffect, useState } from 'react'
import {Form, Formik } from "formik";
import {FormInput, FormSelect} from "../FormControl";
import { Button } from '../../UI';
import {fetchProgramType } from '../../../api';
import validation_schema from '../../../validation_schema/program';

const ProgramForm = (props) => {
    const {initialValues,onSubmit} = props;
    const[programTypeOptions,setProgramTypeOptions] = useState([]);
    const examSystemOptions = [{name:"Semester",value:1},{name:"Year",value:0}];
    
    useEffect(()=>{
        getPrograms();
    },[])
    const getPrograms = async() => {
         let data = await fetchProgramType();
         data = data.map(item => {return {name:item.program_type,value:item.program_type_id}})
         data = [{name:'Select program type',value:0},...data];
         setProgramTypeOptions(data);
    }
  return (
    <div className="p-5">
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validation_schema}
    >
      <Form>
        <FormSelect options={programTypeOptions} label='Program Type' name='program_type_id'/>
        <FormInput label="Program Name" name="program_name"  />
        <FormInput label="Program Duration" name="duration" type="number"/>
        <FormSelect label="Exam System" name="semester" options={examSystemOptions}/>
         <div className="flex justify-center">
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </Formik>
  </div>
  )
}

export default ProgramForm