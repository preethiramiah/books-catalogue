function gotoKeydownHandler (event, totalPages) {
  if (event.key !== "Enter" && event.keyCode !== 13) return

  const currentPage = event.target.value && !isNaN(event.target.value) ? Number(event.target.value) : null
  if (!currentPage) window.location.href = window.location.origin
  if (currentPage > totalPages) return
  window.location.href = window.location.origin + `/?page=${event.target.value}`
}
