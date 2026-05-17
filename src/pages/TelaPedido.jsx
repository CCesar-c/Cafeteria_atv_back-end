import '../styles/styles.css'
import Cabecalho from '../components/cabecalho';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function TelaPedido() {
    const [produto, setProduto] = useState("")
    const [valor, setValor] = useState(0)
    const [status, setStatus] = useState("")
    const [cliente_id, setCliente_id] = useState(0)

    const [filtro, setFiltro] = useState('')

    const [pedidos, setPedidos] = useState([])
    const [edicionID, setEdicionID] = useState(null)

    const [cliente, setCliente] = useState([])
    const obter_pedidos = async () => {
        const repons = await axios.get('http://localhost:3000/pedidos')
        const repons_clientes = await axios.get('http://localhost:3000/clientes')
        setCliente(repons_clientes.data)
        setPedidos(repons.data)
        console.log(repons_clientes.data)
        console.log(repons.data)
    }
    const filtrar_status_pedidos = async () => {
        console.log(filtro)
        console.log(typeof (filtro))

        const repons = await axios.get(`http://localhost:3000/pedidos_especifico/${filtro}`)
        // console.log(repons.data);
        // console.log(`http://localhost:3000/pedidos_especifico/${filtro}`);
        setPedidos(repons.data)
    }
    const enviar_pedidos = async () => {
        console.log(produto)
        const repons = await axios.post('http://localhost:3000/pedidos', {
            produto: produto,
            valor: valor,
            status: status,
            cliente_id: cliente_id
        }).then((repons) => {
            console.log(repons.data)
        })
    }

    const atualizar_pedidos = async (id) => {
        if (status == null || id == null) {
            alert("alguno de los campos esta vazio")
            return;
        }

        // const repons = await axios.put(`http://localhost:3000/pedidos/${id}/${status}`)
        const repons = await axios.put(`http://localhost:3000/pedidos`, {
            id,
            status
        })
            .then((repons) => {
                console.log(repons.data)
            })
        console.log(id, status)
        alert("Alteração exutada")
    }

    useEffect(() => {
        
        obter_pedidos()
    }, [])

    return (
        <div>
            <h1>Tela do Pedidos</h1>
            <Cabecalho>
                <input type="text" placeholder='E.g: pendente ' onBlur={(t) => setFiltro(t.target.value)} />
                <button onClick={() => { filtrar_status_pedidos() }} >buscar</button>
            </Cabecalho>
            <div className='li'>
                <input type="text" placeholder={`Produto`} onBlur={(t) => { setProduto(t.target.value) }} />
                <input type="number" placeholder={`Valor`} onBlur={(t) => setValor(t.target.value)} />
                <input type="text" placeholder={`Status`} onBlur={(t) => setStatus(t.target.value)} />
                <input type="number" placeholder={`Id do cliente`} onBlur={(t) => setCliente_id(t.target.value)} />
                <button onClick={() =>
                    enviar_pedidos()
                } >Enviar pedidos</button>
            </div>
            {pedidos && pedidos.map((pe) => (
                
                <div className='li' key={pe.id} style={{padding:"10px" }}>
                    <input type="text" placeholder={`Id: ${pe.id}`} disabled={true} />
                    <input type="text" placeholder={`Produto: ${pe.produto}`} disabled={true} />
                    <input type="number" placeholder={`Valor: ${pe.valor}`} disabled={true} />
                    <input type="text" placeholder={`Status: ${pe.status}`} disabled={edicionID == pe.id ? false : true} onBlur={(t) => setStatus(t.target.value)} />
                    <input type="number" placeholder={`Id do cliente: ${pe.cliente_id} `} disabled={true} />
                    <button disabled={edicionID == pe.id ? true : false} onClick={() => {
                        setEdicionID(pe.id)
                    }
                    }> editar</button>
                    <button disabled={edicionID == pe.id ? false : true} onClick={() => {
                        try {
                            atualizar_pedidos(pe.id)
                            setEdicionID(null)
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