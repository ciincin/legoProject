//! RECUERDA !! Index 0 corresponde con id 1

let productList = [
  {
    id: 1,
    image: "assets/disney-sets/cabañaBlancanieves/cabaña-600x450.jpg",
    title: "Cabaña de Blancanieves y los Siete Enanitos",
    price: 219.99,
    emptyHeart: true,
    minAge: 18,
    pieces: 2228,
  },
  {
    id: 2,
    image: "assets/disney-sets/cars/cars-600x450.jpg",
    title: "Diversión en el Autolavado con Rayo McQueen y Mate",
    price: 34.99,
    emptyHeart: true,
    minAge: 2,
    pieces: 29,
  },
  {
    id: 3,
    image: "assets/disney-sets/frozen/frozen-600x450.jpg",
    title: "Palacio de Hielo de Elsa",
    price: 99.99,
    emptyHeart: true,
    minAge: 6,
    pieces: 630,
  },
  {
    id: 4,
    image: "assets/disney-sets/insideOut/insideOut-600x400.jpg",
    title: "Inside Out 2 Mood Cubes",
    price: 34.99,
    emptyHeart: true,
    minAge: 9,
    pieces: 394,
  },
  {
    id: 5,
    image: "assets/disney-sets/reyLeon/reyLeon-600x450.jpg",
    title: "El Rey León: Simba Cachorro",
    price: 19.99,
    emptyHeart: true,
    minAge: 6,
    pieces: 222,
  },
  {
    id: 6,
    image: "assets/disney-sets/sirenita/sirenita-600x450.jpg",
    title: "Mini Castillo de Disney Ariel",
    price: 39.99,
    emptyHeart: true,
    minAge: 12,
    pieces: 557,
  },
  {
    id: 7,
    image: "assets/disney-sets/stitch/stitch-600x450.jpg",
    title: "Stitch",
    price: 64.99,
    emptyHeart: true,
    minAge: 9,
    pieces: 730,
  },
  {
    id: 8,
    image: "assets/disney-sets/up/up-600x450.jpg",
    title: "Casa de Up",
    price: 54.99,
    emptyHeart: true,
    minAge: 9,
    pieces: 598,
  },
  {
    id: 9,
    image: "assets/disney-sets/wall-e/walle-600x450.jpg",
    title: "EVA y WALL•E",
    price: 14.99,
    emptyHeart: true,
    minAge: 10,
    pieces: 155,
  },
];

// la constante fullUrl almacena el valor de la referencia del .html
const fullUrl = window.location.href;

