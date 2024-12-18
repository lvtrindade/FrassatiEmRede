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
    // Carregar header e footer
    await loadHTML("header", "header.html");
    await loadHTML("footer", "footer.html");

    // Adicionar evento para navegação via links no header
    document.querySelector("header").addEventListener("click", async (event) => {
        const target = event.target;
        if (target.tagName === "A" && target.dataset.page) {
            event.preventDefault(); // Evita o carregamento padrão
            const page = target.dataset.page;
            await loadHTML("main", `conteudos/${page}.html`);
            window.history.pushState({ page }, "", `#${page}`);
        }
    });

    // Carregar página inicial (landing_page.html ou outra)
    const initialPage = location.hash ? location.hash.substring(1) : "landing_page";
    await loadHTML("main", `conteudos/${initialPage}.html`);
}

// Manter o estado da página ao usar o botão "Voltar" ou "Avançar" do navegador
window.addEventListener("popstate", (event) => {
    const page = event.state?.page || "landing_page";
    loadHTML("main", `conteudos/${page}.html`);
});

// Inicializar a página quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", initPage);