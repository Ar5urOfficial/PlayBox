let games = JSON.parse(localStorage.getItem('myGames') || '[]');

function saveGames() {
    localStorage.setItem('myGames', JSON.stringify(games));
}

function toggleFavorite(index) {
    games[index].fav = !games[index].fav;
    saveGames();
}

function updateName(index, newName) {
    if (newName) {
        games[index].name = newName;
        saveGames();
    }
}

function removeGame(index) {
    games.splice(index, 1);
    saveGames();
}