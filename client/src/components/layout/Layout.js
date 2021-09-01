import { ContextProvider } from '../../context/UserContext'

export default function Layout(props) {
    return (
        <ContextProvider>
            {props.children}
        </ContextProvider>
    )
}