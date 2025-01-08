export function setupMenu() {
    const menuLinks = document.querySelectorAll('#menu a');
    const currentPage = location.hash.substring(1) || "inicial"; // Fallback para "inicial"

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            setActiveLink(link, menuLinks);
        });

        if (link.dataset.page === currentPage) {
            setActiveLink(link, menuLinks);
        }
    });
}

function setActiveLink(activeLink, allLinks) {
    allLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

document.addEventListener('DOMContentLoaded', setupMenu);
