import { useContext } from "react"
import { context } from "../../services/ContextProvider"

function Logout () {

    const { actions } = useContext(context)

    function clickHandler() {
        actions.deleteToken()
    }

    return (
        <div id="Logout">
            <button onClick={clickHandler}>Logout</button>
        </div>
    )
}

export default Logout