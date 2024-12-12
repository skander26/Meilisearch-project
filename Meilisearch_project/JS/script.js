document.addEventListener("DOMContentLoaded", fetchAllDestinations);
const searchBar = document.getElementById("input");
const searchResults = document.getElementById("searchResults");
const meiliSearchUrl = "https://ms-8a059a8ac49b-16123.lon.meilisearch.io";
const apiKey = "ef07f933bc528815d2fae4bba7eba2342b7c2f525baddd6239adefffead02841";

async function searchDestinations() {
    const query = searchBar.value.trim();
    if (query.length === 0) {
        fetchAllDestinations();
        return;
    }
    try {
        console.log(`Searching for: ${query}`);
        const response = await fetch(`${meiliSearchUrl}/indexes/Travel_Adventure_Planner/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                q: query,
                filter: "",
            }),
        });
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return;
        }
        const data = await response.json();
        console.log("API Response: ", data);
        if (data && data.hits) {
            displayResults(data.hits);
        } else {
            console.log("No hits found in response");
            searchResults.innerHTML = '<p>No results found</p>';
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

async function fetchAllDestinations() {
  try {
      const response = await fetch(`${meiliSearchUrl}/indexes/Travel_Adventure_Planner/search`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
              q: "",
              limit: 1000
          }),
      });

      if (!response.ok) {
          console.error(`Error: ${response.statusText}`);
          return;
      }

      const data = await response.json();
      console.log("All Destinations: ", data);
      if (data && data.hits) {
          displayResults(data.hits);
      } else {
          console.log("No hits found in response");
          searchResults.innerHTML = '<p>No results found</p>';
      }
  } catch (error) {
      console.error('Error fetching all destinations:', error);
  }
}

function displayResults(results) {
  const hotelCardContainer = document.querySelector(".hotel-card");

  hotelCardContainer.innerHTML = '';

  if (results.length === 0) {
      hotelCardContainer.innerHTML = '<p>No results found</p>';
      return;
  }

  results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.classList.add('hotel-cards');

      const imageSrc = `images/${result.id}.jpeg`;
      resultItem.innerHTML = `
          <img src="${result.image || imageSrc}" alt="${result.name}" width="320" height="380">
          <h5>${result.name}</h5>
          <h6><img src="Imgs/icons/map-pin-line.png" alt=""> ${result.location}</h6>
          <div class="ratings">
              <img src="Imgs/icons/rating=5.png" alt="">
          </div>
      `;

      hotelCardContainer.appendChild(resultItem);
  });
}

searchBar.addEventListener('input', function() {
    if (searchBar.value.trim() === "") {
        fetchAllDestinations();
    } else {
        searchDestinations();
    }
});

function scrollToSearch() {
  const searchSection = document.getElementById("searchSection");
  window.scrollTo({
    top: searchSection.offsetTop,
    behavior: "smooth"
  });
}

ScrollReveal({
  mobile: false,
}
)

ScrollReveal().reveal('.header', {
  delay: 500,
  reset: false,
  mobile: false,
});

ScrollReveal().reveal('.showcase-content h1', {
  scale: 2,
  duration: 3000,
  mobile: false,
});

ScrollReveal().reveal('.showcase-content', {

  scale: 2,
  duration: 3000,
  delay: 500,
  mobile: false,
});

ScrollReveal().reveal('.showcase-search', {
  duration: 1500,
  delay: 500,
});

ScrollReveal().reveal('.destinations h2', {
  reset: true,
  duration: 1500,
  delay: 500,
  origin: 'left',
  distance: '50px',
});

ScrollReveal().reveal('.destinations-cards', {
  duration: 1500,
});

ScrollReveal().reveal('.section-title', {
  reset: true,
  duration: 1500,
  delay: 500,
  origin: 'left',
  distance: '50px',
});
ScrollReveal().reveal('.hotel-card , #tours, #activities', {
  duration: 1500,
  origin: 'left',
  distance: '50px',
});

ScrollReveal().reveal('.about-content', {
  reset: true,
  duration: 1500,
  origin: 'left',
  distance: '50px',
});
ScrollReveal().reveal('.about-img', {
  reset: true,
  duration: 1500,
  origin: 'right',
  distance: '50px',
});

const swiper = new Swiper('.swiper1', {
  direction: 'horizontal',
  loop: true,
  speed: 600,
  slidesPerView: 6,
  spaceBetween: 10,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    240: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
  },
});


const hotelButton = document.querySelector('.hotel-button');
const hotelCard = document.querySelectorAll('.off');
const text = hotelButton.innerText;

hotelButton.addEventListener('click', (e) => {
  e.preventDefault();
  hotelCard.forEach((x) => {
    x.classList.toggle('on');
  });

  if (e.target.innerHTML !== 'less <img src="/Imgs/icons/bleft.png">') {
    e.target.innerHTML = `less <img src="/Imgs/icons/bleft.png" >`;
  } else {
    e.target.innerHTML = `view all <img src="/Imgs/icons/bleft.png" >`;
  }
});

const toogleOn = document.querySelector('.toggleOn');
const toogleClose = document.querySelector('.toggleClose');
const navbar = document.querySelector('.navbar');
const navlists = document.querySelectorAll('.navlist');

toogleOn.addEventListener('click', (e) => {
  e.preventDefault();
  navbar.classList.add('navlistOn');
  toogleClose.classList.add('toggleCloseOn');
  toogleOn.classList.add('toggleOnClose');
});

toogleClose.addEventListener('click', (e) => {
  navbar.classList.remove('navlistOn');
  toogleClose.classList.remove('toggleCloseOn');
  toogleOn.classList.remove('toggleOnClose');
});

console.log('navlists');
navlists.forEach((xy) => {
  xy.addEventListener('click', (x) => {
    navbar.classList.remove('navlistOn');
    toogleClose.classList.remove('toggleCloseOn');
    toogleOn.classList.remove('toggleOnClose');
  });
});
