const express = require('express')
const compression = require('compression')
const app = express()

app.use(compression())  // 开启Gzip 压缩
app.use(express.static('./build'))

app.listen(8091,()=>{
  console.log('server running at http"//127.0.0.1')
})

