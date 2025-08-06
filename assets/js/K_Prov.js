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
    uraian: "Jasa Perantara Keuangan",
    judul: "tabel 4",
    targetId: "qtq_jasa_perantara_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Jasa Perantara Keuangan",
    judul: "tabel 5",
    targetId: "yoy_jasa_perantara_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Jasa Perantara Keuangan",
    judul: "tabel 6",
    targetId: "ctc_jasa_perantara_prov"
  });

  // Tambah lagi jika ada kartu lain...

  fetchQTQValue({
    baseUrl,
    uraian: "Asuransi dan Dana Pensiun",
    judul: "tabel 4",
    targetId: "qtq_asuransi_pensiun_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Asuransi dan Dana Pensiun",
    judul: "tabel 5",
    targetId: "yoy_asuransi_pensiun_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Asuransi dan Dana Pensiun",
    judul: "tabel 6",
    targetId: "ctc_asuransi_pensiun_prov"
  });

  // Tambah lagi jika ada kartu lain...

  fetchQTQValue({
    baseUrl,
    uraian: "Jasa Keuangan Lainnya",
    judul: "tabel 4",
    targetId: "qtq_keuangan_lainnya_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Jasa Keuangan Lainnya",
    judul: "tabel 5",
    targetId: "yoy_keuangan_lainnya_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Jasa Keuangan Lainnya",
    judul: "tabel 6",
    targetId: "ctc_keuangan_lainnya_prov"
  });

  // Tambah lagi jika ada kartu lain...

  fetchQTQValue({
    baseUrl,
    uraian: "Jasa Penunjang Keuangan",
    judul: "tabel 4",
    targetId: "qtq_penunjang_keuangan_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Jasa Penunjang Keuangan",
    judul: "tabel 5",
    targetId: "yoy_penunjang_keuangan_prov"
  });

  fetchQTQValue({
    baseUrl,
    uraian: "Jasa Penunjang Keuangan",
    judul: "tabel 6",
    targetId: "ctc_penunjang_keuangan_prov"
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