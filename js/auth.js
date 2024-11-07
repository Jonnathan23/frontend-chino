import { errors } from "./alerts.js";


const url = 'https://backend-shifu.onrender.com/shifu/po'


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
    const findUser = allUsers.find( (u) => user.username === u.username)  
    
    if(!findUser) {
        errors('El Usuario no existe')
        return
    }    
    if(user.password === findUser.password){
        const publicUser = { id: findUser.id, username: findUser.username }

        localStorage.setItem('currentUser', JSON.stringify(publicUser));
        window.location.href = 'estado.html'
        console.log('Logeado correctamente')
     }else { 
        errors('Contraseña incorrecta!')
    }

}

