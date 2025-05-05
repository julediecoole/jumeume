let apiurl = 'https://api.truthordarebot.xyz/v1/truth';
async function fetchTruth() {
    const button = document.getElementById('nextBtn');
    
    try {
      // Button ausblenden
      button.classList.add('hidden');
  
      // API-Fetch
      const response = await fetch(apiurl);
      const data = await response.json();
      document.querySelector('#truth p').textContent = data.question;
  
      // Nach 5 Sekunden wieder anzeigen
      setTimeout(() => {
        button.classList.remove('hidden');
      }, 2000);
  
    } catch (error) {
      console.error(error);
      document.querySelector('#truth p').textContent = 'error';
      
      // Auch bei Fehler nach 5s wieder anzeigen
      setTimeout(() => {
        button.classList.remove('hidden');
      }, 5000);
    }
  }
  document.getElementById('nextBtn').addEventListener('click', fetchTruth);


  // Button farbe wechseln
  function activateorangemode() {
    const body = document.querySelector("body");
    body.classList.remove('backgroundblue');
    body.classList.add('backgroundorange');
    document.getElementById('buttonorange').classList.add('active'); 
    document.getElementById('buttonblue').classList.remove('active');
    apiurl = 'https://api.truthordarebot.xyz/v1/paranoia';
    fetchTruth();
  }
  document.getElementById('buttonorange').addEventListener('click', activateorangemode);
    
  function activatebluemode() {
    const body = document.querySelector("body");

    body.classList.remove('backgroundorange');
    body.classList.add('backgroundblue');
    document.getElementById('buttonblue').classList.add('active'); 
    document.getElementById('buttonorange').classList.remove('active');
    apiurl = 'https://api.truthordarebot.xyz/v1/truth';
    fetchTruth();
  }
  document.getElementById('buttonblue').addEventListener('click', activatebluemode);
  
  // Initial load
  fetchTruth();
  