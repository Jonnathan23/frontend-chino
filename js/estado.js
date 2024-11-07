import { errors, updateSuccessfully } from "./alerts.js";
const url = 'http://localhost:4000/shifu/po';

const btAbrir = document.getElementById('abrir')
const btCerrar = document.getElementById('cerrar')

btAbrir.addEventListener('click', () => updateState (1))
btCerrar.addEventListener('click',() => updateState(0))

function updateState(bit) {
    console.log('Clic State' + bit)
    fetch(`${url}/state`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            descripcion: bit
        })
    })
    .then(response => {
        if (!response.ok) {
            errors('Error al cambiar el estado')
            throw new Error('Error en la petición');
        }
        return response.json();
    })
        .then(data => updateSuccessfully(`Se actualizo correctamente a ${data.data.descripcion}`))
        .catch(error => {
            errors('Error al actualizar el estado')
            console.error('Error:', error);
        })


}

