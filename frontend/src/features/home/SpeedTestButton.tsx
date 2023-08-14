import React from 'react';
import { Button, styled, keyframes } from '@mui/material';

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 120, 212, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(0, 120, 212, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 120, 212, 0);
  }
`;

const StyledButton = styled(Button)(({ theme }) => ({
  background: "transparent",
  color: "#0078D4",
  width: "15rem",
  height: "15rem",
  borderRadius: "50%",
  margin: "20px 0",
  fontSize: "3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: `${pulseAnimation} 4s infinite`,
  position: "relative",
  zIndex: 1,
  borderColor: "linear-gradient(#2CE4D1, #1FA4E8)",
  borderWidth: "3px",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: "2px",
    left: "2px",
    right: "2px",
    bottom: "2px",
    borderRadius: "50%",
    borderColor: `linear-gradient(#2CE4D1, #1FA4E8)`,
    zIndex: -1,
    margin: "-4px", // Adjusting the border width
  },
  "&::after": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "50%",
    background: "transparent",
    zIndex: -2,
  }
}));

interface SpeedTestButtonProps {
  startAllTests: () => void;
}

const SpeedTestButton: React.FC<SpeedTestButtonProps> = ({ startAllTests }) => {
  return (
    <StyledButton variant="outlined" size="large" onClick={startAllTests}>
      Go
    </StyledButton>
  );
};

export default SpeedTestButton;