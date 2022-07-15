const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

let shirtInfo


bar.addEventListener('click', ()=>{
  nav.classList.toggle('active')
});
close.addEventListener('click', ()=>{
  nav.classList.remove('active')
})

// // const mainImg = document.getElementById('mainimg');
// // const smallImg = document.getElementsByClassName('small-img');

// // smallImg[0].onclick = function(){
// //   mainImg.src = smallImg[0].src;
// // }
// // smallImg[1].onclick = function(){
// //   mainImg.src = smallImg[1].src;
// // }
// // smallImg[2].onclick = function(){
// //   mainImg.src = smallImg[2].src;
// // }
// // smallImg[3].onclick = function(){
// //   mainImg.src = smallImg[3].src;
// // }


//prodSess.append(items());
//fetch funtion
const prodSess = document.getElementById('flex')
  fetch("prod.json")
  .then(res => res.json())
  .then(json => {
    [json].map(data => {
        shirtInfo = data.items;

      data.items.map(shirts =>{

        prodSess.append(items(shirts));

      });
    });
  });

  function items({name,make,price,img, id}){
    let product = document.createElement('div');
    prodSess.innerHTML += `
      <div id="product1" class="pro">
        <img src="${img.url}" alt="">
        <div class="des">
          <span>${make}</span>
          <h5>${name}</h5>
          <div class="star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <h4>
            ${price}
          </h4>
        </div>
        <a
        ><i class="fa-solid fa-cart-arrow-down cart" onclick="addToCart(${id})" ></i></a>
      </div>
      `;
      return product;
    }


    const prodSess2 = document.getElementById('flex2')
  fetch("prod.json")
  .then(response => response.json())
  .then (json =>{
    [json].map(data2 =>{

      shirtInfo =  shirtInfo.concat(data2.items2) ;
      console.log(shirtInfo);


      data2.items2.map(shirts2 =>{
        prodSess2.append(items2(shirts2))
      });
    });
  });
  function items2({name,make,price,img,id}){
    let product2 = document.createElement('div');
    prodSess2.innerHTML += `
    <div class="pro" >
        <img src="${img.url}" alt="">
        <div class="des">
          <span>${make}</span>
          <h5>${name}</h5>
          <div class="star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <h4>
            ${price}
          </h4>
        </div>
        <a><i onclick="addToCart(${id})" class="fa-solid fa-cart-arrow-down cart" ></i></a>
      </div>
    `;
    return product2;
  }





//ADD TO CART
function addToCart(id){
  console.log(id);
  console.log(shirtInfo);
 const stuff =  shirtInfo.filter((shirts) => shirts.id == id)
 console.log(stuff);
 const newStuff = {
        "id": stuff[0].id,
        "name": stuff[0].name,
        "make": stuff[0].make,
        "price": stuff[0].price,
        "img": stuff[0].img.url,
        "quantity": 1
      }
const OldCart = JSON.parse(window.localStorage.getItem("cartItem")) ? JSON.parse(window.localStorage.getItem("cartItem")) : [];
const NewCart = OldCart.concat(newStuff)
window.localStorage.setItem("cartItem", JSON.stringify(NewCart) )
}

var data = JSON.parse(window.localStorage.getItem('cartItem'))

function remove(id2){
  const newData = data.filter(function(item, id){
   return (id !==id2);
  })
  window.localStorage.setItem("cartItem", JSON.stringify(newData))
   data = JSON.parse(window.localStorage.getItem('cartItem'))
     cart();

// console.log(data);

}
function updateQuantity(value, id) {
  let datas = JSON.parse(window.localStorage.getItem("cartItem"))
  console.log(datas)
  let itemUp = datas.findIndex(itemss => itemss.id == id)
  console.log(itemUp)
  datas[itemUp].quantity = value
  console.log(datas);
   window.localStorage.setItem("cartItem", JSON.stringify(datas))
    data = JSON.parse(window.localStorage.getItem('cartItem'))
    cart()




}
function cart(){
  cartTotal()
  console.log(data);
  const cartTable = document.getElementById('tablee');
let cartTab = "";
  data.map((carts, id) =>{
    cartTab +=`
    <tr>
          <td><a onclick="remove(${id})" href="#"><i class="fa-solid fa-circle-xmark Remove"></i></a></td>
          <td><img src="${carts.img}" alt=""></td>
          <td>${carts.name}</td>
          <td>#${carts.price}</td>
          <td><input type="number" value="${carts.quantity}" onchange="updateQuantity(this.value, ${carts.id})"></td>
          <td>#${carts.price * carts.quantity}</td>
        </tr>
    `;
    cartTable.innerHTML = cartTab;

  })
}

function cartTotal() {
  let totatDom =document.getElementById("total");
  let subTotalDom = document.getElementById("subTotal")

  let total = parseInt(data.reduce((acc , current) => acc + (current.price * current.quantity), 0))
  console.log(total);

  totatDom.innerHTML = "#"+total
  subTotalDom.innerHTML = "#"+total


}