const baseUrl = 'http://localhost:3000'

async function createSchedule({name, date}) {
    let response = await fetch(`${baseUrl}/schedules`, {
        body: JSON.stringify({name, date}),
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
    response = await response.json()
    return response
}

async function readAllSchedules({ date: dateFilter }) {
    let response = await fetch(`${baseUrl}/schedules`)
    response = await response.json()
    
    if(dateFilter) response = response.filter(({date}) => new Date(date).getDate() === new Date(dateFilter + 'T00:00:00').getDate())
    
        
    return response
}

export {createSchedule, readAllSchedules}