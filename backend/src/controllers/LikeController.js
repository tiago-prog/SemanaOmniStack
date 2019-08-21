const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {
        const { devId } = req.params
        const { user } = req.headers

        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)
        
        // Se caso o Dev escolhido para dar Like não existir
        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' })
        }

        // Se caso ambos terem dado Like um no outro 
        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('DEU MATCH')
        }

        loggedDev.likes.push(targetDev._id)

        await loggedDev.save()

        return res.json(loggedDev)
    }
}