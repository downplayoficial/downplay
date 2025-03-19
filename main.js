import { config } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const featuredGames = document.getElementById('featured-games');
    
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);

    // Populate featured games with category tags
    config.gamesData.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.dataset.category = game.category;
        
        gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <div class="game-category">${game.category || 'Sin categoría'}</div>
                <div class="game-price">${game.price}</div>
            </div>
        `;
        
        gameCard.addEventListener('click', () => showGameModal(game));
        featuredGames.appendChild(gameCard);
    });

    // Modal functionality
    function showGameModal(game) {
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <img src="${game.image}" alt="${game.title}" class="modal-image">
                
                <div class="game-description">
                    <h2>${game.title}</h2>
                    <p>${game.description || 'No hay descripción disponible.'}</p>
                </div>

                <div class="requirements-section">
                    <div class="requirements-box">
                        <h4>Requisitos Mínimos</h4>
                        ${game.requirements ? `
                            <div class="requirement-item">
                                <span class="requirement-label">Sistema Operativo:</span>
                                <span>${game.requirements.minimum.os}</span>
                            </div>
                            <div class="requirement-item">
                                <span class="requirement-label">Procesador:</span>
                                <span>${game.requirements.minimum.processor}</span>
                            </div>
                            <div class="requirement-item">
                                <span class="requirement-label">Memoria:</span>
                                <span>${game.requirements.minimum.memory}</span>
                            </div>
                            <div class="requirement-item">
                                <span class="requirement-label">Gráficos:</span>
                                <span>${game.requirements.minimum.graphics}</span>
                            </div>
                            <div class="requirement-item">
                                <span class="requirement-label">Almacenamiento:</span>
                                <span>${game.requirements.minimum.storage}</span>
                            </div>
                        ` : 'No hay requisitos mínimos especificados.'}
                    </div>

                    <div class="requirements-box">
                        <h4>Requisitos Recomendados</h4>
                        ${game.requirements ? `
                            <div class="requirement-item">
                                <span class="requirement-label">Sistema Operativo:</span>
                                <span>${game.requirements.recommended.os}</span>
                            </div>
                            <div class="requirement-item">
                                <span class="requirement-label">Procesador:</span>
                                <span>${game.requirements.recommended.processor}</span>
                            </div>
                            <div class="requirement-item">
                                <span class="requirement-label">Memoria:</span>
                                <span>${game.requirements.recommended.memory}</span>
                            </div>
                            <div class="requirement-item">
                                <span class="requirement-label">Gráficos:</span>
                                <span>${game.requirements.recommended.graphics}</span>
                            </div>
                            <div class="requirement-item">
                                <span class="requirement-label">Almacenamiento:</span>
                                <span>${game.requirements.recommended.storage}</span>
                            </div>
                        ` : 'No hay requisitos recomendados especificados.'}
                    </div>
                </div>

                <div class="download-buttons">
                    <a href="${game.downloads.mega}" class="download-button mega-button" target="_blank">MEGA</a>
                    <a href="${game.downloads.mediafire}" class="download-button mediafire-button" target="_blank">Mediafire</a>
                    <a href="${game.downloads.drive}" class="download-button drive-button" target="_blank">Drive</a>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
        
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Category filtering
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const selectedCategory = card.textContent;
            const gameCards = document.querySelectorAll('.game-card');
            
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            if (selectedCategory === 'Todos') {
                gameCards.forEach(card => card.style.display = 'block');
            } else {
                gameCards.forEach(card => {
                    if (card.dataset.category === selectedCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    const handleSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const gameCards = document.querySelectorAll('.game-card');

        gameCards.forEach(card => {
            const title = card.querySelector('.game-title').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
});