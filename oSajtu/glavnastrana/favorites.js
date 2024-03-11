// Retrieve the favorites array from localStorage and parse it back into an array
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Select the favoritesContainer div
let favoritesContainer = document.getElementById('favoritesContainer');

// Fetch the data for each character by their ID
favorites.forEach(id => {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(response => response.json())
    .then(character => {
      // Create an image element for each character
      let img = document.createElement('img');
      img.src = character.image;

      // Append the image element to the favoritesContainer div
      favoritesContainer.appendChild(img);
    })
    .catch(error => console.error('Error:', error));
});