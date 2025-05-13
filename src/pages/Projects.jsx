// src/pages/Projects.jsx
import React from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';

const Projects = () => {
  const { projects, loading } = useProjects();

  if (loading) return <Loader />;

  return (
    <section>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          githubUrl={project.githubUrl}
          imageUrl={project.imageUrl}
          projectWebsiteUrl={project.projectWebsiteUrl}
          documentUrl={project.documentUrl}
          startDate={project.startDate}
          endDate={project.endDate}
          technologies={project.technologies}
          flip={index % 2 !== 0}
        />
      ))}
    </section>
  );
};

export default Projects;