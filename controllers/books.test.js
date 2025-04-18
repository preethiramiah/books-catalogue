const { renderBooksList } = require('./books')
const { getBooks } = require('../models/books')

jest.mock('../models/books')

describe('renderBooksList', () => {
  let req, res
  const mockResponse = {
    count: 1,
    results: [
      { id: 1, title: 'Frankenstein', authors: [{ name: 'Mary Shelley' }] }
    ]
  }

  beforeEach(() => {
    getBooks.mockResolvedValue(mockResponse)

    req = {
      query: {
        search: 'Frankenstein',
        page: '1',
        topic: '',
        ids: '',
        copyright: '',
      },
    }

    res = {
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should render the index page with correct data', async () => {
    await renderBooksList(req, res)

    expect(res.render).toHaveBeenCalledWith('pages/index', {
      books: mockResponse.results,
      count: 1,
      totalPages: 1,
      currentPage: 1,
      query: req.query,
      queryString: 'search=Frankenstein&topic=&ids=&copyright=',
    })
  })

  it('should respond with status 500 and error message when getBooks throw error', async () => {
    getBooks.mockRejectedValue(new Error('Something went wrong'))

    await renderBooksList(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith('Error in renderBooksList: Something went wrong')
  })
})
