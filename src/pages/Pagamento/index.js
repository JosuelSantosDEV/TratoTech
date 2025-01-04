import Header from "components/Header";
import styles from "./Pagamento.module.scss";
import Select from "components/Select";
import Button from "components/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPagamento } from "store/reducers/carrinho";

export default function Pagamento() {
    const dispatch = useDispatch();
    const usuario  = useSelector(state => state.usuario);
    const total = useSelector(state => state.carrinho.total)
    console.log(usuario)

    useEffect(() => {
        dispatch(loadPagamento());
    }, [dispatch])

    return (
        <div className={styles.container}>
            <Header titulo="Pagamento" />
            <div className={styles.dados} >
                <p className={styles.forma} >Olá {usuario.nome}! Escolha a forma de pagamento: </p>
                <Select placeholder="Forma de pagamento" >
                    <option value="-" >Forma de pagamento</option>
                    {
                        usuario.cartoes?.map(cartao => (
                            <option key={cartao.id} value={cartao.id}>{cartao.nome}</option>
                        ))
                    }
                </Select>
                <div className={styles.content}>
                    <p>Todos com taxas: {Number(total).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</p>
                </div>
                <div className={styles.finalizar}>
                    <Button>Finalizar compra</Button>
                </div>
            </div>
        </div>
    )
}