import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "../../UI";
import validation_schema from "../../../validation_schema/college_validation_schema";
import { FormInput, FormSelect, FormTextArea } from "../FormControl";
import { fetchStatus, fetchUniversityName } from "../../../api";

const CollegeForm = (props) => {
  const {initialValues,onSubmit} = props;
  const [universityOptions, setUniversityOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    getUniversityName();
    getStatus();
  }, []);

  const getUniversityName = async () => {
    let data = await fetchUniversityName();
    data = data.map((item) => {
      return { name: item.university_name, value: item.university_id };
    });
    data = [{ name: "Select University", value: 0 }, ...data];
    setUniversityOptions(data);
  };

  const getStatus = async () => {
    let data = await fetchStatus();
    data = data.map((item) => {
      return { name: item.status === 0 ? 'Inactive':'Active', value: item.status_id };
    });
    setStatusOptions(data);
  };

  return (
    <div className="p-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validation_schema}
        onSubmit={onSubmit}
      >
        <Form>
          <FormSelect label="University Name" name="university_id" options={universityOptions}/>
          <FormInput label="College Name" name="college_name" />
          <FormInput label="Registration Number" name="registration_number" />
          <FormInput label="Email Id" name="email" />
          <FormInput label="Contact Number" name="contact_number" />
          <FormSelect label="Status" name="status_id" options={statusOptions}/>
          <FormTextArea label="Address" name="address" />
          <div className="flex justify-center">
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CollegeForm;
