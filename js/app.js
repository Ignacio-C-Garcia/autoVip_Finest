// Mi código JavaScript:
const carsContainer = document.querySelector(".carsContainer");
const name = document.querySelector("h3");
fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
  .then(function (res) {
    return res.json();
  })
  .then(function (cars) {
    for (const car of cars) {
        
    carsContainer.insertAdjacentHTML(
      "beforeend",
      ` <div class="row mb-3">
    <div class="col-12 col-lg-4">
      <div class="position-relative">
        <span class="badge bg-warning position-absolute mt-3 mx-3"
          >New</span
        >
        <img
          src="${car.image}"
          class="img-thumbnail"
          alt="..."
        />
      </div>
    </div>
    <div class="col-12 col-lg-8 pb-5">
      <div class="d-flex justify-content-between">
        <h3>${car.brand} ${car.model}</h3>
        <span
          >${car.year} | USD ${car.price_usd} | <i class="bi bi-star-fill"></i
          ><i class="bi bi-star-fill"></i
          ><i class="bi bi-star-fill"></i><i class="bi bi-star"></i
          ><i class="bi bi-star"></i>
        </span>
      </div>
      <p class="description-cars">
        ${car.description}}
      </p>
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
  
