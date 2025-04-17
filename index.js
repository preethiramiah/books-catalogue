const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.static('public'))
app.use('/scripts', express.static(path.join(__dirname, 'scripts')))

const bookRouter = require('./routes/books')

app.set('view engine', 'ejs')

app.use('/', bookRouter)

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
