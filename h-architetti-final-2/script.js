// --- "Database" progetti (aggiornato ai nuovi nomi file) ---
const projectData = {
  "1": {
    title: "Velario | Centro Multifunzionale",
    meta: { luogo: "—", anno: "—" },
    cover: "img/velario-print.jpg",
    description: "Render esterno con copertura leggera e ritmo strutturale.",
    images: ["img/velario-print.jpg"]
  },
  "2": {
    title: "Lama | Corpo vetrato",
    meta: { luogo: "—", anno: "—" },
    cover: "img/lama-print.jpg",
    description: "Prospetto vetrato e relazione con il paesaggio.",
    images: ["img/lama-print.jpg"]
  },
  "3": {
    title: "Corte | Spazio aperto",
    meta: { luogo: "—", anno: "—" },
    cover: "img/corte-print.jpg",
    description: "Sequenza di spazi verdi e attraversamenti pedonali.",
    images: ["img/corte-print.jpg"]
  },
  "4": {
    title: "Accesso Lama | Fronte canale",
    meta: { luogo: "—", anno: "—" },
    cover: "img/accesso-lama-print.jpg",
    description: "Piano terra in calcestruzzo a vista e filare alberato.",
    images: ["img/accesso-lama-print.jpg"]
  }
};

// --- Utility ---
function qs(sel, root = document) { return root.querySelector(sel); }
function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }
function getParam(name) { return new URLSearchParams(location.search).get(name); }

// --- Render Homepage ---
function renderHome() {
  const grid = qs("#portfolioGrid");
  if (!grid) return;

  const entries = Object.entries(projectData);
  shuffle(entries);

  entries.forEach(([id, p]) => {
    const a = document.createElement("a");
    a.className = "tile";
    a.href = `progetto.html?id=${encodeURIComponent(id)}`;

    const heights = [200, 240, 280, 320, 360];
    a.style.setProperty("--h", heights[Math.floor(Math.random() * heights.length)] + "px");

    const img = document.createElement("img");
    img.src = p.cover;
    img.alt = p.title || `Progetto ${id}`;

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = p.meta?.luogo || "Progetto";

    a.appendChild(img);
    a.appendChild(badge);
    grid.appendChild(a);
  });
}

// --- Render Pagina Progetto ---
function renderProject() {
  const container = qs("#projectContainer");
  if (!container) return;

  const id = getParam("id");
  const data = projectData[id];

  if (!data) {
    qs("#projectTitle").textContent = "Progetto non trovato";
    container.innerHTML = `<p>Il progetto richiesto non esiste. <a href="index.html">Torna alla home</a>.</p>`;
    return;
  }

  qs("#projectTitle").textContent = data.title;

  const meta = document.createElement("div");
  meta.className = "project-meta";
  meta.textContent = [data.meta?.luogo ? `Luogo: ${data.meta.luogo}` : null, data.meta?.anno ? `Anno: ${data.meta.anno}` : null].filter(Boolean).join(" · ");

  const text = document.createElement("div");
  text.className = "project-text";
  text.innerHTML = `<p>${data.description || ""}</p>`;

  const gallery = document.createElement("div");
  gallery.className = "project-gallery";
  (data.images || []).forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = data.title;
    gallery.appendChild(img);
  });

  container.replaceChildren(meta, text, gallery);
}

// --- Avvio ---
document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  renderProject();
});