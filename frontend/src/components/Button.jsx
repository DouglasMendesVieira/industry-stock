import theme from "../styles/theme";

export default function Button({children,danger,...props}){

    return(
        <button
            {...props}
            style={danger ? theme.dangerButton : theme.button}
        >
            {children}
        </button>
    );
}
