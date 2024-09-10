import { useLoaderData, useNavigate } from "react-router-dom";
import Title from "../../../components/Shared/Title/Title";
import Button from "../../../components/Shared/Button/Button";

const ProjectSingle = () => {
    const project = useLoaderData();
    const navigate = useNavigate();

    return (
       <div>
        <Title title={project.title}></Title> 
        <div className="container mx-auto p-6 ">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10 p-6">
               
                {/* Project Title and Image with New Style */}
                <a 
                    rel="noopener noreferrer" 
                    className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50"
                >
                    <img 
                        src={project.projectImage} 
                        alt={project.title} 
                        className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500" 
                    />
                    <div className=" space-y-2 lg:col-span-5">
                        <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                            {project.title}
                        </h3>
                        <span className="text-xs dark:text-gray-600">February 19, 2021</span>
                        <p>{project.description}</p>
                    </div>
                </a>

                {/* Client Information */}
                <div className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900 mt-10">
                    <img
                        src={project.clientInfo.clientImage}
                        alt={project.clientInfo.name}
                        className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
                    />
                    <div className="mt-6 mb-2">
                        <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">
                            {project.clientInfo.address}
                        </span>
                        <h2 className="text-xl font-semibold tracking-wide">
                            {project.clientInfo.name}
                        </h2>
                    </div>
                    <p className="dark:text-gray-800">{project.clientInfo.phone}</p>
                </div>
            </div>

            {/* Back Button */}
            <div className="text-center mt-6">
              <Button
                onClick={() => navigate(-1)}
                label={"Back to Offers"}
              />
            </div>
        </div>
       </div>
    );
};

export default ProjectSingle;
