import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type InputTextProps = {
  type: string;
  label?: string;
  name: string;
  value?: string;
  defaultValue?: number | string;
  errors: FieldErrors<FieldValues>;
  errorsType: {
    required?: boolean;
    max?: number;
    min?: number;
  };
  register: UseFormRegister<FieldValues>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add this line
};

export const Input = ({
  type,
  label,
  name,
  value,
  defaultValue,
  register,
  errors,
  errorsType,
  onChange,
}: InputTextProps) => {
  return (
    <div className="w-auto flex flex-col items-center space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

        <input
          type={type}
          className="block w-44 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={value}
          defaultValue={defaultValue}
          {...register(name, errorsType)}
          onChange={onChange} // Add this line
          aria-invalid="true"
        />
    
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
    </div>
  );
};
