/**
 * VINTAGE CHARM · FAMILY CROSSWORD GAME
 */
class FamilyCrossword {
  constructor() {
    // Game configuration
    this.SIZE = 12;
    this.MAX_HINTS = 3;
    this.STORAGE_KEY = "familyCrossword";

    // Game state
    this.playerName =
      localStorage.getItem("familyCrossword_playerName") || "Player";
    // Game state
    this.score = 0;
    this.hints = this.MAX_HINTS;
    this.hintsUsed = 0;
    this.currentClue = null;
    this.currentDirection = "across";
    this.selectedCell = { row: -1, col: -1 };
    this.gameComplete = false;
    this.userGrid = [];
    this.solutionGrid = [];
    this.solvedClues = new Set(); // Track solved clues

    // DOM elements
    this.gridElement = document.getElementById("crosswordGrid");
    this.scoreElement = document.getElementById("score");
    this.hintsLeftElement = document.getElementById("hintsLeft");
    this.hintCountElement = document.getElementById("hintCount");
    this.progressElement = document.getElementById("progress");
    this.currentClueElement = document.getElementById("currentClue");
    this.clueDirectionElement = document.getElementById("clueDirection");
    this.playerNameElement = document.getElementById("playerNameDisplay");

    // Initialize the game
    this.initSolution();

    // Check if we have a saved game for this player
    const gameToLoad = localStorage.getItem("gameToLoad");
    if (gameToLoad === "true" && this.loadGame()) {
      console.log(" Saved game loaded for", this.playerName);
      localStorage.removeItem("gameToLoad");
    } else {
      this.initEmptyGrid();
    }
    this.renderGrid();
    this.setupEventListeners();
    this.setupUserListeners();
    this.updateUI();
    this.updatePlayerDisplay();

    // Show username modal on start
    setTimeout(() => this.showUsernameModal(), 100);

    console.log("Family Crossword initialized for", this.playerName);
  }

  // ---------- USERNAME MODAL METHODS ----------
  showUsernameModal() {
    const modal = document.getElementById("usernameModal");
    if (!modal) return;

    modal.classList.add("active");
    this.populateSavedUsers();

    setTimeout(() => {
      document.getElementById("usernameInput")?.focus();
    }, 300);
  }

  hideUsernameModal() {
    const modal = document.getElementById("usernameModal");
    if (modal) {
      modal.classList.remove("active");
    }
  }

