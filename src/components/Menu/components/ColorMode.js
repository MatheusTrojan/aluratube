import React from "react";

export const ColorModeContext = React.createContext({
    mode: "",
    setMode: () => { alert("Você precisa me configurar primeiro!") },
    toggleMode: () => { alert("Você precisa me configurar primeiro!") }
});

export default function ColorModeProvider(props) {

    const [mode, setMode] = React.useState(props.initialMode);

    function toggleMode() {
        if (mode == "dark") setMode("light");
        if (mode == "light") setMode("dark");
    }

    return (
        // Entender o pq esse value está sendo ignorado na const contexto do MyApp
        // Foi ignorando por causa da ordem de execução dos elementos, então foram criadas funções para "forçar" a execução dos itens na ordem correta (providerwrapper)
        <ColorModeContext.Provider value={{ mode: mode, setMode: setMode, toggleMode: toggleMode }}>
            {props.children}
        </ColorModeContext.Provider>
    )
}