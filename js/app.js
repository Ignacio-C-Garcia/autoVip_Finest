const filtrar = document.querySelector("#buttonFiltrer");
const carsContainer = document.querySelector("#carsContainer");

cargarAutomoviles("https://ha-front-api-proyecto-final.vercel.app/cars");

cargarAños(1900, 2023);

cargarMarcasyModelos();

filtrar.addEventListener("click", function () {
  const year = document.querySelector("#year");
  const brand = document.querySelector("#brand");
  const model = document.querySelector("#model");
  const state = document.querySelector("#state");
  cargarAutomoviles(
    `https://ha-front-api-proyecto-final.vercel.app/cars?year=${year.value}&brand=${brand.value}&model=${model.value}&status=${state.value}`
  );
});

/*
 * cargarAutomoviles - Extrae informacion de la API para crear "carItems" e insertarlos en #CarContainer
 * si no hay información devuelta por la API, inserta en #CarContainer una alerta de Bootstrap
 * @param{apiURL} - url de la api para extraer informacions
 */
function cargarAutomoviles(apiURL) {
  carsContainer.innerHTML = "";
  carsContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="d-flex justify-content-center aling-items-center h-100">
            <img src="img/loader/Spinner-1s-200px (2).svg" alt="" />
          </div>`
  );
  fetch(apiURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (cars) {
      carsContainer.innerHTML = "";
      if (cars.length === 0) {
        carsContainer.insertAdjacentHTML(
          "beforeend",
          `<div class="alert alert-warning" role="alert">
        No se encontraron resultados 
      </div>`
        );
      }
      for (const car of cars) {
        car.isNew = car.status
          ? `<span class="badge bg-warning position-absolute mt-3 mx-3">New</span>`
          : "";
        car.stars = ``;
        for (let i = 0; i < car.rating; i++) {
          car.stars += `<i class="text-warning bi bi-star-fill "></i>`;
        }
        for (let i = car.rating; i < 5; i++) {
          car.stars += `<i class="text-warning bi bi-star"></i>`;
        }
        car.price_usd = new Intl.NumberFormat("es").format(car.price_usd);
        carsContainer.insertAdjacentHTML(
          "beforeend",
          `<div id="carItem">
          <div class="row mb-3">
            <div class="col-12 col-lg-4">
              <div class="position-relative h-100">
                ${car.isNew}
                <img src="${car.image}" class="img-thumbnail" alt="${car.brand} ${car.model}">
              </div>
            </div>
            <div class="col-12 col-lg-8  d-flex flex-column justify-content-between">
              <div><div class="d-flex justify-content-between mt-2">
              <h3>${car.brand} ${car.model}</h3>
              <span >${car.year} | USD ${car.price_usd} | ${car.stars}
              </span>
            </div>
            <p class="description-cars">${car.description}</p>
            </div>
              <div class="btn-info">
              <button type="button" class="btn btn-success">
              <i class="bi bi-cart-check "></i> Comprar
            </button>
            <button type="button" class="btn btn-outline-secondary">
              <i class="bi bi-plus-circle"></i> Mas Informacion
            </button>
            <button type="button" class="btn btn-outline-secondary">
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
 * cargarAños - Inserta dentro del Select con id="year" Options con todos los años entre param{desde} y param{hasta} (Orden descendente)
 * @param{desde} - Numero que representa un año
 * @param{hasta} - Numero que representa un año posterior a param{desde}
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
 * cargarMarcasyModelos - Extrae informacion de la API para crear e insertar Options dentro del Select #brand y
 * extrae informacion de la API dependiendo el brand que el usuario elija para crear Options dentro del select #model"
 */
function cargarMarcasyModelos() {
  const selectBrand = document.querySelector("#brand");
  const selectModel = document.querySelector("#model");

  fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
    .then(function (res) {
      return res.json();
    })
    .then(function (brands) {
      insertToSelector(selectBrand, brands);
    })
    .catch(function (err) {
      console.error(err);
    });

  selectBrand.addEventListener("change", (e) => {
    fetch(
      `https://ha-front-api-proyecto-final.vercel.app/models?brand=${e.target.value}`
    )
      .then((res) => res.json())
      .then((models) => {
        insertToSelector(selectModel, models);
      });
  });
}

/*
 * insertToSelector - Elimina todas las option de un Selector (menos la primera), luego crea e inserta nuevas option con los datos de {optionList}
 * @param{selector} - Objeto que hace referencia a una etiqueta select del HTML
 * @param{optionList} - Array de strings
 */
function insertToSelector(selector, optionList) {
  selector.innerHTML = `<option value="">Seleccionar...</option>`;
  for (const option of optionList) {
    const newOption = document.createElement("option");
    newOption.value = option;
    newOption.text = option;
    selector.appendChild(newOption);
  }
}