  populateSavedUsers() {
    const savedUsersList = document.getElementById("savedUsersList");
    const savedUsersSection = document.getElementById("savedUsersSection");

    if (!savedUsersList) return;

    // Get all saved games from localStorage
    const allSaves = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("familyCrossword_")) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          if (data && data.playerName) {
            allSaves[data.playerName] = data;
          }
        } catch (e) {}
      }
    }

    const usernames = Object.keys(allSaves)
      .sort((a, b) => {
        return (
          new Date(allSaves[b].lastPlayed) - new Date(allSaves[a].lastPlayed)
        );
      })
      .slice(0, 5);

    if (usernames.length === 0) {
      savedUsersSection.style.display = "none";
      return;
    }

    savedUsersSection.style.display = "block";
    savedUsersList.innerHTML = "";

    usernames.forEach((username) => {
      const userData = allSaves[username];
      const lastPlayed = new Date(userData.lastPlayed).toLocaleDateString();
      const progress = userData.progress || 0;

      const userItem = document.createElement("div");
      userItem.className = "saved-user-item";
      userItem.innerHTML = `
                <div class="saved-user-info">
                    <i class="fas fa-user"></i>
                    <span class="saved-user-name">${username}</span>
                    <span class="saved-user-progress">${progress}%</span>
                </div>
                <span class="saved-user-date">${lastPlayed}</span>
            `;

      userItem.addEventListener("click", () => {
        document.getElementById("usernameInput").value = username;
        this.startGameWithUsername(username);
      });

      savedUsersList.appendChild(userItem);
    });
  }
  startGameWithUsername(username) {
    this.playerName = username;
    localStorage.setItem("familyCrossword_playerName", username);

    // Try to load existing game for this user
    const savedKey = `familyCrossword_${username}`;
    const savedData = localStorage.getItem(savedKey);

    if (savedData) {
      try {
        const gameState = JSON.parse(savedData);
        this.loadGameState(gameState);
        this.showMessage(`Welcome back, ${username}!`, "success");
      } catch (e) {
        this.performReset(); 
        this.showMessage(`Welcome, ${username}!`, "success");
      }
    } else {
      this.performReset(); 
      this.showMessage(`Welcome, ${username}!`, "success");
    }

    this.hideUsernameModal();
    this.updatePlayerDisplay();
    this.updateUI();
  }

  // ----------  LOCAL STORAGE METHODS ----------
  saveGame() {
    if (!this.playerName || this.playerName === "Player") return;

    try {
      const progress = this.calculateProgress();
      const solvedCluesArray = Array.from(this.solvedClues);

      const gameState = {
        playerName: this.playerName,
        userGrid: this.userGrid,
        score: this.score,
        hints: this.hints,
        hintsUsed: this.hintsUsed,
        solvedClues: solvedCluesArray,
        gameComplete: this.gameComplete,
        progress: progress,
        lastPlayed: new Date().toISOString(),
      };

      const saveKey = `familyCrossword_${this.playerName}`;
      localStorage.setItem(saveKey, JSON.stringify(gameState));
      localStorage.setItem("familyCrossword_playerName", this.playerName);

      console.log("💾 Game saved for", this.playerName);
      return true;
    } catch (error) {
      console.error("Error saving game:", error);
      return false;
    }
  }

  loadGame() {
    if (!this.playerName || this.playerName === "Player") return false;

    try {
      const saveKey = `familyCrossword_${this.playerName}`;
      const savedData = localStorage.getItem(saveKey);
      if (!savedData) return false;

      const gameState = JSON.parse(savedData);
      return this.loadGameState(gameState);
    } catch (error) {
      console.error("Error loading game:", error);
      return false;
    }
  }

  loadGameState(gameState) {
    this.userGrid = gameState.userGrid || this.userGrid;
    this.score = gameState.score || 0;
    this.hints = gameState.hints ?? this.MAX_HINTS;
    this.hintsUsed = gameState.hintsUsed || 0;
    this.solvedClues = new Set(gameState.solvedClues || []);
    this.gameComplete = gameState.gameComplete || false;

    this.renderGrid();
    this.updateUI();
    this.updateClueListStates();

    return true;
  }
  // ---------- DELETE SCORE----------
  deleteScore() {
    if (!this.playerName || this.playerName === "Player") {
      this.showMessage("No player selected", "warning");
      return;
    }

    // Create custom dialog
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s;
    `;

    const dialog = document.createElement("div");
    dialog.style.cssText = `
        background: #fcf5e8;
        border: 3px solid #b76e57;
        border-radius: 20px;
        padding: 30px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        transform: scale(0.8);
        opacity: 0;
        transition: all 0.3s;
        font-family: 'Quicksand', sans-serif;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;

    dialog.innerHTML = `
        <div style="font-size: 4rem; color: #b76e57; margin-bottom: 15px;">🗑️</div>
        <h3 style="font-family: 'Playfair Display'; color: #5a4e3e; font-size: 1.8rem; margin: 0 0 10px;">Delete Progress</h3>
        <p style="color: #6b5f4f; font-size: 1.1rem; margin: 0 0 25px;">Delete all progress for <strong>${this.playerName}</strong>? This cannot be undone!</p>
        <div style="display: flex; gap: 15px; justify-content: center;">
            <button id="cancelBtn" style="
                background: #e8e0d5;
                color: #6b5f4f;
                border: 2px solid #b76e57;
                padding: 12px 30px;
                border-radius: 50px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: 0.2s;
                flex: 1;
            ">Cancel</button>
            <button id="confirmDeleteBtn" style="
                background: #b76e57;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 50px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: 0.2s;
                flex: 1;
            ">Delete</button>
        </div>
    `;

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // Show animation
    setTimeout(() => {
      overlay.style.opacity = "1";
      dialog.style.transform = "scale(1)";
      dialog.style.opacity = "1";
    }, 10);

    // Handle buttons
    document.getElementById("cancelBtn").onclick = () => {
      dialog.style.transform = "scale(0.8)";
      dialog.style.opacity = "0";
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 300);
    };

    document.getElementById("confirmDeleteBtn").onclick = () => {
      dialog.style.transform = "scale(0.8)";
      dialog.style.opacity = "0";
      overlay.style.opacity = "0";

      setTimeout(() => {
        overlay.remove();

        // Delete logic
        const saveKey = `familyCrossword_${this.playerName}`;
        localStorage.removeItem(saveKey);

        this.resetGame();
        this.showMessage("🗑️ Score and progress deleted", "success");
      }, 300);
    };
  }

  // ---------- VIEW SAVED DATA ----------
  viewSavedData() {
    if (!this.playerName || this.playerName === "Player") {
      this.showMessage("No player selected", "warning");
      return;
    }

    const saveKey = `familyCrossword_${this.playerName}`;
    const savedData = localStorage.getItem(saveKey);

    if (savedData) {
      const data = JSON.parse(savedData);

      // Create custom dialog for viewing data
      const overlay = document.createElement("div");
      overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s;
        `;

      const dialog = document.createElement("div");
      dialog.style.cssText = `
            background: #fcf5e8;
            border: 3px solid #c2a578;
            border-radius: 20px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            text-align: left;
            transform: scale(0.8);
            opacity: 0;
            transition: all 0.3s;
            font-family: 'Quicksand', sans-serif;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        `;

      // Format date
      const lastPlayed = new Date(data.lastPlayed).toLocaleString();

      dialog.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 3rem; color: #c2a578; margin-bottom: 10px;">📊</div>
                <h3 style="font-family: 'Playfair Display'; color: #5a4e3e; font-size: 1.8rem; margin: 0;">Player Stats</h3>
            </div>
            
            <div style="background: #e8e0d5; border-radius: 15px; padding: 20px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px dashed #c2a578;">
                    <span style="color: #6b5f4f; font-weight: 600;">Player:</span>
                    <span style="color: #5a4e3e; font-weight: 700;">${data.playerName}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <span style="color: #6b5f4f; font-weight: 600;">Score:</span>
                    <span style="color: #8a9b6e; font-weight: 700; font-size: 1.2rem;">${data.score} pts</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <span style="color: #6b5f4f; font-weight: 600;">Progress:</span>
                    <span style="color: #5a4e3e; font-weight: 700;">${data.progress || 0}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <span style="color: #6b5f4f; font-weight: 600;">Hints Used:</span>
                    <span style="color: #5a4e3e; font-weight: 700;">${data.hintsUsed || 0}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #6b5f4f; font-weight: 600;">Last Played:</span>
                    <span style="color: #5a4e3e; font-weight: 700; text-align: right;">${lastPlayed}</span>
                </div>
            </div>
            
            <div style="text-align: center;">
                <button id="closeBtn" style="
                    background: #c2a578;
                    color: white;
                    border: none;
                    padding: 12px 40px;
                    border-radius: 50px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.2s;
                    min-width: 150px;
                ">Close</button>
            </div>
        `;

      overlay.appendChild(dialog);
      document.body.appendChild(overlay);

      // Show animation
      setTimeout(() => {
        overlay.style.opacity = "1";
        dialog.style.transform = "scale(1)";
        dialog.style.opacity = "1";
      }, 10);

      // Handle close button
      document.getElementById("closeBtn").onclick = () => {
        dialog.style.transform = "scale(0.8)";
        dialog.style.opacity = "0";
        overlay.style.opacity = "0";
        setTimeout(() => overlay.remove(), 300);
      };

      // Click outside to close
      overlay.onclick = (e) => {
        if (e.target === overlay) {
          dialog.style.transform = "scale(0.8)";
          dialog.style.opacity = "0";
          overlay.style.opacity = "0";
          setTimeout(() => overlay.remove(), 300);
        }
      };
    } else {
      this.showMessage("No saved data found", "info");
    }
  }
  // ---------- UTILITY METHODS ----------
  calculateProgress() {
    let filledCount = 0;
    let totalCount = 0;

    for (let r = 0; r < this.SIZE; r++) {
      for (let c = 0; c < this.SIZE; c++) {
        if (this.solutionGrid[r][c]) {
          totalCount++;
          if (this.userGrid[r][c]) {
            filledCount++;
          }
        }
      }
    }

    return totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;
  }

  updatePlayerDisplay() {
    if (this.playerNameElement) {
      this.playerNameElement.textContent = this.playerName;
    }
  }

  updateClueListStates() {
    document.querySelectorAll(".clue-item").forEach((item) => {
      const number = parseInt(item.dataset.number);
      const direction = item.dataset.direction;

      if (this.solvedClues.has(`${direction}-${number}`)) {
        item.classList.add("solved");
      } else {
        item.classList.remove("solved");
      }
    });
  }

  // ---------- SOLUTION GRID (12x12) ----------
  initSolution() {
    // Create empty 12x12 grid
    this.solutionGrid = Array(this.SIZE)
      .fill()
      .map(() => Array(this.SIZE).fill(""));

    // --- ACROSS WORDS ---
    // 1. GRANDMOTHER (12 letters) - Row 0 (row 1)
    const grandmother = "GRANDMOTHER";
    for (let c = 0; c < grandmother.length; c++) {
      this.solutionGrid[0][c] = grandmother[c];
    }

    // 2. FATHER (6 letters) - Row 1 (row 2) - columns 0-5
    const father = "FATHER";
    for (let c = 0; c < father.length; c++) {
      this.solutionGrid[1][c] = father[c];
    }

    // 3. BROTHER (7 letters) - Row 2 (row 3) - columns 0-6
    const brother = "BROTHER";
    for (let c = 0; c < brother.length; c++) {
      this.solutionGrid[2][c] = brother[c];
    }

    // 4. SISTER (6 letters) - Row 3 (row 4) - columns 0-5
    const sister = "SISTER";
    for (let c = 0; c < sister.length; c++) {
      this.solutionGrid[3][c] = sister[c];
    }

    // --- DOWN WORDS ---
    // 5. MOTHER (6 letters) - Column 0, rows 4-9 (row 5-10)
    const mother = "MOTHER";
    for (let r = 0; r < mother.length; r++) {
      this.solutionGrid[4 + r][0] = mother[r];
    }

    // 6. GRANDFATHER (11 letters) - Column 11, rows 0-10 (row 1-11)
    const grandfather = "GRANDFATHER";
    for (let r = 0; r < grandfather.length; r++) {
      this.solutionGrid[r][11] = grandfather[r];
    }

    // 7. UNCLE (5 letters) - Column 7, rows 4-8 (row 5-9)
    const uncle = "UNCLE";
    for (let r = 0; r < uncle.length; r++) {
      this.solutionGrid[4 + r][7] = uncle[r];
    }

    // 8. AUNT (4 letters) - Column 5, rows 5-8 (row 6-9)
    const aunt = "AUNT";
    for (let r = 0; r < aunt.length; r++) {
      this.solutionGrid[5 + r][5] = aunt[r];
    }
  }

  // ---------- EMPTY GRID FOR USER INPUT ----------
  initEmptyGrid() {
    this.userGrid = Array(this.SIZE)
      .fill()
      .map(() => Array(this.SIZE).fill(""));
  }

  // ---------- RENDER GRID ----------
  renderGrid() {
    if (!this.gridElement) return;

    this.gridElement.innerHTML = "";

    for (let r = 0; r < this.SIZE; r++) {
      for (let c = 0; c < this.SIZE; c++) {
        const cell = document.createElement("input");
        cell.type = "text";
        cell.className = "grid-cell";
        cell.maxLength = 1;
        cell.dataset.row = r;
        cell.dataset.col = c;

        // Check if this cell should be active (part of any word)
        const isActive = this.solutionGrid[r][c] !== "";

        if (isActive) {
          cell.value = this.userGrid[r][c] || "";
          cell.disabled = false;
          cell.readOnly = false;

          // Add cell number for clue starts
          if (r === 0 && c === 0) cell.dataset.number = "1";
          else if (r === 1 && c === 0) cell.dataset.number = "2";
          else if (r === 2 && c === 0) cell.dataset.number = "3";
          else if (r === 3 && c === 0) cell.dataset.number = "4";
          else if (r === 4 && c === 0) cell.dataset.number = "5";
          else if (r === 0 && c === 11) cell.dataset.number = "6";
          else if (r === 4 && c === 7) cell.dataset.number = "7";
          else if (r === 5 && c === 5) cell.dataset.number = "8";

          if (cell.dataset.number) {
            cell.setAttribute("data-has-number", "true");
          }

          cell.addEventListener("input", (e) => this.handleCellInput(e));
          cell.addEventListener("keydown", (e) => this.handleCellKeydown(e));
          cell.addEventListener("click", (e) => this.handleCellClick(e));
        } else {
          // Blocked cell
          cell.value = "";
          cell.disabled = true;
          cell.readOnly = true;
          cell.classList.add("blocked-cell");
        }

        this.gridElement.appendChild(cell);
      }
    }

    // Add cell numbers via CSS after render
    this.addCellNumbers();
  }

  addCellNumbers() {
    // Remove any existing style to avoid duplicates
    const existingStyle = document.getElementById("cell-number-styles");
    if (existingStyle) existingStyle.remove();

    // Add small number labels to clue-start cells
    const style = document.createElement("style");
    style.id = "cell-number-styles";
    style.textContent = `
            .grid-cell[data-has-number="true"] {
                position: relative;
            }
            .grid-cell[data-has-number="true"]::before {
                content: attr(data-number);
                position: absolute;
                top: 2px;
                left: 2px;
                font-size: 0.6rem;
                color: black;
                font-weight: 600;
                z-index: 5;
                text-shadow: 0 1px 1px rgba(0,0,0,0.2);
            }
        `;
    document.head.appendChild(style);
  }

  // ---------- EVENT HANDLERS ----------
  handleCellInput(e) {
    const cell = e.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    let val = cell.value.toUpperCase().replace(/[^A-Z]/g, "");

    if (val.length > 1) val = val.charAt(0);
    cell.value = val;
    this.userGrid[row][col] = val;

    // Check if this cell is part of current clue
    if (this.currentClue) {
      this.checkClueProgress();
    }

    // Auto-move to next cell
    if (val.length === 1) {
      this.moveToNextCell(row, col);
    }

    this.updateProgress();
    this.saveGame(); // Added missing parentheses
  }

  handleCellKeydown(e) {
    const cell = e.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    // Backspace: clear and move to previous
    if (e.key === "Backspace" || e.key === "Delete") {
      if (cell.value === "") {
        e.preventDefault();
        this.moveToPreviousCell(row, col);
      }
    }

    // Arrow keys: navigate
    if (e.key.startsWith("Arrow")) {
      e.preventDefault();
      this.navigateArrow(e.key, row, col);
    }
  }

  handleCellClick(e) {
    const cell = e.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    this.selectCell(row, col);
    cell.focus();
  }

  // ---------- CELL NAVIGATION ----------
  selectCell(row, col) {
    // Remove previous selection
    document.querySelectorAll(".grid-cell").forEach((cell) => {
      cell.classList.remove("selected", "highlight");
    });

    // Select new cell
    const cell = document.querySelector(
      `.grid-cell[data-row="${row}"][data-col="${col}"]`,
    );
    if (cell) {
      cell.classList.add("selected");
      this.selectedCell = { row, col };

      // Highlight entire word
      this.highlightWord(row, col);

      // Update current clue based on cell
      this.updateClueFromCell(row, col);
    }
  }

  highlightWord(row, col) {
    // Try across first
    let clue = this.getClueAtCell(row, col, "across");
    if (clue) {
      this.highlightClueCells(clue, "across");
      return;
    }

    // Then down
    clue = this.getClueAtCell(row, col, "down");
    if (clue) {
      this.highlightClueCells(clue, "down");
    }
  }
  getClueAtCell(row, col, direction) {
    if (direction === "across") {
      // Check if cell is in an across word
      if (row === 0 && col >= 0 && col < 11) {
        return { number: 1, row: 0, col: 0, length: 11, answer: "GRANDMOTHER" };
      }
      if (row === 1 && col >= 0 && col < 6) {
        return { number: 2, row: 1, col: 0, length: 6, answer: "FATHER" };
      }
      if (row === 2 && col >= 0 && col < 7) {
        return { number: 3, row: 2, col: 0, length: 7, answer: "BROTHER" };
      }
      if (row === 3 && col >= 0 && col < 6) {
        return { number: 4, row: 3, col: 0, length: 6, answer: "SISTER" };
      }
    } else {
      // Check down words
      if (col === 0 && row >= 4 && row < 10) {
        return { number: 5, row: 4, col: 0, length: 6, answer: "MOTHER" };
      }
      if (col === 11 && row >= 0 && row < 11) {
        return {
          number: 6,
          row: 0,
          col: 11,
          length: 11,
          answer: "GRANDFATHER",
        };
      }
      if (col === 7 && row >= 4 && row < 9) {
        return { number: 7, row: 4, col: 7, length: 5, answer: "UNCLE" };
      }
      if (col === 5 && row >= 5 && row < 9) {
        return { number: 8, row: 5, col: 5, length: 4, answer: "AUNT" };
      }
    }
    return null;
  }

  highlightClueCells(clue, direction) {
    document.querySelectorAll(".grid-cell").forEach((cell) => {
      cell.classList.remove("highlight");
    });

    for (let i = 0; i < clue.length; i++) {
      const row = direction === "across" ? clue.row : clue.row + i;
      const col = direction === "across" ? clue.col + i : clue.col;

      const cell = document.querySelector(
        `.grid-cell[data-row="${row}"][data-col="${col}"]`,
      );
      if (cell) {
        cell.classList.add("highlight");
      }
    }
  }

  updateClueFromCell(row, col) {
    // Try across first
    let clue = this.getClueAtCell(row, col, "across");
    if (clue) {
      this.selectClue(clue.number, "across");
      return;
    }

    // Then down
    clue = this.getClueAtCell(row, col, "down");
    if (clue) {
      this.selectClue(clue.number, "down");
    }
  }

  selectClue(number, direction) {
    this.currentClue = { number, direction };
    this.currentDirection = direction;

    // Update clue display
    this.updateClueDisplay(number, direction);

    // Highlight clue in list
    document.querySelectorAll(".clue-item").forEach((item) => {
      item.classList.remove("selected");
      if (
        parseInt(item.dataset.number) === number &&
        item.dataset.direction === direction
      ) {
        item.classList.add("selected");
      }
    });
  }

  updateClueDisplay(number, direction) {
    const clues = {
      across: {
        1: "The mother of your parent",
        2: "A male parent",
        3: "A boy who is your sibling",
        4: "A girl who is your sibling",
      },
      down: {
        5: "A female parent",
        6: "The father of your parent",
        7: "The brother of your parent",
        8: "The sister of your parent",
      },
    };

    if (this.clueDirectionElement) {
      this.clueDirectionElement.textContent = direction.toUpperCase();
    }

    if (this.currentClueElement) {
      this.currentClueElement.textContent =
        clues[direction][number] || "Select a clue";
    }
  }

  moveToNextCell(row, col) {
    if (!this.currentClue) return;

    const clue = this.getClueAtCell(row, col, this.currentDirection);
    if (!clue) return;

    let nextRow = row;
    let nextCol = col;

    if (this.currentDirection === "across") {
      nextCol = col + 1;
      if (nextCol >= clue.col + clue.length) {
        nextRow = row + 1;
        nextCol = clue.col;
      }
    } else {
      nextRow = row + 1;
      if (nextRow >= clue.row + clue.length) {
        nextRow = clue.row;
        nextCol = col + 1;
      }
    }

    // Find next valid cell
    if (nextRow < this.SIZE && nextCol < this.SIZE) {
      const nextCell = document.querySelector(
        `.grid-cell[data-row="${nextRow}"][data-col="${nextCol}"]`,
      );
      if (nextCell) {
        setTimeout(() => {
          this.selectCell(nextRow, nextCol);
          nextCell.focus();
        }, 50);
      }
    }
  }

  moveToPreviousCell(row, col) {
    if (!this.currentClue) return;

    const clue = this.getClueAtCell(row, col, this.currentDirection);
    if (!clue) return;

    let prevRow = row;
    let prevCol = col;

    if (this.currentDirection === "across") {
      prevCol = col - 1;
      if (prevCol < clue.col) {
        prevRow = row - 1;
        prevCol = clue.col + clue.length - 1;
      }
    } else {
      prevRow = row - 1;
      if (prevRow < clue.row) {
        prevRow = clue.row + clue.length - 1;
        prevCol = col - 1;
      }
    }

    if (prevRow >= 0 && prevCol >= 0) {
      const prevCell = document.querySelector(
        `.grid-cell[data-row="${prevRow}"][data-col="${prevCol}"]`,
      );
      if (prevCell) {
        setTimeout(() => {
          this.selectCell(prevRow, prevCol);
          prevCell.focus();
        }, 50);
      }
    }
  }

  navigateArrow(key, row, col) {
    let newRow = row;
    let newCol = col;

    switch (key) {
      case "ArrowUp":
        newRow = Math.max(0, row - 1);
        break;
      case "ArrowDown":
        newRow = Math.min(this.SIZE - 1, row + 1);
        break;
      case "ArrowLeft":
        newCol = Math.max(0, col - 1);
        break;
      case "ArrowRight":
        newCol = Math.min(this.SIZE - 1, col + 1);
        break;
    }

    const newCell = document.querySelector(
      `.grid-cell[data-row="${newRow}"][data-col="${newCol}"]`,
    );
    if (newCell) {
      this.selectCell(newRow, newCol);
      newCell.focus();
    }
  }

  // ---------- GAME LOGIC ----------
  checkClueProgress() {
    if (!this.currentClue) return false;

    const { number, direction } = this.currentClue;
    const clue = this.getClueByNumber(number, direction);
    if (!clue) return false;

    let isComplete = true;
    let userWord = "";
    let correctWord = clue.answer;

    for (let i = 0; i < clue.length; i++) {
      const row = direction === "across" ? clue.row : clue.row + i;
      const col = direction === "across" ? clue.col + i : clue.col;

      const userLetter = this.userGrid[row][col] || "";
      userWord += userLetter;

      if (!userLetter || userLetter !== correctWord[i]) {
        isComplete = false;
      }
    }

    if (isComplete && userWord === correctWord) {
      this.markClueSolved(number, direction);
      this.addScore(50);
      this.showMessage(`✨ ${correctWord} is correct! +50 points`, "success");
      return true;
    }

    return false;
  }
  getClueByNumber(number, direction) {
    const clues = {
      across: {
        1: { number: 1, row: 0, col: 0, length: 11, answer: "GRANDMOTHER" },
        2: { number: 2, row: 1, col: 0, length: 6, answer: "FATHER" },
        3: { number: 3, row: 2, col: 0, length: 7, answer: "BROTHER" },
        4: { number: 4, row: 3, col: 0, length: 6, answer: "SISTER" },
      },
      down: {
        5: { number: 5, row: 4, col: 0, length: 6, answer: "MOTHER" },
        6: { number: 6, row: 0, col: 11, length: 11, answer: "GRANDFATHER" },
        7: { number: 7, row: 4, col: 7, length: 5, answer: "UNCLE" },
        8: { number: 8, row: 5, col: 5, length: 4, answer: "AUNT" },
      },
    };

    return clues[direction]?.[number] || null;
  }

  markClueSolved(number, direction) {
    const clueKey = `${direction}-${number}`;

    // Check if already solved
    if (this.solvedClues.has(clueKey)) {
      return; // Already solved, don't count again
    }

    this.solvedClues.add(clueKey);

    const clueElement = document.querySelector(
      `.clue-item[data-number="${number}"][data-direction="${direction}"]`,
    );
    if (clueElement) {
      clueElement.classList.add("solved");
    }

    // Mark cells as correct
    const clue = this.getClueByNumber(number, direction);
    if (clue) {
      for (let i = 0; i < clue.length; i++) {
        const row = direction === "across" ? clue.row : clue.row + i;
        const col = direction === "across" ? clue.col + i : clue.col;

        const cell = document.querySelector(
          `.grid-cell[data-row="${row}"][data-col="${col}"]`,
        );
        if (cell) {
          cell.classList.add("correct");
        }
      }
    }

    console.log("Solved clues count:", this.solvedClues.size); // Debug log

    if (this.solvedClues.size === 8) {
      console.log("All 8 clues solved! Completing game...");
      this.completeGame();
    }

    this.saveGame();
  }

  // ---------- HINT SYSTEM ----------
  giveHint() {
    if (this.hints <= 0) {
      this.showMessage("❌ No hints remaining!", "warning");
      return;
    }

    if (!this.currentClue) {
      this.showMessage("Select a clue first!", "info");
      return;
    }

    const { number, direction } = this.currentClue;
    const clue = this.getClueByNumber(number, direction);
    if (!clue) return;

    // Find first empty or incorrect cell in this clue
    for (let i = 0; i < clue.length; i++) {
      const row = direction === "across" ? clue.row : clue.row + i;
      const col = direction === "across" ? clue.col + i : clue.col;

      const userLetter = this.userGrid[row][col] || "";
      const correctLetter = clue.answer[i];

      if (userLetter !== correctLetter) {
        // Fill with correct letter
        this.userGrid[row][col] = correctLetter;

        const cell = document.querySelector(
          `.grid-cell[data-row="${row}"][data-col="${col}"]`,
        );
        if (cell) {
          cell.value = correctLetter;
          cell.classList.add("filled");

          // Flash effect
          cell.classList.add("hint-flash");
          setTimeout(() => cell.classList.remove("hint-flash"), 600);
        }

        this.hints--;
        this.hintsUsed++;
        this.updateUI();

        this.showMessage(`💡 Hint: ${correctLetter} revealed!`, "info");

        // Check if clue is now complete
        this.checkClueProgress();

        return;
      }
    }

    this.showMessage("This clue is already complete!", "info");
  }

  // ---------- CHECK ANSWERS ----------
  checkAllAnswers() {
    let correctCount = 0;
    let totalWords = 8;

    // Check all across words
    for (let num = 1; num <= 4; num++) {
      const clue = this.getClueByNumber(num, "across");
      const isWordCorrect = this.checkWord(clue, "across");

      if (isWordCorrect) {
        correctCount++;
        // Only mark as solved if not already solved
        const clueKey = `across-${num}`;
        if (!this.solvedClues.has(clueKey)) {
          this.markClueSolved(num, "across");
        }
      }
    }

    // Check all down words
    for (let num = 5; num <= 8; num++) {
      const clue = this.getClueByNumber(num, "down");
      const isWordCorrect = this.checkWord(clue, "down");

      if (isWordCorrect) {
        correctCount++;
        // Only mark as solved if not already solved
        const clueKey = `down-${num}`;
        if (!this.solvedClues.has(clueKey)) {
          this.markClueSolved(num, "down");
        }
      }
    }

    const percentage = Math.round((correctCount / totalWords) * 100);
    this.showMessage(
      `📝 ${correctCount}/${totalWords} words correct (${percentage}%)`,
      "info",
    );

    // Only complete game if all 8 words are correct
    if (correctCount === totalWords) {
      this.completeGame();
    }

    return correctCount;
  }

  checkWord(clue, direction) {
    if (!clue) return false;

    let userWord = "";
    for (let i = 0; i < clue.length; i++) {
      const row = direction === "across" ? clue.row : clue.row + i;
      const col = direction === "across" ? clue.col + i : clue.col;
      const letter = this.userGrid[row][col] || "";

      // If any cell is empty, the word is not complete
      if (letter === "") {
        return false;
      }
      userWord += letter;
    }

    return userWord === clue.answer;
  }
  // ---------- REVEAL ALL  ----------
  revealAll() {
    // Create custom dialog
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s;
    `;

    const dialog = document.createElement("div");
    dialog.style.cssText = `
        background: #fcf5e8;
        border: 3px solid #b76e57;
        border-radius: 20px;
        padding: 30px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        transform: scale(0.8);
        opacity: 0;
        transition: all 0.3s;
        font-family: 'Quicksand', sans-serif;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;

    dialog.innerHTML = `
        <div style="font-size: 4rem; color: #b76e57; margin-bottom: 15px;">⚠️</div>
        <h3 style="font-family: 'Playfair Display'; color: #5a4e3e; font-size: 1.8rem; margin: 0 0 10px;">Reveal Answers</h3>
        <p style="color: #6b5f4f; font-size: 1.1rem; margin: 0 0 25px;">This will reveal all answers but you will NOT get any points. Continue?</p>
        <div style="display: flex; gap: 15px; justify-content: center;">
            <button id="cancelBtn" style="
                background: #e8e0d5;
                color: #6b5f4f;
                border: 2px solid #b76e57;
                padding: 12px 30px;
                border-radius: 50px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: 0.2s;
                flex: 1;
            ">Cancel</button>
            <button id="confirmRevealBtn" style="
                background: #b76e57;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 50px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: 0.2s;
                flex: 1;
            ">Reveal All</button>
        </div>
    `;

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // Show animation
    setTimeout(() => {
      overlay.style.opacity = "1";
      dialog.style.transform = "scale(1)";
      dialog.style.opacity = "1";
    }, 10);

    // Handle buttons
    document.getElementById("cancelBtn").onclick = () => {
      dialog.style.transform = "scale(0.8)";
      dialog.style.opacity = "0";
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 300);
    };

    document.getElementById("confirmRevealBtn").onclick = () => {
      dialog.style.transform = "scale(0.8)";
      dialog.style.opacity = "0";
      overlay.style.opacity = "0";

      setTimeout(() => {
        overlay.remove();

        let revealedCount = 0;

        for (let r = 0; r < this.SIZE; r++) {
          for (let c = 0; c < this.SIZE; c++) {
            if (this.solutionGrid[r] && this.solutionGrid[r][c]) {
              // Only fill if cell is empty or wrong
              if (this.userGrid[r][c] !== this.solutionGrid[r][c]) {
                this.userGrid[r][c] = this.solutionGrid[r][c];
                revealedCount++;

                const cell = document.querySelector(
                  `.grid-cell[data-row="${r}"][data-col="${c}"]`,
                );
                if (cell && !cell.disabled) {
                  cell.value = this.solutionGrid[r][c];
                  cell.classList.add("filled");
                  cell.classList.add("revealed"); // Add special class for revealed cells
                }
              }
            }
          }
        }

        // Mark clues as solved but DON'T add score
        for (let num = 1; num <= 4; num++) {
          const clue = this.getClueByNumber(num, "across");
          if (clue && this.checkWord(clue, "across")) {
            const clueKey = `across-${num}`;
            if (!this.solvedClues.has(clueKey)) {
              this.solvedClues.add(clueKey);

              // Add solved class to clue item
              const clueElement = document.querySelector(
                `.clue-item[data-number="${num}"][data-direction="across"]`,
              );
              if (clueElement) {
                clueElement.classList.add("solved");
              }
            }
          }
        }

        for (let num = 5; num <= 8; num++) {
          const clue = this.getClueByNumber(num, "down");
          if (clue && this.checkWord(clue, "down")) {
            const clueKey = `down-${num}`;
            if (!this.solvedClues.has(clueKey)) {
              this.solvedClues.add(clueKey);

              const clueElement = document.querySelector(
                `.clue-item[data-number="${num}"][data-direction="down"]`,
              );
              if (clueElement) {
                clueElement.classList.add("solved");
              }
            }
          }
        }

        this.updateUI();

        // Check if game is complete but don't add bonus points
        if (this.solvedClues.size === 8) {
          this.gameComplete = true;

          // Show victory modal but without adding bonus
          const modal = document.getElementById("victoryModal");
          if (modal) {
            document.getElementById("finalScore").textContent = this.score;
            document.getElementById("hintsUsed").textContent = this.hintsUsed;
            modal.classList.add("active");
          }

          this.showMessage(
            `🎉 Puzzle complete! Final score: ${this.score}`,
            "success",
          );
          this.celebrate();
        }

        this.saveGame();
      }, 300);
    };
  }

  // Update markClueSolved to not add score when called from reveal
  markClueSolved(number, direction, addScore = true) {
    const clueKey = `${direction}-${number}`;

    // Check if already solved
    if (this.solvedClues.has(clueKey)) {
      return;
    }

    this.solvedClues.add(clueKey);

    const clueElement = document.querySelector(
      `.clue-item[data-number="${number}"][data-direction="${direction}"]`,
    );
    if (clueElement) {
      clueElement.classList.add("solved");
    }

    // Mark cells as correct
    const clue = this.getClueByNumber(number, direction);
    if (clue) {
      for (let i = 0; i < clue.length; i++) {
        const row = direction === "across" ? clue.row : clue.row + i;
        const col = direction === "across" ? clue.col + i : clue.col;

        const cell = document.querySelector(
          `.grid-cell[data-row="${row}"][data-col="${col}"]`,
        );
        if (cell) {
          cell.classList.add("correct");
        }
      }
    }

    // Only add score if it's from normal gameplay (not from reveal)
    if (addScore) {
      this.addScore(50);
    }

    console.log("Solved clues count:", this.solvedClues.size);

    if (this.solvedClues.size === 8) {
      console.log("All 8 clues solved! Completing game...");
      this.completeGame();
    }

    this.saveGame();
  }

  // Update checkClueProgress to pass addScore = true
  checkClueProgress() {
    if (!this.currentClue) return false;

    const { number, direction } = this.currentClue;
    const clue = this.getClueByNumber(number, direction);
    if (!clue) return false;

    let isComplete = true;
    let userWord = "";
    let correctWord = clue.answer;

    for (let i = 0; i < clue.length; i++) {
      const row = direction === "across" ? clue.row : clue.row + i;
      const col = direction === "across" ? clue.col + i : clue.col;

      const userLetter = this.userGrid[row][col] || "";
      userWord += userLetter;

      if (!userLetter || userLetter !== correctWord[i]) {
        isComplete = false;
      }
    }

    if (isComplete && userWord === correctWord) {
      this.markClueSolved(number, direction, true); // true = add score
      this.showMessage(`✨ ${correctWord} is correct! +50 points`, "success");
      return true;
    }

    return false;
  }

  // ---------- RESET GAME ----------
  // ---------- RESET GAME ----------
  resetGame(showDialog = true) {
    // If showDialog is false, perform immediate reset without confirmation
    if (!showDialog) {
      this.performReset();
      return;
    }

    // Create custom dialog
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s;
    `;

    const dialog = document.createElement("div");
    dialog.style.cssText = `
        background: #fcf5e8;
        border: 3px solid #c2a578;
        border-radius: 20px;
        padding: 30px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        transform: scale(0.8);
        opacity: 0;
        transition: all 0.3s;
        font-family: 'Quicksand', sans-serif;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;

    dialog.innerHTML = `
        <div style="font-size: 4rem; color: #c2a578; margin-bottom: 15px;">🔄</div>
        <h3 style="font-family: 'Playfair Display'; color: #5a4e3e; font-size: 1.8rem; margin: 0 0 10px;">Reset Game</h3>
        <p style="color: #6b5f4f; font-size: 1.1rem; margin: 0 0 25px;">Reset game? Your current progress will be saved.</p>
        <div style="display: flex; gap: 15px; justify-content: center;">
            <button id="cancelBtn" style="
                background: #e8e0d5;
                color: #6b5f4f;
                border: 2px solid #c2a578;
                padding: 12px 30px;
                border-radius: 50px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: 0.2s;
                flex: 1;
            ">Cancel</button>
            <button id="confirmResetBtn" style="
                background: #8a9b6e;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 50px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: 0.2s;
                flex: 1;
            ">Reset Game</button>
        </div>
    `;

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // Show animation
    setTimeout(() => {
      overlay.style.opacity = "1";
      dialog.style.transform = "scale(1)";
      dialog.style.opacity = "1";
    }, 10);

    // Handle buttons
    document.getElementById("cancelBtn").onclick = () => {
      dialog.style.transform = "scale(0.8)";
      dialog.style.opacity = "0";
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 300);
    };

    document.getElementById("confirmResetBtn").onclick = () => {
      dialog.style.transform = "scale(0.8)";
      dialog.style.opacity = "0";
      overlay.style.opacity = "0";

      setTimeout(() => {
        overlay.remove();
        this.performReset();
      }, 300);
    };
  }

  // method to perform the reset logic
  performReset() {
    this.initEmptyGrid();
    this.renderGrid();

    this.score = 0;
    this.hints = this.MAX_HINTS;
    this.hintsUsed = 0;
    this.currentClue = null;
    this.selectedCell = { row: -1, col: -1 };
    this.gameComplete = false;
    this.solvedClues.clear();

    document.querySelectorAll(".clue-item").forEach((item) => {
      item.classList.remove("selected", "solved");
    });

    if (this.currentClueElement) {
      this.currentClueElement.textContent = "Click a clue to begin";
    }

    this.updateUI();
    this.saveGame();
  }
  // ---------- GAME COMPLETION ----------
  completeGame() {
    if (this.gameComplete) return;

    this.gameComplete = true;

    // Add completion bonus
    this.score += 100;
    this.updateUI();
    this.saveGame();

    // Show victory modal
    const modal = document.getElementById("victoryModal");
    if (modal) {
      document.getElementById("finalScore").textContent = this.score;
      document.getElementById("hintsUsed").textContent = this.hintsUsed;
      modal.classList.add("active");
    }

    this.showMessage(
      `🎉 Congratulations, ${this.playerName}! Puzzle complete!`,
      "success",
    );
    this.celebrate();
  }

  celebrate() {
    // Celebration animation
    const cells = document.querySelectorAll(
      ".grid-cell.correct, .grid-cell.filled",
    );
    cells.forEach((cell, index) => {
      setTimeout(() => {
        cell.style.transform = "scale(1.1)";
        cell.style.transition = "transform 0.2s";
        setTimeout(() => {
          cell.style.transform = "scale(1)";
        }, 200);
      }, index * 20);
    });
  }

  // ---------- UI UPDATES ----------
  updateUI() {
    // Update score
    if (this.scoreElement) {
      this.scoreElement.textContent = this.score;
    }

    // Update hints
    if (this.hintsLeftElement) {
      this.hintsLeftElement.textContent = this.hints;
    }
    if (this.hintCountElement) {
      this.hintCountElement.textContent = this.hints;
    }

    this.updateProgress();
  }

  updateProgress() {
    if (!this.progressElement) return;

    let filledCount = 0;
    let totalCount = 0;

    for (let r = 0; r < this.SIZE; r++) {
      for (let c = 0; c < this.SIZE; c++) {
        if (this.solutionGrid[r][c]) {
          totalCount++;
          if (this.userGrid[r][c]) {
            filledCount++;
          }
        }
      }
    }

    const percentage =
      totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;
    this.progressElement.textContent = `${percentage}%`;
  }

  addScore(points) {
    this.score += points;
    if (this.scoreElement) {
      this.scoreElement.textContent = this.score;
    }
  }

  showMessage(message, type = "info") {
    // Create toast notification
    const toast = document.createElement("div");
    toast.className = `game-toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #8a9b6e;
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 9999;
            font-family: 'Quicksand', sans-serif;
            font-weight: 500;
            animation: slideUp 0.3s ease;
        `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideDown 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3000);

    // Add animation styles if not present
    if (!document.querySelector("#toast-styles")) {
      const style = document.createElement("style");
      style.id = "toast-styles";
      style.textContent = `
                @keyframes slideUp {
                    from { transform: translateX(-50%) translateY(100%); opacity: 0; }
                    to { transform: translateX(-50%) translateY(0); opacity: 1; }
                }
                @keyframes slideDown {
                    from { transform: translateX(-50%) translateY(0); opacity: 1; }
                    to { transform: translateX(-50%) translateY(100%); opacity: 0; }
                }
            `;
      document.head.appendChild(style);
    }
  }

  // ---------- EVENT LISTENERS SETUP ----------
  setupEventListeners() {
    // Control buttons
    document
      .getElementById("hintBtn")
      ?.addEventListener("click", () => this.giveHint());
    document
      .getElementById("checkBtn")
      ?.addEventListener("click", () => this.checkAllAnswers());
    document
      .getElementById("resetBtn")
      ?.addEventListener("click", () => this.resetGame());
    document
      .getElementById("revealBtn")
      ?.addEventListener("click", () => this.revealAll());

    // Clue items
    document.querySelectorAll(".clue-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const number = parseInt(item.dataset.number);
        const direction = item.dataset.direction;
        this.selectClue(number, direction);

        // Highlight the clue's starting cell
        const clue = this.getClueByNumber(number, direction);
        if (clue) {
          this.selectCell(clue.row, clue.col);
        }
      });
    });

    // Tab buttons
    document.querySelectorAll(".tab-btn").forEach((tab) => {
      tab.addEventListener("click", () => {
        // Switch tab
        document
          .querySelectorAll(".tab-btn")
          .forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        // Switch clue panel
        const tabId = tab.dataset.tab;
        document.querySelectorAll(".clues-panel").forEach((panel) => {
          panel.classList.remove("active");
        });
        document.getElementById(`${tabId}-clues`)?.classList.add("active");
      });
    });

    // Victory modal
    document.getElementById("closeModal")?.addEventListener("click", () => {
      document.getElementById("victoryModal")?.classList.remove("active");
    });

    document.getElementById("playAgainBtn")?.addEventListener("click", () => {
      document.getElementById("victoryModal")?.classList.remove("active");
      this.resetGame();
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Ctrl+H for hint
      if (e.ctrlKey && e.key === "h") {
        e.preventDefault();
        this.giveHint();
      }

      // Ctrl+Enter to check
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        this.checkAllAnswers();
      }

      // Escape to close modal
      if (e.key === "Escape") {
        document.getElementById("victoryModal")?.classList.remove("active");
      }
    });
  }

  // ---------- USER EVENT LISTENERS ----------
  setupUserListeners() {
    // Start game button
    document.getElementById("startGameBtn")?.addEventListener("click", () => {
      const input = document.getElementById("usernameInput");
      const username = input.value.trim();
      if (username) {
        this.startGameWithUsername(username);
      } else {
        this.showMessage("Please enter your name", "warning");
      }
    });

    // Username input enter key
    document
      .getElementById("usernameInput")
      ?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          document.getElementById("startGameBtn")?.click();
        }
      });

    // Change player button
    document
      .getElementById("changePlayerBtn")
      ?.addEventListener("click", () => {
        this.saveGame();
        this.showUsernameModal();
      });

    // Delete score button
    document.getElementById("deleteScoreBtn")?.addEventListener("click", () => {
      this.deleteScore();
    });

    // View data button
    document.getElementById("viewDataBtn")?.addEventListener("click", () => {
      this.viewSavedData();
    });
  }
}

