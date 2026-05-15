import '../styles/styles.css'
import Cabecalho from '../components/cabecalho';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function TelaPedido() {
    const [produto, setProduto] = useState("")
    const [valor, setValor] = useState(0)
    const [stats, setStats] = useState("")
    const [cliente_id, setCliente_id] = useState(0)

    const [filtro, setFiltro] = useState([])

    const [pedidos, setPedidos] = useState([])
    const [status, setStatus] = useState([])
    const [edicionID, setEdicionID] = useState(null)

    const obter_pedidos = async () => {
        const repons = await axios.get('http://localhost:3000/pedidos')
        setPedidos(repons.data)
        console.log(repons.data)
    }
    const filtrar_status_pedidos = async () => {
        console.log(filtro)
        const repons = await axios.get('http://localhost:3000/pedidos', {
            status: filtro
        })
        console.log(repons.data);
        setPedidos(repons.data)
    }
    const enviar_pedidos = async () => {
        console.log(produto)
        const repons = await axios.post('http://localhost:3000/pedidos', {
            produto: produto,
            valor: valor,
            status: stats,
            cliente_id: cliente_id
        }).then((repons) => {
            console.log(repons.data)
        })
    }

    const atualizar_pedidos = async (id) => {
        if (produto == null || valor == null || stats == null || cliente_id == null) {
            alert("alguno de los campos esta vazio")
            return;
        }

        const repons = await axios.put('http://localhost:3000/pedidos', {
            id: id,
            produto: produto,
            valor: valor,
            status: stats,
            cliente_id: cliente_id
        }).then((repons) => {
            console.log(repons.data)
        })
        alert("Altelazao exutada")
        setStatus(!status)
        setEdicionID(id)
    }

    useEffect(() => {
        obter_pedidos()
    }, [])

    return (
        <div>
            <h1>Tela do Pedidos</h1>
            <Cabecalho>
                <input type="text" placeholder='search: ' onBlur={(t) => setFiltro(t.target.value)} />
                <button onClick={() => { filtrar_status_pedidos() }} >buscar</button>
            </Cabecalho>
            <div>
                <input type="text" placeholder={`Produto`} onBlur={(t) => {
                    setProduto(t.target.value)
                }
                } />
                <input type="number" placeholder={`Valor`} onBlur={(t) => setValor(t.target.value)} />
                <input type="text" placeholder={`Status`} onBlur={(t) => setStats(t.target.value)} />
                <input type="number" placeholder={`Id do cliente`} onBlur={(t) => setCliente_id(t.target.value)} />
                <button onClick={() =>
                    enviar_pedidos()
                } >Enviar pedidos</button>
            </div>
            {pedidos && pedidos.map((pe) => (
                <div className='li' key={pe.id}>
                    <input type="text" placeholder={`Produto: ${pe.produto}`} disabled={edicionID == pe.id ? status : true} onBlur={(t) => setProduto(t.target.value)} />
                    <input type="number" placeholder={`Valor: ${pe.valor}`} disabled={edicionID == pe.id ? status : true} onBlur={(t) => setValor(t.target.value)} />
                    <input type="text" placeholder={`Status: ${pe.status}`} disabled={edicionID == pe.id ? status : true} onBlur={(t) => setStats(t.target.value)} />
                    <input type="number" placeholder={`Id do cliente: ${pe.cliente_id}`} disabled={edicionID == pe.id ? status : true} onBlur={(t) => setCliente_id(t.target.value)} />
                    <button disabled={edicionID == pe.id ? true : false} onClick={() => {
                        setStatus(!status)
                        setEdicionID(pe.id)
                    }
                    }> editar</button>
                    <button disabled={edicionID == pe.id ? false : true} onClick={() => {
                        try {
                            atualizar_pedidos(pe.id)
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