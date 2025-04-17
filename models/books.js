const GUTENDEX_API = 'https://gutendex.com/books/'

function computeQueryParams (params) {
  const {
    search,
    topic,
    ids,
    copyright,
    page,
  } = params || {}
  return `${page ? `&page=${encodeURIComponent(page)}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}${topic ? `&topic=${encodeURIComponent(topic)}` : ''}${ids ? `&ids=${encodeURIComponent(ids)}` : ''}${copyright ? `&copyright=${encodeURIComponent(copyright)}` : ''}`
}

async function getBooks (params) {
  const queryParams = computeQueryParams(params)
  const res = await fetch(queryParams ? `${GUTENDEX_API}?${queryParams}` : GUTENDEX_API)
  if (!res.ok) {
    throw new Error('Error in getBooks: ', `${res.status}: ${res.statusText}` )
  }

  const data = await res.json()
  return data
}

module.exports = { getBooks }
