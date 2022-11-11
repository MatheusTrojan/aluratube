import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu/Menu.js";
import { StyledTimeline } from "../src/components/Timeline.js";
import { StyledFavoritos } from "../src/components/Favoritos";
import { videoService } from "../src/services/videoService";

function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({}); //config.playlists

    React.useEffect(() => {
        console.log("useEffect")

        service
            .getAllVideos()        
            .then((dados) => {
                console.log(dados.data)

                const novasPlaylists = {};

                dados.data.forEach((video) => {  
                    if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist] = [
                        video,
                        ...novasPlaylists[video.playlist],
                    ];
                })

                setPlaylists(novasPlaylists)
            });
        
    }, [])
    // usamos o useEffect para evitar um loop infinito de ficar recarregando a pagina para qualquer alteração... e como queremos que seja ativado apenas 1x, precisa colocar o array vazio como segundo parâmetro
    // console.log(playlists)
    //console.log(config.playlists)


    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1
            }}>
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
    background-color: ${({ theme }) => theme.backgroundLevel1};

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