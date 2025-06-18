const express = require('express')
const dayjs = require('dayjs')

const { getResponseInstance, calculateDiff } = require('../utils')
const { USER_ID } = require('../constance')
const { createRecord, getRecord, updateRecord } = require('../services/ClockIn')
const { getTotal } = require('../controller/clockIn')

const router = express.Router()

const dayjsCN = (date) => dayjs(date).tz('Asia/Shanghai')

router.post('/do', async (req, res, next) => {
  const result = getResponseInstance()
  const userId = req.cookies?.[USER_ID] ?? 'liyongzhi'
  const current = dayjsCN().format('YYYY-MM-DD HH:mm:ss')
  const date = dayjsCN().format('YYYY-MM-DD')
  const month = dayjsCN().format('YYYY-MM')

  let success = false
  // 获取记录，判断是否为第一次记录
  const filter = { username: userId, date }
  const data = {
    username: userId,
    start: current,
    end: current,
    date,
    month
  }
  const records = await getRecord(filter)

  if (records.length <= 1) {
    // 新插入一条
    records.length === 0 ? (data.content = '上班打卡') : (data.content = '下班打卡')

    const create = await createRecord(data)
    if (create !== false) success = true
  } else {
    // 更新记录
    data.content = '下班打卡'
    const update = await updateRecord(filter, data)
    if (update !== false) success = true
  }

  console.log(`/clock-in/do ${userId} ${current} 打卡成功`)

  result.success = success
  if (!success) result.msg = '更新失败'

  res.send(result)
  next()
})

router.get('/get', async (req, res, next) => {
  const { month } = req.query
  const userId = req.cookies?.[USER_ID] ?? 'liyongzhi'
  const filter = { username: userId, month }
  const result = getResponseInstance()

  const records = await getRecord(filter)
  if (records === false) {
    result.success = false
    result.msg = '日期获取失败，请稍后重试~'
  } else {
    const list = records.map((record) => {
      return {
        start: record.start,
        end: record.end,
        content: record.content,
        month: record.month,
        date: record.date
      }
    })
    const total = getTotal(list)
    const dayNum = Math.floor(list.length / 2)

    result.data = {
      list,
      total,
      dayNum
    }
  }

  res.send(result)
  next()
})

router.post('/update', async (req, res, next) => {
  const result = getResponseInstance()

  const { date, start, newDate, newStart } = req.body
  const userId = req.cookies?.[USER_ID]

  const filter = { date, start, username: userId }
  const data = { date: newDate, start: newStart, end: newStart }

  const update = await updateRecord(filter, data)

  if (update === false) {
    result.success = false
    result.msg = '更新失败'
  }

  res.send(result)
  next()
})

module.exports = router