// Event listener que pinta en pantalla las cards (o el shoppingCart) dependiendo del href del html
window.addEventListener("DOMContentLoaded", () => {
  if (fullUrl === "/disney") {
    displayOnRefresh();
  } else if (fullUrl === "/index-cart") {
    //Cart website
    findProduct(getProductToLocalStorage()).forEach((item) => {
      cartContainer.innerHTML += modifiedTemplate(
        item.id,
        item.title,
        item.image,
        item.price,
        item.amount
      );
    });

    btnCode();
    // productCounter(0);
    sumPriceCart();
    shoppingCartEmpty(); // Esto funciona, solo hay que inicializarlo

    // Scroll del carrusel

    const carrouselWrapper = document.querySelector(".carrousel-wrapper");
    const scrollLeftButton = document.querySelector(".scroll-left-button");
    const scrollRightButton = document.querySelector(".scroll-right-button");

    function handleScrollLeft() {
      carrouselWrapper.scrollBy({
        left: -1080,
        behavior: "smooth",
      });
    }

    function handleScrollRight() {
      carrouselWrapper.scrollBy({
        left: 1080,
        behavior: "smooth",
      });
    }

    scrollLeftButton.addEventListener("click", handleScrollLeft);
    scrollRightButton.addEventListener("click", handleScrollRight);
  } else {
    // M A I N  W E B P A G E

    // Scroll del carrusel

    const carrouselWrapper = document.querySelector(".carrousel-wrapper");
    const scrollLeftButton = document.querySelector(".scroll-left-button");
    const scrollRightButton = document.querySelector(".scroll-right-button");

    function handleScrollLeft() {
      carrouselWrapper.scrollBy({
        left: -1080,
        behavior: "smooth",
      });
    }

    function handleScrollRight() {
      carrouselWrapper.scrollBy({
        left: 1080,
        behavior: "smooth",
      });
    }

    scrollLeftButton.addEventListener("click", handleScrollLeft);
    scrollRightButton.addEventListener("click", handleScrollRight);
  }

  //Funciones comunes a las tres páginas

  // white header buttons
  const buttonPrev = document.querySelector(".prev-slider");
  const buttonNext = document.querySelector(".next-slider");
  const sliderInner = document.querySelector(".slider-p-inner");
  let sliderHeaderIndex = 0;

  function updateSliderPosition() {
    const width = document.querySelector(".slider-p").clientWidth;
    sliderInner.style.transform = `translateX(${-sliderHeaderIndex * width}px)`;
  }

  function handlePrevClick() {
    if (sliderHeaderIndex > 0) {
      sliderHeaderIndex--;
      updateSliderPosition();
    }
  }

  function handleNextClick() {
    if (sliderHeaderIndex < sliderInner.children.length - 1) {
      sliderHeaderIndex++;
      updateSliderPosition();
    }
  }

  buttonPrev.addEventListener("click", handlePrevClick);
  buttonNext.addEventListener("click", handleNextClick);

  // Submenu (yellow header)
  const subMenu = document.querySelector(".sub-menu-buy");
  const buyButton = document.querySelector(".buy-button");
  const detailsElement = document.querySelector(".sub-menu-details");
  const exitButton = document.getElementById("button-exit");

  function handleToggle() {
    document.body.productList.add("active");

    if (detailsElement.hasAttribute("open")) {
      subMenu.style.width = "74.063rem"; // Ancho cuando está abierto
    } else {
      subMenu.style.width = "46.87rem";
    }
  }

  function handleSubMenu() {
    document.body.productList.add("active");
  }

  function handleExitClick() {
    document.body.style.position = 'static';
    subMenu.style.width = '49rem';
    subMenu.style.display = 'none';
  }

  function handleBuyClick() {
    subMenu.style.display = 'flex';
    document.body.style.position = 'fixed';
  }

  detailsElement.addEventListener("toggle", handleToggle);
  exitButton.addEventListener("click", handleExitClick);
  buyButton.addEventListener("click", handleBuyClick);
  subMenu.addEventListener("click", handleSubMenu);

  emptyHeartCheck();
  bagIconCounter();
});

// Funcion común
// Función para ver el amount de la bolsa en el navbar
function bagIconCounter() {
  const bagIcon = document.getElementById("bag-icon-amount");
  let totalAmount = 0;

  getProductToLocalStorage().forEach((item) => {
    totalAmount = totalAmount + item.amount;
  });

  bagIcon.textContent = `(${totalAmount})`;

  if (fullUrl === "/index-cart") {
    const myCart = document.getElementById("cart-product-amount");
    myCart.innerHTML = `Mi bolsa (${totalAmount})`;

    const valueProduct = document.getElementById("cart-value-product-amount");
    valueProduct.innerHTML = `Valor del pedido de (${totalAmount}) articulos`;
  }
}

// D I S N E Y  S E T S //
const disneyLayout = document.getElementById("disney-set-layout");

