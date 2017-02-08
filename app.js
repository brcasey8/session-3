const express = require('express') 
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient 
// require the npm library
const app = express() 
// create a var for the app to be built using express
// app is the global variable namespace for the program we are building
const port = 9000

app.use(bodyParser.urlencoded({extended:true}))

MongoClient.connect('mongodb://brcasey:pandla23@ds061189.mlab.com:61189/session-3', (err, database) => {
   if (err) return console.log(err)
    db = database
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
  })
})


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
}) 

app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/entry/:name?/:link?', function(req, res){
	let name = req.params.name;
	let hashLink = req.params.link;
  res.send(`
    <h1>${name}</h1>
    <p>Commentary on ${hashLink} will go here.</p>
    `)
})

// app.listen(port, function () {
//   console.log(`Listening on port ${port}!`)
// })