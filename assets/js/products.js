// products.js — data + render + category filter
const PRODUCTS = [
  {id:1,name:'Wireless Headphones',price:450000,cat:'electronics',img:'assets/img/wirelessheadphones.jpeg',description:'High-quality wireless headphones with noise cancellation and long battery life for immersive audio experience.'},
  {id:2,name:'Smartwatch Series 5',price:950000,cat:'electronics',img:'assets/img/Smartwatch.jpg',description:'Advanced smartwatch with health tracking, GPS, and customizable watch faces for fitness enthusiasts.'},
  {id:3,name:'Bluetooth Speaker',price:380000,cat:'electronics',img:'assets/img/bluetoothspeaker.jpg',description:'Portable Bluetooth speaker with waterproof design and powerful sound for outdoor adventures.'},
  {id:4,name:'Casual T-Shirt',price:120000,cat:'fashion',img:'assets/img/casualtshirt.webp',description:'Comfortable cotton t-shirt perfect for everyday wear, available in various colors.'},
  {id:5,name:'Hoodie Jacket',price:280000,cat:'fashion',img:'assets/img/hoodiejacket.jpg',description:'Warm and stylish hoodie jacket ideal for casual outings and cooler weather.'},
  {id:6,name:'Slimfit Pants',price:220000,cat:'fashion',img:'assets/img/slimfitpants.webp',description:'Slim-fit pants made from durable fabric, offering comfort and a modern look.'},
  {id:7,name:'Leather Wallet',price:150000,cat:'accessories',img:'assets/img/wallet.png',description:'Genuine leather wallet with multiple compartments for cards and cash.'},
  {id:8,name:'Wristband',price:95000,cat:'accessories',img:'assets/img/wristband.jpg',description:'Adjustable wristband made from soft material, great for sports and casual use.'},
  {id:9,name:'Street Cap',price:90000,cat:'accessories',img:'assets/img/hat.jpg',description:'Stylish street cap with adjustable strap for sun protection and fashion.'}
];

document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('product-list');
  const featuredEl = document.getElementById('featured-list');
  const searchInput = document.getElementById('searchInput');
  const catBtns = document.querySelectorAll('.cat');

  // Check if user is logged in
  const isLoggedIn = JSON.parse(localStorage.getItem('andre_user_current') || 'null');

  if (isLoggedIn) {
    // Show hero and featured sections for logged-in users
    document.getElementById('hero-section').style.display = 'block';
    document.getElementById('featured-section').style.display = 'block';
  }

  function render(list, target) {
    if (!target) return;
    target.innerHTML = list.map(p => `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <div class="price">Rp ${p.price.toLocaleString()}</div>
        <div style="margin-top:8px;display:flex;gap:8px">
          <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
          <a class="btn secondary" href="product-detail.html?id=${p.id}">View</a>
        </div>
      </div>
    `).join('');
  }

  function filterByCategory(cat) {
    if (cat === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.cat === cat);
  }

  // initial
  render(PRODUCTS, listEl);
  render(PRODUCTS.slice(0, 4), featuredEl);

  // category buttons
  catBtns.forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.cat').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      const cat = b.dataset.cat;
      render(filterByCategory(cat), listEl);
    });
  });

  // search
  if (searchInput) searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    render(PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)), listEl);
  });
});