interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const Spinner = ({ size = 'md' }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-solid border-gray-500 border-t-transparent`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

export default Spinner;
