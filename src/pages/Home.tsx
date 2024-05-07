import { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Home = () => {
  const [albums, setAlbums] = useState<any>(undefined);
  const [q, setQ] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      const {data} = await axios.get("https://api.spotify.com/v1/albums", {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SPOTIFY_TOKEN}`
        },
        params: {
            ids: "78bpIziExqiI9qztvNFlQu,5VoeRuTrGhTbKelUfwymwu,0KqvWwne6Iujkr2Szqsudk,0ODLCdHBFVvKwJGeSfd1jy"
        }
      });
      setAlbums(data);
      console.log(data)
    }

    console.log("ASBHFJDS")

    fetchAlbums();

  }, [])

  const handleNavigate = (album_id: string) => {
    navigate(`/album/${album_id}`);
    console.log("SABFJHSA")

  }

  return (
    <main>
      <div className="search__container">
    <p className="search__title">
        Search for Albums
    </p>
    <input className="search__input" type="text" placeholder="Search" onChange={(e) => setQ(e.target.value)} />
</div>
      <div className="wrapper">
      
  <div className="card-container">
    {albums ? albums.albums?.map((item: any, index: number)   => {
      if(item.name.slice(0, q.length)!=q){
        return <></>
      }
      return <div className="music-card" key={index} onClick={() => handleNavigate(item?.id)}>
      <img src={item.images[1].url} />
      <h4>{item.name}</h4>
      <p>{item.artists?.map((it: any) => it.name + " ")}{item.release_date.slice(0, 4)}</p>
    </div>
    }) : <div style={{color: "azure"}}>loading</div>}
  </div>
</div>

    </main>
  )
}

export default Home