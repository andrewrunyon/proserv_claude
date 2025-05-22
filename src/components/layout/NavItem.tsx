import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface NavItemChild {
  label: string;
  to: string;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  children?: NavItemChild[];
}

export const NavItem: React.FC<NavItemProps> = ({ to, icon, label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = children && children.length > 0;

  return (
    <div className="mb-2">
      <Link
        to={to}
        className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className="mr-3">{icon}</span>
        <span className="flex-1">{label}</span>
        {hasChildren && (
          <span className="ml-auto">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </Link>
      
      {hasChildren && isOpen && (
        <div className="ml-8 mt-1 space-y-1">
          {children.map((child, index) => (
            <Link
              key={index}
              to={child.to}
              className="block p-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};