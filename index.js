const fs = require("fs");

const data = fs.readFileSync("./categorias.json", "utf8");
const estructura = JSON.parse(data);

/*

// En la funcion de obtener Rutas lo  que realizo es recorrer el arbol de categorias recursivamente
// y voy concatenando los nombres de las categorias para formar las rutas completas
// cuando llego a una categoria sin subcategorias, agrego la ruta completa al array de resultados con la funcion de flatMap

*/
function getPaths(category, currentPath = "") {
  const newPath = currentPath ? `${currentPath}/${category.name}` : category.name;

  // If the category has no subcategories, return an array with the current path
  if (!category.subcategories || category.subcategories.length === 0) {
    return [newPath];
  }

  // If there are subcategories, recursively get paths from all of them
  return category.subcategories.flatMap(sub =>
    getPaths(sub, newPath)
  );
}


// Ejemplo de uso:
console.log(getPaths(estructura));
