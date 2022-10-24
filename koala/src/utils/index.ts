const tool: any = {}

/* 获取时间戳 */
tool.getTimestamp = (curDate: any) => {
    typeof curDate === 'string' && (curDate = tool.replaceTime(curDate))
    return new Date(curDate).getTime()
}

/* 时间基础转化 */
tool.dateToOb = (curDate: any) => {
    const year = curDate.getFullYear()
    const month = (curDate.getMonth() + 1) > 9 ? `${curDate.getMonth() + 1}` : `0${curDate.getMonth() + 1}`
    const day = curDate.getDate() > 9 ? curDate.getDate() : `0${curDate.getDate()}`
    const hour = curDate.getHours() > 9 ? curDate.getHours() : `0${curDate.getHours()}`
    const min = curDate.getMinutes() > 9 ? curDate.getMinutes() : `0${curDate.getMinutes()}`
    const sec = curDate.getSeconds() > 9 ? curDate.getSeconds() : `0${curDate.getSeconds()}`
    return { year, month, day, hour, min, sec }
}

/* 截取任意时间 */
tool.getAnyDate = (curDate: any = new Date(), isTime = false, isChinese = false) => {
    typeof curDate === 'string' && (curDate = tool.replaceTime(curDate))
    typeof curDate === 'number' && (curDate > 1000000000000 ? '' : curDate *= 1000)
    curDate = new Date(curDate)
    const curDateOb = tool.dateToOb(curDate)
    if (isChinese) {
        if (isTime) return `${curDateOb.year}年${curDateOb.month}月${curDateOb.day}日 ${curDateOb.hour}时${curDateOb.min}分${curDateOb.sec}秒`
        else return `${curDateOb.year}年${curDateOb.month}月${curDateOb.day}日`
    } else {
        if (isTime) return `${curDateOb.year}-${curDateOb.month}-${curDateOb.day} ${curDateOb.hour}:${curDateOb.min}:${curDateOb.sec}`
        else return `${curDateOb.year}-${curDateOb.month}-${curDateOb.day}`
    }
}

// 倒计时  end:结束时间(秒)
tool.timeLast = (end: number, start = new Date().getTime() / 1000) => {
    let _time = start ? start : new Date().getTime() / 1000
    let _overTime = end
    let range = _overTime - _time
    let days = Math.floor(range / 3600 / 24)
    let dayLeve = range % (3600*24)
    let hours = Math.floor(dayLeve / 3600) > 9 ? Math.floor(dayLeve / 3600) : '0' + Math.floor(dayLeve / 3600)
    let minuteLeve = dayLeve % 3600
    let minutes = Math.floor(minuteLeve / 60) > 9 ? Math.floor(minuteLeve / 60) : '0' + Math.floor(minuteLeve / 60)
    let seconds = Math.floor(minuteLeve % 60) > 9 ?  Math.floor(minuteLeve % 60) : '0' +  Math.floor(minuteLeve % 60)
    return {days, hours, minutes, seconds}
}

export default tool