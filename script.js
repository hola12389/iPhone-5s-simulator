async function openApp(url) {
    const iframeContainer = document.getElementById('iframe-container');
    const appContainer = document.getElementById('app-container');
    const iframe = document.getElementById('iframe');

    // Cambiar visibilidad del iframe y el contenedor de aplicaciones
    iframeContainer.style.display = 'block';
    appContainer.style.display = 'none';

    // Configura la URL del iframe
    iframe.src = url;

    // Función para manejar la apertura en una nueva pestaña
    function openInNewTab() {
        window.open(url, '_blank');
        goBack();
    }

    // Verificar la URL antes de cargar en el iframe
    try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
            // La URL está disponible
            // Establecer un temporizador para abrir en una nueva pestaña si el iframe no carga a tiempo
            const timer = setTimeout(() => {
                if (iframe.src === url) {
                    openInNewTab();
                }
            }, 3000); // Ajusta el tiempo si es necesario

            // Añadir evento para manejar el error de carga
            iframe.addEventListener('error', function() {
                clearTimeout(timer);
                openInNewTab();
            });

            // Añadir evento para manejar el caso en que el iframe carga correctamente
            iframe.addEventListener('load', function() {
                clearTimeout(timer);
                // La página se ha cargado correctamente en el iframe, no hacer nada
            });
        } else {
            // La URL no está disponible, abrir en una nueva pestaña
            openInNewTab();
        }
    } catch (error) {
        // Error al verificar la URL, abrir en una nueva pestaña
        openInNewTab();
    }
}

function goBack() {
    const iframeContainer = document.getElementById('iframe-container');
    const appContainer = document.getElementById('app-container');
    const iframe = document.getElementById('iframe');

    // Regresar a la vista de aplicaciones
    iframeContainer.style.display = 'none';
    appContainer.style.display = 'flex';
    iframe.src = ''; // Limpiar la URL del iframe
}
