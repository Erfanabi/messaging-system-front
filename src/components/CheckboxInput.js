import { Input } from "@heroui/input";
import { memo } from "react";
import { Checkbox } from "@heroui/checkbox";

const CheckboxInput = ({
  label,
  labelCheckbox,
  placeholder = "",
  type = "text",
  className = "",
}) => {
  return (
    <div className={`w-full space-y-1 ${className}`}>
      <Checkbox classNames={{ label: "text-sm font-light" }}>
        {labelCheckbox}
      </Checkbox>

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

export default memo(CheckboxInput);
