window.librosList = [];

const showErrores = (errores)=>{
    const ul = document.createElement("ul");
    errores.forEach((er)=>{
        const li = document.createElement("li");
        li.innerText = er;
        ul.appendChild(li);
    })
    Swal.fire({title: "Hay errores de validación", html: ul.innerHTML, icon: "error"});
};

const cargarTabla = ()=>{
    const body = document.querySelector("#libros-tabla > tbody");
    body.innerHTML = "";

    const libros = window.librosList;
    libros.forEach((l)=>{
        const tr = document.createElement("tr");

        const tdISBN = document.createElement("td");
        tdISBN.innerText = l.isbn;

        const tdTitulo = document.createElement("td");
        tdTitulo.innerText = l.titulo;

        const tdAutor = document.createElement("td");
        tdAutor.innerText = l.autor;

        const tdGenero = document.createElement("td");
        tdGenero.innerText = l.genero;

        const tdAño = document.createElement("td");
        tdAño.innerText = l.año;


        tr.appendChild(tdISBN);
        tr.appendChild(tdTitulo);
        tr.appendChild(tdAutor);
        tr.appendChild(tdGenero);
        tr.appendChild(tdAño);

        body.append(tr)
    });
};


document.querySelector("#registrar-btn").addEventListener("click", ()=>{

    const errores = [];

    const isbn = document.querySelector("#isbn-txt").value;
    const titulo = document.querySelector("#titulo-txt").value;
    const autor = document.querySelector("#autor-txt").value;
    const genero = document.querySelector("#genero-select").value;
    const año = document.querySelector("#año-txt").value;

    if(!isbn.trim()){
        errores.push("ISBN es obligatorio.");
    }

    if(isbn.trim().length !== 13){
        errores.push("El ISBN debe ser de 13 caracteres.");
    }

    if(window.librosList.find((l => l.isbn === isbn))){
        errores.push("Ya hay un libro con ese código.");
    };

    if(!titulo.trim()){
        errores.push("Debe ingresar un título.")
    }

    if(titulo.trim().length > 30){
        errores.push("El título debe tener como máximo 30 caracteres.")
    }

    if(!autor.trim()){
        errores.push("Debe ingresar un autor.")
    }

    if(autor.trim().length > 30){
        errores.push("El autor debe tener como máximo 30 caracteres.")
    }

    if(año < 1450 || año > 2025){
        errores.push("El año de publicación debe ser entre 1450 y el año actual.");
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
    Swal.fire({title: "Exitoso", text:`Libro ${isbn} Registrado`});
    cargarTabla();
})