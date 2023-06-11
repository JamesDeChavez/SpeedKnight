import express from 'express'
import apiRoutes from './api'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(apiRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

