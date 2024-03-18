// Fonction pour créer un cookie avec une durée de vie spécifique en secondes
function createCookie(name, value, seconds) {
    var expires = "";
    if (seconds) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/; SameSite=None; Secure"; // Ajout de SameSite=None et Secure
}

// Fonction pour mettre à jour l'état de la boîte et créer un cookie
function updateBoxState() {
    var box = document.getElementById("box");
    var body = document.body; // Sélectionne l'élément body

    if (box.classList.contains("active")) {
        box.classList.remove("active");
        body.classList.remove("active"); // Retire la classe active de l'élément body
        createCookie("boxState", "inactive", 600); // Crée un cookie avec une durée de vie de 600 secondes (10 minutes)
    } else {
        box.classList.add("active");
        body.classList.add("active"); // Ajoute la classe active à l'élément body
        createCookie("boxState", "active", 600); // Crée un cookie avec une durée de vie de 600 secondes (10 minutes)
    }
}

// Ajouter un écouteur d'événements au bouton
document.getElementById("button").addEventListener("click", function() {
    updateBoxState();
});

// Vérifier s'il existe un cookie pour l'état de la boîte lors du chargement de la page
window.onload = function() {
    var boxState = document.cookie.replace(/(?:(?:^|.*;\s*)boxState\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (boxState) {
        var box = document.getElementById("box");
        var body = document.body; // Sélectionne l'élément body
        if (boxState === "active") {
            box.classList.add("active");
            body.classList.add("active"); // Ajoute la classe active à l'élément body
        } else {
            box.classList.remove("active");
            body.classList.remove("active"); // Retire la classe active de l'élément body
        }
    }
};
