import { actualDateFormat } from "./date"
import { deleteSchedule, readAllSchedules } from "./schedule-crud"
import { deleteScheduleHtml } from "./schedule-delete"

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
    const id = schedule.id
    console.log('id clicado', id)
    const name = schedule.name
    const hour = new Date(schedule.date).getHours()
    
    const li = document.createElement('li')
    const hourSpan = document.createElement('span')
    hourSpan.textContent = `${hour}:00`
    const nameSpan = document.createElement('span')
    nameSpan.textContent = name
    const deleteSpan = document.createElement('span')
    deleteSpan.textContent = 'X'
    deleteSpan.addEventListener('click', event => {
        deleteScheduleHtml(event, id)
    })

    li.append(hourSpan, nameSpan, deleteSpan)

    if(hour < 13) morningUl.appendChild(li)
    else if(hour < 19) afternoonUl.appendChild(li)
    else nightUl.appendChild(li)
}


dateFilter.addEventListener('input', () => {
    readSchedules({date: dateFilter.value})
})
dateFilter.value = actualDateFormat

readSchedules({date: actualDateFormat})

export { readSchedules }