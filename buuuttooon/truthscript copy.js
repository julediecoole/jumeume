async function fetchTruth() {
    const button = document.getElementById('nextBtn');
    
    try {
      // Button ausblenden
      button.classList.add('hidden');
  
      // API-Fetch
      const response = await fetch('https://api.truthordarebot.xyz/v1/truth');
      const data = await response.json();
      document.querySelector('#truth p').textContent = data.question;
  
      // Nach 5 Sekunden wieder anzeigen
      setTimeout(() => {
        button.classList.remove('hidden');
      }, 2000);
  
    } catch (error) {
      console.error(error);
      document.querySelector('#truth p').textContent = '404';
      
      // Auch bei Fehler nach 5s wieder anzeigen
      setTimeout(() => {
        button.classList.remove('hidden');
      }, 5000);
    }
  }
  

function farbeWechseln() {
  const button = document.getElementById('farbwechsler');
  button.classList.remove('blue');
  button.classList.add('orange');
}
document.getElementById('farbwechsler').addEventListener('click', farbeWechseln);
  


  document.getElementById('nextBtn').addEventListener('click', fetchTruth);
  
  // Initial load
  fetchTruth();
  