import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { addBranch, fetchBranches, updateBranch } from "../../api";
import {BranchForm} from "../../component/Form";
import {Modal,ModalHeader,ModalBody,Table,Button,} from "../../component/UI";
import COLUMNS from "../../constants/table_columns/master/branch";

const Program = () => {
  const[branchFormIntialValues,setBranchFormIntialValues] = useState(null);
  const [branches, setBranches] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isAddForm,setIsAddForm] = useState(false);
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
    getBranches();
  }, []);

  const getBranches = async () => {
    const data = await fetchBranches();
    setBranches(data);
  };

  const toggleModal = () => setOpenModal((prev) => !prev);

  const onAddClick = () => {
    setBranchFormIntialValues({
        program_id:0,
        branch_name:""
    })
    toggleModal();
    setIsAddForm(true);
  };
  
  const onEdit = (programData) => {
    setBranchFormIntialValues(programData);
    toggleModal();
    setIsAddForm(false);
  };

  const onProgramFormSubmit = async(programData) => {
    if(isAddForm)
    await addBranch(programData);
    else
    await updateBranch(programData);
    await getBranches();
    toggleModal();
  }

  return (
    <div>
      <h1>
        <div className="text-center text-slate-800 font-bold mt-10">
          BRANCH
        </div>
      </h1>
      <div className="shadow p-4 bg-white mt-10 mx-auto md:max-w-[800px]">
        <div className="mb-2 flex justify-end">
          <Button onClick={onAddClick}>Add</Button>
        </div>
        <Table columns={[actionColumn, ...COLUMNS]} data={branches} />
      </div>
      <Modal openModal={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Branch</ModalHeader>
        <ModalBody>
          <BranchForm initialValues={branchFormIntialValues} onSubmit={onProgramFormSubmit}/>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Program;
