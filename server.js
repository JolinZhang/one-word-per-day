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

app.post('/images', async (req, res) =>{
  try{
    console.log("image request " + req.body.message)
    const query = req.body.message
    const apiKey = process.env.Google_API_Key
    const searchEngineKey = process.env.Google_Cx
    var params = new URLSearchParams({
      key : apiKey,
      cx : searchEngineKey,
      q : query,
      searchType: 'image',
      num: 6,
      safe: 'active'
    })
    const getImageUrl = "https://www.googleapis.com/customsearch/v1?" + params
    console.log(getImageUrl)
    const options = {
        method : 'get',
        hearders: {
          'Content-Type': 'applciation/json'
        }
    }
    const response = await fetch(getImageUrl, options)
    const data = await response.json()
    console.log(data)
    res.send(data)
  }catch(error){
    console.error(error)
  }
})

app.post('/aiImages', async (req, res) => {
  try{
    console.log(req.body.message)
    const response = await openai.images.generate
    ({ 
      model: "dall-e-3", 
      prompt: req.body.message, 
    });
    console.log(response.data)
    res.send(response.data)
  //    const data = [
  //   {
  //   revised_prompt: "An image showcasing everyday rural life. Central to the scene, a Middle-Eastern man farmer in his late 50s, wearing a straw hat, checked shirt, and denim jeans, is preoccupied in the field. He's operating a vintage tractor on a sunlit day in the agricultural landscape, the crops waving gently in the breeze. A beautiful red barn completes the scene in the background along with a few haystacks scattered around. Cows are seen grazing peacefully in the nearby pasture, and chickens are pecking grains just off to the side of the barn.",
  //   url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-XnKg87NBohpu8mSTuHnt5JWC/user-i5cpF7rItwTBeunO3rkcswC4/img-KoJ9W4RKU0qDrd3cU2msM1t4.png?st=2024-04-24T02%3A47%3A51Z&se=2024-04-24T04%3A47%3A51Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-23T16%3A16%3A57Z&ske=2024-04-24T16%3A16%3A57Z&sks=b&skv=2021-08-06&sig=lsa2dHNdZuNKTQ6XJypBUrwhm61zlIX8zUbnQUFB0Zs%3D'
  //   }
  // ]
  //   res.send(data)
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
    console.log(req.body.message)
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
  }catch(error){
    console.error(error)
  }
})

const wordList = ['Barber', 'Hammerhead-shark', 'Bull', 'Bookkeeper', 'Bone', 'Ankle', 'Graphic-designer', 'Mule', 'Computer-programmer', 'Wrist', 'Dog', 'Mole', 'Lung', 'Porcupine', 'Otter', 'Bricklayer', 'Boar', 'Horse', 'Elbow', 'Giant-panda', 'Stomach', 'Ostrich', 'Lifeguard', 'Nurse', 'Albatross', 'Tonsils', 'Liver', 'Astronaut', 'Iguana', 'Llama', 'Carpenter', 'Painter', 'Buttocks', 'Bladder', 'Teeth', 'Dancer', 'Appendix', 'Thorax', 'Historian', 'Frog', 'Actor', 'Spine', 'Arctic', 'Farmer', 'Dodo', 'Toe', 'Baker', 'Librarian', 'Armadillo', 'Elephant', 'Owl', 'Heel', 'Musician', 'Lip', 'Nipple', 'Bat','Badger', 'Bus-driver', 'Civil-engineer', 'Ear', 'Polar', 'Tongue', 'Chest', 'Fingernail', 'Digestive-system', 'Spinal-cord', 'Mechanic', 'Cook', 'Belly', 'Hairstylist', 'Construction-worker', 'Finger', 'Goose', 'Abdomen', 'Crow', 'Blood-vessels', 'Housekeeper', 'Forehead', 'Racoon', 'Anatomy', 'Detective', 'Molar', 'Baboon', 'Face', 'Biologist', 'Leopard', 'Judge', 'Doctor', 'Sheep', 'Hedgehog', 'Monitor', 'Crocodile', 'Possum', 'Athlete', 'Back', 'Bear', 'Muscle', 'Flight-attendant', 'Pigeon', 'Rhinoceros', 'Photographer', 'Bartender', 'Donkey', 'Coach', 'Accountant', 'Elk', 'Eel', 'Cheetah', 'Alligator', 'Sloth', 'Lawyer', 'Antelope', 'Pinky', 'Hare', 'Chemist', 'Whale', 'Arch', 'Cheek', 'Waist', 'Deer', 'Tiger', 'Chimpanzee', 'Cobra', 'Jaw', 'Banker', 'Fisherman', 'Jaguar', 'Snake', 'Eyelashes', 'Engineer', 'Eyelid', 'Knee', 'Gardener', 'Lion', 'Wombat', 'Peacock', 'Rat', 'Index-finger', 'Gorilla', 'Blue-whale', 'Panther', 'Hawk', 'Kangaroo', 'Cat', 'Lemur', 'Tissue', 'Dentist', 'Architect', 'Cleaner', 'Meerkat', 'Fox', 'Actress', 'Duck', 'Artist', 'Respiratory-system', 'Pelvis', 'Skin', 'Tooth', 'Collar-bone', 'Jellyfish', 'Turtle', 'Rabbit', 'Goat', 'Belly-button', 'Eyebrow', 'Chinchillas', 'Wolf', 'Eagleflying-squirrel', 'Jackal', 'Mammoth', 'Monkey', 'Beagle', 'Bison', 'Shoulder', 'Dolphin', 'Beaver', 'Fish', 'Swan', 'Intestines', 'Orangutan', 'Flamingo', 'Nerves', 'Camel', 'Emu', 'Buffalo', 'Hamster', 'Chin', 'Cow', 'Nostril', 'Electrician', 'Economist', 'Hippopotamus', 'Hen', 'Zebra', 'King-cobra', 'Mouse', 'Arm', 'Firefighter', 'Chihuahua', 'Journalist', 'Chameleon', 'Hip', 'Tortoise', 'Ibex', 'Giraffe', 'Florist', 'Kidney', 'Lynx', 'Breast', 'Chef', 'Cell', 'Vulture', 'Ribs', 'Hermit-crab', 'Heart', 'Koala', 'Lizard'];