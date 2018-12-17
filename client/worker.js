console.log("Service Worker Loaded")
self.addEventListener("push", event => {
  const data = event.data.json()
  console.log("Push Received")

  self.registration.showNotification(data.title, {
    body : "My Test Notification",
    icon : "http://image.ibb.co/frY0Fd/tm.logo.png"
  })
})