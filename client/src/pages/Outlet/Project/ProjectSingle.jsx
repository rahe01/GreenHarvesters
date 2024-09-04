import { useLoaderData } from "react-router-dom";

const ProjectSingle = () => {
    const project = useLoaderData()

    return (
        <div>
            sdf {project.title}
        </div>
    );
};

export default ProjectSingle;