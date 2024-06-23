// src/pages/TaskDetailPage/TaskDetailPage.styles.ts
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fff; /* White background */
`;
export const TaskInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 60px; /* Position it below the OptionsBar */
  z-index: 1; /* Ensure it is above the Flow component */
`;

export const TaskInfoBox = styled.div`
  background-color: #f9f9f9;
  border: 2px solid black;
  border-bottom-right-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  z-index: 1; /* Ensure it is above the Flow component */
  background-color: #333; /* Add background color */
  box-shadow: inset 0 -3px 0 0 orange, inset -3px 0 0 0 orange, 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0;
    font-size: 24px;
    color: #fff;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #fff
  }
`;

export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  border-bottom-left-radius: 20px;
  padding: 10px;
  margin-top: 10px; /* Adjust to ensure visibility */
  width: auto; /* Adjust width as needed */
  box-shadow: inset 0 -3px 0 0 orange, inset 3px 0 0 0 orange, 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  z-index: 2; /* Ensure it is above the TaskInfoBox and Flow component */
  background-color: #333; /* Add background color */
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

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh - 60px); /* Adjust based on the height of the OptionsBar */
  box-sizing: border-box;
  margin-top: 20px; /* Ensure it doesn't overlap with the TaskInfoContainer */
  z-index: 0; /* Ensure it is below the TaskInfoContainer and ButtonsBox */
`;
