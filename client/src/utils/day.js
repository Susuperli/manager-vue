import dayjs from 'dayjs'

export const calculateDiff = (start, end, formatType, diffType) => {
  if (!start || !end) {
    return 0
  }

  const startDate = dayjs(start, formatType)
  const endDate = dayjs(end, formatType)
  const diff = endDate.diff(startDate, diffType)

  return diff
}

export const seconds2Hours = (seconds) => {
  const durationObj = dayjs.duration(seconds, 'seconds')
  const hours = durationObj.asHours()

  return hours.toFixed(2)
}

export const formattedTime = (_totalSeconds) => {
  const tag = _totalSeconds < 0 ? '-' : ''
  const totalSeconds = _totalSeconds < 0 ? -_totalSeconds : _totalSeconds

  // 将秒数转换为 dayjs.duration 对象
  const timeDuration = dayjs.duration(totalSeconds, 'seconds')
  // 格式化为 HH:mm:ss
  const formattedTime = `${tag}${String(Math.floor(timeDuration.asHours())).padStart(2, '0')}小时${String(timeDuration.minutes()).padStart(2, '0')}分钟${String(timeDuration.seconds()).padStart(2, '0')}秒`

  return formattedTime
}
