// src/pages/Projects.jsx
import React from 'react';
import { useProjects } from '../hooks/useProjects';
import styled from 'styled-components';

const ProjectCard = styled.div`
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background: white;
  margin-bottom: 1.5rem;
`;

const Projects = () => {
  const { projects, loading } = useProjects();

  if (loading) return <p>Loading projects...</p>;

  return (
    <section>
      {projects.map(project => (
        <ProjectCard key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <ul>
            {project.technologies.map((tech, index) => <li key={index}>{tech}</li>)}
          </ul>
          <a href={project.githubUrl}>GitHub</a> | 
          <a href={project.liveDemoUrl}>Live Demo</a>
        </ProjectCard>
      ))}
    </section>
  );
};

export default Projects;