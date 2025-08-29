# Pokédex React - Proyecto Visual

Este proyecto es una Pokédex interactiva desarrollada con React y la api https://pokeapi.co/, que permite explorar, buscar y marcar como favoritos a los Pokémon. El diseño está inspirado en la estética clásica de Pokémon, con animaciones y una experiencia visual atractiva. 

---

## Landing Page

Al ingresar, se muestra una pantalla de bienvenida animada con el logo de Pokémon siguiendo huellas de pokemones, una pokebola saltando y siluetas de Pokémon moviéndose aleatoriamente. El botón "START" aparece con animación de máquina de escribir. Al hacer clic, se navega a la galería principal.

<img width="1338" height="618" alt="loading-pokemon" src="https://github.com/user-attachments/assets/7c5758e9-520a-4f10-bbf8-e17e58b2ae0f" />


---

## Galería de Pokémon (PokeGrid)

La galería muestra una cuadrícula de tarjetas de Pokémon, cada una con su sprite, nombre, número y una breve descripción.

- Se puede buscar por nombre en tiempo real.
- Es posible marcar Pokémon como favoritos (estrella).
- Hay paginación para navegar entre cientos de Pokémon.
- El botón "Favorites" filtra solo los favoritos.
- El diseño es responsivo y colorido, con detalles visuales inspirados en la Pokédex.

<img width="1273" height="620" alt="pokemon-grid" src="https://github.com/user-attachments/assets/7153526b-095b-4455-89dd-0bd53845e415" />


---

## Pokédex Detallada

Al hacer clic en cualquier Pokémon, se abre una página de detalle tipo Pokédex:

- Muestra la imagen, nombre, número, género, tipos, altura, peso y una descripción/flavor text.
- El diseño simula una Pokédex física, con colores y tipografías temáticas.
- Incluye botón para volver a la galería.

<img width="645" height="458" alt="pokedex-pokemon" src="https://github.com/user-attachments/assets/518688ad-9358-4fd8-b4cd-d3288183201b" />


---

## Estructura del Código

- **React + React Router:** Navegación entre páginas (`LandingPage`, `PokemonGrid`, `Pokedex`).
- **Axios:** Para consumir la API de [PokeAPI](https://pokeapi.co/).
- **CSS personalizado:** Cada página tiene su propio archivo de estilos para lograr la estética Pokémon.
- **Favoritos:** Se guardan en `localStorage` para persistencia.
- **Componentes reutilizables:** Tarjetas de Pokémon, buscador, paginación, etc.

### Archivos principales:

- `src/js/LandingPage.js` — Página de inicio animada.
- `src/js/PokemonGrid.js` — Galería con búsqueda, favoritos y paginación.
- `src/js/Pokedex.js` — Vista detallada de cada Pokémon.
- `src/css/` — Estilos personalizados para cada componente.

---

## ¿Cómo probar?

1. Clona el repositorio y ejecuta `npm install`.
2. Inicia el proyecto con `npm start`.
3. Navega entre las páginas y explora la Pokédex.

---

¡Disfruta explorando el mundo Pokémon!
