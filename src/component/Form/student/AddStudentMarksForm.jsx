import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import abi from '../../../contracts/MarkSheetContract.json';
import {
  fetchCollegePrograms,
  fetchColleges,
  fetchCollegeBranch,
  fetchProgramExamType,
  fetchProgramSemester,
  fetchProgramYear,
  fetchStudents,
  fetchSubjectSemesterWise,
  fetchGrade,
  fetchStudentDetail,
  addStudentMarks,
} from "../../../api";
import validation_schema from "../../../validation_schema/student_marks_form";
import { Button, Modal, ModalBody, ModalHeader } from "../../UI";
import { FormSelect } from "../FormControl";
import MarksheetForm from "./MarksheetForm";
import  {ethers}  from 'ethers';
import * as  providers from '@ethersproject/providers';

const AddStudentMarksForm = () => {
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
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [subjects,setSubjects]  = useState([]);
  const [subjectOptionsError, setSubjectOptionsError] = useState(new Map());
  const [examType, setExamType] = useState(0);
  const [error, setError] = useState("");
  const [openModal,setOpenModal] = useState(false);
  const [studentId,setStudentId] = useState(0);
  const [grades,setGrades] = useState([]);
  const [semester,setSemester] = useState(0);
  const [state,setState] = useState({provider:null,signer:null,contract:null});


  useEffect(()=>{
    const connectWallet = async()=>{
     
      //  const contractAddress = "0x868Ac5912dA59c1E618033De8167c608aBf14010";
      const contractAddress = "0x101A478bC268550937A722C73FEdEffC27E5FC1f";
       const contractABI = abi.abi;
        try {
           const {ethereum} = window;
           if(ethereum){
             const accounts = await ethereum.request({method:'eth_requestAccounts'});
             window.ethereum.on("chainChanged",()=>{
                    window.location.reload();
             });
             window.ethereum.on("accountChanged",()=>{
                 window.location.reload();
             })


            const provider = new providers.Web3Provider(ethereum);
            await ethereum.enable();
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress,contractABI,signer);

            setState({provider,signer,contract});
           }
           else{
              alert("Please install metamask");
           }
         


        } catch (error) {
          console.log(error);
        }

    }

    connectWallet();
},[]);

  useEffect(() => {
    getColleges(university_id);
    getGrades(university_id);
  }, [university_id]);


  const getGrades = async (university_id) => {
       const newGrades = await fetchGrade(university_id);
       setGrades(newGrades);
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

  const toggleModal = () => setOpenModal(prev => !prev);

  const getSubjectOptionsSemesterVise = async (college_branch_id,program_semester_id) => {
    const data = await fetchSubjectSemesterWise(college_branch_id,program_semester_id);
    const map = new Map();
    const errorMap = new Map();
    data.map((subject) => {
      if (subject.subject_type === "major") return;
      const key = subject.subject_subtype === 0 ? subject.subject_type: `${subject.subject_type}-${subject.subject_subtype}`;
      if (!map.has(key)) {
        map.set(key, [{ name: key, value: 0 }]);
        errorMap.set(key,"");
      }
      map.get(key).push({ name: subject.subject_code, value: subject.subject_id });
    });
    const arr = Array.from(map);
    setSubjectOptionsError(errorMap);
    setSubjectOptions(arr);
  };

  const getSubjectSemesterVise = async(subjectSet,college_branch_id,program_semester_id) =>{
    let data = await fetchSubjectSemesterWise(college_branch_id,program_semester_id);
    data = data.filter(subject =>  subject.subject_type === "major" || subjectSet.has(parseInt(subject.subject_id)));
    setSubjects(data);
  }

  const handleChange = async (formik, name, value) => {
    if(subjectOptionsError.has(name)){
        if(parseInt(value) === 0)
        subjectOptionsError.set(name,`Please select ${name}`);
        else
        subjectOptionsError.set(name,"");
        return;
    }
    switch (name) {
      case "college_id":
        subjectOptions.map(subjectOption =>formik.setFieldValue(subjectOption[0],undefined));    
        getPrograms(value);
        getSubjectOptionsSemesterVise(0, 0);
        formik.setFieldValue("college_program_id", 0);
        formik.setFieldValue("college_branch_id", 0);
        formik.setFieldValue("program_semester_id", 0);
        formik.setFieldValue("program_year_id", 0);
        formik.setFieldValue("student_id", 0);
        return;
      case "college_program_id":
        subjectOptions.map(subjectOption =>formik.setFieldValue(subjectOption[0],undefined));
        getBranches(value);
        getYearOrSemester(value);
        getSubjectOptionsSemesterVise(0, 0);
        formik.setFieldValue("college_branch_id", 0);
        formik.setFieldValue("program_semester_id", 0);
        formik.setFieldValue("program_year_id", 0);
        formik.setFieldValue("student_id", 0);
        return;
      case "college_branch_id":
        subjectOptions.map(subjectOption =>formik.setFieldValue(subjectOption[0],undefined));
        getCollegeStudents(value);
        getSubjectOptionsSemesterVise(0, 0);
        formik.setFieldValue("program_semester_id", 0);
        formik.setFieldValue("program_year_id", 0);
        formik.setFieldValue("student_id", 0);
        return;
      case "program_semester_id":
        subjectOptions.map(subjectOption =>formik.setFieldValue(subjectOption[0],undefined));
        getSubjectOptionsSemesterVise(formik.values.college_branch_id, value);
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
    // subject validation
    for(let i = 0;i < subjectOptions.length;i++)
    {
      if(!data[subjectOptions[i][0]])
      {
        subjectOptionsError.set(subjectOptions[i][0],`Please select ${subjectOptions[i][0]}`);
      }
    }
    // subject validation
    for(let i = 0;i < subjectOptions.length;i++)
    {
      if(subjectOptionsError.has(subjectOptions[i][0]))
        if(subjectOptionsError.get(subjectOptions[i][0]).length > 0)
          return;
    }

    const subjectSet = new Set();
    for(let i = 0;i < subjectOptions.length;i++)
    {
       if(data.hasOwnProperty(subjectOptions[i][0]))
       subjectSet.add(parseInt(data[subjectOptions[i][0]]));
    }
    
    const semester = semesterOptions.filter(semester => semester.value == data['program_semester_id']);
    setSemester(semester[0].name);
    setStudentId(data['student_id']);
    await getSubjectSemesterVise(subjectSet,data['college_branch_id'],data['program_semester_id']);
    await toggleModal();
  };

  const createMarksheet = async(data) => {
    const subjectsData = getSubjects(data);
    const studentDetail = await getStudentDetail();
    const grade = getTotalGrade(data).toString();
    const result = getResult(subjectsData);
    const {contract} = state;
    contract &&  await contract.addMarksheet(studentDetail,result,grade,semester,0,subjectsData);
    contract &&  await addStudentMarks(data,studentId);
    toggleModal();
  }

  const getResult = (subjects) => {
      for(let i = 0;i < subjects.length;i++)
       if(subjects[i].result === "Fail")
         return "Fail";
     return "Pass";
  }

  const getTotalGrade = (obtainedSubjectMarks) => {
       let totalMarks = 0;
       let obtainMarks = 0;
       subjects.map(subject => {
           totalMarks += subject.theory_marks+subject.practical_marks;
       });

       obtainedSubjectMarks.map(subject => {
        obtainMarks += subject.theory_marks+subject.practical_marks;
      });
       
       return totalMarks === 0 || obtainMarks === 0 ? 0 :  (obtainMarks/totalMarks*100).toFixed(2);
  }

  const getStudentDetail = async() => {
    let studentDetail = await fetchStudentDetail(studentId);
    studentDetail = studentDetail[0];
    studentDetail = {name:studentDetail.student_name,rollno:studentDetail.roll_number,fatherName:studentDetail.father_name,
                    universityName:studentDetail.university_name,collegeName:studentDetail.college_name,degree:studentDetail.program_name,
                    branch:studentDetail.branch_name,status:studentDetail.status === 1 ? 'Regular':"Non Regular"}
    return studentDetail;
  }

  const getSubjects = (marksObtainOnSubjects) => {
    let newSubjects = [];
     marksObtainOnSubjects.map(subject => {
      const subjectData = getSubject(subject.subject_id);
      if(subjectData.theory_marks == 0)
      return;
      const percentage = getPercentage(subject.theory_marks,subjectData.theory_marks);
      const result = subject.theory_marks >= subjectData.theory_passing_marks  ? "Pass" : "Fail";
      newSubjects.push({code:subjectData.subject_code,name:subjectData.subject_name,grade:getGrade(percentage),result:result,
        examType:"Theory"});});
    marksObtainOnSubjects.map(subject => {
      const subjectData = getSubject(subject.subject_id);
      if(subjectData.practical_marks == 0)
       return;
      const percentage = getPercentage(subject.practical_marks,subjectData.practical_marks);
      const result = subject.practical_marks >= subjectData.practical_passing_marks ? "Pass" : "Fail";
      newSubjects.push({code:subjectData.subject_code,name:subjectData.subject_name,grade:getGrade(percentage),result:result,examType:"Practical"});
    });
    return newSubjects;
  }

  const getPercentage = (mark,totalMark) => {
     return mark/totalMark*100;
  }

  const getSubject = (subject_id) => {
      return subjects.filter(subject => parseInt(subject.subject_id) === parseInt(subject_id))[0];
  }

  const getGrade = (marks) => {
    for(let i = 0;i < grades.length;i++){
       if(marks >= parseInt(grades[i].minPercentage) && marks <= parseInt(grades[i].maxPercentage))
       {
         return grades[i].grade;
       }
    }
    return "";
  }


  return (
    <div className="p-4 my-5 mx-20">
      <h1>
        <div className="text-center text-slate-800 font-bold my-10">
          Add Student Marks
        </div>
      </h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} 
      enableReinitialize={true} validationSchema={validation_schema}>
        {(formik) => {
          return (
            <Form onChange={(event) =>handleChange(formik, event.target.name, event.target.value)}>
              <div className="grid grid-cols-3 gap-10 mb-10">
                <FormSelect name="college_id" options={collegeOptions} />
                <FormSelect name="college_program_id" options={programOptions}/>
                <FormSelect name="college_branch_id" options={branchOptions} />
                <FormSelect name="student_id" options={studentOptions} />
                {examType === 1 && (<FormSelect err={error} name="program_semester_id" options={semesterOptions}/>)}
                {examType === 0 && (<FormSelect err={error} name="program_year_id" options={yearOptions}/>)}
                {subjectOptions.map((item) => {
                 return <FormSelect err={subjectOptionsError.get(item[0])} name={item[0]} options={item[1]} />;
                }) }
              </div>
              <div className="flex justify-center">
                 <Button type="submit">Generate Marksheet</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <Modal openModal={openModal} toggle={toggleModal} large={true}>
        <ModalHeader toggle={toggleModal}>Add Marks</ModalHeader>
        <ModalBody>
          <MarksheetForm subjects={subjects} onSubmit={createMarksheet}/>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddStudentMarksForm;
