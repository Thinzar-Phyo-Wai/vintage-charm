/**
 * VINTAGE CHARM · FAMILY CROSSWORD
 * Complete working crossword game with beautiful UI
 */



class FamilyCrossword {

    
    constructor() {
        // Game configuration
        this.SIZE = 12;
        this.MAX_HINTS = 3;
        
        // Game state
        this.score = 0;
        this.hints = this.MAX_HINTS;
        this.hintsUsed = 0;
        this.currentClue = null;
        this.currentDirection = 'across';
        this.selectedCell = { row: -1, col: -1 };
        this.gameComplete = false;
        this.userGrid = [];
        this.solutionGrid = [];
        
        // DOM elements
        this.gridElement = document.getElementById('crosswordGrid');
        this.scoreElement = document.getElementById('score');
        this.hintsLeftElement = document.getElementById('hintsLeft');
        this.hintCountElement = document.getElementById('hintCount');
        this.progressElement = document.getElementById('progress');
        this.currentClueElement = document.getElementById('currentClue');
        this.clueDirectionElement = document.getElementById('clueDirection');
        
        // Initialize the game
        this.initSolution();
        this.initEmptyGrid();
        this.renderGrid();
        this.setupEventListeners();
        this.updateUI();
        
        console.log('✨ Family Crossword initialized');
    }
    
    // ---------- SOLUTION GRID (12x12) ----------
    initSolution() {
        // Create empty 12x12 grid
        this.solutionGrid = Array(this.SIZE).fill().map(() => Array(this.SIZE).fill(''));
        
        // --- ACROSS WORDS ---
        // 1. GRANDMOTHER (12 letters) - Row 0 (row 1)
        const grandmother = 'GRANDMOTHER';
        for (let c = 0; c < 12; c++) {
            this.solutionGrid[0][c] = grandmother[c];
        }
        
        // 2. FATHER (6 letters) - Row 1 (row 2) - columns 0-5
        const father = 'FATHER';
        for (let c = 0; c < father.length; c++) {
            this.solutionGrid[1][c] = father[c];
        }
        
        // 3. BROTHER (7 letters) - Row 2 (row 3) - columns 0-6
        const brother = 'BROTHER';
        for (let c = 0; c < brother.length; c++) {
            this.solutionGrid[2][c] = brother[c];
        }
        
        // 4. SISTER (6 letters) - Row 3 (row 4) - columns 0-5
        const sister = 'SISTER';
        for (let c = 0; c < sister.length; c++) {
            this.solutionGrid[3][c] = sister[c];
        }
        
        // --- DOWN WORDS ---
        // 5. MOTHER (6 letters) - Column 0, rows 4-9 (row 5-10)
        const mother = 'MOTHER';
        for (let r = 0; r < mother.length; r++) {
            this.solutionGrid[4 + r][0] = mother[r];
        }
        
        // 6. GRANDFATHER (11 letters) - Column 11, rows 0-10 (row 1-11)
        const grandfather = 'GRANDFATHER';
        for (let r = 0; r < grandfather.length; r++) {
            this.solutionGrid[r][11] = grandfather[r];
        }
        
        // 7. UNCLE (5 letters) - Column 7, rows 4-8 (row 5-9)
        const uncle = 'UNCLE';
        for (let r = 0; r < uncle.length; r++) {
            this.solutionGrid[4 + r][7] = uncle[r];
        }
        
        // 8. AUNT (4 letters) - Column 5, rows 5-8 (row 6-9)
        const aunt = 'AUNT';
        for (let r = 0; r < aunt.length; r++) {
            this.solutionGrid[5 + r][5] = aunt[r];
        }
    }
    
    // ---------- EMPTY GRID FOR USER INPUT ----------
    initEmptyGrid() {
        this.userGrid = Array(this.SIZE).fill().map(() => Array(this.SIZE).fill(''));
    }
    
