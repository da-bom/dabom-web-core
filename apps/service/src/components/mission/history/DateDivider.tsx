const DateDivider = ({ date }: { date: string }) => (
  <div className="flex items-center justify-center gap-4">
    <div className="w-full border-t border-gray-300" />
    <span className="text-body2-m text-gray-600">{date}</span>
    <div className="w-full border-t border-gray-300" />
  </div>
);

export default DateDivider;
