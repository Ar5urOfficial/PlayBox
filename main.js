const gameList = document.getElementById('game-list');
const contextMenu = document.getElementById('context-menu');
const favToggleText = document.getElementById('fav-toggle-text');
const searchInput = document.getElementById('search-input');
const fileInput = document.getElementById('file-input');
let selectedIndex = null;

function render() {
    gameList.innerHTML = '';
    const query = searchInput.value.toLowerCase();
    const filtered = games.filter(g => g.name.toLowerCase().includes(query));

    const favs = filtered.filter(g => g.fav);
    const others = filtered.filter(g => !g.fav);

    if (favs.length > 0) {
        addCategory('Moje ulubioneee');
        favs.forEach(g => createGameElement(g));
    }
    if (others.length > 0) {
        addCategory('Inne gry');
        others.forEach(g => createGameElement(g));
    }
}

function addCategory(title) {
    const div = document.createElement('div');
    div.className = 'category';
    div.innerText = title;
    gameList.appendChild(div);
}

function createGameElement(game) {
    const div = document.createElement('div');
    div.className = 'game-item';
    div.innerHTML = `<span class="game-name">${game.name}</span>${game.fav ? '<span class="star-icon">★</span>' : ''}`;
    
    div.onclick = () => {
        document.getElementById('placeholder').style.display = 'none';
        const frame = document.getElementById('game-frame');
        frame.style.display = 'block';
        const doc = frame.contentWindow.document;
        doc.open(); doc.write(game.content); doc.close();
    };

    div.oncontextmenu = (e) => {
        e.preventDefault();
        selectedIndex = games.indexOf(game);
        favToggleText.innerText = game.fav ? "❌ Usuń z ulubionych" : "⭐ Dodaj do ulubionych";
        contextMenu.style.display = 'block';
        contextMenu.style.left = e.pageX + 'px';
        contextMenu.style.top = e.pageY + 'px';
    };
    gameList.appendChild(div);
}

function renameGame() { updateName(selectedIndex, prompt("Nowa nazwa:", games[selectedIndex].name)); render(); }
function toggleFavoriteMenu() { toggleFavorite(selectedIndex); render(); }
function deleteGame() { if(confirm("Usunąć grę?")) { removeGame(selectedIndex); render(); } }

fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        games.push({ name: file.name.replace('.html',''), content: ev.target.result, fav: false });
        saveGames();
        render();
    };
    reader.readAsText(file);
};

window.onclick = () => contextMenu.style.display = 'none';
render();