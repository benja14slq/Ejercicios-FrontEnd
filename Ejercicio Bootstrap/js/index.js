const jugadores = []; // Arreglo, permite guardar muchas cosas, muchos objetos

const posiciones = ['Selecionar Posición', 'Arquero', 'Defensa', 'Lateral', 'Volante', 'Delantero']

const borrar = async function(){
    const idJugador = this.idJugador;
    const resp = await Swal.fire({
    title: "Deseas borrar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si"
    });
    if(resp.isConfirmed){
        jugadores.splice(idJugador, 1);
        cargarTabla();
        Swal.fire("Eliminado");
    }
}

//1. Buscar el select
//2. Generar las opciones dinamicamentes
const selectPosicion = document.querySelector("#posicion-select");
for(let i = 0; i < posiciones.length; ++i){
    let option = document.createElement("option");
    option.value = i;
    option.innerText = posiciones[i];
    selectPosicion.appendChild(option);
}



const cargarTabla = ()=> {
    //1. Seleccionar el tbody
    const tbody = document.querySelector("#tabla-tbody")
    tbody.innerHTML = ""
    //2. Recorrer el arreglo de jugadores
    for (let i = 0; i < jugadores.length; ++i){
        let j = jugadores[i];
        //3. Por cada jugador, generar una fila (tr)
        let fila = document.createElement("tr");
        //4. Por cada atributo del jugador, generar una celda
        let celdaNombre = document.createElement("td");
        celdaNombre.innerText = j.nombre;

        let celdaUrl = document.createElement("td");
        celdaUrl.classList.add("text-center");
        let imgJugador = document.createElement("img")
        imgJugador.src = j.url;
        imgJugador.classList.add("img-jugador");
        celdaUrl.appendChild(imgJugador);

        let celdaPosicion = document.createElement("td");
        celdaPosicion.innerText = posiciones[j.posicion];

        let celdaEquipo = document.createElement("td");
        celdaEquipo.innerText = j.equipo;

        let celdaAcciones = document.createElement("td");
        let btnEliminar = document.createElement("button");
        celdaAcciones.classList.add("text-center")
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.innerText = "Borrar";
        btnEliminar.idJugador = i;
        btnEliminar.addEventListener("click", borrar);
        celdaAcciones.appendChild(btnEliminar);
    

        //5. Agregar cada celda a la fila nueva.
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaUrl);
        fila.appendChild(celdaPosicion);
        fila.appendChild(celdaEquipo);
        fila.appendChild(celdaAcciones)
        //6. Agregar la fila al cuerpo
        tbody.appendChild(fila);
    }
};

// Agregar Listener para evento Click
document.querySelector("#registrar-btn").addEventListener("click", ()=>{
    let nombre = document.querySelector("#nombre-txt").value;
    let url = document.querySelector("#url-txt").value;
    let posicion = document.querySelector("#posicion-select").value;
    let equipo = document.querySelector("#equipo-txt").value;

    let errores = [];

    if(nombre.trim() == ""){
        errores.push("Debe ingresar un nombre");
    }else if (jugadores.find(j=>j.nombre.toLowerCase() == nombre.toLowerCase()) != undefined){
        errores.push("El jugador ya existe");
    }

    if(url.trim() == ""){
        errores.push("Debe ingresar una url");
    }

    if(errores.length == 0 ){
        let jugador = {}; // Objeto, permite definir muchas propiedades
        jugador.nombre = nombre;
        jugador.url = url;
        jugador.posicion = posicion;
        jugador.equipo = equipo;
        jugadores.push(jugador);
        cargarTabla();
    } else {
        let mensaje = errores.join("<br/>");
        Swal.fire("Errores de validación", mensaje, "warning");
    }
});

document.querySelector("#borrar-btn").addEventListener("click", ()=> {
    document.querySelector("#nombre-txt").value = "";
    document.querySelector("#url-txt").value = "";
    document.querySelector("#raza-select").value = "";
    document.querySelector("#equipo-txt").value = "";
});