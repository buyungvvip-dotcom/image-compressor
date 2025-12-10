const dropArea = document.getElementById("dropArea");
const input = document.getElementById("inputFoto");
const preview = document.getElementById("preview");
const hasil = document.getElementById("hasil");
const slider = document.getElementById("qualitySlider");
const angka = document.getElementById("nilaiQuality");

function toggleDark() {
    document.body.classList.toggle("dark");
}

slider.oninput = () => angka.innerText = slider.value;
document.getElementById("btnUpload").onclick = () => input.click();
input.onchange = () => tampilPreview(input.files[0]);

dropArea.ondragover = e => {
    e.preventDefault();
    dropArea.classList.add("dragover");
};
dropArea.ondragleave = () => dropArea.classList.remove("dragover");
dropArea.ondrop = e => {
    e.preventDefault();
    dropArea.classList.remove("dragover");
    input.files = e.dataTransfer.files;
    tampilPreview(e.dataTransfer.files[0]);
};

function tampilPreview(file) {
    preview.style.display = "block";
    preview.src = URL.createObjectURL(file);
}

document.getElementById("btnKompres").onclick = () => prosesKompres(false);
document.getElementById("btnUltra").onclick = () => prosesKompres(true);

function prosesKompres(isUltra) {
    if (!input.files.length) {
        alert("Pilih foto dulu!");
        return;
    }

    const file = input.files[0];
    const originalSizeKB = (file.size / 1024).toFixed(1);
    document.getElementById("loading").style.display = "block";

    new Compressor(file, {
        quality: isUltra ? 0.5 : slider.value,
        mimeType: "image/jpeg",
        maxWidth: 1600,

        success(result) {
            document.getElementById("loading").style.display = "none";
            const url = URL.createObjectURL(result);
            const compressedKB = (result.size / 1024).toFixed(1);

            hasil.innerHTML = `
                <div class="info-box">
                    <p>Awal: ${originalSizeKB} KB</p>
                    <p>Hasil: ${compressedKB} KB</p>
                    ${isUltra ? "<p style='color:red'><b>Mode Ultra Aktif</b></p>" : ""}
                </div>
                <img src="${url}" style="width:100%; margin-top:10px;">
                <a href="${url}" download="foto-kompres.jpg">
                    <button class="btn btn-green">Download</button>
                </a>
            `;
        }
    });
}