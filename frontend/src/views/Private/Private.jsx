import { useContext, useEffect } from "react"
import { context } from "../../services/ContextProvider"

function Private () {

    const { state, actions } = useContext(context)

    useEffect(
        ()=>{
            actions.getAPISecrets()
        },
        []
    )

    return (
        <div id="Private">
            <h2>Private</h2>
            {state.secrets}
        </div>
    )
}

export default Private