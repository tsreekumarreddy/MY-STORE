
    const products = [
        { id: 1, name: "Product 1",desc:"Description of the product", price: 25 },
        { id: 2, name: "Product 2",desc:"Description of the product", price: 45 },
        { id: 3, name: "Product 3",desc:"Description of the product", price: 30 },
      ];
      const cart = {};
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


      const showProducts = () => {
        let str = "<div class='row'>";
        products.map((value) => {
          str += `
          <div class="box">
            <h3>${value.name}</h3>
          <p>${value.desc}</p>
          <h4>${value.price}</h4>
          <button onclick=addToCart(${value.id})>Add to Cart</button>
         </div>
          `;
        });
        divProducts.innerHTML = str+"</div>";
      };