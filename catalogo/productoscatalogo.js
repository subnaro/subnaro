function generarGaleria(base, cantidad, carpeta = "./img.catalogo/", extension = "png") {
  const imagenes = [];

  for (let i = 1; i <= cantidad; i++) {
    imagenes.push(`${carpeta}${base}${i}.${extension}`);
  }

  return imagenes;
}

const productosCatalogo = [
  {
    nombre: "Signos",
    precio: 7000,
    imagen: "./img.catalogo/signos1.png",
    galeria: generarGaleria("signos", 4)
  },
  {
    nombre: "Planetas",
    precio: 7000,
    imagen: "./img.catalogo/planetas1.png",
    galeria: generarGaleria("planetas", 4)
  }
];