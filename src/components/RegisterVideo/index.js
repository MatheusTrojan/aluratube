import React from "react";
import { StyledRegisterVideo } from "./styles";

export default function RegisterVideo() {

    const [formVisivel, setFormVisivel] = React.useState(false);
    console.log(formVisivel)
    const [values, setValues] = React.useState({ titulo: "", url: ""})

    /* O que precisamos para o form funcionar:
        - pegar os dados, que precisam vir do state
            - titulo
            - url do video
        - precisa ter um onSubmit no formulario
        - limpar o formulario após o submit
    */

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/*Operadores Ternários e de Curto-Circuito*/}
            {formVisivel
                ? (
                    <form>
                        <div>
                            <button className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input placeholder="Título do vídeo" value={values.titulo} />
                            {/* <input placeholder="URL" value={values.url} /> */}
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                : false}

        </StyledRegisterVideo>
    )
}

