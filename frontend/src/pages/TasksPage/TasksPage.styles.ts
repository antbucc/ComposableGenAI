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
  max-height: calc(100vh - 140px); /* Adjust this value to keep space for footer */

  /* Hide scrollbar for Webkit browsers */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for other browsers */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

export const TaskItem = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin: 12px 0;  /* Adjust this value to change spacing between items */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid #333;

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

  .highlight {
    color: orange;
  }
`;

export const ButtonsBox = styled.div`
  position: absolute;
  top: 75px;
  right: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #333;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  border-bottom-left-radius: 20px;
  padding: 10px;
  width: auto; /* Adjust width as needed */
  box-shadow: inset 0 -3px 0 0 orange, inset 3px 0 0 0 orange, 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  z-index: 1000; /* Ensure it is above other elements */
`;

export const RoundButton = styled.button`
  background-color: orange;
  border: 2px solid black;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: black;

  &:hover {
    background-color: #e08e0b;
  }

  .icon {
    fill: black; /* Ensure the SVG icon is black */
    width: 24px; /* Adjust size as needed */
    height: 24px; /* Adjust size as needed */
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
