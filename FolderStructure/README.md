# 📁 React File Explorer (Machine Coding)

A **React-based file/folder tree** built for machine-coding & LLD practice.  
Implements **recursive rendering**, **expand/collapse folders**, and **alphabetical sorting** with **folders-first**.

---

## 🧩 Problem Statement

Build a file explorer that:
- Renders a **tree from JSON** with folders & files.
- Supports **expand/collapse** on folders (accordion behavior).
- Lets users **add new files/folders** at any level.
- **Sorts alphabetically** with **folders first**, then files.
- Maintains clean **shared state** for the active level & creation flow.

---

## ⚙️ Key Features

- 🌲 Recursive component rendering (`RenderFileStructure`)
- 🧩 Context-driven state (`FileStructureContext`) for global control
- 🔤 Deterministic sorting via `sortingUtility` (folders → files)
- ➕ Inline “Add file/folder” with **auto-focus**, **Enter**, and **blur save**
- ♻️ Pure immutable updates for reliable React re-renders

---

## 🚀 To Run the Project

> Node.js **v20.19+** recommended  

```bash
git clone <your-repo-url>
cd FolderStructure
npm install
npm run dev