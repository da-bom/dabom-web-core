import { ErrorOutlineIcon } from "@icons";

const Error = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <p className="w-fill flex flex-col items-center justify-center">
      <div className="flex items-center">
        <ErrorOutlineIcon />
        <span className="text-h2-d">{title}</span>
      </div>
      {description && (
        <span className="text-body1-d text-gray-600">{description}</span>
      )}
    </p>
  );
};

export default Error;
