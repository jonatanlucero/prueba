// src/components/NavItem.jsx
import { Link } from "react-router-dom";

export default function NavItem({ icon, label, to, badge }) {
  return (
    <Link
      to={to || "#"}
      className="flex items-center justify-between group cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-md transition"
    >
      <div className="flex items-center space-x-2 text-gray-700 group-hover:text-orange-500">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      {badge > 0 && (
        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}
