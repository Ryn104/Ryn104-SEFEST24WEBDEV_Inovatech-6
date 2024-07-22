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