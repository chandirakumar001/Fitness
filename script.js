/* =========================================
   FITNESS FREAK — script.js
========================================= */

/* -----------------------------------------
   FAQ TOGGLE
----------------------------------------- */
function toggleFAQ(el) {
    const answer = el.nextElementSibling;
    const toggle = el.querySelector('.faq-toggle');
    const isOpen = answer.classList.contains('open');

    document.querySelectorAll('.faq-answer.open').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-toggle.open').forEach(t => t.classList.remove('open'));

    if (!isOpen) {
        answer.classList.add('open');
        toggle.classList.add('open');
    }
}

/* -----------------------------------------
   GOAL + CALISTHENICS MODAL (replaces inline expanding cards)
----------------------------------------- */
const goalInfo = {
    weightloss: `
        <h3>🔥 Weight Loss Guide</h3>
        <p>Focus on a moderate calorie deficit combined with strength training to lose fat while keeping muscle.</p>
        <h4>Training</h4>
        <ul>
            <li>Full-body strength training, 3–4x/week</li>
            <li>Add 2–3 cardio sessions (walking, cycling, or HIIT)</li>
            <li>Keep protein high to protect muscle mass</li>
        </ul>
        <h4>Nutrition</h4>
        <ul>
            <li>Eat in a small calorie deficit, not an extreme one</li>
            <li>Prioritize protein and fiber-rich whole foods</li>
            <li>Stay hydrated and manage sleep — both affect fat loss</li>
        </ul>
    `,
    weightgain: `
        <h3>💪 Weight Gain Guide</h3>
        <p>Focus on balanced nutrition and progressive strength training to build size sustainably.</p>
        <h4>Training</h4>
        <ul>
            <li>Squats, push-ups, rows, pull-up progressions</li>
            <li>Progressive overload — add reps/weight weekly</li>
        </ul>
        <h4>Food</h4>
        <ul>
            <li>Eat regular, balanced meals</li>
            <li>Include protein-rich foods every meal</li>
            <li>Include carbohydrates and healthy fats</li>
        </ul>
        <h4>Recovery</h4>
        <p>Give your body enough rest between challenging workouts.</p>
    `,
    strength: `
        <h3>🏋️ Build Strength</h3>
        <p>Prioritize compound lifts with lower reps and longer rest to build raw strength.</p>
        <h4>Training</h4>
        <ul>
            <li>Squat, deadlift, bench press, overhead press as your base</li>
            <li>3–6 rep ranges, 3–5 minutes rest between heavy sets</li>
            <li>Track your lifts weekly to ensure progressive overload</li>
        </ul>
    `,
    general: `
        <h3>⚡ General Fitness</h3>
        <p>A balanced mix of strength, cardio, and mobility to stay active and feel good.</p>
        <h4>Weekly mix</h4>
        <ul>
            <li>2–3 strength sessions</li>
            <li>1–2 cardio sessions</li>
            <li>Daily light movement + mobility work</li>
        </ul>
    `
};

const levelInfo = {
    beginner: `
        <h3>🟢 Beginner</h3>
        <p>Build the foundation: basic control over your own bodyweight.</p>
        <ul>
            <li>Knee push-ups → full push-ups</li>
            <li>Bodyweight squats</li>
            <li>Plank holds, 20–40 seconds</li>
        </ul>
    `,
    intermediate: `
        <h3>🟡 Intermediate</h3>
        <p>Add pulling strength and more core control.</p>
        <ul>
            <li>Wide-grip pull-ups</li>
            <li>One-armed plank holds</li>
            <li>Pistol squat progressions</li>
        </ul>
    `,
    advanced: `
        <h3>🔴 Advanced</h3>
        <p>Move into higher-skill compound bodyweight movements.</p>
        <ul>
            <li>Handstand push-ups (wall-assisted first)</li>
            <li>Muscle-ups</li>
            <li>L-sit holds</li>
        </ul>
    `,
    expert: `
        <h3>⭐ Expert</h3>
        <p>Elite static-strength calisthenics skills.</p>
        <ul>
            <li>Full planche</li>
            <li>Front lever holds</li>
            <li>One-arm chin-up progressions</li>
        </ul>
    `
};