function disneySetsTemplate(id, title, image, price, age, pieces) {
  let disneyTemplateItem = `
  <div class="disney-card1">
                <div class="disney-card1-likeButton-banner">
                <button class="cart-heart-button" id="cart-btn-heart-${id}" onclick="addToTheWishList(${id})" title="Añadir a la lista de deseos">
              <i class="bi bi-heart" id="cart-icon-heart-${id}" ></i>
            </button>
                </div>
                <div class="disney-card1-imageSet-container">
                    <!-- aqui es donde va el carrousel -->
                    <img class="disney-card1-imageSet" src=${image}
                        alt=${title} />
                </div>
                <div class="disney-card1-infoSet-container">
                    <div class="disney-icon-container">
                        <img  class="disney-age-icon" src="assets/disney-sets/age-o.svg" alt="age-icon" title="edad mínima">
                    </div>
                    <div class="disney-textIcon-container" title="edad mínima">
                        <div class="disney-age-text">${age}+</div>
                    </div>
                    <div class="disney-icon-container">
                        <img  class="disney-age-icon" src="assets/disney-sets/brick-o.svg" alt="age-icon" title="cantidad de piezas">
                    </div>
                    <div class="disney-textIcon-container" title="cantidad de piezas">
                        <div class="disney-age-text">${pieces}</div>
                    </div>
                </div>
                <div class="disney-card1-titleSet-container">
                    <span>${title}</span>
                </div>
                <div class="disney-card1-priceSet-container">
                    <span><b>${price}</b><i class="bi bi-currency-euro"></i></span>
                </div>
                <div class="disney-card1-addToCart-container">
                    <button type="button" class="disney-btn-addToCart" onclick="addProductToLocalStorage(${id}), bagIconCounter()">
                        <div class="disney-card1-addToCart-innerContainer">
                            <div class="disney-bagIcon-container">
                                <img  class="disney-bag-icon" src="assets/disney-sets/shopping-bag-o.svg" alt="age-icon">
                            </div>
                            <span class="disney-btn-addToCart-text">Añadir a la Bolsa</span>
                        </div>
                    </button>
                </div>
            </div>`;
  return disneyTemplateItem;
}

function refreshWebpage(){
  location.href=location.href
}

function displayOnRefresh() {
  disneyLayout.innerHTML = "";
  productList.forEach((item) => {
    disneyLayout.innerHTML += disneySetsTemplate(
      item.id,
      item.title,
      item.image,
      item.price,
      item.minAge,
      item.pieces
    );
  });
}

//? FILTERS

const copiedListStringify = JSON.stringify(productList);
let copyList = JSON.parse(copiedListStringify);

class LegoFilter {
  constructor(htmlID, condition, active) {
    this.htmlID = htmlID;
    this.condition = condition;
    this.active = active;
  }
}

let filterList = [
  new LegoFilter(
    "filter-price0/20",
    (item) => 0 < item.price && item.price < 20,
    false
  ), //index 0, 1, 2, 3.
  new LegoFilter(
    "filter-price20/50",
    (item) => 20 < item.price && item.price < 50,
    false
  ),
  new LegoFilter(
    "filter-price50/100",
    (item) => 50 < item.price && item.price < 100,
    false
  ),
  new LegoFilter("filter-price100+", (item) => item.price > 100, false),
  new LegoFilter("filter-age2+", (item) => item.minAge >= 2, false), //index 4, 5, 6, 7, 8
  new LegoFilter("filter-age6+", (item) => item.minAge >= 6, false),
  new LegoFilter("filter-age9+", (item) => item.minAge >= 9, false),
  new LegoFilter("filter-age12+", (item) => item.minAge >= 12, false),
  new LegoFilter("filter-age18+", (item) => item.minAge >= 18, false),
  new LegoFilter(
    "filter-pieces0/99",
    (item) => 0 < item.pieces && item.pieces <= 99,
    false
  ), //index 9, 10, 11, 12, 13
  new LegoFilter(
    "filter-pieces100/249",
    (item) => 100 <= item.pieces && item.pieces <= 249,
    false
  ),
  new LegoFilter(
    "filter-pieces250/499",
    (item) => 250 <= item.pieces && item.pieces <= 499,
    false
  ),
  new LegoFilter(
    "filter-pieces500/999",
    (item) => 500 <= item.pieces && item.pieces <= 999,
    false
  ),
  new LegoFilter("filter-pieces1000+", (item) => item.pieces >= 1000, false),
];

function toggleFilter(filterName) {
  const filterToChange = filterList.find((f) => f.htmlID === filterName);
  filterToChange.active = !filterToChange.active;
  let listToDisplay = applyFilters(copyList);
  displayFilteredProducts(listToDisplay);
}

