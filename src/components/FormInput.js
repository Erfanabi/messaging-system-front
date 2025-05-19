import { Input } from "@heroui/input";
import { memo } from "react";

const FormInput = ({
  label,
  placeholder = "",
  type = "text",
  className = "",
}) => {
  return (
    <div className={`w-full space-y-1 ${className}`}>
      <label className="block text-sm font-light">{label}</label>

      <Input
        type={type}
        color="primary"
        variant="faded"
        size="md"
        radius="sm"
        className="w-full"
        aria-label="ddddd"
        classNames={{ inputWrapper: "border-1" }}
        aria-labelledby={label}
        placeholder={placeholder}
      />
    </div>
  );
};

export default memo(FormInput);
