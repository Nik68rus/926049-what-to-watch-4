import React from 'react';
import renderer from 'react-test-renderer';

import VideoPlayer from './video-player.jsx';

const movie = {
  preview: `route`,
  src: `source`,
};

it(`Video player correctly renders`, () => {
  const {preview, src} = movie;

  const tree = renderer.create(<VideoPlayer
    isPlaying={false}
    src={src}
    poster={preview}
    muted={true}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();
  expect(tree).toMatchSnapshot();
});
