import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledFavoritos } from "../src/components/Favoritos"

function HomePage() {
    const estilosDaHomePage = {}

    //console.log(config.playlists)

    return (
        <>
            <CSSReset />
            <div style={estilosDaHomePage}>
                <Menu />
                <Header />
                <Timeline playlists={config.playlists} />
                <Favoritos favoritos={config.favoritos} />
            </div>
        </>
    );
}

export default HomePage

const StyledHeader = styled.div`
    .header-banner {
        width: 100%;
        height: 230px;
        object-fit: cover;
        object-position: 0 90%;
        margin-top: 50px;
    }
    .user-info > img {
        width: 80px;
        height: 80px;
        border-radius: 50%
    }
    .user-info {
        align-items: center;
        display: flex;
        gap: 1rem;
        padding: 1rem 2rem;
        width: 100%;
    }
`;

function Header() {
    return (
        <StyledHeader>
            <img className="header-banner" src={config.banner} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline(props) {
    // console.log("Dentro do componente ", props.playlists)
    const playlistNames = Object.keys(props.playlists)

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName]
                // console.log(playlistName)
                // console.log(videos)
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

function Favoritos(props) {
    const nomesFavoritos = Object.keys(props.favoritos)

    return (
        <StyledFavoritos>
            <h2>AluraTube Favoritos</h2>
            <div className="lista-favoritos">
            {nomesFavoritos.map((nomeFavorito) => {
                const favoritos = props.favoritos[nomeFavorito]
                // console.log(favoritos)
                return (
                    <section className="elemento-favorito">
                        <img src={`https://github.com/${favoritos.github}.png`} />
                        <h3>{favoritos.name}</h3>                          
                    </section>
                )
            })}
            </div>
        </StyledFavoritos>
    )
}