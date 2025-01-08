export function setupMenu() {
    const menuLinks = document.querySelectorAll('#menu a');
    const currentPage = location.hash.substring(1) || "inicial";

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            setActiveLink(link, menuLinks);
        });

        if (link.dataset.page === currentPage) {
            setActiveLink(link, menuLinks);
        }
    });

    const grupoButton = document.getElementById('grupoButton');
    const grupo = document.getElementById('grupo');

    grupoButton.addEventListener('click', () => {
        grupo.classList.toggle('show');
    });

    document.addEventListener('click', (event) => {
        if (!grupo.contains(event.target)) {
            grupo.classList.remove('show');
        }
    });
}

function setActiveLink(activeLink, allLinks) {
    allLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

document.addEventListener('DOMContentLoaded', setupMenu);