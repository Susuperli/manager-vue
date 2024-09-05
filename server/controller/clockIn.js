const { calculateDiff } = require('../utils')

const eventArray2Object = (eventArray = []) => {
  const obj = {}
  eventArray.forEach((event) => {
    const { date } = event

    if (obj[date]) {
      obj[date].push(event)
    } else {
      obj[date] = [event]
    }
  })

  return obj
}

const getTotal = (eventArray) => {
  const dateObj = eventArray2Object(eventArray)

  let total = 0
  for (let key in dateObj) {
    const item = dateObj[key]
    const start = item[0].start
    const end = item[1]?.end

    const dayTotal = end ? calculateDiff(start, end, 'YYYY-MM-DD HH:mm:ss', 'seconds') : 0
    total = total + dayTotal
  }

  return total
}

module.exports = { eventArray2Object, getTotal }
