import React, { Component } from "react";

import WaveStream from "react-wave-stream";
import Recorder from "recorder-js";
import Waveform from "./Waveform";

class Wave extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      blob: null,
      isRecording: false,
      stream: null,
      blobURL: "",
      analyserData: { data: [], lineTo: 0 },
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);

    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    this.recorder = new Recorder(this.audioContext, {
      onAnalysed: (data) => this.setState({ analyserData: data }),
    });

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.setState({ stream });
        this.recorder.init(stream);
      })
      .catch(this.dontGotStream);
  }

  start() {
    this.recorder.start().then(() => this.setState({ isRecording: true }));
  }

  stop() {
    this.recorder.stop().then(({ blob }) => {
      let url = (window.URL || window.webkitURL).createObjectURL(blob);
      this.setState({
        isRecording: false,
        blob,
        blobURL: url,
      });
    });
  }

  dontGotStream(error) {
    console.log("Get stream failed", error);
  }

  render() {
    const { isRecording, blob, stream } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <div className="App-buttons">
            {isRecording ? (
              <button onClick={this.stop}>Stop</button>
            ) : (
              <button onClick={this.start}>Start</button>
            )}
          </div>
        </div>
        <div className="App-studio">
          {this.state.blobURL && <Waveform audio={this.state.blobURL} />}
          {/* <WaveStream {...this.state.analyserData} /> */}
        </div>
      </div>
    );
  }
}

export default Wave;
