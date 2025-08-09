const products = [
  { id: 1, title: "Tênis Roxo Street", price: 349.9, category: "Tênis", img: "https://images.unsplash.com/photo-1519741491523-7a1f1a7a8a5f?w=800&q=80" },
  { id: 2, title: "Tênis Urban Flow", price: 399.9, category: "Tênis", img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80" },
  { id: 3, title: "Tênis Galaxy Ride", price: 429.9, category: "Tênis", img: "https://images.unsplash.com/photo-1533106418985-6d0a59a87e6a?w=800&q=80" },
  { id: 4, title: "Camiseta Oversized Logo", price: 79.9, category: "Camisetas", img: "https://images.unsplash.com/photo-1520975925831-5c9b3e3a2b9b?w=800&q=80" },
  { id: 5, title: "Camiseta Street Vibes", price: 89.9, category: "Camisetas", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80" },
  { id: 6, title: "Camiseta Purple Haze", price: 95.9, category: "Camisetas", img: "https://images.unsplash.com/photo-1532274407774-3f43f4de0e8a?w=800&q=80" },
  { id: 7, title: "Moletom Heavy", price: 199.9, category: "Moletom", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80" },
  { id: 8, title: "Moletom Purple Dream", price: 219.9, category: "Moletom", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80" },
  { id: 9, title: "Moletom Street Style", price: 189.9, category: "Moletom", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80" },
  { id: 10, title: "Calça Baggy Raw", price: 129.9, category: "Calças Baggy", img: "https://images.unsplash.com/photo-1503342452485-86f7b3b2a2b0?w=800&q=80" },
  { id: 11, title: "Calça Baggy Urban", price: 139.9, category: "Calças Baggy", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80" },
  { id: 12, title: "Cargo Street Utility", price: 159.9, category: "Cargos", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" },
  { id: 13, title: "Cargo Urban Fit", price: 169.9, category: "Cargos", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80" },
  { id: 14, title: "Meias Skate Mix", price: 29.9, category: "Acessórios", img: "https://images.unsplash.com/photo-1526178613652-50c2a9a1d4d0?w=800&q=80" },
  { id: 15, title: "Boné Roxo Style", price: 49.9, category: "Acessórios", img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=80" }
];

const productList = document.getElementById('products');
const searchInput = document.getElementById('search');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

let cart = [];
let currentCategory = 'Todos';

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderProducts() {
  productList.innerHTML = '';
  const filtered = products.filter(p =>
    (currentCategory === 'Todos' || p.category === currentCategory) &&
    p.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  if (filtered.length === 0) {
    productList.innerHTML = '<p class="no-results">Nenhum produto encontrado.</p>';
    return;
  }
  filtered.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" class="product-image" />
      <div class="product-info">
        <h3 class="product-title">${p.title}</h3>
        <p class="product-category">${p.category}</p>
        <div class="product-price">${formatBRL(p.price)}</div>
        <button class="btn-add" aria-label="Adicionar ${p.title} ao carrinho" onclick="addToCart(${p.id})">Adicionar</button>
      </div>
    `;
    productList.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-details">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-qty">Quantidade: ${item.qty}</div>
      </div>
      <div class="cart-item-price">${formatBRL(item.price * item.qty)}</div>
      <button class="cart-item-remove" aria-label="Remover ${item.title}" onclick="removeFromCart(${item.id})">×</button>
    `;
    cartItemsContainer.appendChild(div);
  });
  cartTotal.textContent = formatBRL(total);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    renderProducts();
  });
});

searchInput.addEventListener('input', renderProducts);

cartBtn.addEventListener('click', () => {
  cartModal.classList.toggle('visible');
});

closeCartBtn.addEventListener('click', () => {
  cartModal.classList.remove('visible');
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && cartModal.classList.contains('visible')) {
    cartModal.classList.remove('visible');
  }
});

renderProducts();