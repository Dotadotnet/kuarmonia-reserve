 
import Popover from '@/components/shared/modal/Popover';

const DropdownMenu = ({ isOpen, position, onClose, items }) => {
  return (
    <Popover
      isOpen={isOpen}
      position={position}
      onClose={onClose}
      content={
        <div className="flex gap-2 flex-col">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`flex items-center gap-2 w-full text-right hover:text-${item.hoverTextColor} bg-${item.bgColor} border-[1px] hover:bg-${item.hoverBgColor} hover:border-${item.hoverBorderColor} p-2 rounded text-sm`}
            >
              {item.icon && <item.icon className="w-6 h-6" />}
              {item.text}
            </button>
          ))}
        </div>
      }
    />
  );
};

export default DropdownMenu;
