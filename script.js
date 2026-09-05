/* =========================================
   FITNESS FREAK - FIXED JAVASCRIPT
   All Features Working - No Conflicts
========================================= */

// Remove all old event listeners
document.querySelectorAll("*").forEach(el => {
    el.replaceWith(el.cloneNode(true));
});

console.log("🔄 Clearing old JavaScript...");


/* =========================================
   NAVIGATION BUTTONS
========================================= */

const navButtons = {
    "Start Your Fitness Journey": "goals",
    "Explore Workouts": "workout",
    "View My Workout": "workout",
    "Explore Calisthenics": "calisthenics",
    "Calculate Calories": "calories",
    "Find My Goal": "goals"
};

Object.entries(navButtons).forEach(([buttonText, sectionId]) => {
    document.querySelectorAll(".btn, button").forEach(btn => {
        if (btn.textContent.trim() === buttonText) {
            btn.addEventListener("click", function() {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                }
            });
        }
    });
});


/* =========================================
   GOAL CARDS - TOGGLE INFORMATION
========================================= */

const goalInfo = {
    "Weight Loss": `
        <h3>🔥 Weight Loss Guide</h3>
        <p>Build healthy habits and improve your fitness gradually.</p>
        <h4>🏃 Workout</h4>
        <ul>
            <li>Walking or light jogging</li>
            <li>Bodyweight exercises</li>
            <li>Core exercises</li>
            <li>Regular activity</li>
        </ul>
        <h4>🥗 Food</h4>
        <ul>
            <li>Eat balanced meals</li>
            <li>Include vegetables and fruits</li>
            <li>Include protein-rich foods</li>
            <li>Drink enough water</li>
        </ul>
        <h4>🎯 Focus</h4>
        <p>Build consistent habits instead of extreme dieting.</p>
    `,
    "Weight Gain": `
        <h3>💪 Weight Gain Guide</h3>
        <p>Focus on balanced nutrition and strength development.</p>
        <h4>🏋️ Training</h4>
        <ul>
            <li>Squats</li>
            <li>Push-ups</li>
            <li>Rows</li>
            <li>Pull-up progressions</li>
        </ul>
        <h4>🍚 Food</h4>
        <ul>
            <li>Eat regular balanced meals</li>
            <li>Include protein-rich foods</li>
            <li>Include carbohydrates</li>
            <li>Include healthy fats</li>
        </ul>
        <h4>😴 Recovery</h4>
        <p>Give your body enough rest between challenging workouts.</p>
    `,
    "Build Strength": `
        <h3>🏋️ Build Strength Guide</h3>
        <p>Develop strength through consistent resistance training.</p>
        <h4>💪 Exercises</h4>
        <ul>
            <li>Squats</li>
            <li>Push-ups</li>
            <li>Pull-ups</li>
            <li>Rows</li>
            <li>Planks</li>
        </ul>
        <h4>📈 Progression</h4>
        <p>Start with movements you can perform safely and gradually increase difficulty.</p>
        <h4>😴 Recovery</h4>
        <p>Rest is an important part of getting stronger.</p>
    `,
    "General Fitness": `
        <h3>⚡ General Fitness Guide</h3>
        <p>Build a balanced routine with movement, strength, and endurance.</p>
        <h4>🏃 Cardio</h4>
        <ul>
            <li>Walking</li>
            <li>Cycling</li>
            <li>Jogging</li>
            <li>Sports</li>
        </ul>
        <h4>💪 Strength</h4>
        <ul>
            <li>Squats</li>
            <li>Push-ups</li>
            <li>Planks</li>
            <li>Bodyweight exercises</li>
        </ul>
        <h4>🎯 Focus</h4>
        <p>Stay active regularly and build healthy long-term habits.</p>
    `
};

document.querySelectorAll(".goal-card").forEach(card => {
    card.addEventListener("click", function(e) {
        e.stopPropagation();
        
        const title = this.querySelector("h3").textContent.trim();
        const existingInfo = this.querySelector(".button-info");
        
        // If info exists, remove it
        if (existingInfo) {
            existingInfo.remove();
            this.classList.remove("selected");
            return;
        }
        
        // Remove info from all other cards
        document.querySelectorAll(".goal-card .button-info").forEach(info => info.remove());
        document.querySelectorAll(".goal-card").forEach(c => c.classList.remove("selected"));
        
        // Add info to this card
        if (goalInfo[title]) {
            const info = document.createElement("div");
            info.className = "button-info";
            info.innerHTML = goalInfo[title];
            info.style.display = "block";
            this.appendChild(info);
            this.classList.add("selected");
        }
    });
});

