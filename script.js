// --- Animasi cover & mulai musik ---
const cover = document.getElementById("cover");
const openBtn = document.getElementById("open-btn");
const undangan = document.querySelector(".undangan");
const musik = document.querySelector("#musik");

// Pastikan musik tidak autoplay (diblock HP)
musik.pause();

// Tombol "Buka Undangan"
openBtn.addEventListener("click", async () => {
    cover.classList.add("hide");
    undangan.classList.add("relative");

    // Mulai musik setelah transisi
    setTimeout(() => {
        musik.play().catch(() => { });
    }, 400);

    // --- Play suara AI ElevenLabs ---
    const params = new URLSearchParams(window.location.search);
    const nama = params.get("to")?.trim() || "Tamu Undangan";

    const aiVoice = new Audio(`http://localhost:3000/voice?to=${encodeURIComponent(nama)}`);
    aiVoice.play().catch(() => { });
});


// --- Ambil nama tamu dari URL ---
const params = new URLSearchParams(window.location.search);
const nama = params.get("to")?.trim() || "Tamu Undangan";

// Tampilkan nama tamu
const guestElement = document.getElementById("guest-name");
if (guestElement) {
    guestElement.textContent = nama;
}

//animasi
function registerFadeObserver(selector, threshold = 0.8) {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold });

    elements.forEach(el => observer.observe(el));
}

// Register semua kelompok animasi
registerFadeObserver('.fade', 0.8);
registerFadeObserver('.fade2', 0.8);
registerFadeObserver('.fade3', 0.8);
registerFadeObserver('.fade4', 0.8);
registerFadeObserver('.fade6', 0.8);




//tanggal countdown
const targetDate = new Date("Feb 8, 2026 08:00:00").getTime();

const timer = setInterval(function () {
    const now = new Date().getTime();
    const gap = targetDate - now;

    if (gap < 0) {
        clearInterval(timer);
        document.querySelector(".countdown").innerHTML = "<h2>Acara Sedang Berlangsung 🎉</h2>";
        return;
    }

    const days = Math.floor(gap / (1000 * 60 * 60 * 24));
    const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((gap % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}, 1000);

//map
const mapCards = document.querySelectorAll(".map-card");
mapCards.forEach(card => {
    card.addEventListener("click", () => {
        const alamat = card.dataset.alamat;
        const googleUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(alamat);
        window.open(googleUrl, "_blank");
    });
});

//galeri
const images = document.querySelectorAll('.view .img-box img');
const overlay = document.getElementById('lightbox-overlay');
const overlayImg = document.getElementById('lightbox-img');
let currentIndex = 0;

function showOverlay(index) {
    currentIndex = index;
    overlayImg.src = images[index].src;
    overlay.style.display = "flex";
}

images.forEach((img, index) => {
    img.addEventListener('click', () => showOverlay(index));
});

document.getElementById('close-btn').onclick = () => {
    overlay.style.display = "none";
};

document.getElementById('next-btn').onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    overlayImg.src = images[currentIndex].src;
};

document.getElementById('prev-btn').onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    overlayImg.src = images[currentIndex].src;
};

/* Close when clicking outside image */
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.style.display = "none";
});


//collaps
document.querySelector(".giftCollaps").addEventListener("click", function () {
    const container = document.querySelector(".containerBank");
    const fade5 = document.querySelector('.fade5')

    container.classList.toggle("show");
    fade5.classList.toggle('show');
});

//Rekening Salin
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".copy-btn");
    const toast = document.getElementById("toast");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const nomor = btn.dataset.rekening;
            navigator.clipboard.writeText(nomor)
                .then(() => showToast());
        });
    });

    function showToast() {
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2000);
    }
});
//alamat salin
document.addEventListener("DOMContentLoaded", () => {
    const buttons2 = document.querySelectorAll(".copy-btn2");
    const toast2 = document.getElementById("toast2");

    buttons2.forEach(btn => {
        btn.addEventListener("click", () => {
            const alamat = btn.dataset.alamat;
            navigator.clipboard.writeText(alamat)
                .then(() => showToast2());
        });
    });

    function showToast2() {
        toast2.classList.add("show");
        setTimeout(() => {
            toast2.classList.remove("show");
        }, 2000);
    }
});

document.getElementById("gift-wa").addEventListener("click", function () {
    const phone = "6283890598033";

    // Encode pesan
    let message = `Saya ingin mengonfirmasi mengenai *Wedding Gift* yang sudah saya kirim.`;
    message += `Terima Kasih`;

    // Buat URL WA
    const url = `https://wa.me/${phone}?text=${message}`;

    // Buka WhatsApp
    window.open(url, "_blank");
});

//rspv
const RSVP_URL = "https://script.google.com/macros/s/AKfycbxJo04lqNwBE2uH7ozHXRz6TQcfZZkZ-IGm4sH71MPFf55QJQYg_qHX763vOCAZ5_x4/exec";  // ganti setelah Apps Script selesai

document.getElementById("rsvp-send").addEventListener("click", async () => {
    await prepareRsvpData();
});

