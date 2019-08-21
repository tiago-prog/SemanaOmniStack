const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {
        const { devId } = req.params
        const { user } = req.headers

        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        // Se caso o dev escolhido para dar o dislike não existir
        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' })
        }


        loggedDev.dislikes.push(targetDev._id)

        await loggedDev.save()

        return res.json(loggedDev)
    }
}