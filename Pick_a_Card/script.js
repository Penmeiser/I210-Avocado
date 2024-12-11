document.addEventListener("DOMContentLoaded", () => {
  // Home page random card
  const drawCardBtn = document.getElementById("drawCardBtn");
  const randomCardContainer = document.getElementById("randomCardContainer");

  if (drawCardBtn) {
    drawCardBtn.addEventListener("click", async () => {
      const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
      );
      const data = await res.json();
      if (data.cards && data.cards.length > 0) {
        const card = data.cards[0];
        randomCardContainer.innerHTML = `
            <h3>Random Card Drawn:</h3>
            <p>${card.value} of ${card.suit}</p>
            <img src="${card.image}" alt="${card.value} of ${card.suit}">
          `;
      }
    });
  }

  // Facts page: three random cards
  const showFactsBtn = document.getElementById("showFactsBtn");
  const cardsContainer = document.getElementById("cardsContainer");

  if (showFactsBtn) {
    showFactsBtn.addEventListener("click", async () => {
      const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/draw/?count=3"
      );
      const data = await res.json();
      cardsContainer.innerHTML = "";
      if (data.cards && data.cards.length > 0) {
        data.cards.forEach((card) => {
          const cardDiv = document.createElement("div");
          cardDiv.style.display = "inline-block";
          cardDiv.style.margin = "10px";
          cardDiv.innerHTML = `
              <img src="${card.image}" alt="${card.value} of ${card.suit}">
              <p>${card.value} of ${card.suit}</p>
            `;
          cardsContainer.appendChild(cardDiv);
        });
      }
    });
  }

  // Favorite card page - CRUD with localStorage
  const favoriteForm = document.getElementById("favoriteForm");
  const favoriteDisplay = document.getElementById("favoriteDisplay");
  const retrieveBtn = document.getElementById("retrieveBtn");
  const updateBtn = document.getElementById("updateBtn");
  const deleteBtn = document.getElementById("deleteBtn");

  if (favoriteForm) {
    favoriteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cardCode = document.getElementById("cardCode").value.trim();
      const cardNote = document.getElementById("cardNote").value.trim();

      // Create/Save to "DB"
      localStorage.setItem("favoriteCardCode", cardCode);
      localStorage.setItem("favoriteCardNote", cardNote);

      favoriteDisplay.textContent = `Favorite Card Saved: ${cardCode} - ${cardNote}`;
    });
  }

  if (retrieveBtn) {
    retrieveBtn.addEventListener("click", () => {
      const cardCode = localStorage.getItem("favoriteCardCode");
      const cardNote = localStorage.getItem("favoriteCardNote");
      if (cardCode && cardNote) {
        favoriteDisplay.textContent = `Favorite Card: ${cardCode} - ${cardNote}`;
      } else {
        favoriteDisplay.textContent = "No favorite card stored.";
      }
    });
  }

  if (updateBtn) {
    updateBtn.addEventListener("click", () => {
      const newNote = prompt("Enter new note for your favorite card:");
      if (newNote !== null && newNote.trim() !== "") {
        const cardCode = localStorage.getItem("favoriteCardCode");
        localStorage.setItem("favoriteCardNote", newNote.trim());
        favoriteDisplay.textContent = `Favorite Card Updated: ${cardCode} - ${newNote}`;
      }
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      localStorage.removeItem("favoriteCardCode");
      localStorage.removeItem("favoriteCardNote");
      favoriteDisplay.textContent = "Favorite card deleted.";
    });
  }
});
