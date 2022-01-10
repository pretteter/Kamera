var socket = io("http://localhost:3000/", {
  transports: ["websocket"],
  path: "/quizData/"
});
console.log(socket);
socket.on("connect_error", (data) => {
  console.log("not_connected")
})

socket.on("connect", (data) => {
  console.log("connected")
})

socket.on("cam", (data) => {
 // console.log(data)
})

socket.on("plate", (data) => {
  console.log(data)
})

var serverData = (function () {
  return {
    camData: function (x) {
      socket.on("cam", (data) => {
        x(data);
      })
    }
  }
})(serverData || {})


// var serverData = (function () {
//   return {
//     sendData: function sendData(data) {
//       // console.table(data);
//       socket.emit('quizData', data);
//     }
//   }
// })(serverData || {})
