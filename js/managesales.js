// Product array to manage products
let productList = [];

// Get references to form elements
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productQuantityInput = document.getElementById("productQuantity");
const createBtn = document.getElementById("createBtn");
const updateBtn = document.getElementById("updateBtn");
const productListContainer = document.getElementById("product-list");

// Variable to track the product being updated
let productToEdit = null;

// Function to render the product list
function renderProductList() {
    productListContainer.innerHTML = ""; // Clear the list

    productList.forEach((product, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${product.name} - $${product.price} x${product.quantity}`;

        // Add Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.style.marginLeft = "10px";
        editButton.addEventListener("click", () => {
            editProduct(index);
        });

        // Add Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.addEventListener("click", () => {
            deleteProduct(index);
        });

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        productListContainer.appendChild(listItem);
    });
}

// Function to handle creating a product
function createProduct(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const name = productNameInput.value.trim();
    const price = parseFloat(productPriceInput.value);
    const quantity = parseInt(productQuantityInput.value);

    // Validate inputs
    if (!name || isNaN(price) || isNaN(quantity)) {
        alert("Please provide valid inputs.");
        return;
    }

    // Add new product to the list
    productList.push({ name, price, quantity });
    renderProductList();

    // Clear form inputs
    productNameInput.value = "";
    productPriceInput.value = "";
    productQuantityInput.value = "";
}

// Function to handle editing a product
function editProduct(index) {
    // Get the selected product
    const product = productList[index];
    productToEdit = index; // Track the product being edited

    // Prefill form with product data
    productNameInput.value = product.name;
    productPriceInput.value = product.price;
    productQuantityInput.value = product.quantity;

    // Show Update button and hide Create button
    createBtn.style.display = "none";
    updateBtn.style.display = "inline-block";
}

// Function to handle updating a product
function updateProduct(event) {
    event.preventDefault(); // Prevent form submission

    if (productToEdit === null) return;

    // Get updated values from the form
    const updatedName = productNameInput.value.trim();
    const updatedPrice = parseFloat(productPriceInput.value);
    const updatedQuantity = parseInt(productQuantityInput.value);

    // Validate inputs
    if (!updatedName || isNaN(updatedPrice) || isNaN(updatedQuantity)) {
        alert("Please provide valid inputs.");
        return;
    }

    // Update the product in the array
    productList[productToEdit] = {
        name: updatedName,
        price: updatedPrice,
        quantity: updatedQuantity,
    };

    // Reset form and buttons
    productToEdit = null;
    createBtn.style.display = "inline-block";
    updateBtn.style.display = "none";

    // Clear form inputs
    productNameInput.value = "";
    productPriceInput.value = "";
    productQuantityInput.value = "";

    // Re-render the product list
    renderProductList();
}

// Function to handle deleting a product
function deleteProduct(index) {
    productList.splice(index, 1); // Remove the product
    renderProductList(); // Re-render the product list
}

// Add event listeners to the buttons
createBtn.addEventListener("click", createProduct);
updateBtn.addEventListener("click", updateProduct);

// Initial render
renderProductList();
