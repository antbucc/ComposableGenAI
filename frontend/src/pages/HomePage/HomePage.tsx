// src/pages/HomePage/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { HomePageContainer, MainContent, Button, Title, Subtitle, Section, SectionTitle, SectionContent, Footer } from './HomePage.styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HomePageContainer>
      <Navbar />
      <MainContent>
        <Title>Welcome to the Task Management System</Title>
        <Subtitle>Select an option to get started</Subtitle>
        <Section>
          <SectionTitle>Task Flows</SectionTitle>
          <SectionContent>
            Manage your tasks effectively with our intuitive task flows. Create, execute, and evaluate tasks seamlessly.
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>Real-time Collaboration</SectionTitle>
          <SectionContent>
            Collaborate with your team in real-time. Share tasks, track progress, and achieve your goals together.
          </SectionContent>
        </Section>
      </MainContent>
      <Footer>
        <Button onClick={() => navigate('/tasks')}>
          View Tasks
        </Button>
      </Footer>
    </HomePageContainer>
  );
};

export default HomePage;
