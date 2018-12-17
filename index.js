const express = require('express')
const webPush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')
const VapidKeys = require('./config/keys')

const app = express()

webPush.setVapidDetails("mailto:burningraven06@outlook.com", VapidKeys.PUBLIC_VAPID_KEY, VapidKeys.PRIVATE_VAPID_KEY)

app.use(express.static(path.join(__dirname, "client")))

app.use(bodyParser.json())

app.post("/subscribe",  (req, res) => {
  const subscription = req.body;
  res.status(201).json({})

  const payload = JSON.stringify({ title : "Push Notification Test"})

  webPush.sendNotification(subscription, payload).catch( err => console.error(err))

})

app.listen(5000, () => {
  console.log("Server Listening on 5000")
})