function sortListByPrice(event) {
  if (event.target.checked) {
    sortList((a, b) => a.price - b.price);
  }
}

function sortListByAge(event) {
  if (event.target.checked) {
    sortList((a, b) => a.minAge - b.minAge);
  }
}

function sortListByPieces(event) {
  if (event.target.checked) {
    sortList((a, b) => a.pieces - b.pieces);
  }
}

function sortList(sortCallback) {
  copyList.sort(sortCallback);
  const LISTADEDAVID = applyFilters(copyList);
  displayFilteredProducts(LISTADEDAVID);
}

function applyFilters(array) {
  // Step 1: Filter active filters
  const activePriceFilters = filterList.filter(
    (f, index) => f.active && index < 4
  );
  const activeAgeFilters = filterList.filter(
    (f, index) => f.active && index >= 4 && index < 9
  );
  const activePiecesFilters = filterList.filter(
    (f, index) => f.active && index >= 9
  );
  // Step 2: Concatenate callbacks with "OR" logic
  const somePrice = (item) => {
    if (activePriceFilters.length == 0) {
      return true;
    }

    return activePriceFilters.some((f) => f.condition(item));
  };

  function someAge(item) {
    if (activeAgeFilters.length == 0) {
      return true;
    }
    // 50/100 Y 100+
    // Se cumple al menos uno de tus filtros?

    //de la lista activeAgeFilters verifica que se cumpla "some" de las condiciones:
    return activeAgeFilters.some((f) => f.condition(item));
  }

  const somePieces = (item) => {
    if (activePiecesFilters.length == 0) {
      return true;
    }

    return activePiecesFilters.some((f) => f.condition(item));
  };

  // Step 3: Apply the combined filter to the list of items
  const filteredItems = array
    .filter(someAge)
    .filter(somePrice)
    .filter(somePieces);

  return filteredItems;
}

function displayFilteredProducts(array) {
  if (array.length == 0) {
    disneyLayout.innerHTML = "No se encontraron coincidencias y/o resultados";
  } else {
    disneyLayout.innerHTML = "";
    array.forEach((item) => {
      disneyLayout.innerHTML += disneySetsTemplate(
        item.id,
        item.title,
        item.image,
        item.price,
        item.minAge,
        item.pieces
      );
    });
  }
}

//C A R T

//contenedor donde se le agregan los productos del carrito de compra
const cartContainer = document.getElementById("cart-container");

function increaseAmount(productID) {
  const cartInputId = document.getElementById(`cart-input-${productID}`);
  const selectedString = localStorage.getItem(`index: ${productID - 1}`);
  const selectedObj = JSON.parse(selectedString);
  let accumulator = selectedObj.amount;

  accumulator++;

  localStorage.setItem(
    `index: ${productID - 1}`,
    JSON.stringify({
      id: productList[productID - 1].id,
      amount: accumulator,
    })
  );
  cartInputId.value = accumulator;
  // location.href = location.href;
}

function decreaseAmount(productID) {
  const cartInputId = document.getElementById(`cart-input-${productID}`);
  const decreaseBtn = document.getElementById(`button-decrease-${productID}`);
  const selectedString = localStorage.getItem(`index: ${productID - 1}`);
  const selectedObj = JSON.parse(selectedString);
  let accumulator = selectedObj.amount;

  if (accumulator > 1) {
    accumulator--;

    localStorage.setItem(
      `index: ${productID - 1}`,
      JSON.stringify({
        id: productList[productID - 1].id,
        amount: accumulator,
      })
    );

    cartInputId.value = accumulator;
  } else {
    decreaseBtn.attributes = "disabled";
  }
}

//heart button

