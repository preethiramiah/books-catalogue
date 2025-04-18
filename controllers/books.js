const { getBooks } = require('../models/books')
const { COUNT_PER_PAGE } = require('../constants/books')

async function renderBooksList (req, res) {
  try {
    const currentPage = req.query.page && !isNaN(req.query.page) ? Number(req.query.page) : null
    const books = await getBooks(req.query)
    const { results, count, next, previous } = books || {}
    res.render(
      'pages/index',
      {
        books: results,
        count,
        totalPages: Math.ceil(count / COUNT_PER_PAGE),
        next,
        previous,
        currentPage: currentPage || null,
        query: req.query,
        queryString: `search=${req.query.search || ''}&topic=${req.query.topic || ''}&ids=${req.query.ids || ''}&copyright=${req.query.copyright || ''}`,
      }
    )
  } catch (error) {
    console.error('Error in renderBooksList: ', error.message)
    res.status(500).send('Error in renderBooksList: ', error.message)
  }
}

module.exports = {
  renderBooksList,
}
