import styles from './Button.module.scss';

export default function Button({ children, disabled, type, onClick }){
    return (
        <button className={styles.button} disabled={disabled} type={type} onClick={onClick}>
            {children}
        </button>
    )
}