import { useContext } from "react"
import { context } from "./ContextProvider"

function Authorization({children}) {

    const { state } = useContext(context)

    return (
        <div id="Authorization">
            { state.token ? children : <h1>Please, login for view this content.</h1>}
        </div>
    )
}

export default Authorization