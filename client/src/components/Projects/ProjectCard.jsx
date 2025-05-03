import React from "react";
import { Link } from "react-router-dom";
import { FolderKanban} from "lucide-react"; // Imported icons for Edit and Delete buttons

const ProjectCard = ({ project }) => {
  return (
    <Link
      to={`/projects/${project._id}`}
      className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border hover:border-blue-500 transition-all duration-300 flex flex-col items-center justify-center text-center h-full relative"
    >
      {/* Edit/Delete buttons
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(project._id); // Prevent click from triggering card link
          }}
          className="text-gray-600 hover:text-blue-500 p-2 rounded-full focus:outline-none transition-all duration-300"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project._id); // Prevent click from triggering card link
          }}
          className="text-gray-600 hover:text-red-600 p-2 rounded-full focus:outline-none transition-all duration-300"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div> */}

      <div className="bg-blue-100 text-blue-600 p-3 rounded-full group-hover:bg-blue-600 group-hover:text-white transition duration-300">
        <FolderKanban className="w-6 h-6" />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mt-4 group-hover:text-blue-600 transition">
        {project.name}
      </h3>

      <span className="absolute bottom-3 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        View Tasks →
      </span>
    </Link>
  );
};

export default ProjectCard;
