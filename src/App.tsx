import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import PictureDisplay from './components/PictureDisplay/PictureDisplay';
import moment from "moment";
import { DetailsState, getErrorMessage, getPhotoDetailsFromLocalStorage, onFavorite, persistToLocalStorage } from './utils';

function App() {
  const [loading, setLoading] = useState(true);
  const [dateValue, setDateValue] = useState(new Date());
  const [details, setDetails] = useState<DetailsState>({});
  const [fav, setFav] = useState(false)
  const [error, setError] = useState("");

  useEffect(() => {
    const date = moment(dateValue).format("YYYY-MM-D");
    const getDetails = async () => {
      const endpoint = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&date=${date}`;
      try {
        const response = await (await fetch(endpoint)).json();
        if (!response.code) {
          const formattedResponse = { ...response, fav: false };
          persistToLocalStorage(formattedResponse, dateValue);
          setDetails(formattedResponse);
          setFav(false);
        } else {
          setError(response.msg);
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
      }
    }

    if (localStorage.getItem('photo_details')) {
      const details = getPhotoDetailsFromLocalStorage(dateValue);
      if (details) {
        setDetails(details);
        setFav(details.fav ? details.fav : false)
        setLoading(false);
        setError("");
      } else {
        getDetails();
        setLoading(false);
      }
    } else {
      getDetails();
      setLoading(false);
    }
  }, [dateValue]);

  const dateChange = (value?: any) => setDateValue(new Date(value));

  const onNextClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    let new_date = moment(dateValue).add('days', 1).format("YYYY-MM-D");
    setDateValue(new Date(new_date))
  }
  const onPrevClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    let new_date = moment(dateValue).subtract('days', 1).format("YYYY-MM-D");
    setDateValue(new Date(new_date))
  }

  const onFavClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFav(!fav);
    onFavorite(details, !fav);
  }

  return (
    <div className={styles.App}>
      <h1 className={styles.App__heading}>nasa's picture of the day</h1>
      {loading ? <h1 className={styles.App__heading}>loading.....</h1> :
        <PictureDisplay
          hdurl={details.hdurl}
          url={details.url}
          title={details.title}
          explanation={details.explanation}
          nextPicture={onNextClicked}
          prevPicture={onPrevClicked}
          onDateChange={dateChange}
          dateValue={dateValue}
          onFavClicked={onFavClicked}
          fav={fav}
          error={error}
        />
      }
    </div>
  );
}

export default App;
