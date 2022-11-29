export const validarCorreo = (correo) => {
    let isValid = true;
    if (correo !== "undefined") {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(correo)) {
            isValid = false;
            alert("Ingresa un correo valido.");
        }
    }
    return isValid;
};

export const validarNum = (num) => {
    let isValid = false;
    if (num.length == 10) {
        var pattern = new RegExp(/^[0-9]+$/i);
        if (pattern.test(num)) {
            isValid = true;
            return isValid;
        }
    }
    alert("numero invalido.");
};

export const validarContraseña = (contra) => {
    let isValid = false;
    var pattern = new RegExp(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/i);
    if (pattern.test(contra)) {
        isValid = true;
        return isValid;
    }
    alert("Contraseña invalida.");
};

export const validarUsuario = (user) => {
    let isValid = false;
    var pattern = new RegExp(/^[a-z0-9_-]{3,16}$/i);
    if (pattern.test(user)) {
        isValid = true;
        return isValid;
    }
    alert("Usuario invalido.");
};


export const validarNombre = (nombre) => {
    let isValid = false;
    var pattern = new RegExp(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/i);
    if (pattern.test(nombre)) {
        isValid = true;
        return isValid;
    }
    alert("Nombre invalido.");
};