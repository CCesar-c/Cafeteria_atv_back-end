import '../styles/styles.css'
import { useNavigate } from 'react-router-dom';
export default function Cabecalho({ children }) {
    const navegacao = useNavigate();
    return (
        <div className="cabecalho">
            <button onClick={() => navegacao('/TelaPedido')}>Ir para a tela de pedido </button>
            <button onClick={() => navegacao('/TelaCliente')}>Ir para a tela do cliente </button>
            {children}
        </div>
    )
}