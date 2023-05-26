import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import {fetchCollegePrograms,fetchColleges, fetchCollegeBranch, fetchProgramExamType, fetchProgramSemester, fetchProgramYear, fetchStatus, fetchSubjectType} from "../../../api";
import validation_schema from "../../../validation_schema/subject";
import { Button } from "../../UI";
import { FormInput, FormSelect } from "../FormControl";

const SubjectForm = (props) => {
    const {initialValues} = props;
    const university_id = JSON.parse(localStorage.getItem("admin")).university_id;
    const [collegeOptions, setCollegeOptions] = useState([]);
    const [programOptions, setProgramOptions] = useState([{ name: "Select Program", value: 0 },]);
    const [branchOptions, setBranchOptions] = useState([{ name: "Select Branch", value: 0 },]);
    const [yearOptions,setYearOptions] = useState([{name:"Select Year",value:0}]);
    const [semesterOptions,setSemesterOptions] = useState([{name:"Select Semester",value:0}]);
    const [subjectTypeOptions,setSubjectTypeOptions] = useState([{name:"Select Subject Type",value:0}])
    const [statusOptions,setStatusOptions] = useState([]);
    const [examType,setExamType] = useState(0);
    const [error,setError] = useState("");
 
    useEffect(() => {
        getColleges(university_id);
        getStatus();
        getSubjectType();
        if(initialValues.college_id > 0)
          getPrograms(initialValues.college_id);
        if(initialValues.college_program_id)
          getBranches(initialValues.college_program_id);
        if(initialValues.program_semester_id > 0)
        {
            setExamType(1);
            getSemester(initialValues.college_program_id);
        }
        if(initialValues.program_year_id > 0)
        {
            setExamType(0);
            getSemester(initialValues.program_year_id);
        }
    }, [university_id,initialValues]);

    const getSubjectType = async() => {
        let data = await fetchSubjectType();
        data = data.map(item => {
            if(item.subject_subtype === 0)
             return {name : item.subject_type,value:item.subject_subtype_id};
            return {name : item.subject_type+"-"+item.subject_subtype,value:item.subject_subtype_id};
        })
        data = [{name:"Select Subject Type",value:0},...data];
        setSubjectTypeOptions(data);
    }

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

    const getStatus = async() => {
        let data = await fetchStatus();
        data = data.map((item) => {
          return { name: item.status === 0 ? 'Inactive':'Active', value: item.status_id };
        });
        setStatusOptions(data);
    }

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
        data = data.map((item) => {return { name: item.branch_name, value: item.college_branch_id }});
        data = [{ name: "Select Branch", value: 0 }, ...data];
        setBranchOptions(data);
    };

    const getSemester = async(college_program_id) => {
        let data = await fetchProgramSemester(college_program_id);
        data = data.map((item) => {return { name: item.program_semester_id, value: item.semester };});
        data = [{ name: "Select Semester", value: 0 }, ...data];
        setSemesterOptions(data);
    }

    const getYear = async(college_program_id) => {
        let data = await fetchProgramYear(college_program_id);
        data = data.map((item) => {return { name: item.program_year_id, value: item.year };});
        data = [{ name: "Select Year", value: 0 }, ...data];
        setYearOptions(data);
    }

    const getYearOrSemester = async(college_program_id) => {
        const data = await fetchProgramExamType(college_program_id);
        const semester = await data[0].semester;
        setExamType(parseInt(semester));
        switch(parseInt(semester)){
            case 1:
                await getSemester(college_program_id);
                return;
            case 0:
                 await getYear(college_program_id);
                 return;
            default:
                return;
        }
    }

    const handleChange = async (setFieldValue, name, value) => {
         switch (name) {
            case "college_id":
                getPrograms(value);
                setFieldValue("college_program_id", 0);
                setFieldValue("college_branch_id", 0);
                setFieldValue("program_semester_id",0);
                setFieldValue("program_year_id",0);
                return;
            case "college_program_id":
                getBranches(value);
                getYearOrSemester(value);
                setFieldValue("college_branch_id", 0);
                setFieldValue("program_semester_id",0);
                setFieldValue("program_year_id",0);
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

    const onSubmit = (data) => {
        if(parseInt(examType) === 1 && parseInt(data.program_semester_id) === 0){
            setError('Please select semester');
            return;
        }
        if(parseInt(examType) === 0 && parseInt(data.program_year_id) === 0){
            setError('Please select year');
            return;
        }
        props.onSubmit(data)
    }
    
    return (
        <div className="p-5">
            <Formik initialValues={initialValues} validationSchema={validation_schema} enableReinitialize={true} onSubmit={onSubmit}>
                {(formik) => {
                    return (
                        <Form onChange={(event) => handleChange(formik.setFieldValue,event.target.name,event.target.value)}>
                            <FormSelect options={collegeOptions} label="College Name" name="college_id"/>
                            <FormSelect options={programOptions} label="Program" name="college_program_id"/>
                            <FormSelect options={branchOptions} label="Branch" name="college_branch_id"/>
                            {examType === 1 && <FormSelect err={error} name="program_semester_id" label="Semester" options={semesterOptions} />}
                            {examType === 0 && <FormSelect err={error} name="program_year_id" label="Year" options={yearOptions} />}
                            <FormSelect options={subjectTypeOptions} label="Subject Type" name="subject_subtype_id"/>
                            <FormInput name="subject_code" label="Subject Code"/>
                            <FormInput name="subject_name" label="Subject Name"/>
                            <FormInput name="theory_marks" label = "Theory Marks" type="number"/>
                            <FormInput name="theory_passing_marks" label="Theory Passing Marks" type="number"/>
                            <FormInput name="practical_marks" label = "Practical Marks" type="number"/>
                            <FormInput name="practical_passing_marks" label = "Practical Passing Marks" type="number"/>
                            <FormSelect options={statusOptions} label="Status" name="status_id"/>
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

export default SubjectForm;
