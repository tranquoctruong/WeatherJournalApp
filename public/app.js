async function submitJournal() {
    const city = document.getElementById('city').value;
  
    const response = await fetch('/api/weather', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city })
    });
  
    const data = await response.json();
    updateEntries();
  }
  
  async function updateEntries() {
    const response = await fetch('/api/journal');
    const entries = await response.json();
  
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '';
    
    entries.forEach(entry => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p><strong>${entry.city}</strong> (${entry.date})</p>
        <p>Temperature: ${entry.temperature}°C - ${entry.description}</p>
      `;
      entriesDiv.appendChild(div);
    });
  }
  
  // Update journal entries on page load
  updateEntries();