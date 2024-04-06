import OpenAI from 'openai'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const PORT = 8000
const openai = new OpenAI();
const app = express()
app.use(cors())
app.use(express.json())
app.listen(PORT,() => console.log('your server is running on port' + PORT))

app.post('/images', async (req, res) => {
  try{
    console.log(req.body.message)
    const response = await openai.images.generate
    ({ 
      model: "dall-e-3", 
      prompt: req.body.message, 
    });
    console.log(response.data)
    res.send(response.data)
    // const data = [
    //   {
    //     revised_prompt: 'Create an image that showcases a vibrant garden in full bloom. Dominating the center of the garden should be a large, captivating flower with an explosion of colors, its petals spreading wide open, revealing a bright, golden core. Beside it, make sure to add a mixture of smaller flowers in a riot of colors - red, yellow, orange, pink, and purple. Please also depict the sun above, casting a warm glow over the scene. Include the details such as dewdrops clinging to the petals and leaves, enriching the visual portrayal of this lively garden.',
    //     url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-XnKg87NBohpu8mSTuHnt5JWC/user-i5cpF7rItwTBeunO3rkcswC4/img-DndLlljAlguZWXsak3jhL4kJ.png?st=2024-04-06T03%3A55%3A51Z&se=2024-04-06T05%3A55%3A51Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-05T23%3A44%3A00Z&ske=2024-04-06T23%3A44%3A00Z&sks=b&skv=2021-08-06&sig=m/kepvIPVExudOp4LVUx216YWo90Sh8XJ7g21/6%2BdSg%3D'
    //   }
    // ]
    //res.send(data)
  }catch(error){
    console.error(error)
  }
})

app.post('/word',  async (req, res) => {
  try{
    //Radom pick a word from the list
    const random = Math.floor(Math.random()*wordList.length)
    const data = wordList[random]
    console.log(data)
    res.send(data)
  }catch(error){
    console.error(error)
  }
})

app.post('/wordDefinition', async (req, res) => {
  try{
    console.log("word definition "+ req.body.message)
    const learnerKey = process.env.LEARNER_API_KEY
    var params = new URLSearchParams({
      key: learnerKey
    })
    const getWordBaseUrl = 'https://dictionaryapi.com/api/v3/references/learners/json/'+req.body.message +'?' + params
    console.log(getWordBaseUrl)
    const option = {
      method: 'get',
      headers:{
        'Content-Type' : 'application/json'
      }
    }
    const response = await fetch(getWordBaseUrl, option)
    const data = await response.json()
    console.log(data)
    res.send(data)
  }catch(eror){
    console.error(error)
  }
})

const wordList = ['apple', 'farmer', 'party', 'baby', 'father', 'picture', 'back', 'feet', 'pig', 'ball', 'fire', 'rabbit', 'bear', 'fish', 'rain', 'bed', 'floor', 'ring', 'bell', 'flower', 'robin', 'bird', 'game', 'Santa Claus', 'birthday', 'garden', 'school', 'boat', 'girl', 'seed', 'box', 'good-bye', 'sheep', 'boy', 'grass', 'shoe', 'bread', 'ground', 'sister', 'brother', 'hand', 'snow', 'cake', 'head', 'song', 'car', 'hill', 'squirrel', 'cat', 'home', 'stick', 'chair', 'horse', 'street', 'chicken', 'house', 'sun', 'children', 'kitty', 'table', 'Christmas', 'leg', 'thing', 'coat', 'letter', 'time', 'corn', 'man', 'top', 'cow', 'men', 'toy', 'day', 'milk', 'tree', 'dog', 'money', 'watch', 'doll', 'morning', 'water', 'door', 'mother', 'way', 'duck', 'name', 'wind', 'egg', 'nest', 'window', 'eye', 'night', 'wood', 'farm', 'paper'];