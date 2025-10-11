# ⏱️ React Stopwatch

A simple **React-based stopwatch** built for machine-coding and LLD practice.  
Supports **Start/Pause**, **Reset**, and **Lap tracking** — implemented cleanly using React hooks.

---

## 🧩 Problem Statement

Build a stopwatch that:
- Starts and pauses accurately on click.  
- Resets to 00:00:000 on reset.  
- Records lap timestamps in order.  
- Maintains precise time calculation (no drift).  

---

## ⚙️ Features

- `useEffect`-based interval lifecycle with proper cleanup.  
- Timestamp math using `Date.now()` for pause/resume accuracy.  
- Millisecond precision formatting (`000–999`).  
- Semantic `<ol>` list for lap numbering.  
- Easily extendable to use `performance.now()` or `requestAnimationFrame`.  

---

## 🚀 To Run the Project

> Node.js **v20.19+** recommended  

```bash
git clone <your-repo-url>
cd stopwatch
npm install
npm run dev