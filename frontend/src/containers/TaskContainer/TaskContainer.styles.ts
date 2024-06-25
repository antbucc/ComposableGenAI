import styled from 'styled-components';

export const TaskContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TaskItem = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  margin: 8px 0;
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid #333;
  position: relative; /* Ensure the delete button is positioned correctly */

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
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%); /* Center vertically */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;  /* Increase button size */
  height: 40px; /* Increase button size */

  svg {
    fill: #ff0000;
    width: 30px; /* Adjust icon size */
    height: 30px; /* Adjust icon size */
  }

  &:hover svg {
    fill: #cc0000;
  }
`;
