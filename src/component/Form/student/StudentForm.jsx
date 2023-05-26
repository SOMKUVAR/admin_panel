import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import {fetchCollegePrograms,fetchColleges, fetchCollegeBranch, fetchStatus} from "../../../api";
import validation_schema from "../../../validation_schema/student";
import { Button } from "../../UI";
import { FormInput, FormSelect } from "../FormControl";

const StudentForm = (props) => {
    const {initialValues} = props;
    const university_id = JSON.parse(localStorage.getItem("admin")).university_id;
    const [collegeOptions, setCollegeOptions] = useState([]);
    const [programOptions, setProgramOptions] = useState([{ name: "Select Program", value: 0 },]);
    const [branchOptions, setBranchOptions] = useState([{ name: "Select Branch", value: 0 },]);
    const [statusOptions,setStatusOptions] = useState([]);
    
    useEffect(() => {
        console.log(initialValues);
        getColleges(university_id);
        getStatus();
        if(initialValues.college_id)
          getPrograms(initialValues.college_id);
        if(initialValues.college_program_id)
          getBranches(initialValues.college_program_id);
    }, [university_id,initialValues.college_id,initialValues.college_program_id]);

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
          return { name: item.status === 0 ? 'Non Regular':'Regular', value: item.status_id };
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


    const handleChange = async (setFieldValue, name, value) => {
         switch (name) {
            case "college_id":
                getPrograms(value);
                setFieldValue("college_program_id", 0);
                setFieldValue("college_branch_id", 0);
               return;
            case "college_program_id":
                getBranches(value);
                setFieldValue('college_branch_id',0);
               return;  
           default:
                return;
        }
    };

    const onSubmit = (data) => {
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
                            <FormSelect options={statusOptions} label="Status" name="status_id"/>
                            <FormInput label="Student Name" name="student_name"/>
                            <FormInput label="Roll Number" name="roll_number"/>
                            <FormInput label="Father's Name" name="father_name"/>
                            <FormInput label="Email ID" name="email"/>
                            <FormInput label="Password" name="password"/>
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

export default StudentForm;
