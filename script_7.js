document.addEventListener("change", function (e) {
        const input = e.target;
        if (input && input.type === "file" && (input.name === "image" || input.id === "image")) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function (evt) {
                    const container = input.closest(".form-group, .core-field") || input.parentNode;
                    let previewImg = container.querySelector("#imagePreviewImg") || container.querySelector("img");
                    let previewWrapper = container.querySelector("#imagePreviewWrapper") || container.querySelector(".image-preview-wrapper");

                    if (!previewWrapper) {
                        previewWrapper = document.createElement("div");
                        previewWrapper.className = "image-preview-wrapper mt-2";
                        previewWrapper.id = "imagePreviewWrapper";
                        previewWrapper.innerHTML = `
                            <label class="d-block text-muted small mb-1" style="font-size: 11px; font-weight: 600; color: #666;">Image Preview:</label>
                            <img id="imagePreviewImg" src="${evt.target.result}" alt="Image Preview" style="max-width: 140px; max-height: 110px; object-fit: cover; border-radius: 10px; border: 2px solid #17362f; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                        `;
                        input.after(previewWrapper);
                    } else {
                        if (previewImg) {
                            previewImg.src = evt.target.result;
                        }
                        previewWrapper.style.display = "block";
                    }
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
    });