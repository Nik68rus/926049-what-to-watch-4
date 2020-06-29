
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const videoMock = {
  src: `src`,
  preview: `src2`,
};

describe(`VideoPlayer e2e tests`, () => {
  it(`VideoPlayer has Play and Pause states`, () => {
    const isPlaying = false;
    const videoPlayer = mount(
        <VideoPlayer
          isPlaying={isPlaying}
          src={videoMock.src}
          poster={videoMock.preview}
        />);

    expect(videoPlayer.props().isPlaying).toEqual(false);

    videoPlayer.setProps({isPlaying: true});
    expect(videoPlayer.props().isPlaying).toEqual(true);
  });
});
