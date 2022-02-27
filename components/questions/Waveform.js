import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import WaveSurfer from "wavesurfer.js";
import styled from "@emotion/styled";

// icons
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const Waveform = ({ audio }) => {
  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
  const [isPlaying, toggleIsPlaying] = useState(false);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      barWidth: 2,
      height: 80,
      barHeight: 3,
      barMinHeight: 1,
      barRadius: 3,
      barWidth: 3,
      barGap: 5,
      cursorWidth: 3,
      waveColor: "gray",
      progressColor: "red",
    });
    waveSurfer.load(audio);
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);

  return (
    <WaveSurferWrap>
      <button
        onClick={() => {
          waveSurferRef.current.playPause();
          toggleIsPlaying(waveSurferRef.current.isPlaying());
        }}
        type="button"
      >
        {isPlaying ? <StopCircleIcon /> : <PlayCircleIcon />}
      </button>
      <div ref={containerRef} />
    </WaveSurferWrap>
  );
};

Waveform.propTypes = {
  audio: PropTypes.string.isRequired,
  destroy: PropTypes.func,
};

const WaveSurferWrap = styled.div`
  display: grid;
  grid-template-columns: 45px 1fr;
  align-items: center;
  button {
    width: 70px;
    height: 70px;
    border: none;
    padding: 0;
    background-color: white;
  }
`;

export default Waveform;
