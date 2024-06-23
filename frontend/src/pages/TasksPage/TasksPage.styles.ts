// src/pages/TasksPage/TasksPage.styles.ts
import styled from 'styled-components';

export const TasksPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  min-height: 100vh;
  padding-top: 77px; /* Adjust padding to account for navbar height */
  box-sizing: border-box;
  position: relative;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0;
  position: fixed;
  top: 77px; /* Adjust to be just below the navbar */
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  z-index: 900;
  padding: 10px 0;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-top: 40px; /* Adjust to provide space below the title */
  margin-bottom: 10px;
  text-align: center;
`;

export const TaskList = styled.div`
  width: 100%;
  max-width: 800px;
  flex: 1;
  background-color: #fff;
  padding: 20px;
  overflow-y: scroll;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 60px; /* Adjust to provide space for title */
  margin-bottom: 20px; /* Ensure enough space for footer and button */
  max-height: calc(100vh - 220px); /* Adjust this value to keep space for footer */

  /* Hide scrollbar for Webkit browsers */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for other browsers */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;



export const Button = styled.button`
  padding: 16px 32px;
  background-color: orange;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  color: black;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #e08e0b;
    transform: translateY(-2px);
  }
`;

export const Footer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 20px;
  display: flex;
  justify-content: center;
  z-index: 900;
`;
