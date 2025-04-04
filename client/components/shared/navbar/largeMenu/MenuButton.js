import React from 'react';

const MenuButton = ({ icon: Icon, label, active, onClick }) => {
  const activeClasses = active ? 'bg-slate-900 text-slate-50 hover:bg-slate-900' : 'text-slate-600 dark:text-slate-400 dark:hover:text-slate-100 hover:text-slate-900';

  return (
    <li className="nc-NavItem2 col-2 relative" data-nc-id="NavItem2">
      <button 
        onClick={onClick} 
        className={`block font-medium whitespace-nowrap ${active ?"" :"hover:bg-green-300"}    py-2 text-sm lgplus2:px-3 lgplus:px-2 mdplus:px-1 px-7 sm:py-3 capitalize rounded-full ${activeClasses} focus:outline-none`}
      
      >
        <div className="flex items-center justify-center gap-2 space-x-1.5 sm:space-x-2.5 text-xs sm:text-sm">
          <span className="inline-block">
            <Icon size={20} />
          </span>
          <span>{label}</span>
        </div>
      </button>
    </li>
  );
};

export default MenuButton;
