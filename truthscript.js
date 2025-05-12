let apiurl = 'https://api.truthordarebot.xyz/v1/truth';

async function fetchTruth() {
    const button = document.getElementById('nextBtn');
    // Sprache aus dem Dropdown-Menü holen
    const langSelect = document.getElementById('languageSelect');
    const selectedLang = langSelect ? langSelect.value : 'en';
    
    try {
        // Button ausblenden
        button.classList.add('hidden');
  
        // API-Fetch
        const response = await fetch(apiurl);
        const data = await response.json();
        document.querySelector('#truth p').textContent = data.question;

        // neu so?
        const translation = data.translations?.[selectedLang] || data.question;
        document.querySelector('#truth p').textContent = translation;
  
        // Nach 2 Sekunden Button wieder anzeigen
        setTimeout(() => {
            button.classList.remove('hidden');
        }, 2000);
    } catch (error) {
        console.error(error);
        document.querySelector('#truth p').textContent = 'error';
      
        // Button auch bei Fehler nach 5s wieder anzeigen
        setTimeout(() => {
            button.classList.remove('hidden');
        }, 5000);
    }
}

document.getElementById('nextBtn').addEventListener('click', fetchTruth);
document.getElementById('languageSelect').addEventListener('change', fetchTruth);

// Beim ersten Seitenbesuch das blaue Popup anzeigen
window.addEventListener('DOMContentLoaded', () => {
  const hasSeenDeeptalk = sessionStorage.getItem('popupSeen_deeptalks');

  if (!hasSeenDeeptalk) {
    setTimeout(() => {
      document.querySelector('#popup-deeptalks').classList.add('show');
    }, 500);
    sessionStorage.setItem('popupSeen_deeptalks', 'true');
  }
});

// Orange-Modus aktivieren
function activateorangemode() {
  const body = document.querySelector("body");
  body.classList.remove('backgroundblue');
  body.classList.add('backgroundorange');

  document.getElementById('buttonorange').classList.add('active');
  document.getElementById('buttonblue').classList.remove('active');

  // Popup nur beim ersten Mal zeigen
  const hasSeenMostLikely = sessionStorage.getItem('popupSeen_mostlikelyto');
  if (!hasSeenMostLikely) {
    setTimeout(() => {
      document.querySelector('#popup-mostlikelyto').classList.add('show');
    }, 500);
    sessionStorage.setItem('popupSeen_mostlikelyto', 'true');
  }

  apiurl = 'https://api.truthordarebot.xyz/v1/paranoia';
  fetchTruth();
}
document.getElementById('buttonorange').addEventListener('click', activateorangemode);

// Blau-Modus aktivieren
function activatebluemode() {
  const body = document.querySelector("body");
  body.classList.remove('backgroundorange');
  body.classList.add('backgroundblue');

  document.getElementById('buttonblue').classList.add('active');
  document.getElementById('buttonorange').classList.remove('active');

  // Zeige Popup NICHT nochmal (wurde beim Laden der Seite schon gezeigt)
  apiurl = 'https://api.truthordarebot.xyz/v1/truth';
  fetchTruth();
}
document.getElementById('buttonblue').addEventListener('click', activatebluemode);

// Popup schließen
document.querySelectorAll('.schliessen-button').forEach(button => {
  button.addEventListener('click', () => {
    button.closest('.popup-fenster').classList.remove('show');
  });
});


// Initial load
fetchTruth();


let touchstartX = 0;
let touchstartY = 0;
let blockSwipe = false;

document.addEventListener('touchstart', (e) => {
    touchstartX = e.touches[0].clientX;
    touchstartY = e.touches[0].clientY;
})

document.addEventListener('touchmove', (e) => {
    const touchendX = e.changedTouches[0].clientX;
    const touchendY = e.changedTouches[0].clientY;
    const diffX = touchendX - touchstartX;
    const diffY = touchendY - touchstartY;
    const threshold = window.innerWidth / 3; // Minimum distance to consider a swipe
    const isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold;

    const body = document.querySelector("body");

    if(isHorizontalSwipe && !blockSwipe) {
        touchstartX = 0
        touchstartY = 0
        blockSwipe = true
        if (body.classList.contains('backgroundblue')) {
            activateorangemode();
        }
        else if (body.classList.contains('backgroundorange')) {
            activatebluemode();
        }
    }
    
})

document.addEventListener('touchend', () => {
    blockSwipe = false
})