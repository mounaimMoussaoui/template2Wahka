//added click for show the content cart shopping
let cart = document.querySelector("header .container div:last-of-type a.shopping-cart");
cart.addEventListener("click", function () {
    cart.children[1].classList.toggle("show");
});
//close function of popUp
function closePopUp(ele) {
    ele.children[1].children[1].addEventListener("click", function () {
        ele.classList.remove("show");
    });
}

//function to test existed product
function testIsExistProd(idProd) {
    let listIdProdInCart = document.querySelectorAll(
        "header .container div:last-of-type a.shopping-cart > div.content-cart-items > div.prod-box"
    );
    for (let el of [...listIdProdInCart]) {
        if (idProd == el.getAttribute("id")) {
            return true;
        }
    }
    return false;
}

//creating element in cart
// variable prod is the element that's user choice for adding a cart
// we clone this element and set an id before adding to cart
function createELement(prod, cartIcon) {
    let cartContent = document.querySelector("header .container div:last-of-type a.shopping-cart > div.content-cart-items");
    let textCart = document.querySelector("header .container div:last-of-type a.shopping-cart > div.content-cart-items > span.msg");
    let itemClone = prod.cloneNode(true);
    //hide the  message the cart
    textCart.style.display = "none";

    //added id in the item
    itemClone.setAttribute("id", `${itemClone.children[0].textContent}`);

    let existPrd = testIsExistProd(itemClone.getAttribute("id"));

    //test if this id the product exist in th cart box
    if (existPrd) {
        let cont = document.querySelector(`header .container div:last-of-type > a.shopping-cart > .content-cart-items > #${itemClone.getAttribute("id")} span.cont`);
        cont.textContent = `${parseInt(cont.textContent) + 1}`;
    } else {
        let span = document.createElement("span");
        span.className = "cont";
        span.append(document.createTextNode("1"));
        itemClone.children[0].textContent = `${itemClone.children[0].textContent} * `;
        itemClone.children[0].append(span);
        itemClone.children[1].textContent = `${4} $`;
        cartContent.append(itemClone);
        cartIcon.setAttribute("data-nbr", `${parseInt(cartIcon.getAttribute("data-nbr")) + 1}`);
    }
    cartIcon.children[1].classList.add("show");
}

// added product to shopping cart
function addToCart(ele, prod) {
    let cartIcon = document.querySelector("header .container div:last-of-type a.shopping-cart");

    //this is if click to btn to add to cart
    ele.children[1].children[0].addEventListener("click", function (e) {
            createELement(prod, cartIcon);
            //after to added product to cart move to top for set that a cart
            scrollTo({ top: 0, behavior: "smooth" });
            ele.classList.remove("show");
            cartIcon.classList.add("show");
        }, { once: true }
        );
}

//added a function to showing the pop up
let listCart = document.querySelectorAll("section .container .content.prodact .prod-box a.cart");
listCart.forEach((btn) => {
    btn.addEventListener("click", function () {
        let popUp = document.querySelector("section .container #popUp");
        popUp.classList.add("show");
        closePopUp(popUp);
        addToCart(popUp, btn.parentElement);
    });
});

//set slider in the footer
//get all scroll height value
let scrollHeight = document.documentElement.scrollHeight;

//get scroll client height value the the visible parts
let clientHeight = document.documentElement.clientHeight;

//get value the scroll Y value
let heightScroll = scrollHeight - clientHeight;

onscroll = function () {
    //get scroll Top value
    let topScl = document.documentElement.scrollTop;
    //calc the value with percentage
    let valHeight = (topScl / heightScroll) * 100;
    document.body.style.setProperty("--width-slider", `${valHeight}%`);
};
