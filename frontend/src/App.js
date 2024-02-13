import './App.css'
import React, {useState} from 'react'
import { AiFillSound } from "react-icons/ai"

const App = () => {
  const [images, setImage] = useState(null)
  const [AIImages, setAIImage] = useState(null)
  const [value, setValue] = useState("")
  const [definition, setDefinition] = useState("")
  const [audio, setAudio] = useState("")
  const [audioUrl, setAudioUrl] = useState(null)
  const baseUrl = process.env.REACT_APP_API_URL 

  const surpriseMe = async() =>{
    try{
      const options = {
        method: 'post',
        headers: {
          'Content-type':'application/json'
        }
      }
      const response = await fetch(baseUrl+'/word', options)
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
      const response = await fetch(baseUrl+'/wordDefinition', options)
      const data =  await response.json()
      console.log(data)
      if(!data){
        return
      }
      setDefinition(data[0]?.shortdef)
      console.log("definition "+ definition)
      setAudio(data[0]?.hwi?.prs[0]?.sound?.audio)
      console.log("Audio" + audio)
      
    }catch(error){
      console.error(error)
    }
  }
 //why do I put the sync function here
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
 
  const getImages = async() =>{
    try{
      if(!value) return
      const options = {
        method: 'post',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          message: value
        })
      }
      const response = await fetch(baseUrl+'/images', options)
      const data = await response.json()
      console.log(data)
      setImage(data.items)
    }catch(error){
      console.error(error)
    }
  }

  const getAIImages = async()=> {
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
        const response = await fetch(baseUrl+'/aiImages', options)
        const data = await response.json()
      console.log(data)
      setAIImage(data)
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
        <button onClick={() => {getWordDetail();getImages();}}>WordDetails</button>
      </div>
      </section>
      <section className="word-definition">
      <p> {definition?.length > 0 && <span> Definition: </span>} {definition}{audio?.length > 0 && <AiFillSound onClick = {playAudio}>&#xf028;</AiFillSound>}</p> 
      </section>
      <section className="image-section">
        {images?.map((image, _index) => 
            <img key={_index} src={image.link} alt={image.title}/>  
        )}
      </section>
      <section>
      <div className="input-container">
        <input value = {value} placeholder="a red apple" onChange={e => setValue(e.target.value)}/>
        <button onClick={getAIImages} disabled >GenerateAIImg</button> 
      </div>
      </section>
      <section className="AIimage-section">
      {AIImages?.map((image, _index) => 
            <img key={_index} src={image.url} alt={image.title}/>  
        )}
      </section>
    </div>
  );
}
export default App;
