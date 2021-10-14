const express = require('express')
const config = require('config')
const app = express()

const PORT = config.get('port') || 5000

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/contact', require('./routes/contact.routes'))

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))