const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const meetingController = require('./controllers/meeting.controller');

mongoose.connect('mongodb://localhost:27017/test');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/', meetingController.bookMeeting)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
