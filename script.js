const input = document.getElementById("inputFoto");
const preview = document.getElementById("preview");
const hasil = document.getElementById("hasil");
const slider = document.getElementById("qualitySlider");
const angka = document.getElementById("nilaiQuality");

function toggleDark() {
    document.body.classList.toggle("dark");
}

slider.oninput = () => angka.innerText = slider.value;

input.onchange = () => {
    const file = input.files[0];
    if (!file) return;
    preview.style.display = "block";
    preview.src = URL.createObjectURL(file);
};

document.getElementById("btnKompres").onclick = () => kompres(false);
document.getElementById("btnUltra").onclick = () => kompres(true);

function kompres(ultra) {
    if (!input.files.length) {
        alert("Pilih foto dulu!");
        return;
    }

    document.getElementById("loading").style.display = "block";
    const file = input.files[0];
    const awal = (file.size / 1024).toFixed(1);

    new Compressor(file, {
        quality: ultra ? 0.5 : slider.value,
        success(result) {
            document.getElementById("loading").style.display = "none";
            const akhir = (result.size / 1024).toFixed(1);
            const url = URL.createObjectURL(result);

            hasil.innerHTML = `
                <p>Ukuran Awal: ${awal} KB</p>
                <p>Ukuran Hasil: ${akhir} KB</p>
                <img src="${url}">
                <br>
                <a href="${url}" download="foto-kompres.jpg">
                    <button class="btn btn-green">Download</button>
                </a>
            `;
        }
    });
}
