const StatusBox = ({ children }: { children: React.ReactNode }) => (
  <div className="text-body2-m flex h-9 w-full items-center justify-center rounded-md border border-gray-300 text-gray-700">
    {children}
  </div>
);

export default StatusBox;
