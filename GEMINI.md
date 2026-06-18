# Pokémon Quiz - Project Instructions

This project is a interactive web application that helps users discover which Pokémon matches their personality through a 7-question quiz.

## Project Overview

*   **Purpose:** A personality quiz that maps user answers to Pokémon types and returns a specific Pokémon from a curated pool.
*   **Tech Stack:**
    *   **Backend:** Node.js, Express.
    *   **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3.
    *   **External API:** [PokéAPI](https://pokeapi.co/) for fetching Pokémon data and images.
*   **Architecture:**
    *   The backend (`server.js`) acts as a proxy for PokéAPI, implementing an in-memory cache (24h TTL) to improve performance and avoid rate limiting.
    *   The frontend is a single-page application (SPA) managed by `public/js/quiz.js` and `public/js/questions.js`.

## Building and Running

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+ recommended)

### Setup
1.  Install dependencies:
    ```bash
    npm install
    ```

### Execution
1.  Start the development server:
    ```bash
    npm start
    ```
2.  Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `server.js`: Express server with PokéAPI proxy and caching logic.
- `public/`: Frontend assets.
    - `index.html`: Main application entry point.
    - `css/style.css`: Custom styling (Vanilla CSS).
    - `js/questions.js`: Configuration file containing quiz questions, type mappings, and Pokémon pools.
    - `js/quiz.js`: Main frontend logic for screen transitions, state management, and scoring.

## Development Conventions

- **Frontend:**
    - Use Vanilla JavaScript; avoid adding heavy frontend frameworks unless requested.
    - Maintain the "Pokéball" themed UI consistency in transitions and loaders.
    - Questions and scores are managed in `questions.js`. When adding new questions, ensure `tags` correctly map to types defined in `TYPE_MAP`.
- **Backend:**
    - The server uses `node-fetch` (v2) for API calls.
    - Keep the in-memory cache logic simple. If the project grows, consider Redis or a similar persistent cache.
    - API endpoints:
        - `GET /api/pokemon/:id`: Fetches curated Pokémon data.
        - `GET /api/cache/stats`: Utility to monitor cache usage.
- **Styling:**
    - Prefer standard CSS properties. The current design uses custom properties (CSS variables) for colors and themes.

## TODOs / Future Improvements
- [ ] Implement a persistent database for caching or analytics.
- [ ] Add unit tests for the scoring logic in `quiz.js`.
- [ ] Expand the Pokémon pool in `questions.js`.
