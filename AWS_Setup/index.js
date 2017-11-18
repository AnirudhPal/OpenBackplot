// Import Libs
const express = require('express')

// Global Var
const app = express()

// Get Call
app.get('/', (req, res) => {
  res.send('HEY!')
})

// Print Statement
app.listen(3000, () => console.log('Server running on port 3000'))
