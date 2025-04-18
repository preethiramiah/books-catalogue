const { computeQueryParams, getBooks } = require('./books')

describe('computeQueryParams', () => {
  it('should return an empty string when no parameters are provided', () => {
    expect(computeQueryParams()).toEqual('')
    expect(computeQueryParams({})).toEqual('')
  })

  it('should return only the params which are provided', () => {
    expect(computeQueryParams({ page: 2 })).toEqual('&page=2')
    expect(computeQueryParams({
      page: 3,
      search: null,
      topic: undefined,
      ids: '99',
    })).toEqual('&page=3&ids=99')
  })

  it('should return all parameters correctly encoded', () => {
    const result = computeQueryParams({
      page: 1,
      search: 'Frankenstein',
      topic: 'Science Fiction',
      ids: '84,85',
      copyright: 'false'
    })
    expect(result).toEqual(
      '&page=1&search=Frankenstein&topic=Science%20Fiction&ids=84%2C85&copyright=false'
    )
  })

  it('should handle special characters in parameters', () => {
    const result = computeQueryParams({
      topic: 'Sci-Fi & Fantasy',
    })
    expect(result).toEqual('&topic=Sci-Fi%20%26%20Fantasy')
  })
})

describe('computeQueryParams', () => {
  const mockResponse = {
    count: 1,
    results: [
      { id: 1, title: 'Frankenstein', authors: [{ name: 'Mary Shelley' }] }
    ]
  }

  beforeEach(() => {
    global.fetch = jest.fn()
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })
  })

  afterEach(() => {
    fetch.mockClear()
    jest.clearAllMocks()
  })

  it('should call fetch with GUTENDEX JSON API when no query params are provided', async () => {
    const data = await getBooks()

    expect(fetch).toHaveBeenCalledWith('https://gutendex.com/books/')
    expect(data).toEqual(mockResponse)
  })

  it('should call fetch with correct URL when query params are provided', async () => {
    const data = await getBooks({ search: 'Frankenstein', page: 1 })

    expect(fetch).toHaveBeenCalledWith('https://gutendex.com/books/?&page=1&search=Frankenstein')
    expect(data).toEqual(mockResponse)
  })

  it('should throw error when status is other than ok', async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: async () => null,
    })

    try {
      await getBooks({ search: 'Test', page: 2 })
    } catch (error) {
      expect(fetch).toHaveBeenCalledWith('https://gutendex.com/books/?&page=2&search=Test')
      expect(error.message).toEqual('Error in getBooks: ')
    }
  })

  it('should throw error when fetch fails', async () => {
    fetch.mockRejectedValue(new Error('API Error'))
    try {
      await getBooks({ search: 'Frankenstein', page: 1 })
    } catch (error) {
      expect(fetch).toHaveBeenCalledWith('https://gutendex.com/books/?&page=1&search=Frankenstein')
      expect(error.message).toEqual('API Error')
    }
  })
})