    // ---------- RENDER GRID ----------
    renderGrid() {
        this.gridElement.innerHTML = '';
        
        for (let r = 0; r < this.SIZE; r++) {
            for (let c = 0; c < this.SIZE; c++) {
                const cell = document.createElement('input');
                cell.type = 'text';
                cell.className = 'grid-cell';
                cell.maxLength = 1;
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.value = this.userGrid[r][c] || '';
                
                // Add cell number for clue starts
                if (r === 0 && c === 0) cell.dataset.number = '1';
                else if (r === 1 && c === 0) cell.dataset.number = '2';
                else if (r === 2 && c === 0) cell.dataset.number = '3';
                else if (r === 3 && c === 0) cell.dataset.number = '4';
                else if (r === 4 && c === 0) cell.dataset.number = '5';
                else if (r === 0 && c === 11) cell.dataset.number = '6';
                else if (r === 4 && c === 7) cell.dataset.number = '7';
                else if (r === 5 && c === 5) cell.dataset.number = '8';
                
                // Add number span for visual
                if (cell.dataset.number) {
                    cell.setAttribute('data-has-number', 'true');
                    const numberSpan = document.createElement('span');
                    numberSpan.className = 'cell-number-display';
                    numberSpan.textContent = cell.dataset.number;
                    // Will be positioned via CSS pseudo-element
                }
                
                cell.addEventListener('input', (e) => this.handleCellInput(e));
                cell.addEventListener('keydown', (e) => this.handleCellKeydown(e));
                cell.addEventListener('click', (e) => this.handleCellClick(e));
                
                this.gridElement.appendChild(cell);
            }
        }
        
        // Add cell numbers via CSS after render
        this.addCellNumbers();
    }
    
