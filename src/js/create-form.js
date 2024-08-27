import { createSchedule } from "./schedule-crud"
import { readSchedules } from "./schedule-lists"
import {actualDate, actualYear, actualMonth, actualDay, actualHour, actualDateFormat} from './date'

// Recupera os inputs
const form = document.querySelector('form')
const dateInput = document.querySelector('[name="date"]')
const nameInput = document.querySelector('[name="name"]')
const hourLis = document.querySelectorAll('.radio-time-wrapper')
const dateFilter = document.getElementById('date-filter')


// Definir a data mínima que o usuário vai poder selecionar
dateInput.setAttribute('min', actualDateFormat)

// Desabilita os radios que tem um horário menor que o atual
function controlRadios() {
    hourLis.forEach((timeLi) => {
        const selectedDay = dateInput.value.split('-')[2]
        if(selectedDay > actualDay) return timeLi.querySelector('input').removeAttribute('disabled')
            const selectedHour = timeLi.querySelector('span').textContent.split(':')[0]
        if(selectedHour < actualHour)  timeLi.querySelector('input').setAttribute('disabled', true)
        })
}

controlRadios()
dateInput.addEventListener('input', () => {
    controlRadios()
})

// Controle do formulário que cria o atendimento
form.addEventListener('submit', async (event)=> {
    try {
        event.preventDefault()
        
        const checkedInput = document.querySelector('[name="time"]:checked')
        const name = nameInput.value
        const hour = checkedInput.value
        const date = dateInput.value
        
        let newSchedule = {
            name: name.trim(),
            date: new Date(`${date}T${hour}:00:00`),
        }
        newSchedule = await createSchedule(newSchedule)
        alert('Atendimento marcado com sucesso!')
        dateFilter.value = date
        readSchedules({date})

        nameInput.value = ''
        dateInput.value = ''
        checkedInput.checked = false
    } catch (error) {
        alert('Não foi possível marcar o atendimento! Tente novamente mais tarde.')
    }
})