function openInfoModal(html) {
    document.getElementById('modalContent').innerHTML = html;
    document.getElementById('infoModal').classList.add('active');
}

function closeInfoModal() {
    document.getElementById('infoModal').classList.remove('active');
}

function openGoalModal(key) {
    openInfoModal(goalInfo[key] || '<p>No information available.</p>');
}

function openLevelModal(key) {
    openInfoModal(levelInfo[key] || '<p>No information available.</p>');
}

// close modal on background click
document.addEventListener('click', function (e) {
    const overlay = document.getElementById('infoModal');
    if (e.target === overlay) closeInfoModal();
});

/* -----------------------------------------
   CALORIE SEARCH (simple built-in lookup)
----------------------------------------- */
// All values are per 100g (or 100ml for liquids) so they can be scaled
// to any amount the user enters. Source: standard nutrition averages.
const foodDatabase = {
    "rice":       { cal: 130, protein: 2.7, carbs: 28,  fat: 0.3 },
    "chicken":    { cal: 165, protein: 31,  carbs: 0,   fat: 3.6 },
    "egg":        { cal: 155, protein: 13,  carbs: 1.1, fat: 11  },
    "banana":     { cal: 89,  protein: 1.1, carbs: 23,  fat: 0.3 },
    "chapati":    { cal: 297, protein: 9,   carbs: 51,  fat: 6   },
    "dal":        { cal: 116, protein: 9,   carbs: 20,  fat: 0.4 },
    "bread":      { cal: 265, protein: 9,   carbs: 49,  fat: 3.2 },
    "milk":       { cal: 61,  protein: 3.2, carbs: 4.8, fat: 3.3 },
    "apple":      { cal: 52,  protein: 0.3, carbs: 14,  fat: 0.2 },
    "chips":      { cal: 536, protein: 7,   carbs: 53,  fat: 35  },
    "soda":       { cal: 41,  protein: 0,   carbs: 10.6,fat: 0   }
};

function searchFood() {
    const input = document.getElementById('foodInput').value.trim().toLowerCase();
    const qtyRaw = parseFloat(document.getElementById('foodQty').value);
    const unit = document.getElementById('foodUnit').value;
    const resultsBox = document.getElementById('foodResults');
    if (!input) { resultsBox.innerHTML = ''; return; }

    const match = Object.keys(foodDatabase).find(key => input.includes(key));

    if (!match) {
        resultsBox.innerHTML = `<div class="food-result"><p>No match found for "${input}". Try a simpler term like "rice" or "egg".</p></div>`;
        return;
    }

    // Default to 100g if the amount is missing or invalid
    let grams = (!isNaN(qtyRaw) && qtyRaw > 0) ? qtyRaw : 100;
    if (unit === 'kg') grams *= 1000;

    const data = foodDatabase[match];
    const multiplier = grams / 100; // database values are per 100g
    const cal = Math.round(data.cal * multiplier);
    const protein = (data.protein * multiplier).toFixed(1);
    const carbs = (data.carbs * multiplier).toFixed(1);
    const fat = (data.fat * multiplier).toFixed(1);

    const displayQty = grams >= 1000 ? `${(grams / 1000).toFixed(2)}kg` : `${grams}g`;

    resultsBox.innerHTML = `
        <div class="food-result">
            <div class="food-header">
                <div class="food-name">${match.charAt(0).toUpperCase() + match.slice(1)} (${displayQty})</div>
                <div class="food-calories">${cal} kcal</div>
            </div>
            <div class="macro-info">
                <div class="macro-item"><div class="macro-label">Protein</div><div class="macro-value">${protein}g</div></div>
                <div class="macro-item"><div class="macro-label">Carbs</div><div class="macro-value">${carbs}g</div></div>
                <div class="macro-item"><div class="macro-label">Fat</div><div class="macro-value">${fat}g</div></div>
            </div>
        </div>
    `;
}

