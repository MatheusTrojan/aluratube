import styled from "styled-components";

export const StyledFavoritos = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-left: 16px;
    padding: 16px;
    overflow: hidden;
    width: 100%;

    .lista-favoritos {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .elemento-favorito {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    h2 {
        font-size: 16px;
        margin-bottom: 16px;
        text-transform: capitalize;
    }

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%
    }

    h3 {
        font-size: 12px;
        text-transform: capitalize;
    }
`