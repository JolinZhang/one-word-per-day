import './App.css'
import React, {useState} from 'react'

const App = () => {
  const [images, setImage] = useState(null)
  const [value, setValue] = useState("")
  const [definition, setDefinition] = useState("")
  const [audio, setAudio] = useState("")
  const [audioUrl, setAudioUrl] = useState(null)

  const surpriseMe = async() =>{
    try{
      const options = {
        method: 'post',
        headers: {
          'Content-type':'application/json'
        }
      }
      const response = await fetch('http://localhost:8000/word', options)
      const data = await response.text()
      console.log(data)
      setValue(data)
    }catch(error){
      console.error(error)
    }
  }
  const getWordDetail = async() =>{
    try{
      if(!value) return
      const options = {
        method: 'post',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          message: value
        })
      }
      const response = await fetch('http://localhost:8000/wordDefinition', options)
      const data =  await response.json()
      console.log(data)
      setDefinition(data[0].shortdef)
      setAudio(data[0].hwi.prs[0].sound.audio)
    }catch(error){
      console.error(error)
    }
  }

  const playAudio = () => {
     if(audio === "") return
      const subdirectory = audio.charAt(0)
      const getSoundBaseUrl = 'https://media.merriam-webster.com/audio/prons/en/us/mp3/'+subdirectory+'/'+audio+'.mp3'
      let audioUrl = new Audio(getSoundBaseUrl)
      setAudioUrl(audioUrl)
      console.log(getSoundBaseUrl) 
      if(audio.length === 0 || audioUrl === null || audioUrl === undefined) return
      audioUrl.play()
  } 
 
  const getImages = async()=> {
    if(!value) return
    try{
        const options = {
          method: 'post',
          body:JSON.stringify({
            message: value
          }),
          headers: {
            'Content-type':'application/json'
          }
        }
        const response = await fetch('http://localhost:8000/images', options)
        const data = await response.json()
      
      console.log(data)
      setImage(data)
      }catch(error){
        console.error(error)
      }
  }
  return (
    <div className="app">
      <section className="search-section">
      <p>Put your words here 
        <span className="surprise" onClick={surpriseMe}>Surprise me!</span>
      </p>
      <div className="input-container">
        <input value = {value} placeholder="a red apple" onChange={e => setValue(e.target.value)}/>
        <button onClick={getWordDetail}>WordDetails</button>
      </div>
      </section>
      <section className="word-definition">
      <p>{definition}</p> 
      {audio.length > 0 && <button onClick = {playAudio}>Sound</button>}
      </section>
      <section>
      <div className="input-container">
        <input value = {value} placeholder="a red apple" onChange={e => setValue(e.target.value)}/>
        <button onClick={getImages}>GenerateImg</button> 
      </div>
      </section>
      <section className="image-section">
        {images?.map((image, _index) => 
            <img key={_index} src={image.url} alt={image.revised_prompt}/>  
        )}
      </section>
      
    </div>
  );
}

export default App;