    addCellNumbers() {
        // Add small number labels to clue-start cells
        const style = document.createElement('style');
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
                color: var(--aged-gold);
                font-weight: 600;
                z-index: 5;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ---------- EVENT HANDLERS ----------
    handleCellInput(e) {
        const cell = e.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        let val = cell.value.toUpperCase().replace(/[^A-Z]/g, '');
        
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
    }
    
    handleCellKeydown(e) {
        const cell = e.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        // Backspace: clear and move to previous
        if (e.key === 'Backspace' || e.key === 'Delete') {
            if (cell.value === '') {
                e.preventDefault();
                this.moveToPreviousCell(row, col);
            }
        }
        
        // Arrow keys: navigate
        if (e.key.startsWith('Arrow')) {
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
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.remove('selected', 'highlight');
        });
        
        // Select new cell
        const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.classList.add('selected');
            this.selectedCell = { row, col };
            
            // Highlight entire word
            this.highlightWord(row, col);
            
            // Update current clue based on cell
            this.updateClueFromCell(row, col);
        }
    }
    
    highlightWord(row, col) {
        // Try across first
        let clue = this.getClueAtCell(row, col, 'across');
        if (clue) {
            this.highlightClueCells(clue, 'across');
            return;
        }
        
        // Then down
        clue = this.getClueAtCell(row, col, 'down');
        if (clue) {
            this.highlightClueCells(clue, 'down');
        }
    }
    
    getClueAtCell(row, col, direction) {
        if (direction === 'across') {
            // Check if cell is in an across word
            if (row === 0 && col >= 0 && col < 12) {
                return { number: 1, row: 0, col: 0, length: 12, answer: 'GRANDMOTHER' };
            }
            if (row === 1 && col >= 0 && col < 6) {
                return { number: 2, row: 1, col: 0, length: 6, answer: 'FATHER' };
            }
            if (row === 2 && col >= 0 && col < 7) {
                return { number: 3, row: 2, col: 0, length: 7, answer: 'BROTHER' };
            }
            if (row === 3 && col >= 0 && col < 6) {
                return { number: 4, row: 3, col: 0, length: 6, answer: 'SISTER' };
            }
        } else {
            // Check down words
            if (col === 0 && row >= 4 && row < 10) {
                return { number: 5, row: 4, col: 0, length: 6, answer: 'MOTHER' };
            }
            if (col === 11 && row >= 0 && row < 11) {
                return { number: 6, row: 0, col: 11, length: 11, answer: 'GRANDFATHER' };
            }
            if (col === 7 && row >= 4 && row < 9) {
                return { number: 7, row: 4, col: 7, length: 5, answer: 'UNCLE' };
            }
            if (col === 5 && row >= 5 && row < 9) {
                return { number: 8, row: 5, col: 5, length: 4, answer: 'AUNT' };
            }
        }
        return null;
    }
    
    highlightClueCells(clue, direction) {
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.remove('highlight');
        });
        
        for (let i = 0; i < clue.length; i++) {
            const row = direction === 'across' ? clue.row : clue.row + i;
            const col = direction === 'across' ? clue.col + i : clue.col;
            
            const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add('highlight');
            }
        }
    }
    
    updateClueFromCell(row, col) {
        // Try across first
        let clue = this.getClueAtCell(row, col, 'across');
        if (clue) {
            this.selectClue(clue.number, 'across');
            return;
        }
        
        // Then down
        clue = this.getClueAtCell(row, col, 'down');
        if (clue) {
            this.selectClue(clue.number, 'down');
        }
    }
    
    selectClue(number, direction) {
        this.currentClue = { number, direction };
        this.currentDirection = direction;
        
        // Update clue display
        this.updateClueDisplay(number, direction);
        
        // Highlight clue in list
        document.querySelectorAll('.clue-item').forEach(item => {
            item.classList.remove('selected');
            if (parseInt(item.dataset.number) === number && 
                item.dataset.direction === direction) {
                item.classList.add('selected');
            }
        });
    }
    
    updateClueDisplay(number, direction) {
        const clues = {
            'across': {
                1: 'The mother of your parent',
                2: 'A male parent',
                3: 'A boy who is your sibling',
                4: 'A girl who is your sibling'
            },
            'down': {
                5: 'A female parent',
                6: 'The father of your parent',
                7: 'The brother of your parent',
                8: 'The sister of your parent'
            }
        };
        
        if (this.clueDirectionElement) {
            this.clueDirectionElement.textContent = direction.toUpperCase();
        }
        
        if (this.currentClueElement) {
            this.currentClueElement.textContent = clues[direction][number] || 'Select a clue';
        }
    }
    
    moveToNextCell(row, col) {
        if (!this.currentClue) return;
        
        const clue = this.getClueAtCell(row, col, this.currentDirection);
        if (!clue) return;
        
        let nextRow = row;
        let nextCol = col;
        
        if (this.currentDirection === 'across') {
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
            const nextCell = document.querySelector(`.grid-cell[data-row="${nextRow}"][data-col="${nextCol}"]`);
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
        
        if (this.currentDirection === 'across') {
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
            const prevCell = document.querySelector(`.grid-cell[data-row="${prevRow}"][data-col="${prevCol}"]`);
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
        
        switch(key) {
            case 'ArrowUp': newRow = Math.max(0, row - 1); break;
            case 'ArrowDown': newRow = Math.min(this.SIZE - 1, row + 1); break;
            case 'ArrowLeft': newCol = Math.max(0, col - 1); break;
            case 'ArrowRight': newCol = Math.min(this.SIZE - 1, col + 1); break;
        }
        
        const newCell = document.querySelector(`.grid-cell[data-row="${newRow}"][data-col="${newCol}"]`);
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
        let userWord = '';
        let correctWord = clue.answer;
        
        for (let i = 0; i < clue.length; i++) {
            const row = direction === 'across' ? clue.row : clue.row + i;
            const col = direction === 'across' ? clue.col + i : clue.col;
            
            const userLetter = this.userGrid[row][col] || '';
            userWord += userLetter;
            
            if (!userLetter || userLetter !== correctWord[i]) {
                isComplete = false;
            }
        }
        
        if (isComplete && userWord === correctWord) {
            this.markClueSolved(number, direction);
            this.addScore(50);
            this.showMessage(`✨ ${correctWord} is correct! +50 points`, 'success');
            return true;
        }
        
        return false;
    }
    
    getClueByNumber(number, direction) {
        const clues = {
            'across': {
                1: { number: 1, row: 0, col: 0, length: 12, answer: 'GRANDMOTHER' },
                2: { number: 2, row: 1, col: 0, length: 6, answer: 'FATHER' },
                3: { number: 3, row: 2, col: 0, length: 7, answer: 'BROTHER' },
                4: { number: 4, row: 3, col: 0, length: 6, answer: 'SISTER' }
            },
            'down': {
                5: { number: 5, row: 4, col: 0, length: 6, answer: 'MOTHER' },
                6: { number: 6, row: 0, col: 11, length: 11, answer: 'GRANDFATHER' },
                7: { number: 7, row: 4, col: 7, length: 5, answer: 'UNCLE' },
                8: { number: 8, row: 5, col: 5, length: 4, answer: 'AUNT' }
            }
        };
        
        return clues[direction]?.[number] || null;
    }
    
    markClueSolved(number, direction) {
        const clueElement = document.querySelector(
            `.clue-item[data-number="${number}"][data-direction="${direction}"]`
        );
        if (clueElement) {
            clueElement.classList.add('solved');
        }
        
        // Mark cells as correct
        const clue = this.getClueByNumber(number, direction);
        if (clue) {
            for (let i = 0; i < clue.length; i++) {
                const row = direction === 'across' ? clue.row : clue.row + i;
                const col = direction === 'across' ? clue.col + i : clue.col;
                
                const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
                if (cell) {
                    cell.classList.add('correct');
                }
            }
        }
    }
    
    // ---------- HINT SYSTEM ----------
    giveHint() {
        if (this.hints <= 0) {
            this.showMessage('❌ No hints remaining!', 'warning');
            return;
        }
        
        if (!this.currentClue) {
            this.showMessage('Select a clue first!', 'info');
            return;
        }
        
        const { number, direction } = this.currentClue;
        const clue = this.getClueByNumber(number, direction);
        if (!clue) return;
        
        // Find first empty or incorrect cell in this clue
        for (let i = 0; i < clue.length; i++) {
            const row = direction === 'across' ? clue.row : clue.row + i;
            const col = direction === 'across' ? clue.col + i : clue.col;
            
            const userLetter = this.userGrid[row][col] || '';
            const correctLetter = clue.answer[i];
            
            if (userLetter !== correctLetter) {
                // Fill with correct letter
                this.userGrid[row][col] = correctLetter;
                
                const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
                if (cell) {
                    cell.value = correctLetter;
                    cell.classList.add('filled');
                    
                    // Flash effect
                    cell.classList.add('hint-flash');
                    setTimeout(() => cell.classList.remove('hint-flash'), 600);
                }
                
                this.hints--;
                this.hintsUsed++;
                this.updateUI();
                
                this.showMessage(`💡 Hint: ${correctLetter} revealed!`, 'info');
                
                // Check if clue is now complete
                this.checkClueProgress();
                
                return;
            }
        }
        
        this.showMessage('This clue is already complete!', 'info');
    }
    
    // ---------- CHECK ANSWERS ----------
    checkAllAnswers() {
        let correctCount = 0;
        let totalWords = 8;
        
        // Check all across words
        for (let num = 1; num <= 4; num++) {
            const clue = this.getClueByNumber(num, 'across');
            if (this.checkWord(clue, 'across')) {
                correctCount++;
                this.markClueSolved(num, 'across');
            }
        }
        
        // Check all down words
        for (let num = 5; num <= 8; num++) {
            const clue = this.getClueByNumber(num, 'down');
            if (this.checkWord(clue, 'down')) {
                correctCount++;
                this.markClueSolved(num, 'down');
            }
        }
        
        const percentage = Math.round((correctCount / totalWords) * 100);
        this.showMessage(`📝 ${correctCount}/${totalWords} words correct (${percentage}%)`, 'info');
        
        if (correctCount === totalWords) {
            this.completeGame();
        }
        
        return correctCount;
    }
    
    checkWord(clue, direction) {
        if (!clue) return false;
        
        let userWord = '';
        for (let i = 0; i < clue.length; i++) {
            const row = direction === 'across' ? clue.row : clue.row + i;
            const col = direction === 'across' ? clue.col + i : clue.col;
            userWord += this.userGrid[row][col] || '';
        }
        
        return userWord === clue.answer;
    }
    
    // ---------- REVEAL ALL ----------
    revealAll() {
        if (confirm('This will reveal all answers. Continue?')) {
            for (let r = 0; r < this.SIZE; r++) {
                for (let c = 0; c < this.SIZE; c++) {
                    if (this.solutionGrid[r][c]) {
                        this.userGrid[r][c] = this.solutionGrid[r][c];
                        const cell = document.querySelector(`.grid-cell[data-row="${r}"][data-col="${c}"]`);
                        if (cell) {
                            cell.value = this.solutionGrid[r][c];
                            cell.classList.add('filled');
                        }
                    }
                }
            }
            
            // Mark all clues as solved
            for (let num = 1; num <= 4; num++) {
                this.markClueSolved(num, 'across');
            }
            for (let num = 5; num <= 8; num++) {
                this.markClueSolved(num, 'down');
            }
            
            this.score = Math.max(0, this.score - 100);
            this.updateUI();
            this.completeGame();
        }
    }
    
    // ---------- RESET GAME ----------
    resetGame() {
        if (confirm('Start a new game?')) {
            this.initEmptyGrid();
            this.renderGrid();
            
            this.score = 0;
            this.hints = this.MAX_HINTS;
            this.hintsUsed = 0;
            this.currentClue = null;
            this.selectedCell = { row: -1, col: -1 };
            this.gameComplete = false;
            
            // Reset clue list
            document.querySelectorAll('.clue-item').forEach(item => {
                item.classList.remove('selected', 'solved');
            });
            
            // Reset clue display
            if (this.currentClueElement) {
                this.currentClueElement.textContent = 'Click a clue to begin';
            }
            
            this.updateUI();
            this.showMessage('🔄 New game started! Good luck!', 'success');
        }
    }
    
    // ---------- GAME COMPLETION ----------
    completeGame() {
        if (this.gameComplete) return;
        
        this.gameComplete = true;
        
        // Add completion bonus
        this.score += 100;
        this.updateUI();
        
        // Show victory modal
        const modal = document.getElementById('victoryModal');
        if (modal) {
            document.getElementById('finalScore').textContent = this.score;
            document.getElementById('hintsUsed').textContent = this.hintsUsed;
            modal.classList.add('active');
        }
        
        this.showMessage('🎉 Congratulations! Puzzle complete!', 'success');
        this.celebrate();
    }
    
    celebrate() {
        // Celebration animation
        const cells = document.querySelectorAll('.grid-cell.correct, .grid-cell.filled');
        cells.forEach((cell, index) => {
            setTimeout(() => {
                cell.style.transform = 'scale(1.1)';
                cell.style.transition = 'transform 0.2s';
                setTimeout(() => {
                    cell.style.transform = 'scale(1)';
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
        
        const percentage = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;
        this.progressElement.textContent = `${percentage}%`;
    }
    
    addScore(points) {
        this.score += points;
        if (this.scoreElement) {
            this.scoreElement.textContent = this.score;
        }
    }
    
    showMessage(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `game-toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#8a9b6e' : 
                        type === 'warning' ? '#b76e57' : 
                        '#c2a578'};
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
            toast.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
        
        // Add animation styles if not present
        if (!document.querySelector('#toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
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
        document.getElementById('hintBtn')?.addEventListener('click', () => this.giveHint());
        document.getElementById('checkBtn')?.addEventListener('click', () => this.checkAllAnswers());
        document.getElementById('resetBtn')?.addEventListener('click', () => this.resetGame());
        document.getElementById('revealBtn')?.addEventListener('click', () => this.revealAll());
        
        // Clue items
        document.querySelectorAll('.clue-item').forEach(item => {
            item.addEventListener('click', (e) => {
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
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', () => {
                // Switch tab
                document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Switch clue panel
                const tabId = tab.dataset.tab;
                document.querySelectorAll('.clues-panel').forEach(panel => {
                    panel.classList.remove('active');
                });
                document.getElementById(`${tabId}-clues`)?.classList.add('active');
            });
        });
        
        // Victory modal
        document.getElementById('closeModal')?.addEventListener('click', () => {
            document.getElementById('victoryModal')?.classList.remove('active');
        });
        
        document.getElementById('playAgainBtn')?.addEventListener('click', () => {
            document.getElementById('victoryModal')?.classList.remove('active');
            this.resetGame();
        });
        
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+H for hint
            if (e.ctrlKey && e.key === 'h') {
                e.preventDefault();
                this.giveHint();
            }
            
            // Ctrl+Enter to check
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.checkAllAnswers();
            }
            
            // Escape to close modal
            if (e.key === 'Escape') {
                document.getElementById('victoryModal')?.classList.remove('active');
            }
        });
    }
}

// ---------- INITIALIZE GAME ----------
document.addEventListener('DOMContentLoaded', () => {
    window.game = new FamilyCrossword();
});