async function prepareRsvpData() {
    const btn = document.getElementById("rsvp-send");
    const loading = document.getElementById("rsvp-loading");
    const statusBox = document.getElementById("rsvp-status-text");

    const name = document.getElementById("rsvp-name").value.trim();
    const address = document.getElementById("rsvp-address").value.trim();
    const statusRadio = document.querySelector("input[name='rsvp-status']:checked");
    const statusText = document.getElementById("rsvp-status-text");

    statusText.style.display = 'block';

    // RESET status dulu
    statusBox.textContent = "";
    statusBox.style.color = "";

    if (!name) { statusText.textContent = "Nama wajib diisi."; statusText.style.color = "white"; return; }
    if (!statusRadio) { statusText.textContent = "Pilih status."; statusText.style.color = "white"; return; }


    loading.style.display = "flex";
    btn.disabled = true;

    // pakai FormData (tidak men-trigger preflight)
    const form = new FormData();
    form.append("name", name);
    form.append("address", address);
    form.append("status", statusRadio.value);
    form.append("timestamp", new Date().toISOString());

    try {
        const res = await fetch(RSVP_URL, {
            method: "POST",
            body: form,      // <--- penting: jangan set header Content-Type
            mode: "cors"     // masih boleh cors, tapi no preflight because no custom headers
        });

        // Jika Web App merespon JSON, kita bisa baca:
        const text = await res.text();
        console.log("server response:", text);



        statusText.textContent = "Konfirmasi berhasil dikirim!";
        statusText.style.color = "white";

        // kosongkan form
        document.getElementById("rsvp-name").value = "";
        document.getElementById("rsvp-address").value = "";
        statusRadio.checked = false;

    } catch (err) {
        console.error("fetch error:", err);
        statusText.textContent = "Gagal mengirim. Coba lagi.";
        statusText.style.color = "red";
    } finally {
        // PENTING: sembunyikan loading & enable tombol selalu
        loading.style.display = "none";
        btn.disabled = false;
    }
}


const btnRSVP = document.getElementById('rsvp-wa');
btnRSVP.addEventListener('click', function () {
    const name = document.getElementById("rsvp-name").value.trim();
    const address = document.getElementById("rsvp-address").value.trim();
    const statusRadio = document.querySelector("input[name='rsvp-status']:checked");
    const statusText = document.getElementById("rsvp-status-text");

    statusText.style.display = 'block';


    if (!name) {
        statusText.textContent = "Nama wajib diisi."; statusText.style.color = "white"; return
    }
    if (!statusRadio) {
        statusText.textContent = "Pilih status."; statusText.style.color = "white"; return;
    }

    const status = statusRadio.value;
    const phone = "6283890598033";

    // Encode pesan
    let message = `Halo, saya *${name}*%0A`;
    message += `Status: *${status}*%0A`;
    if (address) message += `Alamat/Asal: ${address}%0A`;
    message += `%0ASaya ingin konfirmasi kehadiran acara pernikahan.`;

    // Buat URL WA
    const url = `https://wa.me/${phone}?text=${message}`;

    // Buka WhatsApp
    window.open(url, "_blank");
})



const API_URL = "https://script.google.com/macros/s/AKfycbzX5S3UosoZ0ERKcjDkhqvnq27eaIUjxs8pskSL3Vg28cdRWRXUCVty216TMUbLW9eO/exec"; // gunakan URL Web App

// Kirim komentar
document.getElementById("send").addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("status");

    if (!message) {
        status.textContent = "Tulis komentarnya dulu 🙏";
        return;
    }

    status.textContent = "Mengirim...";

    try {

        const data = {
            name: name,
            message: message,
            timestamp: Date.now()
        };

        await fetch(API_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify(data)
        });

        status.textContent = "Terkirim!";
        document.getElementById("message").value = "";

        loadComments(); // refresh komentar
    } catch (err) {
        status.textContent = "Gagal mengirim!";
        console.error(err);
    }
});

// Ambil komentar
async function loadComments() {
    const commentsEl = document.getElementById("comments");
    commentsEl.innerHTML = "Memuat...";

    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (!data.length) {
            commentsEl.innerHTML = "Belum ada komentar";
            return;
        }

        commentsEl.innerHTML = data.reverse().map(c => `
            <div class="comment">
                <div class="meta"><strong>${c.name}</strong> • ${new Date(c.timestamp).toLocaleString()}</div>
                <div style="margin-top:6px">${c.message}</div>
            </div>
        `).join("");

    } catch (err) {
        commentsEl.innerHTML = "Gagal memuat komentar.";
        console.error(err);
    }
}

// Load saat pertama kali
loadComments();

// Refresh otomatis tiap 10 detik (opsional)
// setInterval(loadComments, 10000);

//admin

// ---- CEK MODE ADMIN ----
const adminMode = params.get("admin");
if (adminMode === "1") {
    cover.style.display = "none";
    undangan.style.display = 'none';
    document.querySelector(".dashboardLogin").style.display = "flex";

}

// ---- PASSWORD ADMIN ----
const ADMIN_PASSWORD = "123"; // Ganti passwordmu

// ---- LOGIN ADMIN ----

document.getElementById("login-btn").addEventListener("click", () => {
    const input = document.getElementById("admin-pass").value;
    if (input === ADMIN_PASSWORD) {
        document.querySelector(".login-card").style.display = "none";
        document.getElementById("admin-panel").style.display = "block";
    } else {
        document.getElementById("login-error").style.display = "block";
    }
});

// ---- GENERATE LINK TAMU ----
document.getElementById("generate").addEventListener("click", () => {
    const nama = document.getElementById("nama-client").value.trim();

    if (!nama) {
        alert("Nama tidak boleh kosong!");
        return;
    }

    const url =
        window.location.origin +
        window.location.pathname +
        "?to=" +
        encodeURIComponent(nama);

    document.getElementById("link-output").value = url;
});

//link salin
document.addEventListener("DOMContentLoaded", () => {
    const buttons3 = document.querySelector(".copy-btn3");
    const toast3 = document.getElementById("toast3");
    const linkOutput = document.getElementById("link-output");

    buttons3.addEventListener("click", () => {
        const link = linkOutput.value;

        if (!link) {
            alert("Generate link dulu!");
            return;
        }

        navigator.clipboard.writeText(link)
            .then(() => showToast3());
    });

    function showToast3() {
        toast3.classList.add("show");

        setTimeout(() => {
            toast3.classList.remove("show");
        }, 2000);
    }
});