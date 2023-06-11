import express from 'express'
import cors from 'cors'
import apiRoutes from './api'

const port = 3000
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(apiRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

