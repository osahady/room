import { Socket } from "phoenix"

let socket = new Socket("/socket", { params: { token: window.userToken } })
socket.connect()

let channel = socket.channel("room:lobby", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })


let txtInput = document.querySelector("#chat-input")
let div = document.querySelector("#messages")

txtInput.addEventListener("keypress", event => {
  if (event.key === 'Enter') {
    channel.push("new_msg", { body: txtInput.value })
    txtInput.value = ""
  }
})
channel.on("new_msg", payload => {
  let p = document.createElement("p")
  p.innerText = `[${getTime()}] ${payload.body}`
  div.appendChild(p)
})

// push to server an event called "shout" with a payload of "Hello world!"
channel.push("shout", { body: "Hello world!" })
// listen to the "shout" event
channel.on("shout", payload => { console.log("shout", payload) })

// get time from date
function getTime() {
  let date = new Date()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let time = `${hours}:${minutes}`
  return time
}


export default socket