// funcion que comprueba el estado de emptyHeart, se inicializa en el primer event listener.
function emptyHeartCheck() {
  checkEmptyHeartList = getProductToLocalStorage();
  checkEmptyHeartList.forEach((element) => {
    productList.forEach((item) => {
      if (element.id === item.id) {
        item.emptyHeart = element.emptyHeart;
        let heart = document.getElementById(`cart-icon-heart-${item.id}`);

        const wishList = document.getElementById(`add-wish-list-${item.id}`);
        if (element.emptyHeart === false) {
          heart.productList.replace("bi-heart", "bi-heart-fill");
          if (fullUrl === "/index-cart") {
            let heartCarrousel = document.getElementById(
              `cart-carrousel-icon-heart-${item.id}`
            );
            heartCarrousel.productList.replace("bi-heart", "bi-heart-fill");
            wishList.textContent = `Quitar de la lista de deseos`;
          }
        }
      }
    });
  });
}

// Nueva funcion de addToTheWishList -> hay que cambiar ambos templates reemplazar el this.id.
function addToTheWishList(productID) {
  const heart = document.getElementById(`cart-icon-heart-${productID}`);
  const heartCarrousel = document.getElementById(
    `cart-carrousel-icon-heart-${productID}`
  );
  const wishList = document.getElementById(`add-wish-list-${productID}`);

  const storedProduct = JSON.parse(
    localStorage.getItem(`index: ${productID - 1}`)
  );

  if (heart) {
    productList.forEach((obj) => {
      if (obj.id == productID) {
        if (obj.emptyHeart) {
          // fill the heart
          heart.productList.replace("bi-heart", "bi-heart-fill");
          if (fullUrl === "/index-cart") {
            wishList.textContent = `Quitar de la lista de deseos`;
            location.href = location.href;
          }
          if (storedProduct) {
            storedProduct.emptyHeart = false;
          }
          return (obj.emptyHeart = false);
        } else {
          // empty the heart
          heart.productList.replace("bi-heart-fill", "bi-heart");
          if (fullUrl === "/index-cart") {
            wishList.textContent = `Añadir a la lista de deseos`;
            location.href = location.href;
          }
          if (storedProduct) {
            storedProduct.emptyHeart = true;
          }
          return (obj.emptyHeart = true);
        }
      }
    });
  } else if (heartCarrousel) {
    productList.forEach((obj) => {
      if (obj.id == productID) {
        if (obj.emptyHeart) {
          // fill the heart
          heartCarrousel.productList.replace("bi-heart", "bi-heart-fill");
          obj.emptyHeart = false;
          if (storedProduct) {
            storedProduct.emptyHeart = false;
            obj.emptyHeart = false;
          }
        } else {
          // empty the heart
          heartCarrousel.productList.replace("bi-heart-fill", "bi-heart");
          obj.emptyHeart = true;
          if (storedProduct) {
            storedProduct.emptyHeart = true;
            obj.emptyHeart = true;
          }
        }
      }
    });
    location.href = location.href;
  }

  if (storedProduct) {
    localStorage.setItem(
      `index: ${productID - 1}`,
      JSON.stringify({
        id: productList[productID - 1].id,
        amount: storedProduct.amount,
        emptyHeart: productList[productID - 1].emptyHeart,
      })
    );
  } else {
    localStorage.setItem(
      `index: ${productID - 1}`,
      JSON.stringify({
        id: productList[productID - 1].id,
        amount: 0,
        emptyHeart: productList[productID - 1].emptyHeart,
      })
    );
  }
}

//promo code button
function btnCode() {
  const btnPromo = document.getElementById("cart-promo-button");
  const iconArrow = document.getElementById("cart-icon");
  const promoBox = document.getElementById("cart-promo-open");

  let promoBoxIsClosed = true;

  btnPromo.addEventListener("click", () => {
    promoBox.productList.toggle("cart-display-none");

    if (promoBoxIsClosed) {
      iconArrow.productList.replace("rotate-down", "rotate-up");
      promoBoxIsClosed = false;
    } else {
      iconArrow.productList.replace("rotate-up", "rotate-down");
      promoBoxIsClosed = true;
    }
  });
}
//Esto es una prueba para añadir los articulos al carrito

