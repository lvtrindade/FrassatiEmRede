import { setupMenu } from './menu.js';

async function loadHTML(targetID, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Erro ao carregar o arquivo: ${filePath}`);
        document.getElementById(targetID).innerHTML = await response.text();
    } catch (error) {
        console.error(error.message);
        document.getElementById(targetID).innerHTML = `<p>Erro ao carregar o conteúdo.</p>`;
    }
}

async function carregarHeader() {
    try {
        const header = document.getElementById("header");
        const response = await fetch("header.html");
        header.innerHTML = await response.text();
        setupMenu();
    } catch (error) {
        console.error("Erro ao carregar o cabeçalho:", error.message);
    }
}

function updateActiveLink(page) {
    document.querySelectorAll(".opcao").forEach(link => link.classList.remove("active"));
    const activeLink = document.querySelector(`.opcao[data-page="${page}"]`);
    if (activeLink) activeLink.classList.add("active");
}

async function initPage() {
    await carregarHeader();
    await loadHTML("footer", "footer.html");

    const initialPage = location.hash.substring(1) || "landing_page";
    await loadHTML("main", `conteudos/${initialPage}.html`);
    updateActiveLink(initialPage);

    document.querySelectorAll(".opcao").forEach(link => {
        link.addEventListener("click", async (event) => {
            event.preventDefault();
            const page = link.dataset.page;
            await loadHTML("main", `conteudos/${page}.html`);
            updateActiveLink(page);
            history.pushState({ page }, "", `#${page}`);
        });
    });
}

window.addEventListener("DOMContentLoaded", initPage);
window.addEventListener("popstate", async (event) => {
    const page = event.state?.page || "landing_page";
    await loadHTML("main", `conteudos/${page}.html`);
    updateActiveLink(page);
});

document.addEventListener("DOMContentLoaded", () => {
    const grupoButton = document.getElementById("grupoButton");
    const grupoOptions = document.getElementById("grupoOptions");

    if (grupoButton && grupoOptions) {
        grupoButton.addEventListener("click", () => {
            grupoOptions.classList.toggle("hidden");
        });

        document.addEventListener("click", (event) => {
            if (
                grupoOptions &&
                !grupoButton.contains(event.target) &&
                !grupoOptions.contains(event.target)
            ) {
                grupoOptions.classList.add("hidden");
            }
        });
    }
});