# Movie Search App

A React application built with Vite that connects to the OMDb open REST API to search for movies. It includes debounced search, separate loading/error/empty states, race-condition protection, and pagination.

Built as part of a weekly React internship task.

## Features

- Search movies via the OMDb REST API
- Debounced search input (500ms) — avoids firing an API call on every keystroke
- Race condition protection using `AbortController` — stale/outdated requests are cancelled so they can't overwrite newer results
- Loading, error, and empty states handled and displayed separately
- Pagination with total results count, disabled controls while loading
- API logic extracted into a reusable custom hook (`useMovieSearch`)

## Tech Stack

- React 18 + Vite
- OMDb API (native `fetch`)
- Plain CSS (no UI framework)

This project was scaffolded using Vite's official React template (`npm create vite@latest -- --template react`) and then built out feature by feature to meet the task requirements.

## Project Structure

```
src/
  components/
    SearchBar.jsx
    Card.jsx
    ResultsList.jsx
    Pagination.jsx
  hooks/
    useMovieSearch.js
  App.jsx
  App.css
  main.jsx
```
