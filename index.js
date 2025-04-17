const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs')

app.use('/', bookRouter)

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
