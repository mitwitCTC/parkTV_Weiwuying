function time(format, Valid_type, times) {
    // 主機時間
    let now = new Date()
    // 轉換後時間格式
    let timeFormat = ""
    now.setUTCHours(now.getUTCHours() + 8)
    // <--抓取UTC時間轉換-->
    // UTC時間
    let UTC_year = now.getUTCFullYear()
    let UTC_month = (now.getUTCMonth() + 1)
    let UTC_date = now.getUTCDate()
    let UTC_hour = now.getUTCHours()
    let UTC_minutes = now.getUTCMinutes()
    let UTC_seconds = now.getUTCSeconds()
    // UTC+8(Taipei時間)

    // 判斷期限要求狀態(單純求時間/截止時間)
    if (Valid_type) {
        switch (Valid_type) {
            case 'y': {
                now.setUTCFullYear(UTC_year + times)
                break;
            }
            case 'm': {
                now.setUTCMonth(UTC_month + (times - 1))
                break;
            }
            case 'd': {
                now.setUTCDate(UTC_date + times)
                break;
            }
            case 'h': {
                now.setUTCHours(UTC_hour + 8 + times)
                break;
            }
            case 'M': {
                now.setUTCMinutes(UTC_minutes + times)
                break;
            }
            case 's': {
                now.setUTCSeconds(UTC_seconds + times)
                break;
            }
            default: {
                console.log('輸入的值無法判斷Valid種類')
                break;
            }
        }
    }

    // UTC+8(Taipei時間)
    let Taiwan_year = now.getUTCFullYear()
    let Taiwan_month = (now.getUTCMonth() + 1).toString()
    let Taiwan_date = (now.getUTCDate()).toString()
    let Taiwan_hour = (now.getUTCHours()).toString()
    let Taiwan_minutes = (now.getUTCMinutes()).toString()
    let Taiwan_seconds = (now.getUTCSeconds()).toString()

    if (Taiwan_month.length < 2) { Taiwan_month = `0${Taiwan_month}` }
    if (Taiwan_date.length < 2) { Taiwan_date = `0${Taiwan_date}` }
    if (Taiwan_hour.length < 2) { Taiwan_hour = `0${Taiwan_hour}` }
    if (Taiwan_minutes.length < 2) { Taiwan_minutes = `0${Taiwan_minutes}` }
    if (Taiwan_seconds.length < 2) { Taiwan_seconds = `0${Taiwan_seconds}` }

    // 以參數判斷顯示樣式
    switch (format) {
        case 'y2m2d2': {
            timeFormat = `${Taiwan_year}-${Taiwan_month}-${Taiwan_date}`
            break;
        }
        case 'h2M2s2': {
            timeFormat = `${Taiwan_hour}:${Taiwan_minutes}:${Taiwan_seconds}`
            break;
        }
        case 'h2M2': {
            timeFormat = `${Taiwan_hour}:${Taiwan_minutes}`
            break;
        }
        case 'id': {
            timeFormat = `${Taiwan_hour}${Taiwan_minutes}${Taiwan_seconds}`
            break;
        }
        default: {
            timeFormat = `${Taiwan_year}-${Taiwan_month}-${Taiwan_date} ${Taiwan_hour}:${Taiwan_minutes}:${Taiwan_seconds}`
        }
    }
    return timeFormat;
}
module.exports = {
    /* 
    format: 顯示方式; 
    vaild_type: 截止時間(年y月m日d/時h分M秒s); 
    time: 時間
    */
    now(format) {
        let now = time(format)
        return now;
    },

    valid(format, Valid_type, times) {
        let Valid_time = time(format, Valid_type, times)
        return Valid_time;
    }
}