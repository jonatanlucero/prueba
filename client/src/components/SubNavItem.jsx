// src/components/SubNavItem.jsx
import { Link } from "react-router-dom";

export default function SubNavItem({ label, to }) {
  return (
    <Link
      to={to}
      className="block text-sm text-gray-600 hover:text-orange-500 px-2 py-1 rounded hover:bg-gray-50 transition"
    >
      {label}
    </Link>
  );
}
