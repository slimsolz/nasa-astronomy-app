export type DetailsState = {
  url?: string;
  id?: string;
  title?: string;
  description?: string;
  date?: Date;
}

export type PictureDetailsProps = DetailsState & {
  nextPicture: (e: React.MouseEvent<HTMLButtonElement>) => void;
  prevPicture: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDateChange: (value?: any) => void;
  dateValue: Date;
};

