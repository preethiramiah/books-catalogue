const GUTENDEX_API = 'https://gutendex.com/books/'

async function getBooks (currentPage) {
  const res = await fetch(currentPage ? `${GUTENDEX_API}?page=${currentPage}` : GUTENDEX_API)
  if (!res.ok) {
    throw new Error('Error in getBooks: ', `${res.status}: ${res.statusText}` )
  }

  const data = await res.json()
  return data
}

module.exports = { getBooks }
