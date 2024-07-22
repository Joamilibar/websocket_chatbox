// javascript

// import Swal from "sweetalert2";

const socket = io();
//socket.emit('message', 'Soy un Mensaje desde Websockets');

let user;
let chatBox = document.getElementById('chatBox');



Swal.fire({
    title: 'Ingresa tu nombre',
    input: 'text',
    text: 'Tu Nombre',
    inputValidator: (value) => {

        return !value && 'Debes ingresar un nombre';

    },
    allowOutsideClick: false,
    icon: 'info',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#007bff'
}).then(result => {
    user = result.value;
    console.log(user);
})

// lógica para traer el contenido del input en el formulario

chatBox.addEventListener("keyup", evt => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user, message: chatBox.value });
            console.log(chatBox.value);
            chatBox.value = '';
        }
    }

})

socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs');
    let message = "";
    data.forEach(element => {
        message += `<p>${element.user}: ${element.message}</p></br>`
    });
    log.innerHTML = message;
})