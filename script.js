// // Wait for the DOM to load
// document.addEventListener('DOMContentLoaded', () => {
    
//     // --- Mobile Menu Toggle ---
//     const hamburger = document.querySelector('.hamburger');
//     const navLinks = document.querySelector('.nav-links');

//     if (hamburger && navLinks) {
//         hamburger.addEventListener('click', () => {
//             navLinks.classList.toggle('active');
            
//             // Toggle between bars and times (X) icon
//             const icon = hamburger.querySelector('i');
//             if (navLinks.classList.contains('active')) {
//                 icon.classList.remove('fa-bars');
//                 icon.classList.add('fa-times');
//             } else {
//                 icon.classList.remove('fa-times');
//                 icon.classList.add('fa-bars');
//             }
//         });

//         // Close mobile menu when clicking a link
//         document.querySelectorAll('.nav-links a').forEach(link => {
//             link.addEventListener('click', () => {
//                 navLinks.classList.remove('active');
//                 hamburger.querySelector('i').classList.remove('fa-times');
//                 hamburger.querySelector('i').classList.add('fa-bars');
//             });
//         });
//     }

//     // --- Shopping Cart Functionality ---
//     const addButtons = document.querySelectorAll('.add-btn');
//     const cartCount = document.querySelector('.cart-count');
//     const cartIcon = document.querySelector('.cart-icon');
//     let cartItems = 0;
//     let cartProducts = []; // Array to store added products

//     addButtons.forEach(button => {
//         button.addEventListener('click', (e) => {
//             // Get product details
//             const productCard = e.target.closest('.product-card');
//             const productName = productCard.querySelector('h3').textContent;
//             const productPrice = productCard.querySelector('.price').textContent;

//             // Add to cart array
//             cartProducts.push({ name: productName, price: productPrice });

//             // Update cart count
//             cartItems++;
//             cartCount.textContent = cartItems;

//             // Animation effect on button
//             e.target.textContent = 'Added!';
//             e.target.style.background = '#28a745';
            
//             // Reset button after 2 seconds
//             setTimeout(() => {
//                 e.target.textContent = 'Add to Cart';
//                 e.target.style.background = '';
//             }, 2000);
//         });
//     });

//     // --- Cart Icon Click Event (SHOW CART) ---
//     if (cartIcon) {
//         cartIcon.addEventListener('click', () => {
//             if (cartItems === 0) {
//                 alert('Your cart is empty! Add some products first.');
//             } else {
//                 // Create a message with all cart items
//                 let cartMessage = '🛒 Your Cart Items:\n\n';
//                 cartProducts.forEach((item, index) => {
//                     cartMessage += `${index + 1}. ${item.name} - ${item.price}\n`;
//                 });
//                 cartMessage += `\nTotal Items: ${cartItems}`;
                
//                 alert(cartMessage);
//             }
//         });
//     }

//     // --- Contact Form Handling ---
//     const contactForm = document.querySelector('.contact-form');
    
//     if (contactForm) {
//         contactForm.addEventListener('submit', (e) => {
//             e.preventDefault();
            
//             // Get form values
//             const name = contactForm.querySelector('input[type="text"]').value;
//             const email = contactForm.querySelector('input[type="email"]').value;
//             const message = contactForm.querySelector('textarea').value;

//             // Simple validation
//             if(name && email && message) {
//                 alert(`Thank you, ${name}! We have received your message.`);
//                 contactForm.reset();
//             } else {
//                 alert('Please fill in all required fields.');
//             }
//         });
//     }

//     // --- Newsletter Form Handling ---
//     const newsletterForm = document.querySelector('.newsletter form');
    
//     if (newsletterForm) {
//         newsletterForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             const email = newsletterForm.querySelector('input').value;
            
//             if(email) {
//                 alert(`Thanks for subscribing with ${email}!`);
//                 newsletterForm.reset();
//             }
//         });
//     }

//     // --- Smooth Scrolling for Anchor Links ---
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function(e) {
//             e.preventDefault();
//             const target = document.querySelector(this.getAttribute('href'));
            
//             if (target) {
//                 window.scrollTo({
//                     top: target.offsetTop - 70,
//                     behavior: 'smooth'
//                 });
//             }
//         });
//     });

//     // --- Navbar Scroll Effect ---
//     const header = document.querySelector('header');
    
//     window.addEventListener('scroll', () => {
//         if (window.scrollY > 50) {
//             header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
//         } else {
//             header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
//         }
//     });

//     console.log('Avinash Electronics website loaded successfully!');
// });

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Variables ---
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    const closeCartBtn = document.querySelector('.close-cart');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    let cartItems = [];
    let totalPrice = 0;

    // --- Mobile Menu Toggle ---
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // --- Add to Cart Function ---
    const addButtons = document.querySelectorAll('.add-btn');

    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.price').textContent;
            
            // Extract price number
            const price = parseFloat(productPriceText.replace(/[^0-9.]/g, ''));

            // Add to cart array
            cartItems.push({ name: productName, price: price });
            
            // Update total
            totalPrice += price;
            
            // Update cart UI
            updateCartCount();
            renderCartItems();
            
            // Button animation
            e.target.textContent = 'Added!';
            e.target.style.background = '#28a745';
            
            setTimeout(() => {
                e.target.textContent = 'Add to Cart';
                e.target.style.background = '';
            }, 2000);
        });
    });

    // --- Update Cart Count ---
    function updateCartCount() {
        cartCount.textContent = cartItems.length;
    }

    // --- Render Cart Items ---
    function renderCartItems() {
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty!</p>';
            cartTotalElement.textContent = '$0.00';
            return;
        }

        let html = '';
        cartItems.forEach((item, index) => {
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <span class="remove-item" onclick="removeFromCart(${index})">&times;</span>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = html;
        cartTotalElement.textContent = '$' + totalPrice.toFixed(2);
    }

    // --- Remove from Cart ---
    window.removeFromCart = function(index) {
        totalPrice -= cartItems[index].price;
        cartItems.splice(index, 1);
        updateCartCount();
        renderCartItems();
    };

    // --- Open Cart Modal ---
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartModal.style.display = 'flex';
        });
    }

    // --- Close Cart Modal ---
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // --- Checkout Function ---
    window.checkout = function() {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        let confirmOrder = confirm(`Total Amount: $${totalPrice.toFixed(2)}\n\nDo you want to proceed to payment?`);
        
        if (confirmOrder) {
            // Yaha tum payment gateway integrate karoge
            alert('Redirecting to payment gateway...\n\n(This is a demo. For real payments, you need Razorpay/PayPal integration)');
            cartItems = [];
            totalPrice = 0;
            updateCartCount();
            renderCartItems();
            cartModal.style.display = 'none';
        }
    };

    // --- Contact Form Handling ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[type="text"]').value;
            alert(`Thank you, ${name}! We have received your message.`);
            contactForm.reset();
        });
    }

    // --- Newsletter ---
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thanks for subscribing!');
            newsletterForm.reset();
        });
    }

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('Avinash Electronics loaded!');
});