import { useContext } from "react";

import { context } from "../../services/ContextProvider";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";

function Session(){

    const { state } = useContext(context)

    return (
        <div id="Session">
            { state.token ? <Logout/> : <Login/> }
        </div>
    )

}

export default Session