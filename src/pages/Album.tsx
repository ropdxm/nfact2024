import { useNavigate, useParams } from 'react-router';
import './album.css';
import { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import imgg from "../assets/favicon-32x32.png";
import { CommentData, commentsCol, ratingCol } from '../firebase';
import { addDoc, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { useContext } from '../Context';
import moment from 'moment';

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
  const {user} = useContext();
  const [commentValue, setCommentValue] = useState<string>();
  const [comments, setComments] = useState<CommentData[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [avgRating, setavgRating] = useState<number>(0);

  const {id} = useParams();

  useEffect(() => {
    console.log(id)
    if(!id){
      navigate('/')
      return;
    }
    
    const getAlbum = async () => {
      const token = await axios({
        method: 'post',
        url: "https://accounts.spotify.com/api/token",
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: {
          grant_type: "client_credentials",
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET
        }
      });
      console.log(token);

      const {data} = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
            Authorization: `Bearer ${token.data.access_token}`
        }
      });
      console.log(data)
      setAlbum(data);
    }
    getAlbum();

  }, []);

  useEffect(() => {
    const getComments = async () => {
      if(!album){
        return;
      }
      try {
        const commentsss: CommentData[] = [];
        
        const q = query(commentsCol, where("albumId", "==", album.id));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docc) => {
          // doc.data() is never undefined htmlFor query doc snapshots
          console.log(docc.id, " => ", docc.data());
          commentsss.push({
            user: docc.data().user,
            message: docc.data().message,
            date: docc.data().date
          })
        });


        setComments(commentsss);
    
      } catch (error) {
        console.error("Error getting all comments:");
        throw error;
      }
    }
    
    const getRatings = async () => {
      if(!album){
        return;
      }
      try {
        var ratingss: number = 0;
        
        const q = query(ratingCol, where("albumId", "==", album.id));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docc) => {
          // doc.data() is never undefined htmlFor query doc snapshots
          console.log(docc.id, " => ", docc.data());
          ratingss += docc.data().rating;
        });

        const tmpRating = ratingss/querySnapshot.size;
        setavgRating(Math.round(tmpRating * 10) / 10);
    
      } catch (error) {
        console.error("Error getting all ratings:");
        throw error;
      }
    }
    
    getComments();
    getRatings();
  }, [album]);

  const handleAddCom = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      console.log(user)
      await addDoc(commentsCol, {
        user: user.email,
        message: commentValue,
        date: Timestamp.now(),
        albumId: album.id
      } as CommentData);
      alert("Comment added!")
      window.location.reload();
      return;
    } catch (error) {
      console.error("Error adding comment:");
      throw error;
    }

  }

  const handleRating = async (e: SyntheticEvent) => {
    e.preventDefault();
    if(rating<1 || rating>5){
      alert("Rating error")
      return;
    }
    try {
      console.log(user)
      await addDoc(ratingCol, {
        rating: rating,
        albumId: album.id
      });
      alert("Rating added!")
      window.location.reload();
      return;
    } catch (error) {
      console.error("Error adding rating:");
      throw error;
    }

  }


  return (
    <main>
      {album ?
      <div className="container">
        <div className='album-con'>
          <div id="album" className="album-info">
            <img className="album-image" src={album.images[0].url} alt="${data.name}" />
            <p className="album-title">{album.name}</p>
            <p className="album-artist">{album.artists.map((item: any) => item.name).join(' ')}</p>
            <p className="album-counter">{album.tracks.items.length} tracks, rating: {avgRating}</p>
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
            
    {comments.map((item: CommentData, index: number) => {
      const ihatealevelphysics = item.date.toDate();
      return <div key={index} className="comment-wrp">
      <div className="comment com-container">
        <div className="c-user">
          <img src={imgg} alt="" className="usr-img" />
          <p className="usr-name">{item.user}</p>
          <p className="cmnt-at">{moment(ihatealevelphysics).fromNow()}</p>
        </div>
        <p className="c-text">
          <span className="c-body">{item.message}</span>
        </p>
      </div>
      <div className="replies comments-wrp">
      </div>
    </div>
    })}
    


<div>
  <div className="comment-section">

    <div className="comments-wrp">
    </div>
    
  <div className="reply-input com-container">
    
      <img src={imgg} alt="" className="usr-img" />
      <textarea className="cmnt-input" placeholder="Add a comment..." value={commentValue} onChange={(e) => setCommentValue(e.target.value)}></textarea>
      <button className="bu-primary" onClick={handleAddCom}>SEND</button>

    </div>
    <fieldset className="rating">
    <input onClick={() => setRating(5)} type="radio" id="star5" name="rating" value="5" /><label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
    <input onClick={() => setRating(4)} type="radio" id="star4" name="rating" value="4" /><label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
    <input onClick={() => setRating(3)} type="radio" id="star3" name="rating" value="3" /><label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
    <input onClick={() => setRating(2)} type="radio" id="star2" name="rating" value="2" /><label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
    <input onClick={() => setRating(1)} type="radio" id="star1" name="rating" value="1" /><label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
</fieldset>
    <button className="bu-primary" onClick={handleRating}>Rate</button>

    </div>
</div>

      </div>

      : <p>loading...</p>}
    </main>
  )
}

export default Album