/* -----------------------------------------
   FOOD → WORKOUT RECOMMENDER (new)
   Simple rule-based estimate, not medical/dietary advice.
----------------------------------------- */
function estimateMealCalories(text) {
    if (!text) return 0;
    const lower = text.toLowerCase();
    let total = 0;
    let matches = 0;
    Object.keys(foodDatabase).forEach(key => {
        if (lower.includes(key)) {
            total += foodDatabase[key].cal;
            matches++;
        }
    });
    // fallback estimate for unrecognized text so the tool still gives a rough number
    if (matches === 0 && text.trim().length > 0) {
        total = 250; // generic average-meal estimate
    }
    return total;
}

function recommendFromFood() {
    const meals = [
        document.getElementById('mealBreakfast').value,
        document.getElementById('mealLunch').value,
        document.getElementById('mealDinner').value,
        document.getElementById('mealSnacks').value
    ];

    const totalCalories = meals.reduce((sum, m) => sum + estimateMealCalories(m), 0);
    const loggedAnything = meals.some(m => m.trim().length > 0);
    const resultBox = document.getElementById('foodPlanResult');

    if (!loggedAnything) {
        resultBox.innerHTML = `<div class="food-plan-result"><p>Log at least one meal above to get a suggestion.</p></div>`;
        return;
    }

    // simple rule-based bands — rough guide only
    let title, advice, tips;

    if (totalCalories < 1200) {
        title = "Light intake today — go easy";
        advice = "Your logged intake looks light. Consider a lower-intensity session today rather than a max-effort workout.";
        tips = ["Mobility work or a light walk", "Bodyweight-only circuit, moderate reps", "Prioritize a solid meal after training"];
    } else if (totalCalories < 2000) {
        title = "Moderate intake — balanced session works well";
        advice = "Your intake is in a moderate range — a standard strength or calisthenics session fits well today.";
        tips = ["Follow your regular weekly split", "Standard sets/reps as planned", "Stay hydrated through the session"];
    } else {
        title = "Higher intake — good day for a harder session";
        advice = "You've logged a higher-calorie day, which supports a more intense or higher-volume training session.";
        tips = ["Good day for heavier strength work or higher volume", "Consider an extra accessory exercise or two", "Still prioritize good form over pushing too hard"];
    }

    resultBox.innerHTML = `
        <div class="food-plan-result">
            <h3>${title}</h3>
            <p>Estimated intake today: <strong>${totalCalories} kcal</strong> (rough estimate based on what you logged).</p>
            <p>${advice}</p>
            <ul>${tips.map(t => `<li>${t}</li>`).join('')}</ul>
            <p style="margin-top:0.8rem; font-size:0.8rem;">This is a general suggestion, not medical or dietary advice.</p>
        </div>
    `;
}

/* -----------------------------------------
   MUSIC PLAYER (new — was UI-only before, now functional)
   Demo tracks below are placeholders — swap the "src" values
   with your own hosted mp3 files when ready.
----------------------------------------- */
const playlist = [
    { title: "Arjunar Villu",          desc: "High-energy tracks to power your training sessions", src: "songs/arjunar-villu.mp3" },
    { title: "Edhirthu Nill",          desc: "Push through — stay strong",                          src: "songs/edhirthu-nill.mp3" },
    { title: "Mun Sellada",            desc: "Keep moving forward",                                 src: "songs/mun-sellada.mp3" },
    { title: "Neeye Oli",              desc: "Find your inner light",                                src: "songs/neeye-oli.mp3" },
    { title: "Oru Thuli",              desc: "Every drop of effort counts",                          src: "songs/oru-thuli.mp3" },
    { title: "Surviva",                desc: "Outlast, outwork, survive",                            src: "songs/surviva.mp3" },
    { title: "Theemai Dhaan Vellum",   desc: "Overcome the odds",                                   src: "songs/theemai-dhaan-vellum.mp3" },
    { title: "Vidamuyarchi",           desc: "Never give up the fight",                              src: "songs/vidamuyarchi.mp3" }
];

let currentTrack = 0;
const audio = document.getElementById('bgAudio');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const trackTitleEl = document.getElementById('trackTitle');
const trackDescEl = document.getElementById('trackDesc');

