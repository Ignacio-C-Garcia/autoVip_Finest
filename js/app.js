// Apuntar a elementos del HTML
const carsContainer = document.querySelector(".carsContainer");
const selectBrand = document.querySelector("#brand");
const selectYear = document.querySelector("#year");

function cargarAutomoviles() {
  fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
    .then(function (res) {
      return res.json();
    })
    .then(function (cars) {
      for (const car of cars) {
        carsContainer.insertAdjacentHTML(
          "beforeend",
          `<div class="row mb-3">
            <div class="col-12 col-lg-4">
              <div class="position-relative">
                <span class="badge bg-warning position-absolute mt-3 mx-3">New</span>
                <img src="${car.image}" class="img-thumbnail" alt="...">
              </div>
            </div>
            <div class="col-12 col-lg-8 pb-5">
              <div class="d-flex justify-content-between">
                <h3>${car.brand} ${car.model}</h3>
                <span>${car.year} | USD ${car.price_usd} | 
                  <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i><i class="bi bi-star"></i>
                  <i class="bi bi-star"></i>
                </span>
              </div>
              <p class="description-cars">${car.description}</p>
              <button type="button" class="btn btn-success">
                <i class="bi bi-cart-check"></i> Comprar
              </button>
              <button type="button" class="btn btn-outline-secondary">
                <i class="bi bi-plus-circle"></i> Mas Informacion
              </button>
              <button type="button" class="btn btn-outline-secondary">
                <i class="bi bi-share"></i> Compartir
              </button>
            </div>
          </div>`
        );
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}
// ejecutar funcion cargar automoviles
cargarAutomoviles();

// Cargar valores del filtro
function cargarAnios() {
  for (let year = 1900; year <= 2023; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    selectYear.appendChild(option);
  }
}

// ejecutar funcion cargar años
cargarAnios();

fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
  .then(function (res) {
    return res.json();
  })
  .then(function (brands) {
    for (const brand of brands) {
      const option = document.createElement("option");
      option.value = brand;
      option.text = brand;
      selectBrand.appendChild(option);
    }
  })
  .catch(function (err) {
    console.error(err);
  });

// Llama a la función para cargar los automóviles cuando se carga la página.

const yearSelect = document.getElementById("year");
const brandSelect = document.getElementById("brand");
const modelSelect = document.getElementById("model");
const stateSelect = document.getElementById("state");
const filterButton = document.querySelector(".btn-warning");

filterButton.addEventListener("click", function () {
  // Obtén los valores seleccionados
  const selectedYear = yearSelect.value;
  const selectedBrand = brandSelect.value;
  const selectedModel = modelSelect.value;
  const selectedState = stateSelect.value;

  // Filtra los automóviles basados en los valores seleccionados
  const filteredCars = cars.filter((car) => {
    return (
      (selectedYear === "Todos" || car.year === selectedYear) &&
      (selectedBrand === "Todos" || car.brand === selectedBrand) &&
      (selectedModel === "Todos" || car.model === selectedModel) &&
      (selectedState === "Todos" || car.state === selectedState)
    );
  });

  // Limpia la sección de listados de automóviles
  carsContainer.innerHTML = "";

  // Muestra los automóviles filtrados
  for (const car of filteredCars) {
    carsContainer.insertAdjacentHTML(/* Código HTML para mostrar el automóvil */);
  }
});

// Llena los selectores con valores únicos de la lista de automóviles
function llenarSelectores() {
  const years = Array.from(new Set(cars.map((car) => car.year)));
  const brands = Array.from(new Set(cars.map((car) => car.brand)));
  const models = Array.from(new Set(cars.map((car) => car.model)));
  const states = Array.from(new Set(cars.map((car) => car.state)));

  // Llena los selectores
  llenarSelector(yearSelect, years);
  llenarSelector(brandSelect, brands);
  llenarSelector(modelSelect, models);
  llenarSelector(stateSelect, states);
}

function llenarSelector(selector, valores) {
  // Limpia el selector
  selector.innerHTML = "";

  // Agrega una opción "Todos"
  const optionTodos = document.createElement("option");
  optionTodos.value = "Todos";
  optionTodos.textContent = "Todos";
  selector.appendChild(optionTodos);

  // Llena el selector con los valores únicos
  for (const valor of valores) {
    const option = document.createElement("option");
    option.value = valor;
    option.textContent = valor;
    selector.appendChild(option);
  }
}

// Llama a la función para llenar los selectores
llenarSelectores();
