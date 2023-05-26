import { BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import {addProgramType, fetchProgramType, updateProgramType } from "../../api";
import { Modal, ModalHeader,ModalBody,Table,Button } from "../../component/UI";
import COLUMNS from "../../constants/table_columns/master/program_type_column";
import {ProgramTypeForm} from "../../component/Form";

const ProgramTypes = () => {
  const [programTypeIntialValues, setProgramTypeIntialValues] = useState(null);
  const [isAddForm,setIsAddForm] = useState(false);
  const [programTypes, setProgramTypes] = useState([]);
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
    getProgramTypes();
  }, []);

  const getProgramTypes = async () => {
    const data = await fetchProgramType();
    setProgramTypes(data);
  };

  const onAddClick = () => {
    setProgramTypeIntialValues({program_type:""});
    toggleModal();
    setIsAddForm(true);
  }

  const onEdit = (data) => {
     setIsAddForm(false);
     setProgramTypeIntialValues(data);
     toggleModal();
  }

  const onProgramTypeFormSubmit = async(programTypeData) => {
     if(isAddForm)await addProgramType(programTypeData);
     else await updateProgramType(programTypeData);
     await getProgramTypes();
     toggleModal();
  }

  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <div className="flex justify-center flex-col items-center">
      <h1>
        <div className="text-center text-slate-800 font-bold mt-10">
        PROGRAM TYPE
        </div>
      </h1>
      <div className="shadow p-4 bg-white m-10 md:max-w-[600px]">
        <div className="mb-2 flex justify-end">
          <Button onClick={onAddClick}>Add</Button>
        </div>
        <Table columns={[actionColumn,...COLUMNS]} data={programTypes} />
      </div>
      <Modal openModal={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Program Type</ModalHeader>
        <ModalBody>
          <ProgramTypeForm toggle={toggleModal} initialValues={programTypeIntialValues} onSubmit={onProgramTypeFormSubmit}/>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProgramTypes;
