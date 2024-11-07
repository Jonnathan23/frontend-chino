export const errors = (message) => {
    Swal.fire({
        title: `Ups, Hubo un error`,
        text: `${message}`,
        icon: 'error',
        timer: 5000
    })
}

export const updateSuccessfully = (message) => {
    Swal.fire({
        title: 'Proceso exitoso',
        text: message,
        icon: 'success',
        timer: 5000
    })
}

export const warrnings = (message) =>{
    Swal.fire({
        title: 'Advertencia',
        text: message,
        icon: 'warning',
        timer: 5000
    })
}