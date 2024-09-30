let productContainer = document.getElementById('product-container');
        const categoryLinks = document.querySelectorAll('.nav a');
        const feedbackForm = document.getElementById('feedback-form');
        let products = [];
    
        function fetchProducts() {
            const url = 'https://fakestoreapi.com/products';
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    products = data; 
                    displayProducts(products); 
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                    productContainer.innerHTML = '<p>Failed to load products. Please try again later.</p>';
                });
        }
        function displayProducts(productsToDisplay) {
    productContainer.innerHTML = '';
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            <button onclick="addToCart('${product.title}', ${product.price}, '${product.description}', '${product.image}')">Add to Cart</button>
            <button onclick="openOrderModal('${product.title}', ${product.price})">Order Now</button>
        `;
        productContainer.appendChild(productCard);
    });
}


        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    
        function filterProducts(category) {
            let filteredProducts = [];
            if (category === 'men') {
                filteredProducts = products.filter(product => product.category === "men's clothing");
            } else if (category === 'women') {
                filteredProducts = products.filter(product => product.category === "women's clothing");
            } else if (category === 'gadgets') {
                filteredProducts = products.filter(product => product.category === "electronics");
            } else {
                filteredProducts = products; 
            }
            displayProducts(filteredProducts);
        }
    
        function categoryClicked(category) {
            if (category === 'service') {
                feedbackForm.style.display = 'block'; 
                productContainer.innerHTML = ''; 
            } else {
                feedbackForm.style.display = 'none'; 
                if (category === 'all') {
                    shuffleArray(products); 
                }
                filterProducts(category); 
            }
        }
        let cart = [];

        function addToCart(product, price, description, image) {
    cart.push({ product, price, description, image });
    alert(`${product} has been added to your cart!`);
}

    function toggleCartModal() {
        const cartModal = document.getElementById('cart-modal');
        cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<img src="${item.image}" alt="${item.product}"> 
                            <div>
                                <strong>${item.product}</strong><br>
                                Price: $${item.price.toFixed(2)}<br>
                                ${item.description}
                            </div>`;
            cartItemsContainer.appendChild(li);
        });
        if (cart.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Your cart is empty.';
            cartItemsContainer.appendChild(li);
        }
    }

    window.onclick = function(event) {
        const cartModal = document.getElementById('cart-modal');
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    };

    
        function submitFeedback() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const feedback = document.getElementById('feedback').value;
            if (name && email && feedback) {
                alert('Thank you for your feedback, ' + name + '!');
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('feedback').value = '';
            } else {
                alert('Please fill in all fields.');
            }
        }
        const loginModal = document.getElementById('loginModal');
        const closeModal = document.getElementById('closeModal');
        const loginLink = document.querySelector('.header-right a:nth-child(2)');
        const loginButton = document.getElementById('modal-login-btn');

        // Show login modal when clicking login link
        loginLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            loginModal.style.display = 'flex'; // Show the modal
        });

        // Close modal when clicking the close button
        closeModal.addEventListener('click', () => {
            loginModal.style.display = 'none'; 
        });

        // Close modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });

        // Handle login
        loginButton.addEventListener('click', () => {
            const email = document.getElementById('modal-email').value;
            const password = document.getElementById('modal-password').value;

            if (email && password) {
                alert('You have logged in successfully with email: ' + email);
                loginModal.style.display = 'none'; // Hide modal after login
            } else {
                alert('Please fill in both email and password.');
            }
        });
       
        categoryLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const category = event.target.getAttribute('data-category');
                categoryClicked(category);
            });
        });
        function openOrderModal(productName, productPrice) {
    const orderModal = document.getElementById('order-modal');
    orderModal.style.display = 'flex';
}

function toggleOrderModal() {
    const orderModal = document.getElementById('order-modal');
    orderModal.style.display = 'none';
}

let orderCount = 0;

function placeOrder() {
    const name = document.getElementById('order-name').value;
    const address = document.getElementById('order-address').value;
    const contact = document.getElementById('order-contact').value;
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    let paymentMethod = '';
    
    paymentOptions.forEach(option => {
        if (option.checked) {
            paymentMethod = option.value;
        }
    });

    if (name && address && contact && paymentMethod) {
        alert('Your order has been placed successfully!');
        toggleOrderModal();
        orderCount++;
        document.getElementById('order-count').innerText = `Orders: ${orderCount}`;
        // Reset form fields after placing order
        document.getElementById('order-name').value = '';
        document.getElementById('order-address').value = '';
        document.getElementById('order-contact').value = '';
    } else {
        alert('Order declined. Please fill in all fields.');
    }
}


        fetchProducts();