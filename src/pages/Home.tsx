import { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';

const Home = () => {
  const [albums, setAlbums] = useState<any>(undefined);
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
  return (
    <main>
      <div className="wrapper">
  <div className="card-container">
    {albums ? albums.albums?.map((item: any, index: number)   => {
      return <div className="music-card" key={index}>
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