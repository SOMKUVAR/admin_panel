import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { addStudent, fetchStudent, updateStudent } from "../../api";
import StudentForm from "../../component/Form/student/StudentForm";
import { Button, ModalBody, ModalHeader, Table,Modal } from "../../component/UI";
import COLUMNS from "../../constants/table_columns/student/student";

const Student = () => {
    const university_id = JSON.parse(localStorage.getItem("admin")).university_id;
    const [isAddForm, setIsAddForm] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [studentForm, setStudentForm] = useState(null);
    const[students,setStudents] = useState([]);
    const actionColumn = {
        name: "Action",
        width: "70px",
        cell: (row) => (
          <>
            <div className="flex justify-between">
              <span>
                <BiEdit
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => onEdit(row)}
                ></BiEdit>
              </span>
            </div>
          </>
        ),
        center: true,
    };

    useEffect(()=>{
         getStudents(university_id);
    },[university_id]);

    const getStudents = async (university_id) => {
      const data =  await fetchStudent(university_id);
      setStudents(data);
    }

    const toggleModal = ()=> setOpenModal(prev => !prev);

    const onAddClick = () => {
        setIsAddForm(true);
        setStudentForm({
            college_id: 0,
            college_program_id: 0,
            college_branch_id: 0,
            student_name:"",
            father_name:"",
            roll_number:"",
            email:"",
            password:"",
            status_id:2
        })
        toggleModal();
    }

    const onEdit = (studentData) => {
        setStudentForm(studentData);
        setIsAddForm(false);
        toggleModal();
    }

    const onSubmit = async(studentData) => {
      console.log(studentData);
        if(isAddForm)
         await addStudent(studentData);
        else
         await updateStudent(studentData);
        getStudents(university_id);
        toggleModal();
    };
   
  return (
    <div>
      <h1>
        <div className="text-center text-slate-800 font-bold mt-10">
          STUDENT
        </div>
      </h1>
      <div className="shadow p-4 bg-white my-10 mx-20">
        <div className="mb-2 flex justify-end">
          <Button onClick={onAddClick}>Add</Button>
        </div>
        <Table data={students} columns={[actionColumn,...COLUMNS]} />
      </div>
      <Modal openModal={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Subject</ModalHeader>
        <ModalBody>
          <StudentForm
            initialValues={studentForm}
            toggle={toggleModal}
            onSubmit={onSubmit}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Student;
