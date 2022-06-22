import express from "express";
import jwt from "jsonwebtoken";

const app = express();

const secret = "abc123.secreto.serio" // Esto debería de estar en un .env

const user = {
    username: "Daniel",
    password: "abc123.",
    accessLevel: 0,
}

function decodeBasicToken(request) {
    const [authType, b64token] = request.headers.authorization.split(" ")
    //Las siguientes 2 lineas sustituyen a atb (ascii to binary): Se pasa de asci a binario
    const tokenBuffer = new Buffer.from(b64token, "base64")
    const token = tokenBuffer.toString()
    return token.split(":")
}

function authMiddleware(req, res, next) {
    try {
        const [method, token] = req.headers.authorization.split(" ")
        // Verificación: Verify decodifica el token si es válido

        const { level } = jwt.verify(token, secret)
        res.locals.level = level // Paso el user name para uso en los controllers
        next()
    } catch (err) {
        res.sendStatus(401)
    }
}

//1. Endpoint Autenticación
app.get("/login/", (req, res) => {
    const [username, password] = decodeBasicToken(req)
    if (
        /* Aquí iria la comprobación de que el usuario y pass existan
       Si hay base de datos, y el usuario y contraseña están en la base de datos,
       aquí meteríamos una query de verificación
       */
        username === user.username && password === user.password
    ) {
        /*Creación de token/firma con un secret.
        En este token podemos incluir o no lo que queramos
        */
        const token = jwt.sign(
            {
                level: user.accessLevel
            },
            secret,
            {
                expiresIn: "1h",
            }
        )
        res.send(token)
    } else {
        res.sendStatus(401)
    }
})

//2. Uso del token
app.get("/secretos/", authMiddleware, (req, res) => {
    res.send(`El secreto de la vida, el universo y de todo: 42`)
})

app.listen(3000, () => { console.log("Ready..."); })