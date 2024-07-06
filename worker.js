addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const ip = url.searchParams.get('ip')

  if (!ip) {
    return new Response('Parameter IP tidak ditemukan.', { status: 400 })
  }

  const apiUrl = `https://ip.cfvless.workers.dev/api?ip=${ip}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    return new Response(JSON.stringify(data, null, 2), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response('Terjadi kesalahan dalam memproses permintaan.', { status: 500 })
  }
}
