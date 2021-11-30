const express = require('express')
const app = express()

app.use(express.static('./build'))

app.listen(8091,()=>{
  console.log('server running at http"//127.0.0.1')
})

