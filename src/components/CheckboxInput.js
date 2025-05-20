import { Input } from "@heroui/input";
import { memo } from "react";
import { Checkbox } from "@heroui/checkbox";

const CheckboxInput = ({
  label,
  labelCheckbox,
  placeholder = "",
  type = "text",
  className = "",
  isChecked = false,
  onCheckboxChange = () => {},
  onInputChange = () => {},
  inputValue = "",
  disabled = true,
}) => {
  return (
    <div className={`w-full space-y-1 ${className}`}>
      <Checkbox 
        classNames={{ label: "text-sm font-light" }}
        isSelected={isChecked}
        onValueChange={(checked) => onCheckboxChange(checked)}
      >
        {labelCheckbox}
      </Checkbox>

      <Input
        type={type}
        color="primary"
        variant="faded"
        size="md"
        radius="sm"
        className="w-full"
        classNames={{ inputWrapper: "border-1" }}
        aria-labelledby={label}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        isDisabled={disabled}
      />
    </div>
  );
};


export default memo(CheckboxInput);
