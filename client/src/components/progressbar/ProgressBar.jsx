// ProgressBar.js
import styles from './ProgressBar.module.css'; 

const ProgressBar = ({ current, total }) => {
    const percentage = (current / total) * 100;

    return (
        <div className={styles.progressBar}>
            <div className={styles.filler} style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

export default ProgressBar;
