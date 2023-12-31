import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner} data-testid="loader"></div>
    </div>
  );
};
