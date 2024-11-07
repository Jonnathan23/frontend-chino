import { errors, updateSuccessfully, warrnings } from "./alerts.js";
const url = 'https://backend-shifu.onrender.com/shifu/po';

const btAbrir = document.getElementById('abrir')
const btCerrar = document.getElementById('cerrar')
const linkSignOut = document.getElementById('signOut')

document.addEventListener('DOMContentLoaded', verifyLogin)

btAbrir.addEventListener('click', () => updateState(1))
btCerrar.addEventListener('click', () => updateState(0))
linkSignOut.addEventListener('click', signOut)



function verifyLogin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))        
    if (!currentUser) window.location.href = 'index.html'
}

function signOut(){
    localStorage.clear()
}

async function updateState(bit) {
    
    const state = await getState()
    
    if(state === bit) {
        warrnings(`El estado ya es ${bit}`)
        return
    }
    try {
        const response = await fetch(`${url}/state`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descripcion: bit
            })
        });
        
        if (!response.ok) {
            throw new Error('Error al cambiar el estado');
        }
        
        const data = await response.json();
        updateSuccessfully(`Se actualizó correctamente a ${data.data.descripcion}`);
    } catch (error) {
        errors('Error al actualizar el estado');        
    }

}

async function getState(){
    try {
        const res = await fetch(`${url}/state`);
        const response = await res.json();
        const state = response.data[0].descripcion;
        return state;

    } catch (error) {
        errors('Error al obtener el estado')
    }    
}

