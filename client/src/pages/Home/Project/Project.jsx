import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch the project data from the public directory
    fetch("/project.json")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching project data:", error));
  }, []);

  return (
    <div className="py-5">
      <h3 className="font-2nd text-xl text-yellow-300 text-center">Recently Completed</h3>
      <h1 className="text-3xl font-bold text-center">Explore Projects</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-4 container mx-auto">
        {projects.map((project, idx) => (
          <div key={idx} className="relative">
            <Link to={`/projects/${project._id}`} className="block group">
              <img
                src={project.projectImage}
                alt={project.title}
                className="w-full h-fit object-cover rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-5 left-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent text-white rounded-lg">
                <h2 className="text-xl font-semibold">{project.title}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
