# SPOTY - Task for Nfactorial Incubator 2024.
This is a react-based app where you can explore different music and leave
your thought in the comment section of each album. Also, rating system 
works so feel free to express your opinion on various music albums!

# Technologies used:
react, vite, moment.js, firebase, axios, react-router

How to use? Go to https://spotynfactorial.vercel.app/ to see live demo.
Or "git clone https://github.com/ropdxm/nfact2024.git" and do "npm install".
You will also need Spotify api key to use this app. Get client id and client
secret and paste it in .env as "VITE_CLIENT_ID", "VITE_CLIENT_SECRET"
respectively. Then go "npm run dev".

# Issues:
I also wanted to add the feature of actually listening to music, but it turns out
I need Spotify premium to do that (I ain't wasting money on premium lol).
I didn't find any other free API that allow me to actually listen to mp3 songs.
Another limitation that this product has is the limited amount of albums.
(you have to hardcode the album ids in spotify request)

I used agile methodology to develop and it took me around 2.5 days to complete.