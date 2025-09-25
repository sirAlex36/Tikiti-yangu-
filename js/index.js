document.addEventListener('DOMContentLoaded', () => {
  const ticket = document.querySelector('.ticket-details');// Grabs the ticket list container

  fetch("http://localhost:3000/events") //gets data from db.json
    .then(response => response.json())
    .then(events => {
      ticket.innerHTML = ""; // Clears existing content
      events.forEach(event => {
        const ticketItem = document.createElement('div');
        ticketItem.classList.add('ticket-item');
        ticketItem.innerHTML += ` 
       <img src="${event.image}" alt="Event poster  ${event.name}" />
       <h2>${event.name}</h2>

       <p>Location: ${event.location}</p>
       <button  class="view" >View</button>
       `;
        ticket.appendChild(ticketItem); 
        const viewButton = ticketItem.querySelector('.view');
        viewButton.addEventListener('click', () => {
          displayEventDetails(event.id);  
        }); 
      });
    });
});

  const event = document.querySelector('#container')
  const image = document.createElement('img');

  fetch("http://localhost:3000/events")
    .then(response => response.json())
    .then(events => {
      image.src = `${events[0].image}`;
      image.alt = `Event poster  ${events[0].name}`;
      event.appendChild(image);
      image.style.width = '100%';
      image.style.height = '100%';
      image.style.objectFit = 'contain';

      let currentIndex = 0;
      showImage(currentIndex);
      setInterval(showNextImage, 10000); 

      function showImage(index) {
        image.src = events[index].image;
        image.alt = `Event poster  ${events[index].name}`;
      } 
      function showNextImage() {
        if (events.length === 0) return;
        currentIndex = (currentIndex + 1) % events.length;
        showImage(currentIndex);
      }

    });
const ticketSearch = document.getElementById('card-template');
const eventCardContainer = document.querySelector('.card-container');
const searchInput = document.getElementById('search-input');

let eventSearch = [];
 
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();

   if (searchTerm.trim() === "") {
    eventCardContainer.style.display = "none"; 
    return;
  } else {
    eventCardContainer.style.display = "grid"; 
  }

  eventSearch.forEach(event => {
    const isVisible = event.name.toLowerCase().includes(searchTerm) || event.location.toLowerCase().includes(searchTerm);
    event.card.classList.toggle('hide', !isVisible);
  })
})

fetch("http://localhost:3000/events")
  .then(response => response.json())
  .then(events => {
    eventSearch = events.map(event => {
      const card = ticketSearch.content.cloneNode(true).children[0];
      const header = card.querySelector('.header');
      const body = card.querySelector('.body');
      header.textContent = event.name;
      body.textContent = event.location;
      eventCardContainer.append(card);
      return { name: event.name, location: event.location, card };
    })
  })
  .catch(error => console.error('Error fetching events:', error));


function displayEventDetails(eventId) {
  const detailsSection = document.querySelector('.ticket-item');


  fetch(`http://localhost:3000/events/${eventId}`)
    .then(response => response.json())
    .then(event => {
      detailsSection.innerHTML = `
    <img src="${event.image}" alt="Event poster for ${event.name} happening at ${event.location} on ${event.date}. Event name: ${event.name}. Description: ${event.description}." />
    <h2>${event.name}</h2>
    <p>${event.description}</p>
    <p>Date: ${event.date}</p>
    <p>Location: ${event.location}</p>
    <p>🎟️ Your pass to an unforgettable experience!</p>
    <p>${event.Text}</p>
    <input type="text" id="search-input" placeholder="Ticket type" style.display:"flex">
    <input type="text" id="search-input" placeholder="no of tickets" style.display:"flex">
    <button id="buy-ticket-btn" style.display:"flex">Add to cart</button>
    `;
      const buyTicketBtn = document.getElementById('buy-ticket-btn');
      buyTicketBtn.addEventListener('click', () => {
        alert(`This feature is currently not available`);
      })
    });

};
