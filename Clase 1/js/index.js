const porcentaje_promedio = 0.6;
const porcentaje_examen = 0.4;

// Anonima, handler que llama la función
const init = () => {
    const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
};

init();

const validar = (elemento) => {
    // Limipieza del elemento
    elemento.classList.remove("is-invalid");
    const divPadre = elemento.parentElement;
    const label = divPadre.querySelector("label").innerText; // Obtener el texto de cualquier elemento que no sea un input
    if (divPadre.querySelector(".invalid-feedback")) {
        divPadre.querySelector(".invalid-feedback").remove();
    }

    if (!elemento.value || elemento.value < 0 || elemento.value > 100) {
        // Aqui voy a generar los nuevos elementos
        elemento.classList.add("is-invalid");
        // Crear un elemento HTML programaticamente
        const feedback = document.createElement("div");
        feedback.innerText = `${label} es incorrecto`;
        feedback.classList.add("invalid-feedback")
        divPadre.appendChild(feedback);
        return false;
    }
    return true
}

document.querySelector("#calcular-btn").addEventListener("click", () => {
    const promedioTxt = document.querySelector("#promedio-txt");
    const examenTxt = document.querySelector("#examen-txt");

    if (!validar(promedioTxt) | !validar(examenTxt)) { // || si el primero es false, no se ejecuta el segundo, | se evaluan las dos
        return;
    }

    const promedio = promedioTxt.value;
    const examen = examenTxt.value;
    const notaFinal = promedio * porcentaje_promedio + examen * porcentaje_examen;
    if (notaFinal <= 55) {
        Swal.fire({
            title: "Reprobado",
            text: `Nota final ${notaFinal}`,
            icon: "error",
        });
    } else {
        Swal.fire({
            title: "Aprobado",
            text: "Nota final " + notaFinal,
            icon: "info",
        });
    }
});

// Las variables de tipo const no puede ser modificadas en tiempo de ejecución