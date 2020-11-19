import { library } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import LibrarySong from './LibrarySong';
import Song from './Song';

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus}) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => <LibrarySong 
                    setCurrentSong={setCurrentSong} 
                    id={song.id} 
                    key={song.id} 
                    songs={songs} 
                    song={song} 
                    audioRef={audioRef} 
                    setSongs={setSongs}
                    isPlaying={isPlaying} />)}
            </div>
        </div>
    )
}
export default Library;