import React from "react";
import { StyledRegisterVideo } from "./styles";


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

export default function RegisterVideo() {
    const formCadastro = useForm({ 
        initialValues: { titulo: "", url: "" }
    });

    const [formVisivel, setFormVisivel] = React.useState(false);
    // console.log(formVisivel)

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

