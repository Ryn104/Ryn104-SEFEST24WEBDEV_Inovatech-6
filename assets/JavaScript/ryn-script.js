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

    // Use Bootstrap Collapse API to show/hide elements
    $(collapseToHide).collapse('hide');
    $(collapseToShow).collapse('show');
}

$(document).ready(function() {
    $("#color_mode").on("change", function () {
        colorModePreview(this);
    })
});


// jQuery(function($) {
//     $(window).on('scroll', function() {
//         if ($(this).scrollTop() >= 200) {
//             $('.navbar').addClass('bg-dark');
//         } else if ($(this).scrollTop() == 0) {
//             $('.navbar').removeClass('bg-dark');
//         }
// })});






// let penyebab = document.getElementById("penyebab");
// let dampak = document.getElementById("dampak");
// let solusi = document.getElementById("solusi");
// let galery = document.getElementById("galery");

// penyebab.addEventListener("click", function(){
//     penyebab.style.borderBottom = "3px solid #FC3535";
//     penyebab.style.marginBottom = "-3px";
//     penyebab.style.color = "white";

// });
// dampak.addEventListener("click", function(){
//     dampak.style.borderBottom = "3px solid #FC3535";
//     dampak.style.marginBottom = "-3px";
//     dampak.style.color = "white";
// });
// solusi.addEventListener("click", function(){
//     solusi.style.borderBottom = "3px solid #FC3535";
//     solusi.style.marginBottom = "-3px";
//     solusi.style.color = "white";
// });
// galery.addEventListener("click", function(){
//     galery.style.borderBottom = "3px solid #FC3535";
//     galery.style.marginBottom = "-3px";
//     galery.style.color = "white";
// });
// window.addEventListener("scroll", function(){
//     var header = document.querySelector("nav");
//     header.classList.toggle("sticky", window.scrollY > 100);
//   });
  
	
// 	function adjustNav() {
// 		var winWidth = $(window).width(),
// 			dropdown = $('.dropdown'),
// 			dropdownMenu = $('.dropdown-menu');
		
// 		if (winWidth >= 768) {
// 			dropdown.on('mouseenter', function() {
// 				$(this).addClass('show')
// 					.children(dropdownMenu).addClass('show');
// 			});
			
// 			dropdown.on('mouseleave', function() {
// 				$(this).removeClass('show')
// 					.children(dropdownMenu).removeClass('show');
// 			});
// 		} else {
// 			dropdown.off('mouseenter mouseleave');
// 		}
// 	}
	
// 	$(window).on('resize', adjustNav);
	
// 	adjustNav();
// });