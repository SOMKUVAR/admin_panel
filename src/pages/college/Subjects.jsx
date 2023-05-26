import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { addSubject, fetchSubject, updateSubject } from "../../api";
import { SubjectForm } from "../../component/Form";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
} from "../../component/UI";
import COLUMNS from "../../constants/table_columns/college/subject";

const Subjects = () => {
  const university_id = JSON.parse(localStorage.getItem("admin")).university_id;
  const [isAddForm, setIsAddForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [subjectForm, setSubjectForm] = useState(null);
  const [subjects, setSubjects] = useState([]);
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

  useEffect(() => {
    getSubjects(university_id);
  }, [university_id]);

  const getSubjects = async (university_id) => {
    const newSubjects = await fetchSubject(university_id);
    setSubjects(newSubjects);
  };

  const toggleModal = () => setOpenModal((prev) => !prev);

  const onAddClick = () => {
    setIsAddForm(true);
    toggleModal();
    setSubjectForm({
      college_id: 0,
      subject_subtype_id:0,
      college_program_id: 0,
      college_branch_id: 0,
      program_semester_id: 0,
      program_year_id: 0,
      subject_name: "",
      subject_code: "",
      theory_marks: 0,
      theory_passing_marks:0,
      practical_marks: 0,
      practical_passing_marks:0,
      passing_marks: 0,
      status_id:2
    });
  };

  const onEdit = (data) => {
    setIsAddForm(false);
    setSubjectForm(data);
    toggleModal();
  };

  const onSubmit = async (subjectData) => {
    console.log(subjectData);
    if (isAddForm) 
      await addSubject(subjectData);
    else 
      await updateSubject(subjectData);
    await getSubjects(university_id);
    toggleModal();
  };

  return (
    <div>
      <h1>
        <div className="text-center text-slate-800 font-bold mt-10">
          SUBJECTS
        </div>
      </h1>
      <div className="shadow p-4 bg-white my-10 mx-20">
        <div className="mb-2 flex justify-end">
          <Button onClick={onAddClick}>Add</Button>
        </div>
        <Table data={subjects} columns={[actionColumn, ...COLUMNS]} />
      </div>
      <Modal openModal={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Subject</ModalHeader>
        <ModalBody>
          <SubjectForm
            initialValues={subjectForm}
            toggle={toggleModal}
            onSubmit={onSubmit}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Subjects;
