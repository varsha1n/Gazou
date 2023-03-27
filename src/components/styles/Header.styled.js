import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.header};
  padding: 40px 0;
  text-color: "#ebfbff";
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 85px;
  h1 {
    position: absolute;
    font-size: 56px;
    left: 680px;
    top: 15px;
  }
`;

export const Logo = styled.img`
  position: absolute;
  left: 820px;
  top: -60px;
`;
