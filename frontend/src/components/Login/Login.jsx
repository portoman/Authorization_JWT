import { useContext } from "react"

import { context } from "../../services/ContextProvider"

function Login () {

    const { actions } = useContext(context)

    function loginHandler(event) {
        event.preventDefault()
        actions.getAPIToken(
            event.target.elements.username.value,
            event.target.elements.password.value,
        )
    }

    return (
        <form id="Login" onSubmit={loginHandler}>
            <input type="text" name="username"/>
            <input type="password" name="password" id="" />
            <input type="submit" value="Login" />
        </form>
    )
}

export default Login