import PropTypes from 'prop-types';

const Button = ({ label, onClick, disabled, outline, small, icon: Icon, color }) => {
  const colorClasses = color === 'color1' 
    ? 'bg-[#8AD167] border-[#8AD167] text-white hover:bg-[#7CBF5D]' 
    : 'bg-[#DFDE9F] border-[#DFDE9F] text-black hover:bg-[#CFCF8F]';

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        px-4
        w-full
        ${outline ? 'bg-white border-black text-black' : colorClasses}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className='
            absolute
            left-4
            top-3
          '
        />
      )}
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  icon: PropTypes.elementType,
  color: PropTypes.oneOf(['color1', 'color2']),
};

Button.defaultProps = {
  color: 'color1',
};

export default Button;
