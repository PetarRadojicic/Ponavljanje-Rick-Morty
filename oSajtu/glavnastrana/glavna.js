function openNav() {
  document.getElementById("myNav").style.width = "50%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

let nameFilter;

//-------------------------------------------------------------------
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function onChangeName(e) {
  console.log(e.value);
  fetchDataByName(e.value);
}
let speciesFilter;

function onChangeSpecies(e) {
  console.log(e.value);
  fetchDataBySpecies(e.value);
}
function fetchDataBySpecies(species) {
  fetch(`https://rickandmortyapi.com/api/character?species=${species}`)
    .then((response) => response.json())
    .then((data) => {
      const jsonContainer = document.getElementById("jsonContainer");
      console.log(data.results);
      jsonContainer.innerHTML = "";

      for (let i = 0; i < data.results.length; i++) {
        console.log(data.results[i]);
        const newImg = document.createElement("img");

        newImg.setAttribute("src", data.results[i].image);
        newImg.addEventListener("click", function () {
          moveToCenter(this); // Call the function to move the image on click
        });
        jsonContainer.appendChild(newImg);
        console.log(newImg);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}
// Poziva fetchDataBySpecies funkciju na stranu
window.onload = () => fetchDataBySpecies("");

// Funkcija za preuzimanje podataka od bekenda
function fetchDataByName(name) {
  fetch(`https://rickandmortyapi.com/api/character?name=${name}`)
    .then((response) => response.json())
    .then((data) => {
      const jsonContainer = document.getElementById("jsonContainer");
      console.log(data.results);
      jsonContainer.innerHTML = "";

      for (let i = 0; i < data.results.length; i++) {
        console.log(data.results[i]);
        const newImg = document.createElement("img");
        newImg.setAttribute("src", data.results[i].image);
        newImg.addEventListener("click", function () {
          //-------------------------------------------------------------------
          favorites.push(data.results[i].id);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          moveToCenter(this);
        });
        jsonContainer.appendChild(newImg);
        console.log(newImg);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Poziva fetchDataByName funkciju na stranu
window.onload = () => fetchDataByName("");

// Funkcija za filtriranje podataka
function filterData() {
  const nameInput = document
    .querySelector('input[name="name"]')
    .value.toLowerCase();
  const speciesInput = document
    .querySelector('input[name="species"]')
    .value.toLowerCase();
  const statusSelect = document
    .querySelector("#statusSelect")
    .value.toLowerCase();
  const genderSelect = document
    .querySelector("#genderSelect")
    .value.toLowerCase();

  fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => {
      const filteredResults = data.results.filter((character) => {
        return (
          character.name.toLowerCase().includes(nameInput) &&
          character.species.toLowerCase().includes(speciesInput) &&
          (statusSelect === "" ||
            character.status.toLowerCase() === statusSelect) &&
          (genderSelect === "" ||
            character.gender.toLowerCase() === genderSelect)
        );
      });

      const jsonContainer = document.getElementById("jsonContainer");
      jsonContainer.innerHTML = "<div>hi</div>";

      filteredResults.forEach((character) => {
        const newImg = document.createElement("img");
        newImg.setAttribute("src", character.image);
        jsonContainer.appendChild(newImg);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

document
  .querySelector('input[name="name"]')
  .addEventListener("input", filterData);
document
  .querySelector('input[name="species"]')
  .addEventListener("input", filterData);
document.querySelector("#statusSelect").addEventListener("change", filterData);
document.querySelector("#genderSelect").addEventListener("change", filterData);

window.onload = filterData;

// Funkcija za dodavanje karaktera u favorites
function addToFavorites(characterId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(characterId)) {
    favorites.push(characterId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Character added to favorites!");
  } else {
    alert("Character already in favorites!");
  }
}

// Funkcija za prikaz omiljenih likova
function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const jsonContainer = document.getElementById("jsonContainer");

  favorites.forEach((characterId) => {
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => response.json())
      .then((character) => {
        const characterContainer = document.createElement("div");

        const newImg = document.createElement("img");
        newImg.setAttribute("src", character.image);
        characterContainer.appendChild(newImg);
        // Dodajemo dugme za dodavanje u favorites
        const favoriteButton = document.createElement("button");
        favoriteButton.innerText = "Add to Favorites";
        favoriteButton.addEventListener("click", function () {
          addToFavorites(character.id); // Pozivamo funkciju za dodavanje u favorites
        });
        characterContainer.appendChild(favoriteButton);

        jsonContainer.appendChild(characterContainer);
      })
      .catch((error) => console.error("Error fetching character:", error));
  });
}

// Pozivamo funkciju za prikaz omiljenih likova kada se stranica učita
window.onload = displayFavorites;
// Pronađite sve opcije u padajućem meniju po statusu
const statusOptions = document.querySelectorAll(".dropdown-content a");

statusOptions.forEach((option) => {
  option.addEventListener("click", function () {
    // Kada korisnik klikne na opciju, pozovite funkciju za filtriranje sa odgovarajućim statusom
    const selectedStatus = this.innerText.toLowerCase(); // Dobijanje teksta opcije (npr. "alive", "dead", "unknown")
    filterDataByStatus(selectedStatus); // Poziv funkcije za filtriranje po statusu
  });
});

function filterDataByStatus(status) {
  fetch(`https://rickandmortyapi.com/api/character?status=${status}`)
    .then((response) => response.json())
    .then((data) => {
      const jsonContainer = document.getElementById("jsonContainer");
      jsonContainer.innerHTML = ""; // Clear previous results

      data.results.forEach((character) => {
        const newImg = document.createElement("img");
        newImg.setAttribute("src", character.image);
        jsonContainer.appendChild(newImg);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}
// Pronađite sve opcije u padajućem meniju po statusu
const genderOptions = document.querySelectorAll(".dropdown-content a");

genderOptions.forEach((option) => {
  option.addEventListener("click", function () {
    // Kada korisnik klikne na opciju, pozovite funkciju za filtriranje sa odgovarajućim statusom
    const selectedGender = this.innerText.toLowerCase(); // Dobijanje teksta opcije (npr. "female", "male","genderless","unknown")
    filterDataByGender(selectedGender); // Poziv funkcije za filtriranje po rodu
  });
});

function filterDataByGender(gender) {
  fetch(`https://rickandmortyapi.com/api/character?gender=${gender}`)
    .then((response) => response.json())
    .then((data) => {
      const jsonContainer = document.getElementById("jsonContainer");
      jsonContainer.innerHTML = ""; // Clear previous results

      data.results.forEach((character) => {
        const newImg = document.createElement("img");
        newImg.setAttribute("src", character.image);
        jsonContainer.appendChild(newImg);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}