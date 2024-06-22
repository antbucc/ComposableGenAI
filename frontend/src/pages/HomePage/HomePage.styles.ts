// src/pages/HomePage/HomePage.styles.ts
import styled from 'styled-components';

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff; /* White background */
  height: 100vh;
  padding: 0 20px;
`;



export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: 80px;  /* Adjusting margin to account for navbar height */
  overflow: hidden;
  width: 100%;  /* Ensure main content takes full width */
  box-sizing: border-box;
`;

export const Button = styled.button`
  margin: 20px;
  padding: 16px 32px; /* Bigger button */
  background-color: orange; /* Button color */
  border: 2px solid black; /* Added black stroke */
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px; /* Bigger font size */
  color: black; /* Button text color */
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #e08e0b;
    transform: translateY(-2px);
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333; /* Dark grey text */
  margin-bottom: 20px;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666; /* Light grey text */
  margin-bottom: 40px;
  text-align: center;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  padding: 20px;
  border: 2px solid black; /* Added black stroke */
  border-radius: 5px;
  background-color: #f9f9f9; /* Light grey background for sections */
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333; /* Dark grey text */
  margin-bottom: 10px;
`;

export const SectionContent = styled.p`
  font-size: 1rem;
  color: black; /* Light grey text */
  text-align: center;
`;

export const Footer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
