import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Title from "../../../components/Shared/Title/Title";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const location = useLocation()

  useEffect(() => {
    // Fetch the project data from the public directory
    fetch(`${import.meta.env.VITE_API_URL}/getprojects`)
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching project data:", error));
  }, []);

  return (
    <div>
      {location.pathname === '/projects' && <Title title={"Explore Our Projects"}></Title>}


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
    </div>
  );
};

export default Project;
