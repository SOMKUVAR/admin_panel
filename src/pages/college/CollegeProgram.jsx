import { BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import {addCollegeProgram,fetchAllCollegesProgram,fetchAllCollegesProgramOfUniversity,updateCollegeProgram,} from "../../api";
import {Modal,ModalHeader,ModalBody,Table,Button} from "../../component/UI";
import COLUMNS from "../../constants/table_columns/college/college_program";
import { CollegeProgramForm } from "../../component/Form";

const CollegeProgram = () => {
  const adminInfo = JSON.parse(localStorage.getItem("admin"));
  const {user_type_id,university_id} = adminInfo;
  const [collegeProgramFormInitialValues, setCollegeProgramFormInitialValues] = useState(null);
  const [isAddForm, setIsAddForm] = useState(false);
  const [collegeProgram, setCollegeProgram] = useState([]);
  const [openModal, setOpenModal] = useState(false);
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
    getCollegeProgram();
  }, [user_type_id]);

  const getCollegeProgram = async () => {
    let data = []
    switch(user_type_id){
      case 1:
       data = await fetchAllCollegesProgram();
       setCollegeProgram(data);
       return;
      case 2:
       data =  await fetchAllCollegesProgramOfUniversity(university_id);
       setCollegeProgram(data);
       return;
      default:
        data = [];
        return;
    }
  };

  const onAddClick = () => {
    setCollegeProgramFormInitialValues({
      college_id: 0,
      program_id: 0,
    });
    toggleModal();
    setIsAddForm(true);
  };

  const onEdit = (data) => {
    setIsAddForm(false);
    setCollegeProgramFormInitialValues(data);
    toggleModal();
  };

  const onCollegeProgramFormSubmit = async (collegeData) => {
    if (isAddForm) {
      await addCollegeProgram(collegeData);
    } else {
      await updateCollegeProgram(collegeData);
    }
    await getCollegeProgram();
    toggleModal();
  };

  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <div>
      <h1>
        <div className="text-center text-slate-800 font-bold mt-10">
          COLLEGE PROGRAM
        </div>
      </h1>
      <div className="shadow p-4 bg-white m-10">
        {user_type_id === 1 && (
          <div className="mb-2 flex justify-end">
            <Button onClick={onAddClick}>Add</Button>
          </div>
        )}
        <Table
          columns={user_type_id === 1 ? [actionColumn, ...COLUMNS] : COLUMNS}
          data={collegeProgram}
        />
      </div>
      <Modal openModal={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>College</ModalHeader>
        <ModalBody>
          <CollegeProgramForm
            toggle={toggleModal}
            initialValues={collegeProgramFormInitialValues}
            onSubmit={onCollegeProgramFormSubmit}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CollegeProgram;
