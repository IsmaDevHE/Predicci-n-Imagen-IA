// MODELO predice -> si es polera, pantalon, poleron, gorro, zapatilla o etc.
// En base a ese resultado vamos a buscar los primeros links a amason que coincidan con el tipo de prenda


window.addEventListener('DOMContentLoaded', () => {
    const fileInput    = document.getElementById('file-input');
    const previewImage = document.getElementById('preview-image');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', (event) => {
                const containerPreview = document.querySelector('.container-preview');
                containerPreview.innerHTML = `
                    <img id="preview-image" src="${event.target.result}" alt="Vista previa de la imagen">
                `
            });

            reader.readAsDataURL(file);
        } else {
            previewImage.setAttribute('src', '#');
        }
    });
});