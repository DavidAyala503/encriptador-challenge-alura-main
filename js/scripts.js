// Función para encriptar el texto
function encriptar(traduccion) {
    document.querySelector("#warning").removeAttribute("style");
    var textarea = document.querySelector("#texto");
    const texto = textarea.value;
    var area_default = document.querySelector("#default");
    var area_result = document.querySelector("#result");
    var texto_out = document.querySelector("#texto_out");

    if (texto !== "") {
        var out = "";
        for (var i = 0; i < texto.length; i++) {
            if (((texto[i] < 'a') || (texto[i] > 'z')) && (texto[i] !== ' ')) {
                document.querySelector("#warning").style.color = "red";
                document.querySelector("#warning").style.fontSize = "16px";
                return;
            } else if ((texto.length === 1 && texto === " ") || texto.replace(/ /g, "") === "") {
                area_default.classList.remove("invisible");
                area_result.classList.add("invisible");
                return;
            }
            if (texto[i] === 'a') {
                out += traduccion["a"];
            } else if (texto[i] === 'e') {
                out += traduccion["e"];
            } else if (texto[i] === 'i') {
                out += traduccion["i"];
            } else if (texto[i] === 'o') {
                out += traduccion["o"];
            } else if (texto[i] === 'u') {
                out += traduccion["u"];
            } else {
                out += texto[i];
            }
        }

        area_default.classList.add("invisible");
        area_result.classList.remove("invisible");
        texto_out.textContent = out;
    }
}

// Función para desencriptar el texto
function desencriptar(traduccion) {
    document.querySelector("#warning").removeAttribute("style");
    var textarea = document.querySelector("#texto");
    var texto = textarea.value;
    var area_default = document.querySelector("#default");
    var area_result = document.querySelector("#result");
    var texto_out = document.querySelector("#texto_out");

    if (texto !== "") {
        for (var i = 0; i < texto.length; i++) {
            if (((texto[i] < 'a') || (texto[i] > 'z')) && (texto[i] !== ' ')) {
                document.querySelector("#warning").style.color = "red";
                document.querySelector("#warning").style.fontSize = "16px";
                return;
            } else if ((texto.length === 1 && texto === " ") || texto.replace(/ /g, "") === "") {
                area_default.classList.remove("invisible");
                area_result.classList.add("invisible");
                return;
            }
        }

        area_default.classList.add("invisible");
        area_result.classList.remove("invisible");
        for (const [key, value] of Object.entries(traduccion)) {
            texto = texto.replace(new RegExp(value, "g"), key);
        }
        texto_out.textContent = texto;
    }
}

// Función para copiar el texto al portapapeles
function clipboard() {
    const texto_out = document.querySelector("#texto_out");

    // Copia el texto al portapapeles
    navigator.clipboard.writeText(texto_out.textContent)
        .then(() => {
            // Muestra un mensaje de confirmación después de copiar
            alert("Texto copiado al portapapeles");
        })
        .catch(err => {
            console.error("Error al copiar al portapapeles:", err);
        });
}

// Obtener elementos de los botones y asignar eventos
const enc = document.querySelector('#enc');
const des = document.querySelector('#des');
const copy = document.querySelector('#copiar');

// Objeto de traducción para encriptar y desencriptar
var traduccion = {"a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat"};

// Asignar eventos a los botones
enc.addEventListener('click', function() { encriptar(traduccion); });
des.addEventListener('click', function() { desencriptar(traduccion); });
copy.addEventListener('click', function() { clipboard(); });
