import React from 'react';
import { PictureDetailsProps } from '../../utils';
import styles from './PictureDisplay.module.scss';
import DatePicker from 'react-date-picker';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'

const PictureDisplay: React.FC<PictureDetailsProps> = ({
  hdurl,
  url,
  title,
  explanation,
  nextPicture,
  prevPicture,
  onDateChange,
  dateValue,
  onFavClicked,
  fav,
  error
}) => {
  return (
    <div data-testid="main" className={styles.PictureDetails}>
      <h2 data-testid="title" className={styles.PictureDetails__title}>{!error && title}</h2>
      <div className={styles.PictureDetails__imageContainer}>
        <button
          onClick={prevPicture}
          data-testid="prevBtn"
          className={`${styles.PictureDetails__ArrowBtn} ${styles.PictureDetails__ArrowLeftBtn}`}
        >
          <FaChevronCircleLeft color="#b81c1c" />
        </button>
        {error ? <p>{error}</p> : <img src={url} className={styles.PictureDetails__img} alt={title} />}
        <button
          className={`${styles.PictureDetails__ArrowBtn} ${styles.PictureDetails__ArrowRightBtn}`}
          onClick={nextPicture}
          data-testid="nextBtn"
        >
          <FaChevronCircleRight color="#b81c1c" />
        </button>
      </div>

      <div className={styles.PictureDetails__mobileArrowContainer}>
        <button onClick={prevPicture}>
          <FaChevronCircleLeft color="#b81c1c" />
        </button>
        <button onClick={nextPicture}>
          <FaChevronCircleRight color="#b81c1c" />
        </button>
      </div>

      <div data-testid="dateContainer" className={styles.PictureDetails__dateContainer}>
        <button
          className={`${styles.PictureDetails__favBtn} ${fav && styles.PictureDetails__fav}`}
          onClick={onFavClicked}
          disabled={error ? true : false}
        >
          {fav ? 'remove favorite' : 'set favorite'}
        </button>
        <DatePicker
          onChange={onDateChange}
          value={dateValue}
        />
      </div>
      {!error &&
        <>
          <h3 className={styles.PictureDetails__descriptionTitle}>Description</h3>
          <p data-testid="description" className={styles.PictureDetails__description} >
            {explanation}
          </p>
        </>
      }
    </div>
  )
}

export default PictureDisplay;
