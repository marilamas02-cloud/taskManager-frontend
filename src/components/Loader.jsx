import styles from './Loader.module.css'

export default function Loader({ count = 3 }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeleton}>
          <div className={styles.skHeader}>
            <div className={styles.skCircle} />
            <div className={styles.skTitle} />
            <div className={styles.skActions}>
              <div className={styles.skBtn} />
              <div className={styles.skBtn} />
            </div>
          </div>
          <div className={styles.skLine} style={{ width: '90%' }} />
          <div className={styles.skLine} style={{ width: '70%' }} />
          <div className={styles.skFooter}>
            <div className={styles.skDate} />
            <div className={styles.skBadge} />
          </div>
        </div>
      ))}
    </div>
  )
}
