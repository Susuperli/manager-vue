export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function sleepSync(ms) {
  const start = Date.now()
  while (Date.now() - start < ms) {}
}
