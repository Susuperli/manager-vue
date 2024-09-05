const dayjs = require('dayjs')

/**
 * @description 计算日期差值
 * @param {*} start 开始时间
 * @param {*} end 结束时间
 * @param {*} formatType 格式化方式
 * @param {*} diffType 输出单位
 * @returns
 */
const calculateDiff = (start, end, formatType, diffType) => {
  if (!start || !end) {
    return 0
  }

  const startDate = dayjs(start, formatType)
  const endDate = dayjs(end, formatType)
  const diff = endDate.diff(startDate, diffType)

  return diff
}

module.exports = {
  calculateDiff
}
