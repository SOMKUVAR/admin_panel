import { BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Table, Button } from "../component/UI";
import { UniversityForm } from "../component/Form";
import COLUMNS from "../constants/table_columns/universityColumns";
import {addAdminUser,addUniversity,fetchUniversities,updateUniversity} from "../api";

const University = () => {
  const user_type_id = JSON.parse(localStorage.getItem("admin")).user_type_id;
  const [universityFormIntialValues, setUniversityFormIntialValues] = useState(null);
  const [isAddForm, setIsAddForm] = useState(false);
  const [universities, setUniversities] = useState([]);
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
    getUniversities();
  }, []);

  const getUniversities = async () => {
    const data = await fetchUniversities();
    setUniversities(data);
  };

  const toggleModal = () => setOpenModal((prev) => !prev);

  const onAddClick = () => {
    setIsAddForm(true);
    setUniversityFormIntialValues({
      university_name: "",
      email: "",
      registration_number: "",
      contact_number: "",
      address: "",
      password: "",
    });
    toggleModal();
  };

  const onEdit = (row) => {
    setIsAddForm(false);
    setUniversityFormIntialValues(row);
    toggleModal();
  };

  const onUniversityFormSubmit = async (universityData) => {
    if (isAddForm) {
      const university_id = await addUniversity(universityData);
      await addAdminUser({
        university_id,
        user_type_id: 2,
        email: universityData.email,
        password: universityData.password,
      });
    } else await updateUniversity(universityData);
    await getUniversities();
    toggleModal();
  };

  return (
    <>
      <h1 className="text-center text-slate-800 font-bold mt-10">UNIVERSITY</h1>
      <div className="shadow p-4 bg-white m-10">
        {user_type_id === 1 && (
          <div className="mb-2 flex justify-end w-full">
            <Button onClick={onAddClick}>Add</Button>
          </div>
        )}
        <Table columns={user_type_id === 1 ? [actionColumn, ...COLUMNS] : COLUMNS} data={universities} />
      </div>
      <Modal openModal={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>University</ModalHeader>
        <ModalBody>
          <UniversityForm
            onSubmit={onUniversityFormSubmit}
            intialValues={universityFormIntialValues}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default University;
