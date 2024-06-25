// src/pages/HomePage/HomePage.styles.ts
import styled from 'styled-components';
import heroImage from '../../assets/heroimages/hero_image_2.webp';

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  margin-top: 40px; /* Add top margin to move the page down */
`;

export const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Align items to the top */
  width: 100%;
  height: 80%;
  box-sizing: border-box;
  padding: 20px;
`;

export const SideSection = styled.div`
  width: 15%;
  height: 75%;
  background-color: rgba(255, 255, 255, 1); /* Light background for readability */
  padding: 20px;
  border-radius: 8px;
  border: 2px solid black;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 90px; /* Move the section up */
`;

export const Button = styled.button`
  padding: 16px 32px;
  margin: 0 20px;
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

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff; /* Change text color to white for better contrast */
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SectionContent = styled.p`
  font-size: 1rem;
  color: black;
  text-align: left;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const Footer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  @media (max-width: 768px) {
    bottom: 10px;
    padding-right: 10px;
  }
`;
