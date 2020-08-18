const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

app.get('', (req, res) => {
  res.send("Hello darling :D !")
})

app.listen(PORT, (err) => {
  err ? console.log("Failed to connect :(") : console.log(`Server is running on port ${PORT}`)
})