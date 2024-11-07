import { errors } from "./alerts.js";

const url = 'http://localhost:4000/shifu/po'


const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = Object.fromEntries(
        new FormData(e.target)
    )    

    fetch(`${url}/user`).then(res => res.json())
    .then(response => {        
        auth(user,response.data)
    })
    

})


function auth (user, allUsers){
    const findUser = allUsers.find( (u) => user.username == u.username)
    
    console.log('Usuario encontrado: ' + findUser)
    if(!findUser) {
        errors('El Usuario no existe')
        return
    }    
    user.password === findUser.password ? window.location.href = 'estado.html' : errors('Contraseña incorrecta!')

}