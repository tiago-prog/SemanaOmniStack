// Chamada ao backend

import axios from 'axios'

const api =  axios.create({ // Fácil manutenção!
    baseURL: 'http://localhost:3333'
})

export default api;