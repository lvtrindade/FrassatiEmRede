import { setupMenu } from './menu.js';

async function loadHTML(elementID, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Erro ao carregar o arquivo: ${filePath}`);
        const html = await response.text();
        document.getElementById(elementID).innerHTML = html;
    } catch (error) {
        console.error(error.message);
        document.getElementById(elementID).innerHTML = `<p>Erro ao carregar o conteúdo.</p>`;
    }
}

async function initPage() {
    await loadHTML("header", "header.html");
    await loadHTML("footer", "footer.html");

    setupMenu();

    document.querySelector("header").addEventListener("click", async (event) => {
        const target = event.target;
        if (target.tagName === "A" && target.dataset.page) {
            event.preventDefault();
            const page = target.dataset.page;
            await loadHTML("main", `conteudos/${page}.html`);
            updateActiveLink(page);
            window.history.pushState({ page }, "", `#${page}`);
        }
    });

    const initialPage = location.hash ? location.hash.substring(1) : "landing_page";
    await loadHTML("main", `conteudos/${initialPage}.html`);
    updateActiveLink(initialPage);
}

function updateActiveLink(page) {
    const activeLink = document.querySelector(`#menu a[data-page="${page}"]`);
    if (activeLink) {
        document.querySelectorAll("#menu a").forEach(link => link.classList.remove("active"));
        activeLink.classList.add("active");
    }
}

window.addEventListener("popstate", (event) => {
    const page = event.state?.page || "landing_page";
    loadHTML("main", `conteudos/${page}.html`).then(() => {
        updateActiveLink(page);
    });
});

document.addEventListener("DOMContentLoaded", initPage);