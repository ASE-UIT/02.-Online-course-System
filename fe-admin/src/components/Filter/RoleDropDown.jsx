import React, { useState } from 'react'
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
const RoleDropDown = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setIsDropdownOpen(false); 
        onFilterChange({ role: role.id }); 
    };
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev); 
      };
  return (
    <div className='w-full'>
         <div className="flex flex-col gap-[10px] w-full">
            <label className="text-text/md/semibold font-worksans w-full">Theo vai trò</label>
            <div className="button flex relative w-full">
            <Button
                variant="outline"
                className="flex items-center gap-2 w-full bg-gray-300"
                onClick={toggleDropdown} 
            >
                <div className="flex justify-between items-center gap-2 px-3 py-2">
                    <span className="text-text/md/medium">
                        {selectedRole ? selectedRole.name : "Tất cả"}
                    </span>
                    <div className="icon w-[24px] h-6 flex items-center justify-center">
                        <ChevronDown />
                    </div>
                </div>
            </Button>
            </div>
        </div>
    </div>
  )
}

export default RoleDropDown