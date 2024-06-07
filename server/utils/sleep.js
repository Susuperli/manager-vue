function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function sleepSync(ms) {
  const start = Date.now()
  while (Date.now() - start < ms) {}
}

module.exports = {
  sleep,
  sleepSync
}
