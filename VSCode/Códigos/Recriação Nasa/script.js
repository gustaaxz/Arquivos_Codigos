document.addEventListener('DOMContentLoaded', () => {

    const USERS_DB_KEY = 'nasaex_users';
    const SESSION_KEY = 'nasaex_session';

    // --- Helpers de Armazenamento ---
    const getUsers = () => JSON.parse(localStorage.getItem(USERS_DB_KEY)) || [];
    const saveUsers = (users) => localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    const getSession = () => JSON.parse(sessionStorage.getItem(SESSION_KEY));
    const setSession = (user) => sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    const clearSession = () => sessionStorage.removeItem(SESSION_KEY);
    const formatCurrency = (amount) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);

    // --- Templates de Formulário ---
    const getLoginForm = () => `
        <h2 id="auth-title" class="text-2xl font-bold text-center mb-6">Bem-vindo à NasAEx</h2>
        <form id="login-form">
            <div class="mb-4"><label for="email" class="block mb-2 text-sm font-medium">Email</label><input type="email" id="email" class="form-input" placeholder="seu@email.com" required></div>
            <div class="mb-6"><label for="password" class="block mb-2 text-sm font-medium">Senha</label><input type="password" id="password" class="form-input" placeholder="••••••••" required></div>
            <p id="login-error" class="text-red-500 text-sm mb-4 text-center" hidden></p>
            <button type="submit" class="w-full cta-button-secondary">Entrar</button>
            <p class="text-sm text-gray-400 mt-4 text-center">Não tem uma conta? <a href="#" id="show-register" class="font-medium text-red-500 hover:underline">Registre-se</a></p>
        </form>`;
    
    const getRegisterForm = () => `
        <h2 id="auth-title" class="text-2xl font-bold text-center mb-6">Crie sua Conta</h2>
        <form id="register-form">
            <div class="mb-4"><label for="reg-email" class="block mb-2 text-sm font-medium">Email</label><input type="email" id="reg-email" class="form-input" placeholder="seu@email.com" required></div>
            <div class="mb-4"><label for="reg-password" class="block mb-2 text-sm font-medium">Senha</label><input type="password" id="reg-password" class="form-input" placeholder="Mínimo 6 caracteres" required minlength="6"></div>
            <div class="mb-4"><label for="user-role" class="block mb-2 text-sm font-medium">Tipo de Conta</label>
                <select id="user-role" class="form-input">
                    <option value="cliente">Cliente</option>
                    <option value="desenvolvedor">Desenvolvedor</option>
                    <option value="administrador">Administrador</option>
                </select>
            </div>
            <p id="register-error" class="text-red-500 text-sm mb-4 text-center" hidden></p>
            <button type="submit" class="w-full cta-button-secondary">Registrar</button>
            <p class="text-sm text-gray-400 mt-4 text-center">Já tem uma conta? <a href="#" id="show-login" class="font-medium text-red-500 hover:underline">Entrar</a></p>
        </form>`;

    // --- Lógica Principal de Autenticação e UI ---
    const updateNavUI = (user) => {
        const loginButton = document.getElementById('login-button');
        const userMenuContainer = document.getElementById('user-menu-container');
        const roleSpecificLinks = document.getElementById('role-specific-links');

        if (user) {
            loginButton.style.display = 'none';
            userMenuContainer.style.display = 'block';
            document.getElementById('user-initials').textContent = user.email.charAt(0).toUpperCase();
            document.getElementById('user-email').textContent = user.email;

            roleSpecificLinks.innerHTML = '';
            if (user.role === 'administrador') {
                roleSpecificLinks.innerHTML = '<a href="#" class="user-menu-item">Painel Admin</a>';
            }
            if (user.role === 'desenvolvedor') {
                roleSpecificLinks.innerHTML = '<a href="#" class="user-menu-item">Portal Dev</a>';
            }
        } else {
            loginButton.style.display = 'block';
            userMenuContainer.style.display = 'none';
        }
    };
    
    // --- Funções de Inicialização ---
    const initMobileMenu = () => {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenuButton || !mobileMenu) return;
        mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    };

    const initHeaderScroll = () => {
        const header = document.getElementById('header');
        if (!header) return;
        let isThrottled = false;
        window.addEventListener('scroll', () => {
            if (isThrottled) return;
            isThrottled = true;
            setTimeout(() => {
                header.classList.toggle('h-16', window.scrollY > 50);
                header.classList.toggle('h-20', window.scrollY <= 50);
                isThrottled = false;
            }, 100);
        });
    };

    const initScrollAnimations = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-on-scroll').forEach(section => observer.observe(section));
    };
    
    const initAuthSystem = () => {
        const authModal = document.getElementById('auth-modal');
        const content = document.getElementById('auth-modal-content');
        if (!authModal || !content) return;

        const openBtn = document.getElementById('login-button');
        const closeBtn = document.getElementById('close-auth-modal-button');
        const overlay = authModal.querySelector('.modal-overlay');

        const open = () => { content.innerHTML = getLoginForm(); authModal.hidden = false; };
        const close = () => authModal.hidden = true;

        openBtn.addEventListener('click', open);
        closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', close);
        
        content.addEventListener('click', (e) => {
            if (e.target.id === 'show-register') { e.preventDefault(); content.innerHTML = getRegisterForm(); }
            if (e.target.id === 'show-login') { e.preventDefault(); content.innerHTML = getLoginForm(); }
        });

        content.addEventListener('submit', (e) => {
            e.preventDefault();
            if (e.target.id === 'register-form') handleRegister(e.target);
            if (e.target.id === 'login-form') handleLogin(e.target);
        });

        const handleRegister = (form) => {
            const email = form.querySelector('#reg-email').value;
            const password = form.querySelector('#reg-password').value;
            const role = form.querySelector('#user-role').value;
            const errorEl = form.querySelector('#register-error');
            const users = getUsers();

            if (users.find(u => u.email === email)) {
                errorEl.textContent = 'Este email já está registrado.';
                errorEl.hidden = false;
                return;
            }
            // NOTA: Em um aplicativo real, a senha seria criptografada (hashed) no servidor.
            // Usar btoa é apenas para simulação e NÃO é seguro.
            users.push({ email, password: btoa(password), role });
            saveUsers(users);
            alert('Registro bem-sucedido! Por favor, faça o login.');
            content.innerHTML = getLoginForm();
        };

        const handleLogin = (form) => {
            const email = form.querySelector('#email').value;
            const password = form.querySelector('#password').value;
            const errorEl = form.querySelector('#login-error');
            const users = getUsers();
            const user = users.find(u => u.email === email);

            if (!user || btoa(password) !== user.password) {
                errorEl.textContent = 'Email ou senha inválidos.';
                errorEl.hidden = false;
                return;
            }
            const sessionUser = { email: user.email, role: user.role };
            setSession(sessionUser);
            updateNavUI(sessionUser);
            close();
        };
        
        const userMenuButton = document.getElementById('user-menu-button');
        const userMenu = document.getElementById('user-menu');
        userMenuButton?.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = userMenu.hidden;
            userMenu.hidden = !isExpanded;
            userMenuButton.setAttribute('aria-expanded', String(isExpanded));
        });

        document.getElementById('logout-button').addEventListener('click', (e) => {
            e.preventDefault();
            clearSession();
            updateNavUI(null);
        });
        
        document.addEventListener('click', (event) => {
            if (!userMenuButton?.contains(event.target) && !userMenu?.contains(event.target)) {
                if (userMenu) userMenu.hidden = true;
            }
        });
        
        updateNavUI(getSession());
    };
    
    const initCart = () => {
         const cartModal = document.getElementById('cart-modal');
        if (!cartModal) return;

        const openBtn = document.getElementById('cart-button');
        const closeBtn = document.getElementById('close-cart-modal-button');
        const overlay = cartModal.querySelector('.modal-overlay');
        const cartCountEl = document.getElementById('cart-count');
        const cartItemsEl = document.getElementById('cart-items');
        const cartFooterEl = document.getElementById('cart-footer');
        const cartSubtotalEl = document.getElementById('cart-subtotal');
        
        let cart = [];

        const open = () => cartModal.hidden = false;
        const close = () => cartModal.hidden = true;

        openBtn.addEventListener('click', open);
        closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', close);

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.product-card');
                const item = { name: card.dataset.name, price: parseFloat(card.dataset.price) };
                cart.push(item);
                updateCart();
                
                cartCountEl.classList.add('scale-150');
                setTimeout(() => cartCountEl.classList.remove('scale-150'), 200);

                button.textContent = 'Adicionado!';
                button.classList.add('bg-green-500');
                setTimeout(() => {
                    button.textContent = 'Adicionar ao Carrinho';
                    button.classList.remove('bg-green-500');
                }, 1500);
            });
        });

        const updateCart = () => {
            cartCountEl.textContent = cart.length;
            if (cart.length === 0) {
                cartItemsEl.innerHTML = '<p class="text-gray-400 text-center">Seu carrinho está vazio.</p>';
                cartFooterEl.classList.add('hidden');
            } else {
                cartItemsEl.innerHTML = cart.map(item => `
                    <div class="flex justify-between items-center py-2 border-b border-slate-700">
                        <span>${item.name}</span>
                        <span>${formatCurrency(item.price)}</span>
                    </div>
                `).join('');
                cartFooterEl.classList.remove('hidden');
            }
            const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
            cartSubtotalEl.textContent = formatCurrency(subtotal);
        };
        updateCart();
    };

    // --- Inicialização ---
    initMobileMenu();
    initHeaderScroll();
    initScrollAnimations();
    initAuthSystem();
    initCart();
});

