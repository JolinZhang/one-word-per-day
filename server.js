import OpenAI from 'openai'
import express from 'express'
import cors from 'cors'

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
  }catch(error){
    console.error(error)
  }
})

app.post('/word', async (req, res) => {
  try{
    console.log(req.body.message)
    const response = await openai.images.generate
    ({ 
      model: "dall-e-3", 
      prompt: req.body.message, 
    });
    console.log(response.data)
    res.send(response.data)
  }catch(error){
    console.error(error)
  }
})

