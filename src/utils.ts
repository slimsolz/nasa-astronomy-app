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
