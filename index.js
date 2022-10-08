import express from 'express'

import {StatusHttp} from './StatusHttp.js'

import kodersRouter from './routers/koders.router.js'

const server = express()

// Middlewares

function validOrange(request, response, next) {
    console.log('1. Este es el middleware de aplicación')
    request.isGoodOrange = false
    if(request.isGoodOrange) {
        next()
        return
    }
    response.status(400).json({
        message: '¡Oh, no! ¡Las naranjas están muy mal! >.<'
    })
}

server.use(validOrange)

// request, response, error -> object / next -> method
server.use((request, response, next) => {
    console.log('2. Este es otro middleware')
    next() 
})


// Routers

server.use('/koders', kodersRouter)

// Endpoint

server.get('/', (request, response) => {
    try {
        console.log('Desde GET')
        console.log(request.oranges)
        response.json({
            message: 'Middlewares en Express'
    })
    } catch (error) {
        response.status(400).json({
            sucess: false,
            message: error.message
        })
    }
})

server.get('/hola', (request, response, next) => {
    try {
        throw new StatusHttp('Ocurrió un error', 500)


        response.json({
            message: 'Hola desde Express'
        })
    } catch (error) {
        // response.status(400).json({
        //     sucess: false,
        //     message: error.message
        // })
        next(error)
    }
})

function handleErrors(error, request, response, next) {
    response.status(error.status || 500).json({
        sucess: false,
        message: 'Server internal error'
    })
}

server.use(handleErrors)

/*
Middleware -> Es una función

(request, response, next) => {}

Tres niveles de middleware:
    1. Nivel de aplicación o servidor
    2. Nivel de router
    3. Nivel de endpoint

server.use(middleware) -> a nivel de aplicacion o server

*/


server.listen(8080, () => {
    console.log('Server listening on port 8080 :DD')
})