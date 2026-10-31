import styles from './ProductModal.module.css'

/** The text slide: title, little drawings, numbered points, size. Content comes from src/config/productDetails.js */
export default function DetailsSlide({ details }) {
  return (
    <div className={styles.details}>
      <h3 className={styles.detailsTitle}>{details.title}</h3>

      {details.icons?.length > 0 && (
        <div className={styles.icons}>
          {details.icons.map((icon) => (
            <img key={icon.alt} src={icon.image} alt={icon.alt} draggable={false} />
          ))}
        </div>
      )}

      <ol className={styles.points}>
        {details.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ol>

      {details.size && (
        <p className={styles.size}>
          {details.size.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      )}
    </div>
  )
}
