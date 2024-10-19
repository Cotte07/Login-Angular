

function loguear(){

    let user = document.getElementById("Usuario").value;
    let Password = document.getElementById("Password").value;

    if(user == "udi2024"){
        if(Password == "udi2024"){
            window.location = "Pagina-principal.component.html";
        }
        else{
            alert("Contraseña incorrecta.")
        }
    }
    else{
        alert("Usuario incorrecto o no registrado.")
    }
}