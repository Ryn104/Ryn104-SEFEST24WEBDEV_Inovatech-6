// Fungsi untuk mengambil data berdasarkan tipe bencana
function ambilData(tipe) {
    let file;
    switch (tipe) {
        case 'tsunami':
            file = 'assets/json/tsunami.json';
            break;
        case 'gempa':
            file = 'assets/json/gempa.json';
            break;
        case 'erupsi':
            file = 'assets/json/erupsi.json';
            break;
        case 'longsor':
            file = 'assets/json/longsor.json';
            break;
        case 'banjir':
            file = 'assets/json/banjir.json';
            break;
        default:
            console.error('Tipe data tidak dikenal');
            return;
    }

    fetch(file)
        .then(response => response.json())
        .then(data => tampilkanData(data, tipe))
        .catch(error => console.error('Error:', error));
}

// Fungsi untuk menampilkan data di halaman
function tampilkanData(data, tipe) {
    const dataList = document.getElementById('BodyTable');
    dataList.innerHTML = ``;

    data.forEach(item => {
        const dataItem = document.createElement('tr');
        dataItem.innerHTML = `
            
              <th scope="row" style="text-align: center;">${item.jenis}</th>
              <td>${item.nama}</td>
              <td>${item.tanggal}</td>
              <td>${item.lokasi}</td>
              <td style="text-align: center;">${item.magnitudo ? `${item.magnitudo}` : ''}</td>
              <td style="text-align: center;">${item.korban_jiwa}</td>
          
        `;
        dataList.appendChild(dataItem);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    ambilData('tsunami');
});

// Fungsi untuk kapitalisasi tipe bencana
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Event listener untuk dropdown menu
document.getElementById('data-select').addEventListener('change', function() {
    const tipe = this.value;
    if (tipe) {
        ambilData(tipe);
    } else {
        document.getElementById('data-list').innerHTML = '';
    }
});

// switch
$(document).ready(function() {
    $("#color_mode").on("change", function() {
        toggleTargetAttribute(this.checked);
    });

    toggleTargetAttribute($("#color_mode").is(":checked"));
});

function toggleTargetAttribute(isChecked) {
    var checkbox = $("#color_mode");
    var collapseToShow, collapseToHide;

    if (isChecked) {
        checkbox.attr('data-bs-target', '#PusatData');
        collapseToShow = '#PusatData';
        collapseToHide = '#DataRealTime';
    } else {
        checkbox.attr('data-bs-target', '#DataRealTime');
        collapseToShow = '#DataRealTime';
        collapseToHide = '#PusatData';
    }

    $(collapseToHide).collapse('hide');
    $(collapseToShow).collapse('show');
}

$(document).ready(function() {
    $("#color_mode").on("change", function () {
        colorModePreview(this);
    })
});
// End Switch

// JS Timeline
const buttons = document.querySelectorAll('.group-button button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => {
      btn.querySelector('.tahun').classList.remove('tahun-active');
      btn.querySelector('.line').classList.remove('line-active');
    });

    button.querySelector('.tahun').classList.add('tahun-active');
    button.querySelector('.line').classList.add('line-active');

    updateTimelineDetails(button.querySelector('.tahun').textContent);
  });
});

function updateTimelineDetails(year) {
  const timelineDetails = {
    '1815': {
      judul: 'Letusan Gunung Tambora',
      tanggal: 'April 1815',
      lokasi: 'Pulau Sumbawa, Indonesia',
      korban_jiwa: '71,000',
      magnitude: 'VEI 7',
      deskripsi: 'Letusan terbesar yang tercatat dalam sejarah manusia, menyebabkan tahun tanpa musim panas.',
      image: 'assets/Image/timeline/tambora.png'
    },
    '1883': {
      judul: 'Letusan Gunung Krakatau',
      tanggal: '27 Agustus 1883',
      lokasi: 'Selat Sunda, antara Jawa dan Sumatra',
      korban_jiwa: '36,417',
      magnitude: 'VEI 6',
      deskripsi: 'Letusan besar yang menghasilkan tsunami setinggi 30 meter dan suara ledakan terdengar hingga Australia.',
      image: 'assets/Image/timeline/krakatau.png'
    },
    '2004': {
      judul: 'Tsunami Aceh',
      tanggal: '26 Desember 2004',
      lokasi: 'Samudra Hindia, dekat pantai barat Sumatra',
      korban_jiwa: '230,000',
      magnitude: '9.1',
      deskripsi: 'Salah satu gempa bumi paling mematikan yang memicu tsunami besar dan menyebabkan kerusakan luas di 14 negara.',
      image: 'assets/Image/timeline/aceh.png'
    },
    '2006': {
      judul: 'Gempa Yogyakarta',
      tanggal: '27 Mei 2006',
      lokasi: 'Yogyakarta, Indonesia',
      korban_jiwa: '5,749',
      magnitude: '6.3',
      deskripsi: 'Gempa bumi besar yang melanda wilayah Yogyakarta dan Jawa Tengah, menyebabkan kerusakan yang signifikan.',
      image: 'assets/Image/timeline/yogyakarta.png'
    },
    '2018': {
      judul: 'Tsunami Palu',
      tanggal: '28 September 2018',
      lokasi: 'Palu dan Donggala, Sulawesi Tengah',
      korban_jiwa: '4,340',
      magnitude: '7.5',
      deskripsi: 'Gempa bumi dan tsunami yang menyebabkan kerusakan luas dan ribuan korban jiwa di Palu dan sekitarnya.',
      image: 'assets/Image/timeline/palu.png'
    },
    '2022': {
      judul: 'Erupsi Semeru',
      tanggal: '4 Desember 2022',
      lokasi: 'Kabupaten Lumajang, Jawa Timur',
      korban_jiwa: '69',
      magnitude: 'VEI 4',
      deskripsi: 'Letusan menyebabkan evakuasi ribuan penduduk dan kerusakan parah di beberapa desa.',
      image: 'assets/Image/timeline/semeru.png'
    }
  };

  const details = timelineDetails[year];
  const valueTimeline = document.getElementById('ValueTimeline');

  if (details) {
    valueTimeline.querySelector('h1').textContent = details.judul;
    valueTimeline.querySelector('p').textContent = `Kejadian Terparah di Tahun ${year}`;

    valueTimeline.querySelector('img').src = details.image;
    valueTimeline.querySelector('img').alt = details.judul;

    const tableRows = valueTimeline.querySelectorAll('table tr');
    tableRows[0].querySelector('td:nth-child(3)').textContent = details.tanggal;
    tableRows[1].querySelector('td:nth-child(3)').textContent = details.lokasi;
    tableRows[2].querySelector('td:nth-child(3)').textContent = details.korban_jiwa;
    tableRows[3].querySelector('td:nth-child(3)').textContent = details.magnitude;
    tableRows[4].querySelector('td:nth-child(3)').textContent = details.deskripsi;
  }
}
// End Timeline