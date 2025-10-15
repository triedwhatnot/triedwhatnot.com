# 💬 React YouTube-Style Live Chat (LLD)

A **React-based YouTube-style live chat** built for machine-coding & LLD practice.  
Includes **short polling**, **incremental UI updates**, **DOM cap to prevent bloat**, and **clean lifecycle management** with hooks.

---

## 🧩 Problem Statement

Build a minimal live-chat module that:
- Periodically fetches new messages via **short polling**.
- Streams messages into the UI at fixed intervals.
- Accepts user input and renders instantly.
- **Prevents DOM explosion** by capping list size.
- Cleans up timers on unmount.

---

## 🚀 To Run the Project

> Node.js **v20.19+** recommended  

```bash
git clone <your-repo-url>
cd YoutubeChatUI
npm install
npm run dev