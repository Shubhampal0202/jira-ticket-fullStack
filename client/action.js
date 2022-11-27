
const API_URL = 'http://localhost:9000';
const createTicketInDb = async (ticketColor, ticketTask) => {
    const res = await axios.post(`${API_URL}/tickets`, { ticketColor, ticketTask })
    return res.data
}

const getAllTicketFromDb = async () => {
    const res = await axios.get(`${API_URL}/tickets`)
    return res.data
}

const updateTicketInDb = async (_id, ticketTask) => {
    const res = await axios.patch(`${API_URL}/tickets/${_id}`, { ticketTask })
    return res.data
}

const updateTicketColorInDb = async (_id, newTicketColor) => {
    const res = await axios.patch(`${API_URL}/tickets/${_id}`, { ticketColor: newTicketColor })
    return res.data
}
const handleRemovalTicketInDb = async (_id) => {
    const res = await axios.delete(`${API_URL}/tickets/${_id}`)
}

