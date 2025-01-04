import { call, delay, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import bandeirasService from "services/bandeiras";
import cartoesService from "services/cartoes";
import usuariosService from "services/usuarios";
import { loadPagamento, mudarCarrinho, mudarQuantidade, mudarTotal } from "store/reducers/carrinho";
import { addUsuario } from "store/reducers/usuario";

const usuarioLogadoId = 1;

function* loadPagamentoWorked(){
    try {
        
        const usuario = yield call(usuariosService.buscarPorId, usuarioLogadoId);
        const cartoes = yield call(cartoesService.buscarPorIdUsuario, usuarioLogadoId);
        
        const bandeirasId = cartoes.map(cartao => cartao.bandeiraId)

        const bandeiras = yield call(bandeirasService.buscarPorId, bandeirasId);
        
        
        const cartoesComBandeiras = cartoes.map(cartao => {
            const bandeiraDoCartao = bandeiras.find(bandeira => bandeira.id == cartao.bandeiraId)
            return {...cartao, taxa: bandeiraDoCartao.taxa, bandeira: bandeiraDoCartao.nome}
        
        })
        
        console.log({ ...usuario, cartoes: cartoesComBandeiras})
        yield put(addUsuario({...usuario, cartoes: cartoesComBandeiras}))

    } catch (error) {
        console.log(error.message)
    }
}

function* calcularTotalWorked(){
    //yield delay(500);
    const state = yield select()

    const valorTotal = state.carrinho.data.reduce((total, itemNoCarrinho) => {
        const item = state.itens.find((item) => item.id === itemNoCarrinho.id);
        return total + item.preco * itemNoCarrinho.quantidade;
    }, 0);

    yield put(mudarTotal(valorTotal));
}

export function* carrinhoSaga (){
    yield takeLatest(loadPagamento, loadPagamentoWorked);
    yield takeEvery([mudarQuantidade, mudarCarrinho], calcularTotalWorked)
}