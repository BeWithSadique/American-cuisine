
        let cart = [];
        let total = 0;
        const deliveryFee = 2.99;

        function addToCart(name, price) {
            const existItem = cart.find(item => item.name === name);

            if (existItem) {
                existItem.quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            total += price;
            updateCartDisplay();
            showNotification('Item added to cart!', 'success');
        }

        function updateQuantity(name, change) {
            const item = cart.find(item => item.name === name);
            if (item) {
                item.quantity += change;
                total += item.price * change;

                if (item.quantity <= 0) {
                    cart = cart.filter(cartItem => cartItem.name !== name);
                }

                updateCartDisplay();
            }
        }

        function removeItem(name) {
            const item = cart.find(item => item.name === name);
            if (item) {
                total -= item.price * item.quantity;
                cart = cart.filter(cartItem => cartItem.name !== name);
                updateCartDisplay();
            }
        }

        function updateCartDisplay() {
            const cartItems = document.getElementById('cart-items');
            const cartSummary = document.getElementById('cart-summary');
            const cartCount = document.getElementById('cart-count');
            const subtotal = document.getElementById('subtotal');
            const totalAmount = document.getElementById('total-amount');

            // Update cart count
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;

            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-basket"></i>
                        <p>Your cart is empty</p>
                        <small>Add some delicious items to get started!</small>
                    </div>
                `;
                cartSummary.style.display = 'none';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                        </div>
                        <div class="cart-item-controls">
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                            </div>
                            <button class="remove-btn" onclick="removeItem('${item.name}')" title="Remove item">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('');

                const subtotalAmount = total;
                const totalWithDelivery = subtotalAmount + deliveryFee;

                subtotal.textContent = subtotalAmount.toFixed(2);
                totalAmount.textContent = totalWithDelivery.toFixed(2);
                cartSummary.style.display = 'block';
            }
        }

        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');

            // Update notification 
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'times-circle'}"></i>
                ${message}
            `;

       
            notification.className = `notification ${type}`;
            notification.classList.add('show');

            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }


        