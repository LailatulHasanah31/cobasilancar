// Fungsi dinamis: Opsi 2 (BASE_URL di dalam parameter)
async function fetchQTQValue({ baseUrl, uraian, judul, targetId }) {
  const tahun = document.getElementById("yearDropdown").value;
  const triwulanCode = document.getElementById("triwulanDropdown").value; // TW1, TW2, dst
  const triwulan = convertTriwulan(triwulanCode); // → "I", "II", dst

  const el = document.getElementById(targetId);
  // ⏳ Tampilkan loading sementara
  el.textContent = '⏳ Memuat...';
  const cardEl = document.getElementById(`${targetId}-card`);

  try {
    const url = `${baseUrl}?tahun=${tahun}&triwulan=${triwulan}&uraian=${encodeURIComponent(uraian)}&judul=${encodeURIComponent(judul)}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(`Data untuk ${uraian}:`, data);

    if (data.result.length > 0) {
      const nilai = parseFloat(data.result[0].nilai).toFixed(2);
      el.textContent = `${nilai} %`;
      updateCardColorProv(parseFloat(nilai), cardEl);
    } else {
      el.textContent = 'Data tidak ditemukan';
    }
  } catch (err) {
    console.error('❌ Gagal ambil data:', err);
    document.getElementById(targetId).textContent = 'Error';
  }
}

// Inisialisasi ketika dropdown berubah
document.getElementById("yearDropdown").addEventListener("change", updateAllUraian);
document.getElementById("triwulanDropdown").addEventListener("change", updateAllUraian);
window.addEventListener("load", updateAllUraian);

// Fungsi untuk update semua card kategori A (misalnya)
function updateAllUraian() {
  const baseUrl = "https://script.google.com/macros/s/AKfycbzJwhe9DXUJQrrQI6jNEJpMVXpFofD5UHbzEGZgjkjnTzchLK7LBc3y59zXbaQI_QoP/exec";

  // Tambahkan semua uraian kategori A yang ingin ditampilkan
  fetchQTQValue({
    baseUrl,
    uraian: "Angkutan Darat",
    judul: "tabel 4",
    targetId: "qtq_jumlah_kendaraan_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Angkutan Darat",
    judul: "tabel 5",
    targetId: "yoy_jumlah_kendaraan_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Angkutan Darat",
    judul: "tabel 6",
    targetId: "ctc_jumlah_kendaraan_prov"
  });

  // Tambahkan semua uraian kategori A yang ingin ditampilkan
  fetchQTQValue({
    baseUrl,
    uraian: "Angkutan Laut",
    judul: "tabel 4",
    targetId: "qtq_penumpang_ASDP_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Angkutan Laut",
    judul: "tabel 5",
    targetId: "yoy_penumpang_ASDP_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Angkutan Laut",
    judul: "tabel 6",
    targetId: "ctc_penumpang_ASDP_prov"
  });

  // Tambahkan semua uraian kategori A yang ingin ditampilkan
  fetchQTQValue({
    baseUrl,
    uraian: "Angkutan Sungai Danau dan Penyeberangan",
    judul: "tabel 4",
    targetId: "qtq_darat_ASDP_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Angkutan Sungai Danau dan Penyeberangan",
    judul: "tabel 5",
    targetId: "yoy_darat_ASDP_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Angkutan Sungai Danau dan Penyeberangan",
    judul: "tabel 6",
    targetId: "ctc_darat_ASDP_prov"
  });

  // Tambahkan semua uraian kategori A yang ingin ditampilkan
  fetchQTQValue({
    baseUrl,
    uraian: "Pergudangan dan Jasa Penunjang Angkutan, Pos dan Kurir",
    judul: "tabel 4",
    targetId: "qtq_gudang_kurir_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Pergudangan dan Jasa Penunjang Angkutan, Pos dan Kurir",
    judul: "tabel 5",
    targetId: "yoy_gudang_kurir_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Pergudangan dan Jasa Penunjang Angkutan, Pos dan Kurir",
    judul: "tabel 6",
    targetId: "ctc_gudang_kurir_prov"
  });
}

function convertTriwulan(code) {
  const mapping = {
    TW1: "I",
    TW2: "II",
    TW3: "III",
    TW4: "IV"
  };
  return mapping[code] || code;
}

function updateCardColorProv(value, card) {
  card.classList.remove("bg-success", "bg-danger");

  if (value > 0) {
    card.style.backgroundColor = "#198754"; // hijau
    card.style.color = "white";
  } else if (value < 0) {
    card.style.backgroundColor = "#dc3545"; // merah
    card.style.color = "white";
  } else {
    card.style.backgroundColor = "#dc7235ff"; // netral
    card.style.color = "white";
  }
}