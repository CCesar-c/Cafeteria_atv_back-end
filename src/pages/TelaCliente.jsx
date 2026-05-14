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
    const deletar_cliente = async (id) => {
        console.log(nome + "\n" + email)
        const repons = await axios.delete('http://localhost:3000/clientes', {
            id
        }).then((repons) => {
            console.log(repons.data)
        })
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

    const atualizar_cliente = async (id) => {
        console.log(nome + "\n" + email)
        const repons = await axios.put('http://localhost:3000/clientes', {
            id,
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
                    <input type="text" disabled={edicionID == cli.id ? status : true} placeholder={`Nome: ${cli.nome}`} onChange={(t) => setNome(t.target.value)} />
                    <input type="text" disabled={edicionID == cli.id ? status : true} placeholder={`Email: ${cli.email}`} onChange={(t) => setEmail(t.target.value)} />
                    <button>excluir</button>
                    <button disabled={edicionID == cli.id ? true : false} onClick={() => {
                        setStatus(!status)
                        setEdicionID(cli.id)
                        deletar_cliente(cli.id)
                    }

                    }> editar</button>
                    <button disabled={edicionID == cli.id ? false : true} onClick={() => {
                        try {
                            atualizar_cliente(cli.id)
                            setStatus(!status)
                            setEdicionID(cli.id)
                            alert("Altelazao exutada")
                        } catch (error) {
                            console.error(error)
                        }
                    }
                    }> Aceitar Mudanças</button>
                </div>
            ))}
        </div >
    )
}