import { actualDateFormat } from "./date"
import { readAllSchedules } from "./schedule-crud"

const morningUl = document.getElementById('morning-ul')
const afternoonUl = document.getElementById('afternoon-ul')
const nightUl = document.getElementById('night-ul')
const dateFilter = document.getElementById('date-filter')

async function readSchedules({ date = false }) {
    try {
        morningUl.innerHTML = ''
        afternoonUl.innerHTML = ''
        nightUl.innerHTML = ''
        const schedules = await readAllSchedules({date})
        schedules.forEach(schedule => addScheduleHtml(schedule))
    } catch (error) {
        alert('Não foi possível recuperar os seus agendamentos!')
    }
}

function addScheduleHtml(schedule) {
    const name = schedule.name
    const hour = new Date(schedule.date).getHours()
    const newScheduleHtml = `<li><span>${hour}:00</span><span>${name}</span></li>`
    if(hour < 13) morningUl.innerHTML += newScheduleHtml 
    else if(hour < 19) afternoonUl.innerHTML += newScheduleHtml 
    else nightUl.innerHTML += newScheduleHtml 
}


dateFilter.addEventListener('input', () => {
    readSchedules({date: dateFilter.value})
})
dateFilter.value = actualDateFormat

readSchedules({date: actualDateFormat})

export { readSchedules }