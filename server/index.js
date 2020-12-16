const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/', require('./routes/faculty'))
app.use('/', require('./routes/students'))
app.use('/', require('./routes/speciality'))

app.listen(5000, () => {
    console.log('Server has started on port 5000');
})