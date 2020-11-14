import moment from "moment";

export type DetailsState = {
  url?: string;
  hdurl?: string;
  copyright?: string;
  title?: string;
  explanation?: string;
  date?: string;
  media_type?: string;
  service_version?: string
  fav?: boolean
}

type ErrorObject = {
  message?: string;
}

export type PictureDetailsProps = DetailsState & {
  nextPicture: (e: React.MouseEvent<HTMLButtonElement>) => void;
  prevPicture: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDateChange: (value?: any) => void;
  onFavClicked: (e: React.MouseEvent<HTMLButtonElement>) => void;
  dateValue: Date;
  fav: boolean;
  error: string;
};

export const persistToLocalStorage = (details: DetailsState, date?: Date): void => {
  if (!getPhotoDetailsFromLocalStorage(date)) {
    const photos = JSON.parse(localStorage.getItem('photo_details')!);
    photos.push(details)
    localStorage.setItem("photo_details", JSON.stringify(photos));
  } else {
    localStorage.setItem("photo_details", JSON.stringify([details]));
  }
}

export const getPhotoDetailsFromLocalStorage = (date?: Date): DetailsState => {
  const dateFormatted = moment(date).format("YYYY-MM-D");
  if (localStorage.getItem('photo_details')) {
    const details = JSON.parse(localStorage.getItem('photo_details')!)
      .find((detail: DetailsState) => {
        return detail.date === dateFormatted
      })
    return details;
  }
    return {};
}

export const onFavorite = (details: DetailsState, favChoice: boolean): void => {
  const newDetailsToBeStored = { ...details, fav: favChoice }
  const photos = JSON.parse(localStorage.getItem('photo_details')!);
  const otherPhotos = photos.filter((photo: DetailsState) => photo.url !== details.url && photo.copyright !== details.copyright)
  otherPhotos.push(newDetailsToBeStored)
  localStorage.setItem("photo_details", JSON.stringify(otherPhotos));
}

export const getErrorMessage = (type: ErrorObject): string => {
  if (type.message === "Failed to fetch") {
    return "connection lost, please try again"
  }
  return 'something went wrong';
}
