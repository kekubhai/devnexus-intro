interface ProjectCardProps {
    title: string;
    description: string;
    link: string;
  }
  
  const ProjectCard = ({ title, description, link }: ProjectCardProps) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a 
          href={link} 
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          View Project
        </a>
      </div>
    );
  };
  
  export default ProjectCard;

  