import { ErrorMessage, Field } from "formik";
import { Label } from "../FormElement";

const FormSelect = (props) => {
  const { label, name, options, err } = props;
  return (
    <div className="grid grid-cols-12 items-center gap-2 mb-4">
      {label && (
        <div className="col-span-4">
          <Label>{label} :</Label>
        </div>
      )}

      <div className={ label ? "col-span-8" : "col-span-12"}>
        <Field
          as="select"
          name={name}
          className="border border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {options &&
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
        </Field>
        <ErrorMessage
          name={name}
          render={(msg) => <div className="text-red-500 text-sm">{msg}</div>}
        />
        <div className="text-red-500 text-sm ml-1">{err}</div>
      </div>
    </div>
  );
};

export default FormSelect;
