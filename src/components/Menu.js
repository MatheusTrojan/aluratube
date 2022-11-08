import styled from "styled-components";
import config from "../../config.json"

const StyledMenu = styled.header`
  display: flex;
  flex-direction: row;
  height: 56px;
  justify-content: left;
  background-color: ${({ theme }) => theme.backgroundLevel1 || "#FFFFFF"};
  border: 1px solid ${({ theme }) => theme.borderBase || "#e5e5e5"};
  align-items: center;
  padding: 0 16px;
  gap: 0.5rem;
  position: fixed;
  width: 100%;
  .logo {
    width: 100%;
    width: 40px;
    @media (min-width: 600px) {
      max-width: 60px;
    }
  }
  .logo-texto {
    font-size: 1.5rem;
    font-weight: 400;
  }
`;

export default function Menu() {
  return (
    <StyledMenu>
      <div>
        <Logo />
      </div>
      <h2 className="logo-texto">trojan<strong>Tube</strong></h2>
    </StyledMenu>
  );
}

function Logo() {
  return (
    <img className="logo" src="https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-5-2.png" />
  )
}