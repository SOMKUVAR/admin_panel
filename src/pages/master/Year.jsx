import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { addYear, fetchYear, updateYear } from "../../api";
import {YearForm} from "../../component/Form";
import {Modal,ModalHeader,ModalBody,Table,Button,} from "../../component/UI";
import COLUMNS from "../../constants/table_columns/master/year";

const Year = () => {
  const[yearFormIntialValues,setYearFormIntialValues] = useState(null);
  const [year, setYear] = useState([]);
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
    getYear();
  }, []);

  const getYear = async () => {
    const data = await fetchYear();
    setYear(data);
  };

  const toggleModal = () => setOpenModal((prev) => !prev);

  const onAddClick = () => {
    setYearFormIntialValues({
        year:0
    })
    toggleModal();
    setIsAddForm(true);
  };
  
  const onEdit = (yearData) => {
    setYearFormIntialValues(yearData);
    toggleModal();
    setIsAddForm(false);
  };

  const onYearFormSubmit = async(yearData) => {
    if(isAddForm)
    await addYear(yearData);
    else
    await updateYear(yearData);
    await getYear();
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
        <Table columns={[actionColumn, ...COLUMNS]} data={year} />
      </div>
      <Modal openModal={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Year</ModalHeader>
        <ModalBody>
          <YearForm initialValues={yearFormIntialValues} onSubmit={onYearFormSubmit}/>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Year;
