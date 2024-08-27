import { deleteSchedule } from "./schedule-crud";

function deleteScheduleHtml(event, id) {
    deleteSchedule({id})
    .then(() => {
        event.target.closest('li').remove()
        alert('Agendamento cancelado com sucesso!')
    }).catch(() => alert('Erro ao cancelar o seu agendamento!'))
}

export { deleteScheduleHtml }