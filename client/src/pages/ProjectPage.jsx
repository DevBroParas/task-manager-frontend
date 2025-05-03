import { useEffect, useState } from "react";
import ProjectCard from "../components/Projects/ProjectCard";
import { getProjects } from "../services/projectService";
import { CopyPlus } from "lucide-react";
import ProjectForm from "../components/Projects/ProjectForm";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res.data.projects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Projects</h1>

      <div className="flex justify-end mb-5">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
        >
          <CopyPlus className="w-5 h-5" />
          Create Project
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-500 hover:text-black"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <ProjectForm onClose={() => setShowModal(false)} onProjectCreated={handleProjectCreated} />
          </div>
        </div>
      )}

      {/* Display message if no projects */}
      {projects.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>You don't have any projects yet. Click the button above to create a new project!</p>
        </div>
      ) : (
        // Grid of Projects
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-full mx-auto">
          {projects.slice(0, 4).map((project) => (
            <div key={project._id} className="w-full aspect-[3/2]">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
