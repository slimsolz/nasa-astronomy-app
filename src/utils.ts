export type DetailsState = {
  url?: string;
  hdurl?: string;
  copyright?: string;
  title?: string;
  explanation?: string;
  date?: Date;
  media_type?: string;
  service_version?: string
}

export type PictureDetailsProps = DetailsState & {
  nextPicture: (e: React.MouseEvent<HTMLButtonElement>) => void;
  prevPicture: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDateChange: (value?: any) => void;
  dateValue: Date;
};

export const persistToLocalStorage = (details: DetailsState, date?: Date): void => {
  if (getPhotoDetailsFromLocalStorage(date) === undefined) {
    const photos = JSON.parse(localStorage.getItem('photo_details')!);
    photos.push(details)
    localStorage.setItem("photo_details", JSON.stringify(photos));
  } else {
    localStorage.setItem("photo_details", JSON.stringify([details]));
  }
}

export const getPhotoDetailsFromLocalStorage = (date?: Date): DetailsState => {
  if (localStorage.getItem('photo_details')) {
    const details = JSON.parse(localStorage.getItem('photo_details')!)
      .find((detail: DetailsState) =>
        detail.date === date
    )
    return details;
  }
  return {};
}
