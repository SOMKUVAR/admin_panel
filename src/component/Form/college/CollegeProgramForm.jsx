import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "../../UI";
import validation_schema from "../../../validation_schema/college_program";
import { FormSelect } from "../FormControl";
import { fetchColleges, fetchPrograms, fetchUniversityName } from "../../../api";

const CollegeProgramForm = (props) => {
  const {initialValues,onSubmit} = props;
  const [universityOptions, setUniversityOptions] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState([{name:"Select College",value:0}]);
  const [programOptions, setProgramOptions] = useState([]);

  useEffect(() => {
    if(initialValues.university_id)
        getColleges(initialValues.university_id);
    getUniversityName();
    getPrograms();
  }, [initialValues.university_id]);

  const getUniversityName = async () => {
    let data = await fetchUniversityName();
    data = data.map((item) => {
      return { name: item.university_name, value: item.university_id };
    });
    data = [{ name: "Select University", value: 0 }, ...data];
    setUniversityOptions(data);
  };

  const getPrograms = async() => {
    let data = await fetchPrograms();
    data = data.map(item => {return {name:item.program_name,value:item.program_id}});
    data = [{ name: "Select Program", value: 0 }, ...data];
    setProgramOptions(data);
  }
  
  const getColleges = async(university_id) => {
    let data = await fetchColleges(university_id);
    data = data.map(item => {return {name:item.college_name,value:item.college_id}});
    data = [{ name: "Select College", value: 0 }, ...data];
    setCollegeOptions(data);
  }

  const handleChange = (name,value) =>{
     if(name !== 'university_id') return;
     getColleges(value);
  }
  return (
    <div className="p-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validation_schema}
        onSubmit={onSubmit}
      >
        <Form onChange = {event => handleChange(event.target.name,event.target.value)}>
          <FormSelect label="University Name" name="university_id" options={universityOptions} />
          <FormSelect label="College Name" name="college_id" options={collegeOptions} />
          <FormSelect label="Program" name="program_id" options={programOptions} />
          <div className="flex justify-center">
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CollegeProgramForm;
