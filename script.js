const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const musicButton = document.getElementById('music');

let searchPokemon = 1;
let isMusicPlaying = false;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

const body = document.body;
const backgroundButton = document.getElementById('background_button');

let currentBackground = 1;

backgroundButton.addEventListener('click', () => {
  currentBackground = (currentBackground % 3) + 1;
  body.style.backgroundImage = `url('bg${currentBackground}.gif')`;
  body.style.backgroundSize = 'cover';
  body.style.backgroundRepeat = 'no-repeat';
  body.style.backgroundAttachment = 'fixed'; // Optional: Fixed background
});

const audio = new Audio('theme.mp3');

musicButton.addEventListener('click', () => {
  if (isMusicPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isMusicPlaying = !isMusicPlaying;
});

const ashButton = document.getElementById('ash_button');
const ashBubble = document.getElementById('ash_bubble');
const ashMessage = document.getElementById('ash_message');

const ashQuotes = [
    "I choose you, Pikachu!",
    "Every defeat is a step toward a legendary comeback. Keep pushing forward.",
    "I became a pokemon master at age 10, and you're still jobless at age 20",
    "Believe in yourself and your team. ",
    "My Pokedex is thicker than your resume.",
    "To be a Pokémon Master is my destiny!",
    "Team Rocket's been blasting off longer than your attention span.",
    "I've got more experience points than your LinkedIn profile.",
    "Pokémon are our friends!",
    "I'm not a kid, I'm a Pokémon Trainer!",
];

ashButton.addEventListener('click', () => {
    const randomQuote = ashQuotes[Math.floor(Math.random() * ashQuotes.length)];
    ashMessage.textContent = randomQuote;
    ashBubble.style.display = 'block';

        // Play ashtalk.mp3
        const ashtalkAudio = new Audio('ashtalk.mp3');
        ashtalkAudio.play();

    setTimeout(() => {
        ashBubble.style.display = 'none';
    }, 15000); 
});


