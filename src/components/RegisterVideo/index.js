import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js"

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues)

    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value; 
            const name = evento.target.name
            // console.log(evento.target)
            // console.log(evento.target.name)
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PROJECT_URL = 'https://bqntwihuowpidgpjbhqz.supabase.co'
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbnR3aWh1b3dwaWRncGpiaHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzY5MDMsImV4cCI6MTk4Mzc1MjkwM30.0Qfu0meAPxITM1_bEJorrTFKGK_DwgniSFx2VlFcqQA"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export default function RegisterVideo() {
    const formCadastro = useForm({ 
        initialValues: { titulo: "", url: "" }
    });

    const [formVisivel, setFormVisivel] = React.useState(false);
    // console.log(formVisivel)

    // console.log(supabase.from("videos").insert())

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
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values)

                        // Contrato entre o front e o backend
                        supabase.from("videos").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos"
                        })
                        .then((oqueveio) => {
                            console.log(oqueveio)
                        })

                        .catch((error) => {
                            console.log(error)
                        })

                        setFormVisivel(false);
                        formCadastro.clearForm()
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input 
                                placeholder="Título do vídeo" 
                                name="titulo"
                                value={formCadastro.values.titulo} 
                                onChange={formCadastro.handleChange}
                            />
                            <input 
                                placeholder="URL" 
                                name="url"
                                value={formCadastro.values.url} 
                                onChange={formCadastro.handleChange}
                            />
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

