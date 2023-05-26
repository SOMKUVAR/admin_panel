import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { addGrade, fetchGrade, updateGrade } from "../api";
import GradeSystemForm from "../component/Form/GradeSystemForm";
import { Button, ModalBody, ModalHeader, Table, Modal } from "../component/UI";
import COLUMNS from "../constants/table_columns/grade_system";

const Student = () => {
  const university_id = JSON.parse(localStorage.getItem("admin")).university_id;
  const [isAddForm, setIsAddForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [gradeSystemForm, setGradeSystemForm] = useState(null);
  const [grades, setGrades] = useState([]);

  
  useEffect(()=>{
        getGrades(university_id);
  },[university_id]);

  const getGrades = async(university_id) => {
    const newGrades = await fetchGrade(university_id);
    setGrades(newGrades);
  }
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

  const toggleModal = () => setOpenModal((prev) => !prev);


  const onEdit = (data) => {
    setGradeSystemForm(data);
    setIsAddForm(false);
    toggleModal();
  }

  const onAddClick = () => {
    setIsAddForm(true);
    setGradeSystemForm({
      minPercentage: 0,
      maxPercentage: 0,
      grade: "",
      description: ""
    });
    toggleModal();
  };

  const onSubmit = async (data) => {
     if(isAddForm){
      await addGrade({...data,university_id});
     }
     else{
      console.log(data);
      await updateGrade(data);
     }
     getGrades(university_id);
     toggleModal();
  }

  return (
    <div>
      <h1>
        <div className="text-center text-slate-800 font-bold mt-10">
          Grade System
        </div>
      </h1>
      <div className="shadow p-4 bg-white my-10 mx-20">
        <div className="mb-2 flex justify-end">
          <Button onClick={onAddClick}>Add</Button>
        </div>
        <Table data={grades} columns={[actionColumn,...COLUMNS]}/>
      </div>
      <Modal openModal={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Grade</ModalHeader>
        <ModalBody>
          <GradeSystemForm
            initialValues={gradeSystemForm}
            toggle={toggleModal}
            onSubmit={onSubmit}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Student;
