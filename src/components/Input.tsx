import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type InputTextProps = {
  type: string;
  label: string;
  name: string;
  defaultValue: number | string;
  errors: FieldErrors<FieldValues>;
  errorsType: {
    required?: boolean;
    max?: number;
    min?: number;
  };
  register: UseFormRegister<FieldValues>;
}

export const Input = ({
  type,
  label,
  name,
  defaultValue,
  register,
  errors,
  errorsType,
}: InputTextProps) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative my-2 flex justify-center">
        <input
          type={type}
          className="block w-44 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          defaultValue={defaultValue}
          {...register(name, errorsType)}
          aria-invalid="true"
        />
      </div>
      {errors[name]?.type === "required" && (
        <p className="mt-2 text-sm text-red-600">{label} is required</p>
      )}
      {errors[name]?.type === "min" && (
        <p className="mt-2 text-sm text-red-600">
          {label} must be greater than {errorsType.min}
        </p>
      )}
      {errors[name]?.type === "max" && (
        <p className="mt-2 text-sm text-red-600">
          {label} must be less than {errorsType.max}
        </p>
      )}
    </>
  );
};
