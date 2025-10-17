# URI JARED GOPAR MORALES

# Prueba Técnica – Backend Developer


## Contexto:

Estás desarrollando una API para una empresa que gestiona estructuras jerárquicas como organizaciones, carpetas o categorías. Te toca implementar parte de la lógica de negocio que analiza y transforma estas estructuras.

## Desafío:

La empresa te entrega una estructura de categorías anidadas. Cada categoría puede tener subcategorías (n niveles de profundidad).\

```
{
  id: 1,
  name: "Electrónica",
  subcategories: [
    {
      id: 2,
      name: "Computadoras",
      subcategories: [
        { id: 5, name: "Laptops", subcategories: [] },
        { id: 6, name: "Desktops", subcategories: [] },
      ],
    },
    { id: 3, name: "Celulares", subcategories: [] },
    { id: 4, name: "Accesorios", subcategories: [] },
  ],
};
```

## Objetivo:

### Parte 1: Obtener todos los nombres de categorías en formato “ruta completa”

Implementar una función que devuelva una lista con los nombres completos de cada subcategoría, en formato de ruta. Por ejemplo:

```
funcion(structure)

->

[
  "Electrónica/Computadoras/Laptops",
  "Electrónica/Computadoras/Desktops",
  "Electrónica/Celulares",
  "Electrónica/Accesorios"
]
```

### Parte 2: Buscar una categoría por ID

Implementar una función que devuelva la categoría (objeto completo) correspondiente al id indicado, sin importar en qué nivel de profundidad esté.

Ejemplo:

```
funcion(structure, 6)

->

{
  "id": 6,
  "name": "Desktops",
  "subcategories": []
}
```
