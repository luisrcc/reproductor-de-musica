import React, { useEffect } from 'react';
import './index.css';


const arraySongs = [
    { "id": 1, "category": "game", "name": "Mario Castle", "url": "https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3" },
    { "id": 2, "category": "game", "name": "Mario Star", "url": "https://assets.breatheco.de/apis/sound/files/mario/songs/hurry-starman.mp3" },
    { "id": 3, "category": "game", "name": "Mario Overworld", "url": "https://assets.breatheco.de/apis/sound/files/mario/songs/overworld.mp3" }
]

function App() {
    const ref = useRef(null);
    const [id, setId] = useState(1);
    const [playing, setPlaying] = useState(false);
    const [songs, setSongs] = useState([]);

    const fetchApi = async () => {
        try {
            const respuesta = await fetch('https://assets.breatheco.de/apis/sound/songs',
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    }
                });

            if (!respuesta.ok) {
                const msg = "Error al reproducir"
                throw new Error(msg)
            }

            const data = respuesta.json();

            for (let i = 0; i < data.length; i++) {
                data[i].url = `https://assets.breatheco.de/apis/sound/${data[i].url}`;
            }
            setSongs(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(
        () => {
            fetchApi()

            return () => {
                console.log('unmounted component')
            }
        }, [])

    const play = (cancionId) => {
        ref.current.src = songs[cancionId - 1].url;
        ref.current.id = cancionId;
        ref.current.play();
        setPlaying(true);
    }

    const pause = () => {
        ref.current.src = songs[id - 1].url;
        ref.current.id = id;
        ref.current.pause();
        setPlaying(false);
    }

    const next = () => {
        ref.current.src = songs[id - 1].url;
        ref.current.id = id;
        ref.current.pause();

        let newId = id;
        if (newId === songs.length) {
            newId = 1;
        }
        else {
            newId = newId + 1;
        }

        ref.current.src = songs[newId - 1].url;
        ref.current.id = newId;
        ref.current.play();
        setPlaying(true);

        setId(newId);
    }

    const preview = () => {
        ref.current.src = songs[id - 1].url;
        ref.current.id = id;
        ref.current.pause();

        let newId = id;
        if (newId === 1) {
            newId = songs.length;
        }

        else {
            newId = newId - 1;
        }

        ref.current.src = songs[newId - 1].url;
        ref.current.id = newId;
        ref.current.play();
        setPlaying(true);

        setId(newId);
    }

    return (
        <div className='container'>
            <div className='mymusic'>

                <div className='icons'>
                    <i className="fas fa-backward" onClick={preview}></i>
                    {
                        playing
                            ? <i className="fas fa-pause" onClick={pause}></i>
                            : <i className="fas fa-play" onClick={() => play(id)}></i>

                    }
                    <i className="fas fa-forward" onClick={next}></i>
                </div>
                <audio ref={ref}>
                </audio>
            </div>
            <div className="cont-canciones">
                {
                    songs.map((cancion, pos) => {

                        return (<div key={pos} id={cancion.id} className={cancion.id === id ? "inPlay" : "song"} onClick={() => {
                            setId(cancion.id);
                            play(cancion.id)
                        }}>
                            <span><i className="far fa-play-circle"></i>{cancion.name}</span>
                        </div>)
                    })}

           </div>
        </div>
    )
};

export default App;