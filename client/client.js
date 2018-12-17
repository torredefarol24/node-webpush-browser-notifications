const publicKey = "BMfd76O0cdcOIp2b2SYtvq7pTkG7u-gL-ohAYFwTasksMm2uN1rXAsuFGqBN9mhpjxiO7pRf3htYH313iTSSykE"

if ('serviceWorker' in navigator){
  send().catch(err => console.error(err))
}

async function send(){
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope : "/"
  })

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly : true,
    applicationServerKey : urlBase64ToUint8Array(publicKey)
  })

  let endpoint = "http://localhost:5000/subscribe"
  let reqOptions = {
    method : "POST",
    body : JSON.stringify(subscription),
    headers : {
      'Content-Type' : 'application/json'
    }
  }
  await fetch(endpoint, reqOptions)

}


function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}