import { FastField, FieldProps } from "formik";
import { Input } from "@heroui/input";
import { memo } from "react";

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  isDisabled?: boolean;
}

const FormInput = ({
  name,
  label,
  placeholder = "",
  type = "text",
  className = "",
  isDisabled = false,
}: FormInputProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium">{label}</label>
      <FastField name={name}>
        {({ field, meta }: FieldProps) => (
          <>
            <Input
              type={type}
              variant="faded"
              size="md"
              radius="sm"
              aria-label="ddddd"
              aria-labelledby={label}
              placeholder={placeholder}
              {...field}
              isDisabled={isDisabled}
              isInvalid={!!meta.error && meta.touched}
            />
            {meta.error && meta.touched && (
              <div className="mt-1 text-sm text-danger">{meta.error}</div>
            )}
          </>
        )}
      </FastField>
    </div>
  );
};

export default memo(FormInput);
