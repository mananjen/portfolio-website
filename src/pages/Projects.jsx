// src/pages/Projects.jsx
import React from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const { projects, loading } = useProjects();

  if (loading) return <p>Loading projects...</p>;

  return (
    <section>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          githubUrl={project.githubUrl}
          imageUrl={project.imageUrl}
          flip={index % 2 !== 0} // Alternates alignment based on index
        />
      ))}
    </section>
  );
};

export default Projects;