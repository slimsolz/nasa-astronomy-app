import React, { useState } from 'react';
import styles from './App.module.scss';
import PictureDisplay from './components/PictureDisplay/PictureDisplay';
import { DetailsState } from './utils';

function App() {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(new Date());
  const [details, setDetails] = useState<DetailsState>({});
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");

  return (
    <div className={styles.App}>
      <h1 className={styles.App__heading}>nasa's picture of the day</h1>
      {loading ? <h1 className={styles.App__heading}>loading.....</h1> :
        <PictureDisplay
          id={details.id}
          url={details.url}
          title={details.title}
          description={details.description}
          nextPicture={() => { }}
          prevPicture={() => { }}
          onDateChange={() => { }}
          dateValue={value}
        />
      }
    </div>
  );
}

export default App;
