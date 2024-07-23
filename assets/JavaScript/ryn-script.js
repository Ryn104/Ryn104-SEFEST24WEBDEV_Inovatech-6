// Navbar
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-blur');
    } else {
      navbar.classList.remove('navbar-blur');
    }
  });
});

// -----------------------------------------------------------DATA REALTIME
document.addEventListener('DOMContentLoaded', () => {
  const dataUrl = 'assets/json/realtime.json'; // URL file JSON
  const rowsPerPage = 10;
  let currentPage = 1;
  let totalPages = 0;
  let data = [];

  async function fetchData() {
      try {
          const response = await fetch(dataUrl);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          data = await response.json();
          totalPages = Math.ceil(data.length / rowsPerPage);
          updatePagination();
          displayData();
          document.querySelector('#prevPage').addEventListener('click', prevPage);
          document.querySelector('#nextPage').addEventListener('click', nextPage);
          document.querySelector('#pagination').addEventListener('click', (e) => {
              if (e.target.classList.contains('page-num')) {
                  currentPage = parseInt(e.target.textContent);
                  displayData();
              }
          });
          // No filter event listeners here
      } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
      }
  }

  function displayData() {
      const tbody = document.querySelector('#dataTable tbody');
      tbody.innerHTML = '';

      const start = (currentPage - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      const paginatedData = data.slice(start, end);

      paginatedData.forEach(record => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>${record.wilayah}</td>
          <td style="text-align: center;">${record.lintang}</td>
          <td style="text-align: center;">${record.bujur}</td>
          <td style="text-align: center;">${record.magnitudo}</td>
          <td style="text-align: center;">${record.kedalaman_km}</td>
          <td style="text-align: center;">${record.jam}</td>
          <td style="text-align: center;">${record.tanggal}</td>
          `;
          tbody.appendChild(row);
      });

      updatePagination();
  }

  function updatePagination() {
      const pagination = document.querySelector('#pagination');
      pagination.innerHTML = '';

      for (let i = 1; i <= totalPages; i++) {
          const page = document.createElement('div');
          page.classList.add('btn', 'btn-light', 'page-num');
          page.textContent = i;
          if (i === currentPage) {
              page.classList.add('active');
          }
          pagination.appendChild(page);
      }

      document.querySelector('#prevPage').style.visibility = currentPage > 1 ? 'visible' : 'hidden';
      document.querySelector('#nextPage').style.visibility = currentPage < totalPages ? 'visible' : 'hidden';
  }

  function prevPage() {
      if (currentPage > 1) {
          currentPage--;
          displayData();
      }
  }

  function nextPage() {
      if (currentPage < totalPages) {
          currentPage++;
          displayData();
      }
  }

  fetchData(); // Ambil dan tampilkan data saat halaman dimuat
});
// -----------------------------------------------------------END DATA REALTIME



// -----------------------------------------------------------PUSAT DATA
document.addEventListener('DOMContentLoaded', function() {
  ambilData('tsunami');
});

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
      .then(data => {
          // Call pagination function here
          setupPagination(data);
          tampilkanData(data, 1); // Display the first page initially
      })
      .catch(error => console.error('Error:', error));
}

// Pagination setup
const rowsPerPage = 10;
let currentPage = 1;
let totalPages = 0;
let data = [];

function setupPagination(dataArray) {
  data = dataArray;
  totalPages = Math.ceil(data.length / rowsPerPage);
  updatePagination();

  document.querySelector('#prevPagePusatData').addEventListener('click', prevPage);
  document.querySelector('#nextPagePusatData').addEventListener('click', nextPage);
  document.querySelector('#paginationPusatData').addEventListener('click', function(e) {
      if (e.target.classList.contains('page-num')) {
          currentPage = parseInt(e.target.textContent);
          tampilkanData(data, currentPage);
      }
  });
}

function tampilkanData(dataArray, page) {
  const dataList = document.getElementById('BodyTable');
  dataList.innerHTML = '';

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = dataArray.slice(start, end);

  paginatedData.forEach(item => {
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

  currentPage = page;
  updatePagination();
}

function updatePagination() {
  const pagination = document.querySelector('#paginationPusatData');
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
      const page = document.createElement('div');
      page.classList.add('btn', 'btn-light', 'page-num');
      page.textContent = i;
      if (i === currentPage) {
          page.classList.add('active');
      }
      pagination.appendChild(page);
  }

  document.querySelector('#prevPagePusatData').style.visibility = currentPage > 1 ? 'visible' : 'hidden';
  document.querySelector('#nextPagePusatData').style.visibility = currentPage < totalPages ? 'visible' : 'hidden';
}

// Pagination functions
function prevPage() {
  if (currentPage > 1) {
      tampilkanData(data, currentPage - 1);
  }
}

function nextPage() {
  if (currentPage < totalPages) {
      tampilkanData(data, currentPage + 1);
  }
}

// Event listener for dropdown menu
document.getElementById('data-select').addEventListener('change', function() {
  const tipe = this.value;
  if (tipe) {
      ambilData(tipe);
  } else {
      document.getElementById('BodyTablePusatData').innerHTML = '';
  }
});
// -----------------------------------------------------------------------------------END PUSAT DATA

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