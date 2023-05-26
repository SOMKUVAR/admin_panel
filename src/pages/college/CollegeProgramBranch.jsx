import { BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import {addCollegeProgramBranch, fetchAllCollegesBranchOfUniversity, fetchCollegeProgramBranch, updateCollegeProgramBranch } from "../../api";
import { Modal, ModalHeader,ModalBody,Table,Button } from "../../component/UI";
import COLUMNS from "../../constants/table_columns/college/college_program_branch";
import {CollegeProgramBranchForm} from "../../component/Form";

const CollegeProgramBranch = () => {
  const adminInfo = JSON.parse(localStorage.getItem("admin"));
  const {user_type_id,university_id} = adminInfo;
  const [collegeProgramBranchFormInitialValues, setCollegeProgramBranchFormInitialValues] = useState(null);
  const [isAddForm,setIsAddForm] = useState(false);
  const [collegeProgramBranch, setCollegeProgramBranch] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const actionColumn = {
    name: "Action",
    width: "70px",
    cell: (row) => (
      <>
        <div className="flex justify-between">
          <span>
            <BiEdit className="w-5 h-5 cursor-pointer"
              onClick={
                () => onEdit(row)
              }></BiEdit>
          </span>
        </div>
      </>
    ),
    center: true
  };

  useEffect(() => {
    getCollegeProgramBranch();
  }, [user_type_id]);

  const getCollegeProgramBranch = async () => {
    let data = [];
     switch(user_type_id){
       case 1:
          data = await fetchCollegeProgramBranch();
          setCollegeProgramBranch(data);
       return;
       case 2:
           data = await fetchAllCollegesBranchOfUniversity(university_id);
           setCollegeProgramBranch(data);
       return;
       default :
        setCollegeProgramBranch([]);
       return;
     }
  };

  const onAddClick = () => {
     setCollegeProgramBranchFormInitialValues({
       university_id:0,
       college_id:0,
       program_id:0,
       branch_id:0
    });
    toggleModal();
    setIsAddForm(true);
  }

  const onEdit = (data) => {
     setIsAddForm(false);
     setCollegeProgramBranchFormInitialValues(data);
     toggleModal();
  }

  const onCollegeProgramBranchFormSubmit = async(collegeBranchData) => {
    if(isAddForm) await addCollegeProgramBranch(collegeBranchData);
    else await updateCollegeProgramBranch(collegeBranchData);
    await getCollegeProgramBranch();
    toggleModal();
  }

  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <div>
      <h1>
        <div className="text-center text-slate-800 font-bold mt-10">
          COLLEGE BRANCH
        </div>
      </h1>
      <div className="shadow p-4 bg-white m-10">
       {user_type_id === 1 &&  <div className="mb-2 flex justify-end">
          <Button onClick={onAddClick}>Add</Button>
        </div>}
        <Table columns={user_type_id === 1 ? [actionColumn,...COLUMNS]:COLUMNS} data={collegeProgramBranch} />
      </div>
      <Modal openModal={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>College</ModalHeader>
        <ModalBody>
         <CollegeProgramBranchForm toggle={toggleModal} initialValues={collegeProgramBranchFormInitialValues} onSubmit={onCollegeProgramBranchFormSubmit}/>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CollegeProgramBranch;
