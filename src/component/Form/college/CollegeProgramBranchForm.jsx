import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "../../UI";
import validation_schema from "../../../validation_schema/college_program_branch";
import { FormSelect } from "../FormControl";
import {
  fetchBranches,
  fetchCollegePrograms,
  fetchColleges,
  fetchUniversityName,
} from "../../../api";

const CollegeProgramBranchForm = (props) => {
  const { initialValues, onSubmit } = props;
  const [universityOptions, setUniversityOptions] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState([
    { name: "Select College", value: 0 },
  ]);
  const [programOptions, setProgramOptions] = useState([
    { name: "Select Program", value: 0 },
  ]);
  const [branchOptions, setBranchOptions] = useState([
    { name: "Select Branch", value: 0 },
  ]);

  useEffect(() => {
    getUniversityName();
    if (initialValues.university_id > 0)
      getColleges(initialValues.university_id);
    if (initialValues.college_id > 0) getPrograms(initialValues.college_id);
    if (initialValues.program_id > 0) getBranches(initialValues.program_id);
  }, [
    initialValues.university_id,
    initialValues.college_id,
    initialValues.program_id,
  ]);

  const getUniversityName = async () => {
    let data = await fetchUniversityName();
    data = data.map((item) => {
      return { name: item.university_name, value: item.university_id };
    });
    data = [{ name: "Select University", value: 0 }, ...data];
    setUniversityOptions(data);
  };

  const getColleges = async (university_id) => {
    let data = await fetchColleges(university_id);
    data = data.map((item) => {
      return { name: item.college_name, value: item.college_id };
    });
    data = [{ name: "Select College", value: 0 }, ...data];
    setCollegeOptions(data);
  };

  const getPrograms = async (college_id) => {
    let data = await fetchCollegePrograms(college_id);
    data = data.map((item) => {
      return { name: item.program_name, value: item.program_id };
    });
    data = [{ name: "Select Program", value: 0 }, ...data];
    setProgramOptions(data);
  };

  const getBranches = async (program_id) => {
    let data = await fetchBranches();
    data = data.filter(item => parseInt(item.program_id) === parseInt(program_id));
    data = data.map((item) => {
      return { name: item.branch_name, value: item.branch_id };
    });
    data = [{ name: "Select Branch", value: 0 }, ...data];
    setBranchOptions(data);
  };

  const handleChange = (setFieldValue,name, value) => {
    switch(name){
      case "university_id":
        getColleges(value);
        setFieldValue('college_id',0);
        setFieldValue('program_id',0);
        setFieldValue('branch_id',0);
        setProgramOptions([{ name: "Select Program", value: 0 }]);
        setBranchOptions([{ name: "Select Branch", value: 0 }]);
        return;  
      case "program_id":
        getBranches(value);
        setFieldValue('branch_id',0);
        setBranchOptions([{ name: "Select Branch", value: 0 }]);
        return;
      case "college_id":
        getPrograms(value);
        setBranchOptions([{ name: "Select Branch", value: 0 }]);
        setFieldValue('program_id',0);
        setFieldValue('branch_id',0);
        return;
      default:
         getUniversityName();
         return;
    }

  };
  return (
    <div className="p-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validation_schema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form
              onChange={(event) =>
                handleChange(formik.setFieldValue,event.target.name, event.target.value)
              }
            >
              <FormSelect
                label="University Name"
                name="university_id"
                options={universityOptions}
              />
              <FormSelect
                label="College Name"
                name="college_id"
                options={collegeOptions}
              />
              <FormSelect
                label="Program"
                name="program_id"
                options={programOptions}
              />
              <FormSelect
                label="Branch"
                name="branch_id"
                options={branchOptions}
              />
              <div className="flex justify-center">
                <Button type="submit">Save</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CollegeProgramBranchForm;