// Close goal cards when clicking outside
document.addEventListener("click", function(e) {
    if (!e.target.closest(".goal-card")) {
        document.querySelectorAll(".goal-card .button-info").forEach(info => info.remove());
        document.querySelectorAll(".goal-card").forEach(c => c.classList.remove("selected"));
    }
});


/* =========================================
   CALISTHENICS - TOGGLE INFORMATION
========================================= */

const calisthenicsInfo = {
    "Beginner": `
        <h3>🟢 Beginner</h3>
        <p>Start your calisthenics journey with basic bodyweight movements.</p>
        <h4>🏋️ Workout</h4>
        <ul>
            <li>Wall Push-ups — 3 sets</li>
            <li>Incline Push-ups — 3 sets</li>
            <li>Bodyweight Squats — 3 sets</li>
            <li>Glute Bridge — 3 sets</li>
            <li>Plank — 3 sets × 20-30 sec</li>
        </ul>
        <h4>🎯 Focus</h4>
        <p>Learn proper technique and build a strong foundation.</p>
    `,
    "Intermediate": `
        <h3>🟡 Intermediate</h3>
        <p>Build strength, balance and better body control.</p>
        <h4>🏋️ Workout</h4>
        <ul>
            <li>Push-ups — 3 sets</li>
            <li>Assisted Pull-ups — 3 sets</li>
            <li>Dips — 3 sets</li>
            <li>Lunges — 3 sets</li>
            <li>Hollow Body Hold — 3 sets × 30-45 sec</li>
        </ul>
        <h4>🎯 Focus</h4>
        <p>Improve control and gradually progress to harder movements.</p>
    `,
    "Advanced": `
        <h3>🔴 Advanced</h3>
        <p>Progress toward challenging bodyweight skills.</p>
        <h4>🏋️ Skills</h4>
        <ul>
            <li>Advanced Push-up Progressions</li>
            <li>Pull-up Progressions</li>
            <li>Dip Progressions</li>
            <li>Handstand Practice</li>
            <li>Advanced Core Holds</li>
        </ul>
        <h4>🎯 Focus</h4>
        <p>Maintain good technique while progressing gradually.</p>
    `,
    "Expert": `
        <h3>⭐ Expert</h3>
        <p>Work toward advanced calisthenics skills with patience.</p>
        <h4>🏆 Skills</h4>
        <ul>
            <li>Planche Progressions</li>
            <li>Front Lever Progressions</li>
            <li>Handstand Push-up Progressions</li>
            <li>Muscle-up Progressions</li>
            <li>Advanced Core Training</li>
        </ul>
        <h4>🎯 Focus</h4>
        <p>Master advanced movements through gradual progression.</p>
    `
};

document.querySelectorAll(".progression-step").forEach(step => {
    step.addEventListener("click", function(e) {
        e.stopPropagation();
        
        const title = this.querySelector("h4").textContent.trim();
        const existingInfo = this.querySelector(".level-info");
        
        // If info exists, remove it
        if (existingInfo) {
            existingInfo.remove();
            this.classList.remove("active-level");
            return;
        }
        
        // Remove info from all other steps
        document.querySelectorAll(".progression-step .level-info").forEach(info => info.remove());
        document.querySelectorAll(".progression-step").forEach(s => s.classList.remove("active-level"));
        
        // Add info to this step
        if (calisthenicsInfo[title]) {
            const info = document.createElement("div");
            info.className = "level-info";
            info.innerHTML = calisthenicsInfo[title];
            info.style.display = "block";
            this.appendChild(info);
            this.classList.add("active-level");
        }
    });
});

// Close calisthenics when clicking outside
document.addEventListener("click", function(e) {
    if (!e.target.closest(".progression-step")) {
        document.querySelectorAll(".progression-step .level-info").forEach(info => info.remove());
        document.querySelectorAll(".progression-step").forEach(s => s.classList.remove("active-level"));
    }
});


/* =========================================
   FOOD DATABASE
========================================= */

