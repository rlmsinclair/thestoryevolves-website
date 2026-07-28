# The Story Evolves — Web

Frontend for **The Story Evolves**, a turn-based collaborative storytelling game played on a real-world map. Players join a shared story, submit what they want to do each turn, and Claude resolves everyone's actions — advancing the narrative and moving each player's position on the map.

## Features

- Join or create a named story lobby with a starting location
- Submit your action each turn and see Claude's narrative outcome
- Live map (Google Maps) showing every player's position as the story unfolds
- Turn syncing — the round resolves once all players have submitted

## Stack

- **React + TypeScript** (Vite)
- **Google Maps** via `@react-google-maps/api`
- Talks to the [thestoryevolves-api](https://github.com/rlmsinclair/thestoryevolves-api) Flask backend

## Setup

```bash
npm install
cp .env.example .env   # then add your Google Maps API key
npm run dev
```

### Configuration

Config is read from a `.env` file (Vite `import.meta.env`); `.env` is gitignored and must never be committed.

| Variable | Description |
|---|---|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key. Restrict it by HTTP referrer in the Google Cloud Console — Vite inlines `VITE_*` values into the client bundle, so the key is visible to anyone who loads the site. |

## Related

- [thestoryevolves-api](https://github.com/rlmsinclair/thestoryevolves-api) — backend
