window.librosList = [];

const showErrores = (errores) =>{
    const ul = document.createElement("ul");
    errores.forEach((e) => {
        const li = document.createElement("li");
        li.innerText = e;
        ul.appendChild(li);
    });
    Swal.fire({title: "Hay errores de validación", html: ul.innerHTML, icon: "error"})
};

const cargarTabla = ()=>{
    const body = document.querySelector("#libros-tabla > tbody");
    body.innerHTML = "";

    const libros = window.librosList;
    libros.forEach((l)=>{
        const tr = document.createElement("tr");

        const celdaISBN = document.createElement("td");
        celdaISBN.innerText = l.isbn;

        const celdaTitulo = document.createElement("td");
        celdaTitulo.innerText = l.titulo;

        const celdaAutor = document.createElement("td");
        celdaAutor.innerText = l.autor;

        const celdaGenero = document.createElement("td");
        celdaGenero.innerText = l.genero;

        const celdaAño = document.createElement("td");
        celdaAño.innerText = l.año;

        tr.appendChild(celdaISBN);
        tr.appendChild(celdaTitulo);
        tr.appendChild(celdaAutor);
        tr.appendChild(celdaGenero);
        tr.appendChild(celdaAño);

        body.append(tr);
    });
};

const buscarLibros = (texto) => {
    const body = document.querySelector("#libros-tabla > tbody");
    body.innerHTML = "";

    const filtro = (texto || "").trim().toLowerCase();
    const tipo = (document.querySelector("#tipo-select").value || "").toLowerCase();

    const libros = window.librosList;
    libros.forEach((l) =>{
        const campo = tipo === "autor"
            ? (l.autor || "")
            : (l.titulo || "");

        if(filtro === "" || campo.toLowerCase().startsWith(filtro)){
            const tr = document.createElement("tr");

            const celdaISBN = document.createElement("td");
            celdaISBN.innerText = l.isbn;

            const celdaTitulo = document.createElement("td");
            celdaTitulo.innerText = l.titulo;

            const celdaAutor = document.createElement("td");
            celdaAutor.innerText = l.autor;

            const celdaGenero = document.createElement("td");
            celdaGenero.innerText = l.genero;

            const celdaAño = document.createElement("td");
            celdaAño.innerText = l.año;

            tr.appendChild(celdaISBN);
            tr.appendChild(celdaTitulo);
            tr.appendChild(celdaAutor);
            tr.appendChild(celdaGenero);
            tr.appendChild(celdaAño);

            body.append(tr);
        }
    });
}

document.querySelector("#buscar-txt").addEventListener("input", (e) => {
    const valor = e.target.value;
    if (valor.trim() === ""){
        cargarTabla();
    } else {
        buscarLibros(valor);
    }
});

document.querySelector("#tipo-select").addEventListener("change", ()=>{
    const valor = document.querySelector("#buscar-txt").value || "";
    if (valor.trim() === ""){
        cargarTabla();
    } else {
        buscarLibros(valor);
    }
});
 
document.querySelector("#registrar-btn").addEventListener("click", ()=>{
    const errores = [];
    
    const isbn = document.querySelector("#isbn-txt").value;
    const titulo = document.querySelector("#titulo-txt").value;
    const autor = document.querySelector("#autor-txt").value;
    const genero = document.querySelector("#genero-select").value;
    const año = document.querySelector("#año-txt").value;

    if(!isbn.trim()){
        errores.push("ISBN obligatorio")
    } else if (isbn.trim().length !== 13){
        errores.push("El ISBN debe ser de 13 caracteres");
    } else if (window.librosList.find((l => l.isbn === isbn))){
        errores.push("Ya hay un libro con ese código");
    }

    if(!titulo.trim()){
        errores.push("El título debe ser obligatorio");
    } else if (titulo.trim().length > 30){
        errores.push("El titulo debe tener como máximo 30 carecteres.");
    }

    if(!autor.trim()){
        errores.push("El autor debe ser obligatorio");
    } else if(titulo.trim().length > 20){
        errores.push("el autor debe tener como máximo 30 caracteres");
    }

    if(!genero){
        errores.push("Debe seleccionar un género");
    }

    if (año === "" || año === null){
        errores.push("Debe ingresar el año de publicacion");
    } else if (año < 1450 || año > 2025){
        errores.push("El año de publicación debe ser entre 1450 y el año actual");
    }

    if(errores.length > 0){
        showErrores(errores);
        return;
    }

    const libro = {};
    libro.isbn = isbn;
    libro.titulo = titulo;
    libro.autor = autor;
    libro.genero = genero;
    libro.año = año;
    window.librosList.push(libro);
    cargarTabla();

    const valor = document.querySelector("#buscar-txt").value || "";
    if (valor.trim() !== ""){
        buscarLibros(valor);
    }

    Swal.fire({title: "Exitoso", text: `Libro ${isbn} registrado`, icon: "success"})

    document.querySelector("#isbn-txt").value = "";
    document.querySelector("#titulo-txt").value = "";
    document.querySelector("#autor-txt").value = "";
    document.querySelector("#genero-select").value = "";
    document.querySelector("#año-txt").value = "";
});

cargarTabla();