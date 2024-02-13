import './App.css';
import { Tooltip } from 'react-tooltip'

const SurpriseMe = () =>{}

const App = () => {
  const [images, setImage] = useState(null)
  const [value, setValue] = useState("")
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
  console.log(value)
  return (
    <div className="app">
      <section className="search-section">
      <p>Put your words here 
        <span className="surprise" onlick={SurpriseMe}>Surprise me!</span>
      </p>
      <div className="input-container">
        <input value = {value} placeholder="a red apple" onChange={e => setValue(e.target.value)}/>
        <button onClick={getImages}>Generate</button>
      </div>
      </section>
      <section className="image-section">
        {images?.map((image, _index) => 
            <img data-tooltip-id="my-tooltip" data-tooltip-content={image.revised_prompt} data-tooltip-place="bottom-start"
            key={_index} src={image.url} alt={image.revised_prompt}/>  
        )} 
      <Tooltip id="my-tooltip"/>
      </section>
      
    </div>
  );
}

export default App;
