import NavBar from "components/NavBar";
import styles from "./MainPage.module.scss";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles["container-outlet"]}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
