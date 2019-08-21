import React, { useState } from 'react';
import './Login.css'

import api from '../services/api'

import logo from '../assets/logo.svg'

export default function Login({ history }) { // Propriedade history usado para redirecionar um usuario
    const [username, setUsername] = useState('')

    async function handleSumit(e) {
        e.preventDefault()

        const response = await api.post('/devs', {
            username,
        })

        const { _id } = response.data

        history.push(`/dev/${_id}`) // Redirenciona o usuario para a pasta main
    }

    return (
        <div className="login-container">
            <form  onSubmit={handleSumit}>
                <img src={logo} alt="Tindev" />
                <input
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}

                />
                <button rype="submit">Enviar</button>
            </form>
        </div>
    );
}