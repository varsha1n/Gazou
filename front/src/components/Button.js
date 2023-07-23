import styled from "styled-components";

export const Button = styled.button`
  border-radius: 10px;
  border: none;
  font-size: 20px;
  padding: 15px 60px;
  font-weight: 1000px;
  background-color: #e7e9eb;
  position: relative;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  &:hover {
    background-color: #e7e9eb;
    opacity: 0.75;
  }
`;