// ---------- ADD CSS FOR BLOCKED CELLS AND CUSTOM DIALOG ----------
(function addStyles() {
  const style = document.createElement("style");
  style.textContent = `
        /* Blocked cells */
       .grid-cell.blocked-cell {
    background: #e5e5e5 !important;
    background-image: 
        linear-gradient(45deg, 
            rgba(0,0,0,0.02) 25%, 
            transparent 25%, 
            transparent 50%, 
            rgba(0,0,0,0.02) 50%, 
            rgba(0,0,0,0.02) 75%, 
            transparent 75%, 
            transparent
        );
    background-size: 10px 10px;
    border: 1px solid #b0b0b0;
    border-radius: 4px;
    cursor: not-allowed;
    opacity: 0.8;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.2s ease;
}

.grid-cell.blocked-cell:hover {
    background: #d8d8d8 !important;
    background-image: 
        linear-gradient(45deg, 
            rgba(0,0,0,0.03) 25%, 
            transparent 25%, 
            transparent 50%, 
            rgba(0,0,0,0.03) 50%, 
            rgba(0,0,0,0.03) 75%, 
            transparent 75%, 
            transparent
        );
    background-size: 10px 10px;
    border-color: #909090;
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.1);
}

/* Subtle dot pattern */
.grid-cell.blocked-cell::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(100,100,100,0.1) 0%, transparent 30%);
    pointer-events: none;
}
        
      /* Custom Dialog Styles - Vintage Elegant */
.custom-dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.4s ease;
}

.custom-dialog-overlay:has(.dialog.show) {
    opacity: 1;
}

.custom-dialog {
    background: #fcf5e8;
    background-image: radial-gradient(circle at 30% 30%, rgba(255,245,220,0.8) 0%, #f0e2d0 100%);
    border: 4px solid #b89a7a;
    border-radius: 30px 30px 30px 30px;
    padding: 35px 30px;
    max-width: 420px;
    width: 90%;
    box-shadow: 
        0 25px 50px -8px rgba(0,0,0,0.4),
        0 10px 20px -5px rgba(0,0,0,0.3),
        inset 0 2px 10px rgba(255,245,210,0.6),
        inset 0 -2px 8px rgba(160,120,80,0.2);
    transform: scale(0.8) translateY(20px);
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.34, 1.4, 0.64, 1);
    text-align: center;
    position: relative;
    font-family: 'Quicksand', sans-serif;
    border-top: 2px solid #e8d5bc;
    border-left: 2px solid #e8d5bc;
}

.custom-dialog.show {
    transform: scale(1) translateY(0);
    opacity: 1;
}

/* Decorative corner elements */
.custom-dialog::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 15px;
    width: 40px;
    height: 40px;
    border-top: 3px solid #c2a578;
    border-left: 3px solid #c2a578;
    border-radius: 15px 0 0 0;
    opacity: 0.5;
}

.custom-dialog::after {
    content: '';
    position: absolute;
    bottom: 10px;
    right: 15px;
    width: 40px;
    height: 40px;
    border-bottom: 3px solid #c2a578;
    border-right: 3px solid #c2a578;
    border-radius: 0 0 15px 0;
    opacity: 0.5;
}

.dialog-icon {
    font-size: 4rem;
    margin-bottom: 15px;
    text-shadow: 2px 4px 8px rgba(160,120,80,0.3);
    animation: iconPulse 2s infinite ease-in-out;
}

@keyframes iconPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.dialog-warning .dialog-icon {
    color: #b76e57;
    filter: drop-shadow(0 4px 6px rgba(183,110,87,0.3));
}

.dialog-info .dialog-icon {
    color: #8a7a64;
    filter: drop-shadow(0 4px 6px rgba(138,122,100,0.3));
}

.dialog-title {
    font-family: 'Playfair Display', serif;
    color: #5a4e3e;
    margin: 0 0 15px 0;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
    position: relative;
    display: inline-block;
    padding-bottom: 12px;
}

.dialog-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
    height: 3px;
    background: linear-gradient(90deg, transparent, #c2a578, #b89a7a, #c2a578, transparent);
    border-radius: 3px;
}

.dialog-message {
    color: #6b5f4f;
    margin: 20px 0 30px;
    font-size: 1.2rem;
    line-height: 1.6;
    font-weight: 500;
    background: rgba(255,255,240,0.5);
    padding: 15px 20px;
    border-radius: 50px;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);
}

.dialog-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 10px;
}

.dialog-btn {
    padding: 14px 35px;
    border: none;
    border-radius: 60px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
}

.dialog-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
}

.dialog-btn:hover::before {
    left: 100%;
}

.cancel-btn {
    background: #e8e0d5;
    color: #6b5f4f;
    border: 2px solid #d4c5b5;
}

.cancel-btn:hover {
    background: #d8cdc0;
    transform: translateY(-3px);
    box-shadow: 0 8px 18px rgba(0,0,0,0.15);
    border-color: #b8a592;
}

.confirm-btn {
    background: #8a9b6e;
    color: white;
    border: 2px solid #6a7b4e;
    background: linear-gradient(145deg, #8a9b6e, #6b7d55);
}

.dialog-warning .confirm-btn {
    background: #b76e57;
    border-color: #974e37;
    background: linear-gradient(145deg, #b76e57, #9a5b47);
}

.confirm-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(138, 155, 110, 0.5);
}

.dialog-warning .confirm-btn:hover {
    box-shadow: 0 8px 20px rgba(183, 110, 87, 0.5);
}
    `;
  document.head.appendChild(style);
})();

// ---------- INITIALIZE GAME ----------
document.addEventListener("DOMContentLoaded", () => {
  window.game = new FamilyCrossword();
});
