import React from 'react';
import styled from 'styled-components';
import CustomLink from '../components/CustomLink';
import Description from '../components/Description';
import PageContainer from '../components/PageContainer';

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Card = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const Title = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SubTitle = styled.h4`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.edExpHighlight};
`;

const Date = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 1rem;
`;

const BulletList = styled.ul`
  padding-left: 1.5rem;
  list-style-type: disc;
`;

const BulletItem = styled.li`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const EducationExperience = () => {
  return (
    <PageContainer>
      <SectionTitle>Education</SectionTitle>

      <Card>
        <Title>University of Illinois at Chicago</Title>
        <SubTitle>Master of Science in Computer Science</SubTitle>
        <Date>Aug 2023 – Present</Date>
        <Description>
          Specializing in Artificial Intelligence, Machine Learning, and Natural Language Processing. Developed multiple projects applying advanced NLP and deep learning techniques. Also learnt about VR and C# using Unity.
        </Description>
      </Card>

      <Card>
        <Title>National Institute of Technology, Kurukshetra</Title>
        <SubTitle>Bachelor of Technology in Computer Engineering</SubTitle>
        <Date>Aug 2015 – May 2019</Date>
        <Description>
          Core coursework in software development, algorithms, data structures, and database systems. Completed various hands-on projects involving IoT and web development, and early NLP techniques.
        </Description>
      </Card>

      <SectionTitle>Work Experience</SectionTitle>

      <Card>
        <Title>Software Engineer</Title>
        <SubTitle>Lowe's India, Bangalore, India</SubTitle>
        <Date>July 2019 – August 2023</Date>
        <BulletList>
          <BulletItem>
            <strong>Store Shopping Application:</strong> Improved in-store application usability by 10% through optimized UI development, significantly enhancing efficiency for store associates.
          </BulletItem>
          <BulletItem>
            <strong>Web Authoring (NPC Pages):</strong> Streamlined web content management using an internal Content-as-a-Service (CAAS) application, accelerating content delivery and improving operational efficiency.
          </BulletItem>
          <BulletItem>
            <strong>Non-Product Content (NPC) Project:</strong> Revamped and enhanced the NPC web application UI, increasing customer engagement by 20% and substantially improving user experience. <CustomLink to="https://www.lowes.com/diy-projects-and-ideas" target="_blank" fontSize="1rem">View Project Homepage</CustomLink>
          </BulletItem>
          <BulletItem>
            <strong>Web Tagging Optimization:</strong> Recognized by the Director of DACI for improving code clarity and reusability by 50%, removing redundancies, and optimizing analytics tagging across the Lowe’s website. Led the migration from Adobe DTM to Adobe Launch within two months.
          </BulletItem>
          <BulletItem>
            <strong>CAAS Migration:</strong> Completed the migration of CAAS data from Adobe Experience Manager (AEM) to an in-house application within five months, enhancing internal data control and operational reliability.
          </BulletItem>
        </BulletList>
      </Card>

      <Card>
        <Title>Intern</Title>
        <SubTitle>I.O.C.L. Haldia, India</SubTitle>
        <Date>May 2018 – July 2018</Date>
        <BulletList>
            <BulletItem>
                <strong>Network Management: </strong>Trained in simulating complex networks using CPT, modeling large-scale network infrastructures.
            </BulletItem>
        </BulletList>
      </Card>
    </PageContainer>
  );
};

export default EducationExperience;