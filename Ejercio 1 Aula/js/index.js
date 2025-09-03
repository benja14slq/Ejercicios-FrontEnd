// Se crea un array global, 
// al estar en window es accesible desde cualquier script
window.terminatorsList = [];

// Constantes
const PRIORIDAD_MAXIMA = 999;
const OBJETIVO_PRIMARIO = "SARAH CONNOR";

// Función que según el tipo, obtiene su prioridad
const getPrioridad = (tipo)=>{   
    const prioridades = { 
        "t-1": 1,
        "t-800": 100,
        "t-1000": 200,
        "t-3000": 500
    };
    return prioridades[tipo];
}

const showErrores = (errores)=>{
    //0. Crear un <ul>
    const ul = document.createElement("ul");
    //1. Recorrer la lista
    errores.forEach((er)=>{
         //2. Por cada elemento de la lista voy a generar un <li></li>
        //3. Agregar cada li al (ul)
        const li = document.createElement("li");
        li.innerText = er;
        ul.appendChild(li);
    })
    // 4. Agregarlo a un Swal
    Swal.fire({title: "Hay errores de validacion", html: ul.innerHTML, icon: "error"});
};

const renderTerminators = ()=>{
    //0. Obtener una referencia a la tabla (querySelector)
    const cuerpo = document.querySelector("#terminator-table > tbody");
    cuerpo.innerHTML = "";
    const terminators = window.terminatorsList;
    //1. recorrer con forEach
    terminators.forEach((t)=>{
        //2. Generar por cada terminator un tr
        const tr = document.createElement("tr");
        //3. Por cada atributo del terminator generar td
        //4. innerText del td tiene que ser el valor del atributo
        const tdNro = document.createElement("td");
        tdNro.innerText = t.nroSerie;
        const tdTipo = document.createElement("td");
        tdTipo.innerText = t.tipo;
        const tdObjetivo = document.createElement("td");
        tdObjetivo.innerText = t.objetivo;
        const tdAnio = document.createElement("td");
        tdAnio.innerText = t.anio;
        const tdPrioridad = document.createElement("td");
        tdPrioridad.innerText = t.prioridad;

        //5. Agregar cada td en orden al tr (appendChild)
        tr.appendChild(tdNro);
        tr.appendChild(tdTipo);
        tr.appendChild(tdObjetivo);
        tr.appendChild(tdAnio);
        tr.appendChild(tdPrioridad);

        //6. Agregar el tr a la tbody
        cuerpo.appendChild(tr);
    });
};

document.querySelector("#registrar-btn").addEventListener("click", ()=>{

    const errores = [];

    //Agregar un terminator a la lista
    const nroSerie = document.getElementById("nro-serie-txt").value;
    const tipo = document.querySelector("#tipo-select").value;
    const objetivo = document.querySelector("#objetivo-txt").value;
    const anio = document.querySelector("#anio-txt").value;
    let prioridad = getPrioridad(tipo);

    if(nroSerie.trim().length != 7){
        errores.push("Debe ingresar nro de serie de largo 7");
       // errores = [...errores,  "Debe ingresar nro de serie de largo 7"]; por que??
    }

    if(window.terminatorsList.find((t=> t.nroSerie == nroSerie))){
        errores.push("El terminator ya existe");
    }

    if (!tipo) {
        errores.push("El tipo es obligatorio");
    }

    if (!objetivo.trim()){
        errores.push("Debe ingresar un objetivo");
    }

    if (anio < 1997 || anio > 3000){
        errores.push("El anio de destino debe ser entre 1997 y 3000");
    }

    if (objetivo.trim().toUpperCase() === OBJETIVO_PRIMARIO){
        prioridad = PRIORIDAD_MAXIMA;
    }

    //Si hay errores, se corta el fljo
    if( errores.length > 0){
        showErrores(errores);
        return;
    }

    // Aqui crea el objeto
    const terminator = {nroSerie, tipo, objetivo, anio, prioridad};
    window.terminatorsList.push(terminator);
    Swal.fire({title: "Exitoso", text: `Terminator ${nroSerie} Registrado`});
    renderTerminators();
});