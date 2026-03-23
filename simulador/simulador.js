const imagenInput = document.getElementById("imagenInput");
const textoInput = document.getElementById("textoInput");
const tamanoInput = document.getElementById("tamanoInput");
const textoTamanoInput = document.getElementById("textoTamanoInput");
const colorTextoInput = document.getElementById("colorTextoInput");
const tipografiaInput = document.getElementById("tipografiaInput");

const previewDiseno = document.getElementById("previewDiseno");
const previewTexto = document.getElementById("previewTexto");

const centrarBtn = document.getElementById("centrarBtn");
const limpiarBtn = document.getElementById("limpiarBtn");
const btnEnviarPedido = document.getElementById("btnEnviarPedido");

let draggingElemento = null;
let offsetX = 0;
let offsetY = 0;

imagenInput.addEventListener("change", function (e) {
  const archivo = e.target.files[0];
  if (!archivo) return;

  const url = URL.createObjectURL(archivo);
  previewDiseno.src = url;
  previewDiseno.classList.remove("oculto");
  centrarDiseno();
});

textoInput.addEventListener("input", function () {
  previewTexto.textContent = textoInput.value;
});

tamanoInput.addEventListener("input", function () {
  const size = tamanoInput.value + "px";
  previewDiseno.style.width = size;
  previewDiseno.style.height = size;
});

textoTamanoInput.addEventListener("input", function () {
  previewTexto.style.fontSize = textoTamanoInput.value + "px";
});

colorTextoInput.addEventListener("input", function () {
  previewTexto.style.color = colorTextoInput.value;
});

tipografiaInput.addEventListener("change", function () {
  previewTexto.style.fontFamily = tipografiaInput.value;
});

centrarBtn.addEventListener("click", function () {
  centrarDiseno();
  centrarTexto();
});

limpiarBtn.addEventListener("click", function () {
  imagenInput.value = "";
  textoInput.value = "";
  tamanoInput.value = 140;
  textoTamanoInput.value = 22;
  colorTextoInput.value = "#111111";
  tipografiaInput.value = "Arial, sans-serif";

  previewDiseno.src = "";
  previewDiseno.classList.add("oculto");
  previewDiseno.style.width = "140px";
  previewDiseno.style.height = "140px";

  previewTexto.textContent = "";
  previewTexto.style.fontSize = "22px";
  previewTexto.style.color = "#111111";
  previewTexto.style.fontFamily = "Arial, sans-serif";

  centrarDiseno();
  centrarTexto();
});

function centrarDiseno() {
  if (window.innerWidth <= 900) {
    previewDiseno.style.left = "108px";
    previewDiseno.style.top = "101px";
  } else {
    previewDiseno.style.left = "140px";
    previewDiseno.style.top = "132px";
  }
}

function centrarTexto() {
  if (window.innerWidth <= 900) {
    previewTexto.style.left = "76px";
    previewTexto.style.top = "220px";
    previewTexto.style.width = "170px";
  } else {
    previewTexto.style.left = "110px";
    previewTexto.style.top = "286px";
    previewTexto.style.width = "200px";
  }
}

function iniciarArrastre(elemento, e) {
  draggingElemento = elemento;

  const rect = elemento.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
}

previewDiseno.addEventListener("mousedown", function (e) {
  iniciarArrastre(previewDiseno, e);
});

previewTexto.addEventListener("mousedown", function (e) {
  iniciarArrastre(previewTexto, e);
});

document.addEventListener("mousemove", function (e) {
  if (!draggingElemento) return;

  const contenedor = document.querySelector(".taza");
  const contRect = contenedor.getBoundingClientRect();

  let x = e.clientX - contRect.left - offsetX;
  let y = e.clientY - contRect.top - offsetY;

  draggingElemento.style.left = x + "px";
  draggingElemento.style.top = y + "px";
});

document.addEventListener("mouseup", function () {
  draggingElemento = null;
});

function obtenerNombreFuente(valorFuente) {
  switch (valorFuente) {
    case "'Trebuchet MS', sans-serif":
      return "Trebuchet MS";
    case "'Verdana', sans-serif":
      return "Verdana";
    case "'Georgia', serif":
      return "Georgia";
    case "'Times New Roman', serif":
      return "Times New Roman";
    case "'Courier New', monospace":
      return "Courier New";
    case "'Impact', sans-serif":
      return "Impact";
    default:
      return "Arial";
  }
}

function obtenerNombreColor(colorHex) {
  const color = colorHex.toLowerCase();

  if (color === "#000000") return "Negro";
  if (color === "#ffffff") return "Blanco";
  if (color === "#ff0000") return "Rojo";
  if (color === "#0000ff") return "Azul";
  if (color === "#008000") return "Verde";
  if (color === "#ffff00") return "Amarillo";
  if (color === "#111111") return "Negro";
  if (color === "#808080") return "Gris";
  if (color === "#ffa500") return "Naranja";
  if (color === "#800080") return "Violeta";
  if (color === "#ffc0cb") return "Rosa";

  return colorHex;
}

if (btnEnviarPedido) {
  btnEnviarPedido.addEventListener("click", function (e) {
    e.preventDefault();

    const texto = textoInput.value.trim();
    const colorVisible = obtenerNombreColor(colorTextoInput.value || "#111111");
    const fuenteVisible = obtenerNombreFuente(tipografiaInput.value || "Arial, sans-serif");
    const tamanoDiseno = tamanoInput.value || "140";
    const tamanoTexto = textoTamanoInput.value || "22";

    const imagenCargada =
      imagenInput.files && imagenInput.files[0]
        ? imagenInput.files[0].name
        : "No cargué la imagen todavía desde la web";

    const detalleTexto = texto
      ? 'Quiero que diga: "' + texto + '"'
      : "No agregué texto por ahora";

    const mensaje = [
      "Hola Subnaro, quiero encargar una taza personalizada.",
      "",
      "Te paso mi idea:",
      detalleTexto,
      "Color del texto: " + colorVisible,
      "Tipo de letra: " + fuenteVisible,
      "Tamaño del diseño: " + tamanoDiseno,
      "Tamaño del texto: " + tamanoTexto,
      "Imagen usada en el simulador: " + imagenCargada,
      "",
      "Ahora te envío la imagen por WhatsApp."
    ].join("\n");

    const url = "https://wa.me/5491160584396?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank");
  });
}

centrarDiseno();
centrarTexto();