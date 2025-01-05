import Header from "components/Header";
import styles from "./Pagamento.module.scss";
import Select from "components/Select";
import Button from "components/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { finalizarPagamento, loadPagamento } from "store/reducers/carrinho";

export default function Pagamento() {
    const dispatch = useDispatch();
    const usuario  = useSelector(state => state.usuario);
    const total = useSelector(state => state.carrinho.total)
    const [formaDePagamento, setFormaDePagamento] = useState('-')
    
    const valorTotal = formaDePagamento !== "-" ? total * formaDePagamento.taxa : total;

    function mudarFormaDePagamento(evento){
        if (evento.target.value === '-') return setFormaDePagamento('-');

        setFormaDePagamento(usuario.cartoes.find(cartao => cartao.id === evento.target.value));
    }

    function finalizar() {
        dispatch(finalizarPagamento({valorTotal, formaDePagamento}));
    }

    useEffect(() => {
        dispatch(loadPagamento());
    }, [dispatch])

    return (
        <div className={styles.container}>
            <Header titulo="Pagamento" />
            <div className={styles.dados} >
                <p className={styles.forma} >Olá {usuario.nome}! Escolha a forma de pagamento: </p>
                <Select value={formaDePagamento.id} onChange={mudarFormaDePagamento} placeholder="Forma de pagamento" >
                    <option value="-" >Forma de pagamento</option>
                    {
                        usuario.cartoes?.map(cartao => (
                            <option key={cartao.id} value={cartao.id}>{cartao.nome}</option>
                        ))
                    }
                </Select>
                <div className={styles.content}>
                    {formaDePagamento !== '-' && (
                        <>
                            <p> A forma de pagamento {formaDePagamento.nome} tem taxa de {formaDePagamento.taxa}x </p>
                            <p> O saldo deste cartão é de {Number(formaDePagamento.saldo).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} </p>
                        </>
                    )}
                    <p>Todos com taxas: {Number(valorTotal).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</p>
                </div>
                <div className={styles.finalizar}>
                    <Button 
                        disabled={valorTotal === 0 || formaDePagamento === "-"}
                        onClick={finalizar}
                    >Finalizar compra</Button>
                </div>
            </div>
        </div>
    )
}