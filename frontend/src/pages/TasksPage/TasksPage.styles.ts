// src/pages/TasksPage/TasksPage.styles.ts
import styled from 'styled-components';

export const TasksPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff; /* White background for the rest of the page */
  min-height: 100vh;
  padding: 0 20px;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  margin-top: 100px;  /* Adjusting margin to account for taller navbar */
  width: 100%;  /* Ensure main content takes full width */
  box-sizing: border-box;
  background-color: #fff; /* White background for the list */
  padding: 20px;
`;

export const TaskList = styled.div`
  width: 83.33%;  /* Ensure list items occupy 5/6 of the page width */
  background-color: #fff; /* White background for the list */
  padding: 20px;
  
`;

export const TaskItem = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid #333; /* Black stroke */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1rem;
    color: #666;
  }

  /* Adding yellowish color to an element */
  .highlight {
    color: orange;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333; /* Dark grey text */
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666; /* Light grey text */
  margin-bottom: 20px;
`;
