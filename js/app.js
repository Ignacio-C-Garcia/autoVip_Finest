// ejecutar funcion cargar automoviles
cargarAutomoviles("https://ha-front-api-proyecto-final.vercel.app/cars");
// ejecutar funcion cargar años
cargarAños(1900, 2023);
// ejecutar funcion cargar marcas
cargarMarcasyModelos();

/*
 * cargarAutomoviles - Extrae informacion de la API para crear "carItems" e insertarlos en #CarContainer
 * @param{apiURL} - url de la api para extraer informacion
 */
function cargarAutomoviles(apiURL) {
  fetch(apiURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (cars) {
      const carsContainer = document.querySelector("#carsContainer");
      carsContainer.innerHTML = "";
      for (const car of cars) {
        car.isNew = car.status
          ? `<span class="badge bg-warning position-absolute mt-3 mx-3">New</span>`
          : "";
        car.stars = ``;
        for (let i = 0; i < car.rating; i++) {
          car.stars += `<i class=" text-warning stars bi bi-star-fill "></i>`;
        }
        for (let i = car.rating; i < 5; i++) {
          car.stars += `<i class=" text-warning stars bi bi-star  d"></i>`;
        }
        car.price_usd = new Intl.NumberFormat("es").format(car.price_usd);
        carsContainer.insertAdjacentHTML(
          "beforeend",
          `<div id="carItem">
          <div class="row mb-3">
            <div class="col-12 col-lg-4">
              <div class="position-relative h-100">
                ${car.isNew}
                <img src="${car.image}" class="img-fluid rounded-2" alt="${car.brand} ${car.model}">
              </div>
            </div>
            <div class="col-12 col-lg-8 pb-1 d-flex flex-column justify-content-between">
              <div><div class="d-flex justify-content-between ">
              <h3>${car.brand} ${car.model}</h3>
              <span>${car.year} | USD ${car.price_usd} | ${car.stars}
              </span>
            </div>
            <p class="description-cars">${car.description}</p></div>
              <div class= "d-flex wrap ">
              <button type="button" class="m-1 btnShop btn btn-success">
              <i class="bi bi-cart-check "></i> Comprar
            </button>
            <button type="button" class="m-1 btn btn-outline-secondary">
              <i class="bi bi-plus-circle"></i> Mas Informacion
            </button>
            <button type="button" class="m-1 btn btn-outline-secondary">
              <i class="bi bi-share"></i> Compartir
            </button></div>
            </div>
          </div>
          </div>
         <hr>`
        );
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

/*
 * cargarAños - Inserta dentro del Select con id="year" Options con todos los años entre param{desde} y param{hasta}
 * @param{desde} - Numero que representa un año
 * @param {hasta} - Numero que representa un año posterior a param{desde}
 */
function cargarAños(desde, hasta) {
  if (desde > hasta) {
    return;
  }

  const selectYear = document.querySelector("#year");
  for (let year = hasta; year >= desde; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    selectYear.appendChild(option);
    //  insertToSelector(selectYear, [year])
  }
}

/*
 * cargarMarcasyModelos - Extrae informacion de la API para crear e insertar Options dentro del Select con id="brand" y
 * extrae informacion de la API dependiendo el brand que el usuario elija para crear Options dentro del select con id="model"
 */
function cargarMarcasyModelos() {
  fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
    .then(function (res) {
      return res.json();
    })
    .then(function (brands) {
      const selectBrand = document.querySelector("#brand");
      const selectModel = document.querySelector("#model");

      insertToSelector(selectBrand, brands);
      selectBrand.addEventListener("change", (e) => {
        fetch(
          `https://ha-front-api-proyecto-final.vercel.app/models?brand=${e.target.value}`
        )
          .then((res) => res.json())
          .then((models) => {
            insertToSelector(selectModel, models);
          });
      });
    })
    .catch(function (err) {
      console.error(err);
    });
}

/*
 * insertToSelector - Elimina todas las option de un Selector (menos la primera), luego crea e inserta nuevas option con los datos ingresados en la lista
 * @param{selector} - Objeto que hace referencia a una etiqueta select del HTML
 * @param{optionList} - Array de strings
 */
function insertToSelector(selector, optionList) {
  let firstOption = selector.firstElementChild;
  selector.innerHTML = "";
  selector.appendChild(firstOption);
  for (const option of optionList) {
    const newOption = document.createElement("option");
    newOption.value = option;
    newOption.text = option;
    selector.appendChild(newOption);
  }
}

const filtrar = document.querySelector("#buttonFiltrer");
filtrar.addEventListener("click", function (filtrar) {
  const year = document.querySelector("#year").value;
  const brand = document.querySelector("#brand").value;
  const model = document.querySelector("#model").value;
  const state = document.querySelector("#state").value;
  cargarAutomoviles(
    `https://ha-front-api-proyecto-final.vercel.app/cars?year=${year}&brand=${brand}&model=${model}&status=${state}`
  );
});

const temaOscuro = () => {
  document.querySelector("body").setAttribute("data-bs-theme", "dark");
  document.querySelector("#moon").setAttribute("class", "bi bi-sun-fill");
};

const temaClaro = () => {
  document.querySelector("body").setAttribute("data-bs-theme", "light");
  document.querySelector("#moon").setAttribute("class", "text-light bi bi-moon");
};

const cambiarTema = () => {
  document.querySelector("body").getAttribute("data-bs-theme") === "light"
    ? temaOscuro()
    : temaClaro();
};
