const socket = io("http://localhost:3001");

document.getElementById("register-button").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    
    socket.emit("registration", username);
    }
);
