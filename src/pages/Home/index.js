import Header from "components/Header";
import styles from "./Home.module.scss";
import relogioImg from "assets/inicial.png";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/Button";
import { useEffect } from "react";
import { loadCategories } from "store/reducers/categorias";


export default function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categorias = useSelector((state) => state.categorias);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch,]);
  return (
    <div>
      <Header
        titulo="Classificados Tech"
        descricao="Compre diversos tipos de produtos no melhor site do Brasil!!!"
        imagem={relogioImg}
        className={styles.header}
      >
        <Button onClick={() => navigate(`/anuncie`)}>
          Quero anunciar
        </Button>
      </Header>
      <div className={styles.categorias}>
        <div className={styles["categorias-title"]}>
          <h1>Categorias</h1>
        </div>
        <div className={styles["categorias-container"]}>
          {categorias.map((categoria, index) => {
            return (
              <div
                key={index}
                onClick={() => navigate(`/categoria/${categoria.id}`)}
              >
                <img src={categoria.thumbnail} alt={categoria.nome} />
                <h1>{categoria.nome}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
