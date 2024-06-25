// src/pages/HomePage/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { HomePageContainer, MainContent, SideSection, Button, SectionTitle, SectionContent, Footer, ButtonContainer } from './HomePage.styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HomePageContainer>
      <Navbar />
      <MainContent>
        <SideSection>
          <SectionTitle>Generative AI for Everyone</SectionTitle>
          <SectionContent>
            This application demonstrates the power of Generative Artificial Intelligence (AI) as described in the article. It allows users to specify desired outcomes through detailed prompts instead of traditional commands, making AI accessible to non-developers.
          </SectionContent>
        </SideSection>
        <SideSection>
          <SectionTitle>The Card Model and Workflows</SectionTitle>
          <SectionContent>
            Utilizing the structured framework known as the &quot;Card Model,&quot; this application helps define and organize generative AI tasks. This approach outlines the structure, components, and relationships involved in generating content, providing a clear understanding of prompt engineering.
          </SectionContent>
        </SideSection>
      </MainContent>
      <Footer>
        <ButtonContainer>
          <Button onClick={() => window.open('https://techcommunity.microsoft.com/t5/educator-developer-blog/exploring-generative-ai-a-hands-on-course-on-prompt-engineering/ba-p/4148577', '_blank')}>
            Read More
          </Button>
          <Button onClick={() => navigate('/tasks')}>
            Get Started
          </Button>
        </ButtonContainer>
      </Footer>
    </HomePageContainer>
  );
};

export default HomePage;
