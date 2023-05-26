import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import {
  addProgram,
  addProgramSemster,
  addProgramYear,
  fetchPrograms,
  updateProgram,
} from "../../api";
import { ProgramForm } from "../../component/Form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Button,
} from "../../component/UI";
import COLUMNS from "../../constants/table_columns/master/program";

const Program = () => {
  const [programFormInitialValues, setProgramFormInitialValues] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);
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
    getPrograms();
  }, []);

  const getPrograms = async () => {
    const data = await fetchPrograms();
    setPrograms(data);
  };

  const toggleModal = () => setOpenModal((prev) => !prev);

  const onAddClick = () => {
    setProgramFormInitialValues({
      program_type_id: 0,
      program_name: "",
      duration: 0,
      semester: 0,
    });
    toggleModal();
    setIsAddForm(true);
  };

  const onEdit = (programData) => {
    setProgramFormInitialValues(programData);
    toggleModal();
    setIsAddForm(false);
  };

  const onProgramFormSubmit = async (programData) => {
    if (isAddForm) {
      const program_id = await addProgram(programData);
      if (parseInt(programData.semester) === 1)
        await addProgramSemster({ program_id, year: programData.duration });
      else await addProgramYear({ program_id, year: programData.duration });
    } else await updateProgram(programData);
    await getPrograms();
    toggleModal();
  };

  return (
    <div>
      <h1>
        <div className="text-center text-slate-800 font-bold mt-10">
          PROGRAM
        </div>
      </h1>
      <div className="shadow p-4 bg-white m-10  mx-auto md:max-w-[1000px]">
        <div className="mb-2 flex justify-end">
          <Button onClick={onAddClick}>Add</Button>
        </div>
        <Table columns={[actionColumn, ...COLUMNS]} data={programs} />
      </div>
      <Modal openModal={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Program</ModalHeader>
        <ModalBody>
          <ProgramForm
            initialValues={programFormInitialValues}
            onSubmit={onProgramFormSubmit}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Program;
