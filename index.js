
    // const products = [
    //     { id: 1, name: "Product 1",desc:"Description of the product", price: 25 },
    //     { id: 2, name: "Product 2",desc:"Description of the product", price: 45 },
    //     { id: 3, name: "Product 3",desc:"Description of the product", price: 30 },
    //   ];
      let products=[];
      const cart = {};
      let users = [];
let user = {};
document.write("<div id=root></div>");
      const addToCart = (id) => {
        if (!cart[id]) {
          cart[id] = 1;
          showCart();
        }
      };
    //   const addToCart = (id) => {
    //     if (!cart[id]) {
    //       cart[id] = 1;
    //       console.log(cart);
    //       showCart();
    //     } else if (cart[id] >= 1) {
    //       increment(id);
    //     }
    //   };
      const increment = (id) => {
        cart[id] += 1;
        // console.log(cart)
        showCart();
      };
      const decrement = (id) => {
        cart[id] -= 1;
        cart[id]<1 && delete cart[id];
        // console.log(cart)
        showCart();
      };
      const showTotal=()=>{
        let total=products.reduce((sum,value)=>{
            if(cart[value.id]){
            return sum +value.price * cart[value.id];
            }
            return sum;
        },0);
        divTotal.innerHTML="Total Order Amount"+":"+total
       // divTotal.innerHTML=total;
      }
      let orders=[];

      const placeOrder=()=>{
        const obj={
          customer:"abc@gmail.com",
          orderValue:100,
          status:"pending",
        };
        orders.push(obj)
        console.log(orders)
      }

      const showCart = () => {
        let str = "";
        products.map((value) => {
          if (cart[value.id]) {
            str += `
            <li>${value.name}-$${value.price}-<button onclick="decrement(${
              value.id
            })">-</button>${cart[value.id]}<button onclick="increment(${
              value.id
            })">+</button>-${value.price * cart[value.id]}</li>
            <button onclick="placeOrder()">Place Order</button>
            `;
          }
        });
        divCart.innerHTML = str;
        let count=Object.keys(cart).length
        items.innerHTML=count
        showTotal();
      };


     const displayCart = () => {
        // divcartblock.style.display="block"
        divcartblock.style.left="70%"
     }
     const hideCart =()=>{
        // divcartblock.style.display="none"
        divcartblock.style.left="100%"
     }

     const showMain=()=>{
        let str=`
        <div class="container">
      <div class="header">
      <h1>${user.name}</h1>
      <div>
      <h4 onclick="displayCart()">CART:<span id="items"></span></h4>
      <div><button onclick="showLogin()">LogOut</button></div>
      </div>
          </div>
      <div class="productBlock">
      <div id="divProducts"></div>
      </div>
      <div id="divcartblock" class="cartBlock">
      <h3>My Cart</h3>
      <div id="divCart"></div>
      <div id="divTotal"></div>
      <button onclick="hideCart()">Close</button>
      </div>
      </div>
       <hr>
    <h4>@Copyright 2025.All rights reserved</h4>`;
      root.innerHTML=str;
      showProducts();
     }

     function showLogin() {
      let str = `
      <div class='login'>
          <h2>Login Form</h2>
          <div id='msg'></div>
          <p><input id="email" type="text"  placeholder="Enter Email"></p>
          <p><input id="password" type="password" placeholder="Enter Password"></p>
          <button onclick='chkUser()'>Log In</button>
          <p><button onclick='showForm()'>Create Account</button></p>
      </div>
      `;
      root.innerHTML = str;
    }

    function showForm() {
      let str = `
      <div class='register'>
      <h2>Registration Form</h2>
      <p><input type="text" id="name" placeholder="Name"></p>
      <p><input type="text" id="email" placeholder="Email"></p>
      <p><input type="password" id="password" placeholder="Password"></p>
      <p><input type="date" id="dob"></p>
      <p><button onclick='addUser()'>Submit</button></p>
      <p>Already a member?<button onclick='showLogin()'>Login Here</button></p>
      </div>
      `;
      root.innerHTML = str;
    }

    function chkUser() {
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
          // useremail = email;
          // username = users[i].name;
          // currBalance = users[i].balance;
          user = users[i];
          showMain();
          break;
        } else {
          msg.innerHTML = "Access Denied";
        }
      }
    }

    function addUser() {
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let dob = document.getElementById("dob").value;
      let user = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        balance: 0,
      };
      users.push(user);
      showLogin();
    }

    const showProducts = () => {
      fetch("products.json")
        .then((res) => res.json())
        .then((data) => (products = data))
        .then(() => {
          let str = "<div class='row'>";
          products.map((value) => {
            str += `
              <div class='box'>
              <h3>${value.name}</h3>
              <p>${value.desc}</p>
              <h4>$${value.price}</h4>
              <button onclick=addToCart(${value.id})>Add to Cart</button>
              </div>
              `;
          });
          divProducts.innerHTML = str + "</div>";
        });
    };