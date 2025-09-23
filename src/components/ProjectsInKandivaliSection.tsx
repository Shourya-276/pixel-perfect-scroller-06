import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ProjectCardProps {
  name: string;
  location: string;
  image: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, location, image }) => {
  return (
    <div className="flex flex-col items-center text-center w-[120px] sm:w-[150px] flex-shrink-0">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-2 border-2 border-white shadow-md"
      />
      <h4 className="text-white font-semibold text-xs sm:text-sm leading-tight line-clamp-2 max-w-full">{name}</h4>
      <p className="text-gray-200 text-[10px] sm:text-xs mt-1 leading-tight">{location}</p>
    </div>
  );
};

const ProjectsInKandivaliSection: React.FC = () => {
  const projects = [
    {
      id: 1,
      name: "The Grand Residences",
      location: "Kandivali East",
      image: "https://images.unsplash.com/photo-1543950275-f8cf48c3b01a?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "The Emerald Heights",
      location: "Kandivali West",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "The Royal Gardens",
      location: "Kandivali East",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "The Prestige Towers",
      location: "Kandivali West",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "The Serene Enclave",
      location: "Kandivali East",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=400&fit=crop",
    },
  ];

  return (
    <section className="bg-[#0D6ABC] py-6 sm:py-8 pl-4 sm:pl-6 pr-0 rounded-l-2xl mb-8 ml-auto w-full max-w-4xl shadow-lg">
      <div className="flex flex-col items-start">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Projects in Kandivali, Mumbai</h2>
        <p className="text-gray-200 text-xs sm:text-sm mb-4 sm:mb-6">Inspired by your search preferences.</p>

        <ScrollArea className="w-full">
          <div className="flex space-x-4 sm:space-x-6 pb-2 min-w-max">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default ProjectsInKandivaliSection;
