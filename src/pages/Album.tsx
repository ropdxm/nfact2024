import { useNavigate, useParams } from 'react-router';
import './album.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import imgg from "../assets/favicon-32x32.png";


function msToTime(duration: number) {
  var 
    seconds: number = Math.floor((duration / 1000) % 60),
    minutes: number = Math.floor((duration / (1000 * 60)) % 60);

  var minutesStr = (minutes < 10) ? "0" + minutes : minutes

  return minutesStr + ":" + seconds;
}


const Album = () => {

  const navigate = useNavigate();

  const [album, setAlbum] = useState<any>();
  const [commentValue, setCommentValue] = useState<string>();

  function isNullOrWhiteSpace(str: string) {
    return str == null || str.replace(/\s/g, "").length < 1;
  }

  const submitHandler = async () => {

  }

  const {id} = useParams();

  useEffect(() => {
    console.log(id)
    if(!id){
      navigate('/')
      return;
    }
    
    const getAlbum = async () => {
      const {data} = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SPOTIFY_TOKEN}`
        }
      });
      console.log(data)
      setAlbum(data);
    }
    getAlbum();

  }, []);


  return (
    <main>
      {album ?
      <div className="container">
        <div className='album-con'>
          <div id="album" className="album-info">
            <img className="album-image" src={album.images[0].url} alt="${data.name}" />
            <p className="album-title">{album.name}</p>
            <p className="album-artist">{album.artists.map((item: any) => item.name).join(' ')}</p>
            <p className="album-counter">{album.tracks.items.length} tracks</p>
          </div>
          <div id="list" className="album-musics">
            {album.tracks.items.map((item: any, index: number) =>
            <div className="music" key={index}>
              <p className="music-number">{index}</p>
              <p className="music-title">{item.name}</p>
              <p className="music-duration">{msToTime(item.duration_ms)}</p>
            </div>
            )}
        </div>
        </div>
            
    <div className="comment-wrp">
      <div className="comment com-container">
        <div className="c-user">
          <img src={imgg} alt="" className="usr-img" />
          <p className="usr-name">maxblagun</p>
          <p className="cmnt-at">2 weeks ago</p>    
        </div>
        <p className="c-text">
          <span className="c-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer convallis eros lectus, vel pulvinar risus vehicula eu. Nam volutpat enim sed neque scelerisque aliquet</span>
        </p>
      </div>
      <div className="replies comments-wrp">
      </div>
    </div>

<div>
  <div className="comment-section">

    <div className="comments-wrp">

    </div>
  <div className="reply-input com-container">
      <img src={imgg} alt="" className="usr-img" />
      <textarea className="cmnt-input" placeholder="Add a comment..."></textarea>
      <button className="bu-primary">SEND</button>
    </div>
    </div>
</div>

      </div>

      : <p>loading...</p>}
    </main>
  )
}

export default Album