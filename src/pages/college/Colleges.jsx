import { BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import { addCollege, fetchAllColleges, fetchColleges, updateCollege } from "../../api";
import {CollegeForm} from "../../component/Form";
import { Modal, ModalHeader,ModalBody,Table,Button } from "../../component/UI";
import COLUMNS from "../../constants/table_columns/college/colleges";

const Colleges = () => {
  const adminInfo = JSON.parse(localStorage.getItem("admin"));
  const {user_type_id,university_id} = adminInfo;
  const [collegeFormInitialValues, setCollegeFormInitialValues] = useState(null);
  const [isAddForm,setIsAddForm] = useState(false);
  const [colleges, setColleges] = useState([]);
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
    getColleges();
  }, [user_type_id]);

  const getColleges = async () => {
    let data = [];

    switch(user_type_id){
      case 1:
         data = await fetchAllColleges();
         setColleges(data);
         return;
      case 2:
          data = await fetchColleges(university_id);
          setColleges(data);
          return;
      default :
       setColleges([]);
      return;
    }
  
  };

  const onAddClick = () => {
     setCollegeFormInitialValues({
      university_id: 0,
      college_name: "",
      registration_number:"",
      email:"",
      contact_number:"",
      status_id:1,
      address:""
    });
    toggleModal();
    setIsAddForm(true);
  }

  const onEdit = (data) => {
     setIsAddForm(false);
     setCollegeFormInitialValues(data);
     toggleModal();
  }

  const onCollegeFormSubmit = async(collegeData) => {
    if(isAddForm){
      await addCollege(collegeData);
    }
    else{
      await updateCollege(collegeData);
    }
    await getColleges();
    toggleModal();
  }

  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <div>
      <h1>
        <div className="text-center text-slate-800 font-bold mt-10">
          COLLEGES
        </div>
      </h1>
      <div className="shadow p-4 bg-white m-10">
      {user_type_id === 1 && <div className="mb-2 flex justify-end">
          <Button onClick={onAddClick}>Add</Button>
        </div>}
        <Table columns={user_type_id === 1 ? [actionColumn,...COLUMNS] : COLUMNS} data={colleges} />
      </div>
      <Modal openModal={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>College</ModalHeader>
        <ModalBody>
          <CollegeForm toggle={toggleModal} initialValues={collegeFormInitialValues} onSubmit={onCollegeFormSubmit}/>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Colleges;
