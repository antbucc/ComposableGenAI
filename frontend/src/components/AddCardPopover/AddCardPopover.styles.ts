import styled from 'styled-components';

export const FormContainer = styled.div`
  position: absolute;
  width: 30%;
  height: 80%; /* Set height to 80% of the page */
  padding: 60px 20px 20px 20px; /* Add padding at the top to account for the title bar */
  background: #fff;
  box-sizing: border-box;
  overflow-y: auto;
  z-index: 1001; /* Higher z-index to ensure it's on top of the flow */
  border: 2px solid #333; /* Optional: border for better visibility */
  border-radius: 10px; /* Optional: rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: shadow for depth */

  /* Hide scrollbar for Webkit browsers */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for other browsers */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

export const FormLabel = styled.label`
  display: block;
  margin: 10px 0 5px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  height: 150px; /* Increased height */
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  resize: none; /* Make text areas non-resizable */
`;

export const FormButton = styled.button`
  padding: 10px 20px;
  background-color: orange; /* Orange background color */
  border: 2px solid black; /* Black border */
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: #000;
  margin: 0 auto; /* Center align the button */
  display: block; /* Ensure the button takes only the necessary space */

  &:hover {
    background-color: #e08e0b; /* Darker orange on hover */
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #ff0000;
  }
`;

export const DropdownSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  height: auto;
`;

export const DropdownButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  color: #fff;

  &:hover {
    background-color: #21a1f1;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

interface DropdownMenuProps {
  show: boolean;
}

export const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 1002; /* Ensure dropdown is above other elements */
  display: ${props => (props.show ? 'block' : 'none')};
`;

export const TitleBand = styled.div`
  background-color: orange;
  width: 100%;
  height: 40px; /* Adjust height if needed */
  padding: 8px 0;
  border-bottom: 2px solid black;
  border-color: black;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  text-align: center;
  font-weight: bold;
  line-height: 40px; /* Center align text vertically */
`;
