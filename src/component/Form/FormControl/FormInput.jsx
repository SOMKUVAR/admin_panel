import { ErrorMessage, Field } from "formik";
import { Input, Label } from "../FormElement";

const FormInput = (props) => {
  const { label, name, type, err,max} = props;
  return (
    <div className="grid grid-cols-12 items-center gap-2 mb-4">
      {label && (
        <div className="col-span-4">
          <Label>{label} :</Label>
        </div>
      )}
      <div className={ label ? "col-span-8" : "col-span-12"}>
        <Field type={type} as={Input} name={name} max={max} />
        <ErrorMessage
          name={name}
          render={(msg) => <div className="text-red-500 text-sm">{msg}</div>}
        />
        <div className="text-red-500 text-sm ml-1">{err}</div>
      </div>
    </div>
  );
};

export default FormInput;
