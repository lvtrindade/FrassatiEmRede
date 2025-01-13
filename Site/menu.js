export function setupMenu() {
    const menuLinks = document.querySelectorAll('.opcao');
    const currentPage = location.hash.substring(1) || "inicial";

    const inicioLink = document.getElementById('inicio');
    if (inicioLink) {
        inicioLink.classList.add('active');
    }

    function setActiveLink(activeLink, allLinks) {
        allLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

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
    const comboBoxLinks = document.querySelectorAll('#grupoOptions a');

    if (grupo && grupoButton) {
        grupoButton.addEventListener('click', () => {
            grupo.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
            if (!grupo.contains(event.target) && !grupoButton.contains(event.target)) {
                grupo.classList.remove('show');
            }
        });

        comboBoxLinks.forEach(link => {
            link.addEventListener('click', () => {
                grupo.classList.remove('show');
                setActiveLink(grupoButton, menuLinks);
            });
        });
    } else {
        console.error('Elemento de grupo ou grupoButton não encontrado');
    }
}