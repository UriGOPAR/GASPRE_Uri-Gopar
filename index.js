
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Cargar la estructura de categorías
const data = fs.readFileSync("./categorias.json", "utf8");
const estructura = JSON.parse(data);

/*

// En la funcion de obtener Rutas lo  que realizo es recorrer el arbol de categorias recursivamente
// y voy concatenando los nombres de las categorias para formar las rutas completas
// cuando llego a una categoria sin subcategorias, agrego la ruta completa al array de resultados con la funcion de flatMap

*/


function getPaths(category, currentPath = "") {
  const newPath = currentPath ? `${currentPath}/${category.name}` : category.name;

  if (!category.subcategories || category.subcategories.length === 0) {
    return [newPath];
  }

  return category.subcategories.flatMap(sub =>
    getPaths(sub, newPath)
  );
}

/*
// En la función findCategoryById es buscar en el arbol de categorías
// y en cada categoría verifico si el id coincide con el buscado
// si coincide, devuelvo la categoría completa
// si no, reviso todas sus subcategorías de manera recursiva hasta encontrar la coincidencia
// si no se encuentra en ningún nivel, devuelvo null
*/

function findCategoryById(category, id) {
  if (category.id === id) return category;

  for (const sub of category.subcategories || []) {
    const result = findCategoryById(sub, id);
    if (result) return result;
  }

  return null;
}

/*
LAS RUTAS DE LA API SON LAS SIGUIENTES:
- GET http://localhost:3000/paths -> devuelve todas las rutas completas
- GET http://localhost:3000/category/:(NUMERO id) -> devuelve la categoría correspondiente al id
*/


app.get("/paths", (req, res) => {
  const rutas = getPaths(estructura);
  res.json(rutas);
});

app.get("/category/:id", (req, res) => {
  const id = Number(req.params.id);
  const category = findCategoryById(estructura, id);
  
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }
  
  res.json(category);
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});

