function showCards(keyword) {
  var cards = document.querySelectorAll('.donasi-card');
  
cards.forEach(function(card) {
    var title = card.querySelector('.donasi-card-title').innerText.toLowerCase();
      
    if (title.includes(keyword.toLowerCase())) {
        card.style.display = 'block';
    } else {
        card.style.display = 'none';
    }
  });
}

function changeButtonBackground() {
  var buttons = document.querySelectorAll('.donasi-list-button');

  buttons.forEach(function(button) {
      button.addEventListener('click', function() {
          buttons.forEach(function(btn) {
              btn.style.backgroundColor = 'transparent';
              btn.style.fontWeight = 'normal';
          });
          button.style.backgroundColor = '#E7C873';
          button.style.fontWeight = '500';
      });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  changeButtonBackground();
});
