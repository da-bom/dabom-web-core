import { ErrorOutlineIcon } from '@icons';

const Error = ({ title, description }: { title: string; description?: string }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex items-center gap-1">
        <ErrorOutlineIcon sx={{ width: 20 }} />
        <span className="text-body1-d">{title}</span>
      </div>
      {description && <span className="text-body3-d text-gray-600">{description}</span>}
    </div>
  );
};

export default Error;
