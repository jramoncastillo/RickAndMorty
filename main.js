const characterContainer = document.getElementById('characterContainer');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
let currentPage = 1;
let nextPageUrl = `https://rickandmortyapi.com/api/character/?page=${currentPage}`;
let allCharacters = [];

function showCharacters(characters) {
  characterContainer.innerHTML = '';
  characters.forEach(character => {
    const characterName = character.name;
    const characterImage = character.image;

    const characterCardContainer = document.createElement('div');
    characterCardContainer.classList.add('characterCardContainer');

    const characterCard = document.createElement('div');
    characterCard.classList.add('characterCard');
    characterCard.innerHTML = `
      <img src="${characterImage}" alt="${characterName}" onclick="showModal('${characterName}', '${characterImage}', '${character.status}', '${character.species}', '${character.location.name}')">
      <h2 style="color: white;">${characterName}</h2>
    `;

    characterCardContainer.appendChild(characterCard);
    characterContainer.appendChild(characterCardContainer);
  });
}

function showModal(name, image, status, species, location) {
  modalContent.innerHTML = `
    <img src="${image}" alt="${name}" onclick="hideModal()">
    <h2>${name}</h2>
    <p>Status: ${status}</p>
    <p>Species: ${species}</p>
    <p>Location: ${location}</p>
  `;

  modal.style.display = 'block';
}

function hideModal() {
  modal.style.display = 'none';
}

function showNextButton() {
  const nextButton = document.getElementById('nextButton');
  nextButton.style.display = 'block';
}

function showPrevButton() {
  const prevButton = document.getElementById('prevButton');
  prevButton.style.display = 'block';
}

function getAllCharacters(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const characters = data.results;
      allCharacters = characters;
      showCharacters(characters);

      const nextLink = data.info.next;
      const prevLink = data.info.prev;

      if (nextLink) {
        showNextButton();
        const nextButton = document.getElementById('nextButton');
        nextButton.addEventListener('click', () => {
          currentPage++;
          nextPageUrl = `https://rickandmortyapi.com/api/character/?page=${currentPage}`;
          getAllCharacters(nextPageUrl);
        });
      }

      if (prevLink) {
        showPrevButton();
        const prevButton = document.getElementById('prevButton');
        prevButton.addEventListener('click', () => {
          currentPage--;
          nextPageUrl = `https://rickandmortyapi.com/api/character/?page=${currentPage}`;
          getAllCharacters(nextPageUrl);
        });
      }
    })
    .catch(error => console.log(error));
}

getAllCharacters(nextPageUrl);








