import React, {useState, useRef} from "react";

import './styles/app.scss';
import Player from './components/Player';
import Song from "./components/Song";
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav'


function App() {
  const [songInfo, setsongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
});
  //ref
  const audioRef = useRef(null);
  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  //event handlers
  const timeUpdateHandler = e => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calc slider percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setsongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation
    });
  }
  const songEndHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if(isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player 
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        setsongInfo = {setsongInfo}
        songInfo = {songInfo}
        setSongs = {setSongs}
        songs = {songs}
        audioRef={audioRef} />
      <Library audioRef={audioRef} setSongs = {setSongs} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} libraryStatus={libraryStatus}/>
      <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
