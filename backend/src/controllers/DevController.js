const axios = require('axios');
const Dev = require('../models/Dev')

module.exports = {
    async index(req, res) {
        const  { user } = req.headers

        const loggedDev = await Dev.findById(user)

        const users = await Dev.find({
            // procure todos os devs que:
            $and: [
                { _id: { $ne: user } }, // Não tenham o id do meu usuário da requisição
                { _id: { $nin: loggedDev.likes } }, // Não estejam dentro do Array de likes do Usuario da requisição
                { _id: { $nin: loggedDev.dislikes } } // Não estejam dentro do Array de dsilikes do usuario da requisição
                // $ne => Não seja igual a 
               // $nin => Não esteja dentro(Array)
            ],
        })
        return res.json(users)
    },

    async store(req, res) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username })

        if (userExists) {
            return res.json(userExists)
        }

        const response = await axios.get(`https://api.github.com/users/${username}`)

        const { name, bio, avatar_url: avatar  } = response.data

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev)
    }
}