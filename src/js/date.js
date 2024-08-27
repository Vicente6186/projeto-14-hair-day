// Data atual
const actualDate = new Date()
const actualYear = actualDate.getFullYear()
const actualMonth = (actualDate.getMonth() + 1).toString().padStart(2, '0')
const actualDay = actualDate.getDate().toString().padStart(2, '0')
const actualHour = actualDate.getHours()
const actualDateFormat = `${actualYear}-${actualMonth}-${actualDay}`


export {actualDate, actualYear, actualMonth, actualDay, actualHour, actualDateFormat}