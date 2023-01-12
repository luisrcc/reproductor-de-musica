import React from "react";

function Song(props){
    const{id, url, name,audioRef, playFromList} = props;

    return(
        <div className="song" onClick={() => playFromList(id - 1)}>
            <span><i class="far fa-play-circle"></i>{name}</span>
            <audio id={id} ref={audioRef} src={url}>
            </audio>
        </div>
    )
}

export default Song;
