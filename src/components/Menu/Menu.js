import styled from "styled-components";
import DarkModeSwitch from "./components/DarkModeSwitch";
import Search from "./components/Search";

const StyledMenu = styled.header`
  display: flex;
  flex-direction: row;
  height: 56px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.backgroundLevel1 || "#FFFFFF"};
  border: 1px solid ${({ theme }) => theme.borderBase || "#e5e5e5"};
  align-items: center;
  padding: 0 16px;
  gap: 0.5rem;
  position: fixed;
  width: 100%;
  .logo-completa{
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .logo {
    width: 100%;
    width: 40px;
    @media (min-width: 600px) {
      max-width: 60px;
    }
  }
  .logo-texto {
    color: ${({ theme }) => theme.textColorBase || "#222222"};
    font-size: 1.5rem;
    font-weight: 400;
    margin-top: 0.2rem;
  }
`;

export default function Menu({valorDoFiltro, setValorDoFiltro}) {
  return (
    <StyledMenu>
      <div className="logo-completa">
        <Logo />
        <h2 className="logo-texto">trojan<strong>Tube</strong></h2>
      </div>
      <Search valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
      <DarkModeSwitch />
    </StyledMenu>
  );
}

function Logo() {
  return (
    <img className="logo" src="https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-5-2.png" />
  )
}