import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { addSemester, fetchSemester, updateSemester } from "../../api";
import {SemesterForm} from "../../component/Form";
import {Modal,ModalHeader,ModalBody,Table,Button,} from "../../component/UI";
import COLUMNS from "../../constants/table_columns/master/semester";

const Semester = () => {
  const[semesterFormIntialValues,setSemesterFormIntialValues] = useState(null);
  const [semester, setSemester] = useState([]);
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
    getSemester();
  }, []);

  const getSemester = async () => {
    const data = await fetchSemester();
    setSemester(data);
  };

  const toggleModal = () => setOpenModal((prev) => !prev);

  const onAddClick = () => {
    setSemesterFormIntialValues({
       semester:0
    })
    toggleModal();
    setIsAddForm(true);
  };
  
  const onEdit = (semesterData) => {
    setSemesterFormIntialValues(semesterData);
    toggleModal();
    setIsAddForm(false);
  };

  const onSemesterFormSubmit = async(semesterData) => {
    if(isAddForm)
    await addSemester(semesterData);
    else
    await updateSemester(semesterData);
    await getSemester();
    toggleModal();
  }

  return (
    <div>
      <h1>
        <div className="text-center text-slate-800 font-bold mt-10">
          SEMESTER
        </div>
      </h1>
      <div className="shadow p-4 bg-white my-10 m-auto md:max-w-[450px]">
        <div className="mb-2 flex justify-end">
          <Button onClick={onAddClick}>Add</Button>
        </div>
        <Table columns={[actionColumn, ...COLUMNS]} data={semester} />
      </div>
      <Modal openModal={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Semester</ModalHeader>
        <ModalBody>
          <SemesterForm initialValues={semesterFormIntialValues} onSubmit={onSemesterFormSubmit}/>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Semester;