function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function loadTrack(index, autoplay) {
    currentTrack = (index + playlist.length) % playlist.length;
    const track = playlist[currentTrack];
    audio.src = track.src;
    trackTitleEl.textContent = track.title;
    trackDescEl.textContent = track.desc;
    progressBar.value = 0;
    currentTimeEl.textContent = "0:00";
    durationEl.textContent = "0:00";
    if (autoplay) {
        audio.play().then(() => { playBtn.textContent = "⏸"; }).catch(() => {});
    } else {
        playBtn.textContent = "▶";
    }
}

function togglePlay() {
    if (!audio.src) loadTrack(currentTrack, false);
    if (audio.paused) {
        audio.play().then(() => { playBtn.textContent = "⏸"; }).catch(() => {
            trackDescEl.textContent = "Couldn't play this track — check your connection.";
        });
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

function nextTrack() { loadTrack(currentTrack + 1, !audio.paused || audio.currentTime > 0); }
function prevTrack() { loadTrack(currentTrack - 1, !audio.paused || audio.currentTime > 0); }

audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
});

audio.addEventListener('ended', () => nextTrack());

progressBar.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
});

/* -----------------------------------------
   PROGRESS TRACKER — daily check-in, streak, rank
   Stored in localStorage so it works offline in an APK WebView.
----------------------------------------- */
function getLog() {
    return JSON.parse(localStorage.getItem('workoutLog') || '{}');
}

function todayKey() {
    return new Date().toISOString().split('T')[0];
}

function logWorkout(completed) {
    const log = getLog();
    log[todayKey()] = completed;
    localStorage.setItem('workoutLog', JSON.stringify(log));

    document.getElementById('checkinStatus').textContent =
        completed ? "Nice work today! 💪 Logged." : "No worries — logged as a rest day.";

    updateProgressUI();
}

function calcStreak(log) {
    let streak = 0;
    let d = new Date();
    while (true) {
        const key = d.toISOString().split('T')[0];
        if (log[key] === true) {
            streak++;
            d.setDate(d.getDate() - 1);
        } else {
            break;
        }
    }
    return streak;
}

function updateProgressUI() {
    const log = getLog();
    const streak = calcStreak(log);
    const now = new Date();

    const thisMonthCount = Object.entries(log).filter(([date, done]) => {
        const dObj = new Date(date);
        return done === true && dObj.getMonth() === now.getMonth() && dObj.getFullYear() === now.getFullYear();
    }).length;

    const totalDone = Object.values(log).filter(v => v === true).length;
    const target = 30; // adjust as your definition of "full progress" changes
    const progressPct = Math.min(100, Math.round((totalDone / target) * 100));

    let rank = "E", rankMsg = "Beginner Rank";
    if (totalDone >= 50)      { rank = "S"; rankMsg = "Elite Rank"; }
    else if (totalDone >= 30) { rank = "A"; rankMsg = "Advanced Rank"; }
    else if (totalDone >= 15) { rank = "C"; rankMsg = "Intermediate Rank"; }
    else if (totalDone >= 5)  { rank = "D"; rankMsg = "Getting Started"; }

    document.getElementById('streakNumber').textContent = streak;
    document.getElementById('monthNumber').textContent = thisMonthCount;
    document.getElementById('totalPercent').textContent = progressPct + "%";
    document.getElementById('fitnessRank').textContent = rank;
    document.getElementById('rankWorkouts').textContent = totalDone + " Workouts";
    document.getElementById('rankMessage').textContent = rankMsg;

    // reflect today's already-logged status on reload
    const todayStatus = log[todayKey()];
    if (todayStatus === true) {
        document.getElementById('checkinStatus').textContent = "Nice work today! 💪 Logged.";
    } else if (todayStatus === false) {
        document.getElementById('checkinStatus').textContent = "Logged as a rest day today.";
    }
}

/* -----------------------------------------
   INIT
----------------------------------------- */
document.addEventListener('DOMContentLoaded', updateProgressUI);
