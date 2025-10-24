import React from "react";

interface ProjectInfoBoxProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  className?: string;
}

const ProjectInfoBox: React.FC<ProjectInfoBoxProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  children,
  className = "",
}) => {
  return (
    <div className={`bg-[#EDF4FC] rounded-lg p-6 shadow-sm ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h2 className="text-2xl font-bold mb-1">{title}</h2>}
          {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
        </div>
      )}
      {imageSrc && (
        <div className="mb-4">
          <img
            src={imageSrc}
            alt={imageAlt || title || "Project image"}
            className="w-full h-64 object-cover rounded-lg shadow"
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default ProjectInfoBox;
