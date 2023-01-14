const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(`${__dirname}/dist`))

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
