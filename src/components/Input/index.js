import { forwardRef } from 'react';
import styles from './Input.module.scss';

function Input({ value, onChange , ...othersProps}, ref){
    return (
        <input
            value={value}
            onChange={onChange}
            {...othersProps}
            className={styles.input}
            ref={ref}
        />
    )
}

export default forwardRef(Input);