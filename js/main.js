// Array to hold cart items
let cartItems = [];

// Function to toggle Add/Remove from Cart
function toggleCart(productName, productImage, button) {
    const product = cartItems.find(item => item.name === productName);

    if (product) {
        product.count++;
        updateCartItemCount(productName, product.count);
    } else {
        addToCart(productName, productImage, button);
    }

    updateCartTotal(1);
}

// Function to add an item to the cart
function addToCart(productName, productImage, button) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    const img = document.createElement('img');
    img.src = productImage;
    img.alt = productName;

    const name = document.createElement('span');
    name.textContent = productName;

    const count = document.createElement('span');
    count.className = 'item-count';
    count.textContent = ' x1';
    count.style.marginLeft = '10px';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.style.marginLeft = '20px';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', () => {
        removeFromCart(productName);
    });

    cartItem.appendChild(img);
    cartItem.appendChild(name);
    cartItem.appendChild(count);
    cartItem.appendChild(deleteBtn);

    document.getElementById('cart-items').appendChild(cartItem);

    cartItems.push({ name: productName, image: productImage, count: 1 });
}

function updateCartItemCount(productName, count) {
    const cartItemsDOM = document.querySelectorAll('.cart-item');
    cartItemsDOM.forEach(item => {
        if (item.querySelector('span').textContent === productName) {
            item.querySelector('.item-count').textContent = ` x${count}`;
        }
    });
}

function removeFromCart(productName) {
    const productIndex = cartItems.findIndex(item => item.name === productName);

    if (productIndex > -1) {
        const product = cartItems[productIndex];
        if (product.count > 1) {
            product.count--;
            updateCartItemCount(productName, product.count);
            updateCartTotal(-1);
        } else {
            cartItems.splice(productIndex, 1);
            document.querySelectorAll('.cart-item').forEach(item => {
                if (item.querySelector('span').textContent === productName) {
                    item.remove();
                }
            });
            updateCartTotal(-1);
        }
    }
}

function updateCartTotal(change) {
    const totalElement = document.getElementById('cart-total');
    const currentTotal = parseInt(totalElement.textContent.replace('Total Items: ', ''));
    const newTotal = currentTotal + change;
    totalElement.textContent = `Total Items: ${newTotal}`;
}

// Checkout Functionality
function checkout() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Store cart data in localStorage
    localStorage.setItem('cartData', JSON.stringify(cartItems));

    // Thank the user
    alert("Thank you for shopping with us!");

    // Clear the cart
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('cart-total').textContent = 'Total Items: 0';
    cartItems = [];
}

// Add event listener to checkout button
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Add button event listeners in the product container
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.parentElement;
        const productName = productCard.querySelector('h3').textContent;
        const productImage = productCard.querySelector('img').src;

        toggleCart(productName, productImage, button);
    });
});
