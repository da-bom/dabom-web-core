import Input, { InputProps } from './Input';

interface InputFieldProps extends InputProps {
  label: string;
}

const InputField = ({ type, label, value, onChange, ...props }: InputFieldProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="body1-m text-gray-800">{label}</label>
      <Input type={type} value={value} onChange={onChange} {...props} />
    </div>
  );
};

export default InputField;
