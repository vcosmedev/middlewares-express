import express from 'express'

const router = express.Router()

// Middleware nivel router

router.use((request, response, next) => {
    console.log('Este es un middleware de Koders a nivel de router')
    next()
})

function myMiddleware(request, response, next) {
    console.log('Este es un middleware del endopoint GET /koders')
    next()
}

router.get('/',  myMiddleware, (request, response) => {
    try {
        response.json({
        message: 'Aquí estarán todos los Koders'
    })
    } catch (error) {
        next(error)
    }
})

router.post('/', (request, response) => {
    try {
        response.json({
        message: 'Aquí se crearán Koders'
    })
    } catch (error) {
        next(error)
    }
})

export default router