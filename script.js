document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchHistory = document.getElementById('search-history');
    const clearHistoryButton = document.getElementById('clear-history');

    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    function updateHistoryDisplay() {
        searchHistory.innerHTML = '';
        history.forEach(term => {
            const li = document.createElement('li');
            li.textContent = term;
            searchHistory.appendChild(li);
        });
    }

    function addToHistory(term) {
        if (!history.includes(term)) {
            history.unshift(term);
            if (history.length > 5) history.pop();
            localStorage.setItem('searchHistory', JSON.stringify(history));
            updateHistoryDisplay();
        }
    }

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            addToHistory(searchTerm);
            searchInput.value = '';             
        }
    });

    clearHistoryButton.addEventListener('click', () => {
        history = [];
        localStorage.removeItem('searchHistory');
        updateHistoryDisplay();
    });

    updateHistoryDisplay();
});