import { createContext, useState } from 'react';

import {backendURL, loginEndpoint, secretsEndpoint} from '../defines.mjs'

export const context = createContext()

function Context ({children}) {

    const [ state, setState ] = useState({
        token: null,
        secrets: null,
    })

    const myContext = {
        state,
        actions: {
            setToken: function (token) {
                const newState = {...state, token}
                setState(newState)
            },
            setSecrets: function (secrets) {
                const newState = {...state, secrets}
                setState(newState)
            },
            deleteToken: function () {
                this.setToken(null)
            },
            getAPIToken: async function (username, password) {
                const Authorization = `Basic ${btoa(username+':'+password)}`
                const response = await fetch(backendURL+loginEndpoint,{
                    headers: {
                        Authorization
                        //Authorization: `Basic ${btoa(username+':'+password)}`,
                    }
                })
                if (response.status === 200) {
                    this.setToken( await response.text() )
                }
            },
            getAPISecrets: async function () {
                const response = await fetch(backendURL+secretsEndpoint,{
                    headers: {
                        Authorization: "Bearer "+state.token
                    }
                })
                if (response.status === 200 ) {
                    this.setSecrets( await response.text() )
                }
                if (response.status === 401 ) {
                    this.deleteToken()
                }
            }
        }
    }
    

    return (
        <context.Provider value={myContext}>
            {children}
        </context.Provider>
    )

}

export default Context