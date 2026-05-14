import '../styles/styles.css'
import Cabecalho from '../components/cabecalho';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TelaCliente() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [clientes, setClientes] = useState([])
    const [status, setStatus] = useState([])
    const [edicionID, setEdicionID] = useState(null)
    const obter_clientes = async () => {
        const repons = await axios.get('http://localhost:3000/clientes')
        setClientes(repons.data)
        console.log(repons.data)
    }
    const enviar_cliente = async () => {
        console.log(nome + "\n" + email)
        const repons = await axios.post('http://localhost:3000/clientes', {
            nome,
            email
        }).then((repons) => {
            console.log(repons.data)
        })
    }

    useEffect(() => {
        obter_clientes()
    }, [])

    return (
        <div>
            <h1>Tela do Cliente</h1>
            <Cabecalho />
            <div>
                <input type="text" placeholder={`Nome`} onChange={(t) => setNome(t.target.value)} />
                <input type="text" placeholder={`Email`} onChange={(t) => setEmail(t.target.value)} />
                <button onClick={() =>
                    enviar_cliente()
                } >Enviar cliente</button>
            </div>
            {clientes && clientes.map((cli) => (
                <div className='li' key={cli.id}>
                    <input type="text" disabled={edicionID == cli.id ? status : true} placeholder={`Nome: ${cli.nome}`} />
                    <input type="text" disabled={edicionID == cli.id ? status : true} placeholder={`Email: ${cli.email}`} />
                    <button>excluir</button>
                    <button onClick={() => {
                        setStatus(!status)
                        setEdicionID(cli.id)
                    }
                    }> editar</button> </div>
            ))}
        </div >
    )
}