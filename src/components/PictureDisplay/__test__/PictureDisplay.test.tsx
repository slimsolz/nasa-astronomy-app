import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import PictureDisplay from '../PictureDisplay';

let component: RenderResult<typeof import("@testing-library/dom/types/queries")>;

const picDetails = {
  copyright: "Kevin Sargozza",
  date: "2020-11-14",
  explanation: "Yesterday, early morning risers around planet Earth were treated to a waning Moon low in the east as the sky grew bright before dawn. From the Island of Ortigia, Syracuse, Sicily, Italy this simple snapshot found the slender sunlit crescent just before sunrise. Never wandering far from the Sun in Earth's sky, inner planets Venus and Mercury shared the calm seaside view. Also in the frame, right of the line-up of Luna and planets, is bright star Spica, alpha star of the constellation Virgo and one of the 20 brightest stars in Earth's night. Tomorrow the Moon will be New. The dark lunar disk means mostly dark nights for planet Earth in the coming week and a good chance to watch the annual Leonid Meteor Shower.",
  hdurl: "https://apod.nasa.gov/apod/image/2011/lunaortybluenodidasc.jpg",
  media_type: "image",
  service_version: "v1",
  title: "Alejandro Escamilla",
  url: "https://apod.nasa.gov/apod/image/2011/lunaortyblue1200nodidasc.jpg",
  nextPicture: () => {},
  prevPicture: () => {},
  onDateChange: () => {},
  dateValue: new Date(),
  onFavClicked: () => {},
  fav: false,
  error: ""
}

beforeEach(() => {
  component = render(<PictureDisplay
    copyright={picDetails.copyright}
    url={picDetails.url}
    explanation={picDetails.explanation}
    fav={picDetails.fav}
    nextPicture={picDetails.nextPicture}
    prevPicture={picDetails.prevPicture}
    onDateChange={picDetails.onDateChange}
    dateValue={picDetails.dateValue}
    onFavClicked={picDetails.onFavClicked}
    error={picDetails.error}
    />)
})

it('should render without throwing an error', () => {
  expect(component).toMatchSnapshot();
});

it('should have parent div', () => {
  const parentDiv = screen.getByTestId('main');
  expect(parentDiv).toBeInTheDocument();
});

it('should have display image title', () => {
  const imageTitle = screen.getByTestId('title');
  expect(imageTitle).toBeInTheDocument();
});

it('should have display image date picker', () => {
  const imageDate = screen.getByTestId('dateContainer');
  expect(imageDate).toBeInTheDocument();
});

it('should have image description displayed', () => {
  const imageDescription = screen.getByTestId('description');
  expect(imageDescription).toBeInTheDocument();
  expect(imageDescription.textContent).toEqual(picDetails.explanation);
});

it('should not display error message', () => {
  const newProps = {
    ...picDetails,
    error: "something went wrong"
  }
  component = render(<PictureDisplay
    copyright={newProps.copyright}
    url={newProps.url}
    explanation={newProps.explanation}
    fav={newProps.fav}
    nextPicture={newProps.nextPicture}
    prevPicture={newProps.prevPicture}
    onDateChange={newProps.onDateChange}
    dateValue={newProps.dateValue}
    onFavClicked={newProps.onFavClicked}
    error={newProps.error}
  />);

  const errorMessage = screen.getByTestId('error-message');
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage.textContent).toEqual(newProps.error);
});

it('should render all buttons', () => {
  const btns = screen.getAllByRole('button');
  btns.forEach(btn => {
    expect(btn).toBeInTheDocument();
  })
});