// función que será inicializada a través de la propiedad "onclick" del tag <button>
// cada botón tendrá el "id" del objeto "catalogo"
function addProductToLocalStorage(productID) {
  let accumulator = 0;

  const storedProduct = JSON.parse(
    localStorage.getItem(`index: ${productID - 1}`)
  );
  if (storedProduct) {
    accumulator = storedProduct.amount;
  }
  accumulator++;

  localStorage.setItem(
    `index: ${productID - 1}`,
    JSON.stringify({
      id: productList[productID - 1].id,
      amount: accumulator,
      emptyHeart: productList[productID - 1].emptyHeart,
    })
  );
  if (fullUrl === "/index-cart") {
    location.href = location.href;
  }
}

// inicializamos la función para testear como funcionaría en los respectivos botones.;

//función que se encarga de recoger la información del "localstorage" y la devuelve dentro de una lista nueva
function getProductToLocalStorage() {
  let cartArray = [];

  for (let i = 0; i < productList.length; i++) {
    let jsonItem = localStorage.getItem(`index: ${i}`);

    if (jsonItem !== null) {
      jsonItem = localStorage.getItem(`index: ${i}`);

      let itemObj = JSON.parse(jsonItem);

      cartArray.push(itemObj);
    }
  }

  return cartArray;
}

// console.log(getProductToLocalStorage());

function shoppingCartEmpty() {
  const cartFullContainer = document.getElementById("cart-full-container");
  const cartEmptyContainer = document.getElementById("cart-empty-cart");

  if (getProductToLocalStorage().length == 0) {
    cartFullContainer.productList.toggle("cart-display-none");
  } else {
    cartEmptyContainer.productList.toggle("cart-display-none");
  }
}

// esta funcion se encarga de buscar del catalogo las cosas que esten en el get del localstorage
function findProduct(cartArray) {
  const productsInCart = [];
  cartArray.forEach((shoppingProduct) => {
    // console.log("shopping product", shoppingProduct);
    productList.forEach((item) => {
      if (shoppingProduct.id === item.id) {
        // console.log("product found in catalog", shoppingProduct.id);
        productsInCart.push({ ...item, amount: shoppingProduct.amount });
      }
    });
  });
  return productsInCart;
}

// Add new items to cart

function modifiedTemplate(id, title, image, price, amount) {
  let templateItem = `
  <div class="cart-article-fex">
    <div class="cart-img-container">
        <img
            alt=${title}
            src= ${image}
        />
    </div>

    <div class="cart-information-container">
        <div class="cart-name">
            <h3><span href="#">${title}</span></h3>
        </div>

        <div class="cart-margin"></div>

        <div class="cart-price-add" id="cart-container-article-${id}">
            <div class="cart-uds-price-container">
                <div class="cart-uds" id="cart-uds-${id}">Uds. ${amount}</div>
                <div class="cart-price">${price} €</div>
            </div>
            <div class="cart-add-more">
                <div class="cart-add-more-content" id="cart-article-display-${id}">
                    <button
                        class="cart-rest-article"
                        id="button-decrease-${id}"
                        onclick="decreaseAmount(${id}), sumPriceCart(), productCounter(${id}), bagIconCounter()" >
                        <i class="bi bi-dash-lg"></i>
                    </button>

                    <div class="cart-number-articles">
                        <input
                            type="text"
                            value="${amount}"
                            min="1"
                            id="cart-input-${id}"
                        />
                    </div>

                    <button
                        class="cart-add-article"
                        id="button-increase-${id}"
                        onclick="increaseAmount(${id}), sumPriceCart(),  productCounter(${id}), bagIconCounter()">

                        <i class="bi bi-plus-lg"></i>
                    </button>
                </div>
            </div>
            <article class="cart-wish-list">
                <div class="cart-wish-list-container">
                    <div class="cart-heart-button-container" >
                        <button class="cart-heart-button" id="cart-btn-heart-${id}" onclick="addToTheWishList(${id})">
                            <i class="bi-heart" id="cart-icon-heart-${id}" ></i>
                        </button>
                    </div>

                    <div class="cart-wish-list-text" id="add-wish-list-${id}">
                        Añadir a la lista de deseos
                    </div>
                </div>
                <div class="cart-trash">
                  <button class="cart-trash-button" onclick="deleteArticles(${id}), bagIconCounter()">
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>

            </article>
           
            <div class="cart-trash-mq">
                <button class="cart-trash-button-mq" onclick="deleteArticles(${id})">
                    <i class="bi bi-trash3"></i>
                </button>

                <button class="cart-edit-button" id="cart-edit-btn-${id}" onclick="editButtonQuery(${id})">
                    <span class="cart-text-edit" id="cart-btn-text-${id}">(Editar)</span>
                </button>
            </div>

        </div>
    </div>
    </div>
  `;
  return templateItem;
}

