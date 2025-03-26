document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video-bg");
    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");
    const music = document.getElementById("background-music");
    const heartContainer = document.getElementById("heart-container");
    const proposalText = document.getElementById("proposal-text");
    const text = "Inès, veux-tu m'épouser ?";
    const typedText = document.getElementById("typed-text");
    let index = 0;
    const loadingBar = document.getElementById("loading-bar");
    const loadingContainer = document.getElementById("loading-container");
    const overlay = document.querySelector(".overlay");

    // 🎥 Active la caméra
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(error => {
            console.error("Accès à la caméra refusé :", error);
        });

    // ⏳ Barre de chargement stylisée
    const loadingInterval = setInterval(() => {
        index += 1;
        loadingBar.style.width = index + "%";

        // Ajouter des effets visuels
        loadingBar.style.backgroundColor = `hsl(${index * 3.6}, 100%, 50%)`;
        loadingBar.style.boxShadow = `0 0 10px hsl(${index * 3.6}, 100%, 50%)`;

        if (index >= 100) {
            clearInterval(loadingInterval);
            loadingContainer.style.display = "none";

            // Afficher le contenu principal après le chargement
            overlay.style.opacity = 1;

            // 🎶 Musique de fond
            music.play().catch(err => console.log("Lecture automatique bloquée", err));

            // 🌟 Effet de texte progressif (3 secondes)
            function typeWriter() {
                if (index < text.length) {
                    typedText.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                }
            }
            setTimeout(typeWriter, 500);
        }
    }, 150);

    // ❤️ Affichage du cœur 3D en AR
    function createHeart3D() {
        let heart = document.createElement("model-viewer");
        heart.setAttribute("src", "heart3D.glb");
        heart.setAttribute("ar", "true");
        heart.setAttribute("auto-rotate", "true");
        heart.setAttribute("camera-controls", "true");
        heart.style.position = "absolute";
        heart.style.width = "150px";
        heart.style.height = "150px";
        heart.style.top = "50%";
        heart.style.left = "50%";
        heart.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(heart);
        return heart;
    }

    let heart3D = createHeart3D();

    // ❤️ Multiplication des cœurs lors du clic sur "Oui"
    yesBtn.addEventListener("click", () => {
        heartContainer.classList.add("active");

        for (let i = 0; i < 50; i++) {
            let cloneHeart = heart3D.cloneNode(true);
            cloneHeart.style.left = Math.random() * 100 + "vw";
            cloneHeart.style.top = Math.random() * 100 + "vh";
            document.body.appendChild(cloneHeart);
        }

        setTimeout(() => {
            window.location.href = "oui.html";
        }, 5000);
    });

    // 💔 Action du bouton "Non"
    noBtn.addEventListener("click", () => {
        document.body.innerHTML = "";
        document.body.style.backgroundColor = "black";
        let errorMessage = document.createElement("h1");
        errorMessage.innerText = "Erreur 404 : Réponse invalide";
        errorMessage.style.color = "red";
        errorMessage.style.textAlign = "center";
        errorMessage.style.marginTop = "40vh";
        document.body.appendChild(errorMessage);

        setTimeout(() => {
            alert("Tu n'as pas le choix, Inès 😘");
        }, 1000);
    });
});