import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  fetchCollegePrograms,
  fetchColleges,
  fetchCollegeBranch,
  fetchProgramExamType,
  fetchProgramSemester,
  fetchProgramYear,
  fetchStudents
} from "../../../api";
import validation_schema from "../../../validation_schema/student_marks_form";
import { Button} from "../../UI";
import { FormSelect } from "../FormControl";

const StudentMarksForm = (props) => {
  const university_id = JSON.parse(localStorage.getItem("admin")).university_id;
  const initialValues = {
    college_id: 0,
    college_program_id: 0,
    college_branch_id: 0,
    student_id: 0,
  };
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [programOptions, setProgramOptions] = useState([{ name: "Select Program", value: 0 }]);
  const [branchOptions, setBranchOptions] = useState([{ name: "Select Branch", value: 0 }]);
  const [yearOptions, setYearOptions] = useState([ { name: "Select Year", value: 0 }]);
  const [semesterOptions, setSemesterOptions] = useState([{ name: "Select Semester", value: 0 }]);
  const [studentOptions, setStudentOptions] = useState([{ name: "Select Student", value: 0 }]);
  const [examType, setExamType] = useState(0);
  const [error, setError] = useState("");
   useEffect(() => {
    getColleges(university_id);
  }, [university_id]);

  const getColleges = async (university_id) => {
    let newCollegeOptions = await fetchColleges(university_id);
    newCollegeOptions = await newCollegeOptions.map((college) => {
      return { name: college.college_name, value: college.college_id };
    });
    newCollegeOptions = [
      { name: "Select College", value: 0 },
      ...newCollegeOptions,
    ];
    setCollegeOptions(newCollegeOptions);
  };

  const getPrograms = async (college_id) => {
    let data = await fetchCollegePrograms(college_id);
     data = data.map((item) => {
      return { name: item.program_name, value: item.college_program_id };
    });
    data = [{ name: "Select Program", value: 0 }, ...data];
    setProgramOptions(data);
  };

  const getBranches = async (college_program_id) => {
    let data = await fetchCollegeBranch(college_program_id);
    data = data.map((item) => {
      return { name: item.branch_name, value: item.college_branch_id };
    });
    data = [{ name: "Select Branch", value: 0 }, ...data];
    setBranchOptions(data);
  };

  const getCollegeStudents = async (college_branch_id) => {
    let data = await fetchStudents(college_branch_id);
    data = data.map((item) => {
      return { name: item.roll_number, value: item.student_id };
    });
    data = [{ name: "Select Student", value: 0 }, ...data];
    setStudentOptions(data);
  };

  const getSemester = async (program_id) => {
    let data = await fetchProgramSemester(program_id);
    data = data.map((item) => {
      return { name: item.program_semester_id, value: item.semester };
    });
    data = [{ name: "Select Semester", value: 0 }, ...data];
    setSemesterOptions(data);
  };

  const getYear = async (program_id) => {
    let data = await fetchProgramYear(program_id);
    data = data.map((item) => {
      return { name: item.program_year_id, value: item.year };
    });
    data = [{ name: "Select Year", value: 0 }, ...data];
    setYearOptions(data);
  };

  const getYearOrSemester = async (college_program_id) => {
    const data = await fetchProgramExamType(college_program_id);
    const semester = await data[0].semester;
    const program_id = data[0].program_id;
    setExamType(parseInt(semester));
    switch (parseInt(semester)) {
      case 1:
        await getSemester(program_id);
        return;
      case 0:
        await getYear(program_id);
        return;
      default:
        return;
    }
  };


  const handleChange = async (formik, name, value) => {
    switch (name) {
      case "college_id":
        getPrograms(value);
        formik.setFieldValue("college_program_id", 0);
        formik.setFieldValue("college_branch_id", 0);
        formik.setFieldValue("program_semester_id", 0);
        formik.setFieldValue("program_year_id", 0);
        formik.setFieldValue("student_id", 0);
        return;
      case "college_program_id":
        getBranches(value);
        getYearOrSemester(value);
        formik.setFieldValue("college_branch_id", 0);
        formik.setFieldValue("program_semester_id", 0);
        formik.setFieldValue("program_year_id", 0);
        formik.setFieldValue("student_id", 0);
        return;
      case "college_branch_id":
        getCollegeStudents(value);
        formik.setFieldValue("program_semester_id", 0);
        formik.setFieldValue("program_year_id", 0);
        formik.setFieldValue("student_id", 0);
        return;
      case "program_semester_id":
         setError("");
        return;
      case "program_year_id":
        setError("");
        return;
      default:
        return;
    }
  };

  const onSubmit = async (data) => {
     // year validation
     if(examType === 0 && parseInt(data.program_year_id) === 0)
     {
        setError('Please select year');
        return;
     }
     // ṣemester validation
     if(examType === 1 && parseInt(data.program_semester_id) === 0)
     {
        setError('Please select semester');
        return;
     }

     props.onSubmit(data);
  };


  return (
    <div className="p-5 pb-0">
      <Formik initialValues={initialValues} onSubmit={onSubmit} 
      enableReinitialize={true} validationSchema={validation_schema}>
        {(formik) => {
          return (
            <Form onChange={(event) =>handleChange(formik, event.target.name, event.target.value)}>
              <div className="grid grid-cols-3 gap-5">
                <FormSelect name="college_id" options={collegeOptions} />
                <FormSelect name="college_program_id" options={programOptions}/>
                <FormSelect name="college_branch_id" options={branchOptions} />
                <FormSelect name="student_id" options={studentOptions} />
                {examType === 1 && (<FormSelect err={error} name="program_semester_id" options={semesterOptions}/>)}
                {examType === 0 && (<FormSelect err={error} name="program_year_id" options={yearOptions}/>)}
                 <div >
                <Button style={{'padding':'7px 30px'}} type="submit">Get Marksheet</Button>
                </div>

              </div>
             
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default StudentMarksForm;
