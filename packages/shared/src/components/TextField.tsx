const TextField = ({
  label,
  children,
  description,
}: {
  label: string;
  children: React.ReactNode;
  description?: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="text-body2-d w-12 text-right font-bold">{label}</span>
        {children}
      </div>
      {description && <span className="text-body2-d ml-16 text-gray-700">{description}</span>}
    </div>
  );
};

export default TextField;