const foodDatabase = [
    { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
    { name: "Brown Rice", calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
    { name: "White Rice", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    { name: "Eggs", calories: 78, protein: 6, carbs: 0.6, fat: 5.3 },
    { name: "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    { name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { name: "Peanut Butter", calories: 190, protein: 8, carbs: 7, fat: 16 },
    { name: "Salmon", calories: 208, protein: 20, carbs: 0, fat: 13 },
    { name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.3, fat: 0.4 },
    { name: "Oats", calories: 150, protein: 5, carbs: 27, fat: 3 },
    { name: "Almonds", calories: 161, protein: 6, carbs: 6, fat: 14 },
    { name: "Milk", calories: 122, protein: 8, carbs: 12, fat: 5 },
    { name: "Paneer", calories: 265, protein: 18, carbs: 6, fat: 20 }
];


/* =========================================
   FOOD SEARCH & CALCULATOR
========================================= */

function searchFood() {
    const input = document.getElementById("foodInput").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("foodResults");
    
    resultsContainer.innerHTML = "";
    
    if (!input) {
        resultsContainer.innerHTML = `<p style="padding:1rem; color: var(--text-muted);">Please enter a food name.</p>`;
        return;
    }
    
    const matches = foodDatabase.filter(food =>
        food.name.toLowerCase().includes(input)
    );
    
    if (matches.length === 0) {
        resultsContainer.innerHTML = `<p style="padding:1rem; color: var(--text-muted);">No food found. Try: chicken, rice, egg, banana, oats, paneer, salmon, yogurt, almonds.</p>`;
        return;
    }
    
    matches.forEach(food => {
        const result = document.createElement("div");
        result.className = "food-result";
        
        result.innerHTML = `
            <div class="food-header">
                <div class="food-name">${food.name}</div>
                <div class="food-calories">${food.calories} kcal/100g</div>
            </div>
            
            <div style="margin-top:15px;">
                <label>Quantity:</label>
                <input
                    type="number"
                    min="1"
                    value="100"
                    class="food-quantity"
                    style="
                        width:80px;
                        padding:8px;
                        margin-left:10px;
                        border-radius:6px;
                        border:1px solid var(--border-color);
                        background: var(--secondary-dark);
                        color: white;
                    "
                >
                <select
                    class="food-unit"
                    style="
                        padding:8px;
                        margin-left:5px;
                        border-radius:6px;
                        border:1px solid var(--border-color);
                        background: var(--secondary-dark);
                        color: white;
                    "
                >
                    <option value="g">grams</option>
                    <option value="kg">kg</option>
                </select>
                <button
                    class="calculate-btn"
                    style="
                        margin-left:10px;
                        padding: 0.6rem 1rem;
                        background: var(--accent-green);
                        color: var(--primary-dark);
                        border: none;
                        border-radius: 6px;
                        font-weight: 700;
                        cursor: pointer;
                    "
                >
                    Calculate
                </button>
            </div>
            
            <div class="food-calculation" style="margin-top:15px;"></div>
        `;
        
        resultsContainer.appendChild(result);
        
        const calculateBtn = result.querySelector(".calculate-btn");
        const quantityInput = result.querySelector(".food-quantity");
        const unitSelect = result.querySelector(".food-unit");
        const calculation = result.querySelector(".food-calculation");
        
        calculateBtn.addEventListener("click", function() {
            let quantity = Number(quantityInput.value);
            const unit = unitSelect.value;
            
            if (!quantity || quantity <= 0) {
                calculation.innerHTML = `<p style="color: var(--text-muted);">Enter valid quantity.</p>`;
                return;
            }
            
            // Convert kg to grams
            if (unit === "kg") {
                quantity = quantity * 1000;
            }
            
            // Calculate based on 100g
            const multiplier = quantity / 100;
            const totalCalories = Math.round(food.calories * multiplier);
            const totalProtein = (food.protein * multiplier).toFixed(1);
            const totalCarbs = (food.carbs * multiplier).toFixed(1);
            const totalFat = (food.fat * multiplier).toFixed(1);
            
            calculation.innerHTML = `
                <div style="
                    padding:12px;
                    border-radius:8px;
                    background: rgba(0, 255, 102, 0.08);
                    border: 1px solid rgba(0, 255, 102, 0.2);
                ">
                    <p style="color: var(--accent-green); font-weight: 700;">🍽️ ${quantity}g</p>
                    <p style="margin: 5px 0;"><strong>🔥 Calories:</strong> ${totalCalories} kcal</p>
                    <p style="margin: 5px 0;"><strong>💪 Protein:</strong> ${totalProtein}g</p>
                    <p style="margin: 5px 0;"><strong>🍚 Carbs:</strong> ${totalCarbs}g</p>
                    <p style="margin: 5px 0;"><strong>🥑 Fat:</strong> ${totalFat}g</p>
                </div>
            `;
        });
    });
}

// Allow Enter key to search
document.addEventListener("keypress", function(e) {
    if (e.target.id === "foodInput" && e.key === "Enter") {
        searchFood();
    }
});


/* =========================================
   FAQ TOGGLE
========================================= */

function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const toggle = element.querySelector(".faq-toggle");
    
    // Close all other FAQs
    document.querySelectorAll(".faq-answer").forEach(item => {
        if (item !== answer) {
            item.classList.remove("open");
        }
    });
    
    document.querySelectorAll(".faq-toggle").forEach(item => {
        if (item !== toggle) {
            item.classList.remove("open");
        }
    });
    
    // Toggle current
    answer.classList.toggle("open");
    toggle.classList.toggle("open");
}


console.log("✅ Fitness Freak - All Features Active!");
