const input = document.getElementById("inputFoto");
const preview = document.getElementById("preview");
const hasil = document.getElementById("hasil");
const slider = document.getElementById("qualitySlider");
const angka = document.getElementById("nilaiQuality");
const loading = document.getElementById("loading");
const btnKompres = document.getElementById("btnKompres");
const btnUltra = document.getElementById("btnUltra");

/* Dark Mode */
function toggleDark() {
    document.body.classList.toggle("dark");
}

/* Slider */
slider.addEventListener("input", () => {
    angka.innerText = slider.value;
});

/* Upload */
input.addEventListener("change", () => {
    if (!input.files.length) return;
    preview.style.display = "block";
    preview.src = URL.createObjectURL(input.files[0]);
});

/* Tombol */
btnKompres.addEventListener("click", () => prosesKompres(false));
btnUltra.addEventListener("click", () => prosesKompres(true));

function prosesKompres(isUltra) {
    if (!input.files.length) {
        alert("Pilih foto dulu!");
        return;
    }

    const file = input.files[0];
    const originalKB = (file.size / 1024).toFixed(1);
    loading.style.display = "block";

    new Compressor(file, {
        quality: isUltra ? 0.5 : slider.value,
        mimeType: "image/jpeg",
        maxWidth: 1600,

        success(result) {
            loading.style.display = "none";
            const url = URL.createObjectURL(result);
            const compressedKB = (result.size / 1024).toFixed(1);

            hasil.innerHTML = `
                <div class="info-box">
                    <p>Ukuran Awal: ${originalKB} KB</p>
                    <p>Hasil: ${compressedKB} KB</p>
                    ${isUltra ? "<p style='color:red'><b>Mode Ultra Aktif</b></p>" : ""}
                </div>
                <img src="${url}" style="width:100%;margin:10px 0">
                <a href="${url}" download="foto-kompres.jpg">
                    <button class="btn btn-green">Download</button>
                </a>
            `;
        },
        error() {
            loading.style.display = "none";
            alert("Gagal mengompres gambar");
        }
    });
}
