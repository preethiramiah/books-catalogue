const GUTNEDEX_API = 'https://gutendex.com/books/'

async function getBooks (url = GUTNEDEX_API) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Error in getBooks: ', `${res.status}: ${res.statusText}` )
  }

  const data = await res.json()
  return data
}

module.exports = { getBooks }
