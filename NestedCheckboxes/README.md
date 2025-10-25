# 🌳 React Nested Checkboxes (LLD)

A **React-based nested checkbox tree** built for machine-coding & LLD practice.  
Implements **parent-child synchronization**, **recursive rendering**, and **state propagation** both **upward** and **downward** in the hierarchy.

---

## 🧩 Problem Statement

Build a nested checkbox component that:
- Supports **hierarchical parent-child relationships**.
- **Checks/unchecks all children** when a parent is toggled.
- **Propagates state upward**, updating parents when all/any children change.
- Maintains clean **state normalization** for constant-time access via a map.
- Recursively renders the tree in the UI.

---

## ⚙️ Key Features

- ✅ Recursive component rendering (`RenderCheckbox`)
- 🔁 **Two-way sync** (child → parent, parent → child)
- 🧮 **Flattened data map** for efficient lookup
- 🧠 BFS transformation from tree to normalized structure
- ♻️ Uses `useState` + immutability for controlled updates

---

## 🚀 To Run the Project

> Node.js **v20.19+** recommended  

```bash
git clone <your-repo-url>
cd NestedCheckboxes
npm install
npm run dev