//Función para desplegar el boton Edit y poder añadir más contenido a la bolsa

function editButtonQuery(productID) {
  const displayArticle = document.getElementById(
    `cart-article-display-${productID}`
  );
  const containerArticle = document.getElementById(
    `cart-container-article-${productID}`
  );
  const textBtn = document.getElementById(`cart-btn-text-${productID}`);
  const isDisplayed = displayArticle.productList.contains("cart-display-flex");

  if (isDisplayed) {
    displayArticle.productList.remove("cart-display-flex");
    containerArticle.productList.remove("cart-display-flex-wrap");
    textBtn.innerHTML = "(Editar)";
  } else {
    displayArticle.productList.add("cart-display-flex");
    //  console.log(displayArticle.className=== "cart-add-more-content cart-display-flex")
    if (
      displayArticle.className === "cart-add-more-content cart-display-flex" &&
      window.innerWidth < 900
    ) {
      // displayArticle.className ="cart-add-more-content cart-display-flex";
      containerArticle.productList.add("cart-display-flex-wrap");
      displayArticle.productList.add("cart-display-flex");
      textBtn.innerHTML = "Listo";
    }
  }
}

//sum the total price of the cart

function sumPriceCart() {
  let subtotal = document.getElementById("cart-sum-total-price");
  let totalPrice = document.getElementById("cart-total-price");
  let iva = document.getElementById("cart-IVA");
  let paypal = document.getElementById("paypal-3-payments");
  let totalPriceFix = document.getElementById("cart-total-price-fix");
  let ivaFix = document.getElementById("cart-IVA-fix");

  let localStorageProduct = getProductToLocalStorage();

  let productTotalPrice = 0;
  productList.forEach((priceItem) => {
    localStorageProduct.forEach((idItem) => {
      if (priceItem.id == idItem.id) {
        let productPrice = priceItem.price;
        let productAmount = idItem.amount;

        let multiplyAmountbyPrice = productAmount * productPrice;

        productTotalPrice = multiplyAmountbyPrice + productTotalPrice;
        subtotal.textContent = `${productTotalPrice.toFixed(2)} €`;

        totalPrice.textContent = `${productTotalPrice.toFixed(2)} €`;
        totalPriceFix.textContent = `${productTotalPrice.toFixed(2)} €`;

        const ivaTotal = productTotalPrice * 0.21;
        iva.textContent = `IVA ${ivaTotal.toFixed(2)} €`;
        ivaFix.textContent = `IVA ${ivaTotal.toFixed(2)} €`;

        const paypalPayments = productTotalPrice / 3;
        paypal.textContent = `${paypalPayments.toFixed(2)} €`;
      }
    });
  });
}

// función para poner el numero de articulos del carrito

function productCounter(productID) {
  const udsProduct = document.getElementById(`cart-uds-${productID}`);
  let totalAmount = 0;

  getProductToLocalStorage().forEach((item) => {
    totalAmount = totalAmount + item.amount;
    udsProduct.innerHTML = `Uds. ${item.amount}`;
  });

  const myCart = document.getElementById("cart-product-amount");
  myCart.innerHTML = `Mi bolsa (${totalAmount})`;

  const valueProduct = document.getElementById("cart-value-product-amount");
  valueProduct.innerHTML = `Valor del pedido de (${totalAmount}) articulos`;
}

// Función para eliminar articulos

function deleteArticles(id) {
  localStorage.removeItem(`index: ${id - 1}`);
  location.href = location.href;
}
