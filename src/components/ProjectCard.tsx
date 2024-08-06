import Link from "next/link";

type ProjectCardProps = {
  id: number;
  title: string;
  description: string;
};

const ProjectCard = ({ id, title, description }: ProjectCardProps) => {
  return (
    <Link href={`/projects/${id}`}>
      <div className="relative h-48 w-full max-w-xs transform overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="absolute inset-0 h-1 w-full bg-gradient-to-r from-blue-500 to-teal-400"></div>
        <div className="relative z-10 flex flex-col p-6">
          <p className="text-lg font-semibold text-gray-900 mb-2">{title}</p>
          <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
