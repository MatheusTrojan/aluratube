import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu/Menu.js";
import { StyledTimeline } from "../src/components/Timeline.js";
import { StyledFavoritos } from "../src/components/Favoritos";

function HomePage() {
    const estilosDaHomePage = {}

    const [valorDoFiltro, setValorDoFiltro] = React.useState("")

    //console.log(config.playlists)

    return (
        <>
            <CSSReset />
            <div style={estilosDaHomePage}>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
                <Favoritos favoritos={config.favoritos} />
            </div>
        </>
    );
}

export default HomePage

const StyledHeader = styled.div`
    .user-info > img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid black;
    }
    .user-info {
        align-items: center;
        display: flex;
        gap: 1rem;
        padding: 1rem 2rem;
        width: 100%;
    }
`;

const StyledBanner = styled.div`
    /* background-image: url(${config.bg}); */
    background-image: url( ${ ({ bg }) => bg});
    background-position: 0 -650px;
    background-size: cover;
    height: 230px;
    width: 100%;
`

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg = {config.bg}/>
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

function Timeline({searchValue, ...props}) {
    // console.log("Dentro do componente ", props.playlists)
    const playlistNames = Object.keys(props.playlists)

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName]
                // console.log(playlistName)
                // console.log(videos)
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();

                                return titleNormalized.includes(searchValueNormalized)

                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
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
                    <section className="elemento-favorito" key={nomeFavorito}>
                        <img src={`https://github.com/${favoritos.github}.png`} />
                        <h3>{favoritos.name}</h3>                          
                    </section>
                )
            })}
            </div>
        </StyledFavoritos>
    )
}