window.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const previewImage = document.getElementById('preview-image');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', (event) => {
                previewImage.setAttribute('src', event.target.result);
            });

            reader.readAsDataURL(file);
        } else {
            previewImage.setAttribute('src', '#');
        }
    });
});