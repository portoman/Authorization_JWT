import express  from "express";
import jwt from "jsonwebtoken";

const app = express();

const secret = "abc123.secreto.serio" // Esto debería de estar en un .env

const user = {
    username: "Daniel",
    password: "abc123.",
    accessLevel: 0,
}

function decodeBasicToken(request) {
    const [ authType, b64token ] = request.headers.authorization.split(" ")
    const tokenBuffer = new Buffer.from(b64token, "base64")
    const token = tokenBuffer.toString()
    return token.split(":")
}

function authMiddleware (req, res, next) {
    try {
        const [ method, token ] = req.headers.authorization.split(" ")
        const { level } = jwt.verify(token,secret)
        res.locals.level = level // Paso el user name para uso en los controllers
        next()
    } catch (err) {
        res.sendStatus(401)
    }
}

app.get("/login/", (req, res)=>{
    const [ username, password ] = decodeBasicToken(req)
    if ( 
        username === user.username && password === user.password
    ) {
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

app.get("/secretos/", authMiddleware, (req, res)=>{
    res.send(`El secreto de la vida, el universo y de todo: 42`)
})

app.listen(3000, ()=>{console.log("Ready...");})