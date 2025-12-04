// js/app.js

// utility: safe query
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

const page = window.location.pathname.split("/").pop();

// Normalize category names (fix Snack/Drink mismatch)
function normalizeCategory(cat){
  if(cat === "snack") return "snacks";
  if(cat === "drink") return "drinks";
  return cat;
}

// ---------------- SEARCH MODAL ----------------
function openSearchModal(){
  const modal = $('#searchModal');
  if(!modal) return;

  modal.classList.remove('hidden');
  const input = modal.querySelector('#searchInput');
  input.value = '';
  input.focus();

  attachSearchInputHandler();
}

function closeSearchModal(){
  const modal = $('#searchModal');
  if(modal) modal.classList.add('hidden');
}

function attachSearchInputHandler(){
  const input = $('#searchInput');
  const resultsDiv = $('#searchResults');
  if(!input || !resultsDiv) return;

  if(input._hasHandler) return; 
  input._hasHandler = true;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    resultsDiv.innerHTML = '';

    if(!q) return;

    const found = Object.values(RECIPES).filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.ingredients.some(i => i.toLowerCase().includes(q))
    );

    if(found.length === 0){
      resultsDiv.innerHTML = '<p>No results</p>';
      return;
    }

    found.forEach(r => {
      const div = document.createElement('div');
      div.className = 'result-item';
      div.innerHTML = `<strong>${r.name}</strong>
                       <div class="muted">${r.category} • ${r.time}</div>`;
      div.addEventListener('click', () => {
        window.location.href = `details.html?id=${r.id}`;
      });
      resultsDiv.appendChild(div);
    });
  });

  const closeBtn = $('#closeSearch');
  if(closeBtn) closeBtn.onclick = closeSearchModal;
}

// ---------------- TOP SEARCH (recipes page only) ----------------
function attachTopSearch(){
  const top = $('#topSearchInput');
  if(!top) return;

  top.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    const listEl = $('#list');
    if(!listEl) return;

    listEl.innerHTML = '';

    const items = Object.values(RECIPES).filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.ingredients.some(i => i.toLowerCase().includes(q))
    );

    if(items.length === 0){
      listEl.innerHTML = '<p style="text-align:center;color:#555">No recipes found</p>';
      return;
    }

    items.forEach(r => {
      const b = document.createElement('button');
      b.className = 'recipe-card';
      b.innerHTML = `
        <img src="${r.image}" alt="${r.name}">
        <div class="rc-text">
          <div class="rc-name">${r.name}</div>
          <div class="rc-meta">${r.time} • ${r.servings} servings</div>
        </div>
      `;
      b.addEventListener('click', () =>
        window.location.href = `details.html?id=${r.id}`
      );
      listEl.appendChild(b);
    });
  });
}

// ---------------- PAGE INITIALIZATION ----------------
document.addEventListener('DOMContentLoaded', () => {

  // Wire voice + search icons
  $('#voiceBtn2')?.addEventListener('click', () => Voice.toggleListening());
  $('#searchBtn2')?.addEventListener('click', () => openSearchModal());

  // ---------- Voice hint: single icon + one suggestion cycling ----------
 (function setupVoiceHint(){
   // remove extra duplicate voice icons (if any) and keep first
   const allVoiceIcons = Array.from(document.querySelectorAll('#voiceBtn2'));
   if(allVoiceIcons.length > 1){
     allVoiceIcons.slice(1).forEach(n => n.remove());
   }

   const hintEl = document.getElementById('voiceHint');
   const voiceBtn = document.getElementById('voiceBtn2');

   if(!hintEl || !voiceBtn) return;

   // suggestions per page (customize)
   const pageSuggestions = {
     'index.html': [
      'Hey Cooky, search upma',
      'Hey Cooky, start Rava Upma',
      'Hey Cooky, show snacks'
    ],
     'recipes.html': [
      'Hey Cooky, search poha',
      'Hey Cooky, start Dal Tadka',
      'Hey Cooky, show drinks'
    ],
     'details.html': [
      'Hey Cooky, next',
      'Hey Cooky, repeat',
      'Hey Cooky, set timer 1 minute'
    ]
  };

  const current = page || 'index.html';
  const suggestions = pageSuggestions[current] || pageSuggestions['index.html'];

  let idx = 0;
  const cycleInterval = 3000; // ms
  let cycleHandle = null;
  let paused = false;

  function showSuggestion(i){
    hintEl.textContent = suggestions[i] || '';
    hintEl.dataset.suggestion = suggestions[i] || '';
  }

  function startCycle(){
    showSuggestion(idx);
    cycleHandle = setInterval(() => {
      if(paused) return;
      idx = (idx + 1) % suggestions.length;
      showSuggestion(idx);
    }, cycleInterval);
  }

  function stopCycle(){
    clearInterval(cycleHandle);
    cycleHandle = null;
  }

  // pause cycle on hover/focus so user can read and click
  hintEl.addEventListener('mouseenter', () => { paused = true; });
  hintEl.addEventListener('mouseleave', () => { paused = false; });

  // click on suggestion runs a matching action
  hintEl.addEventListener('click', () => {
    const text = (hintEl.dataset.suggestion || '').toLowerCase();
    if(!text) return;

    // Example parsing: "hey cooky, search upma"
    // we remove wake word and then dispatch to app helpers
    const cmd = text.replace(/^hey cooky[, ]*/,'').replace(/^hey cookie[, ]*/,'').trim();

    if(cmd.startsWith('search')){
      const q = cmd.replace(/^search\s*/,'').trim();
      // use existing helper (appDoSearch -> Voice.doSearch)
      if(window.appDoSearch) window.appDoSearch(q);
      else if(window.Voice && Voice.doSearch) Voice.doSearch(q);
      // open modal to show results too
      const modal = document.getElementById('searchModal');
      if(modal) modal.classList.remove('hidden');
    } else if(cmd.startsWith('start')){
      const q = cmd.replace(/^start\s*/,'').replace(/^start making\s*/,'').trim();
      if(window.Voice && Voice.startByName) Voice.startByName(q);
    } else if(cmd.includes('next')){
      if(window.Voice && Voice.cmd) Voice.cmd('next');
    } else if(cmd.includes('repeat')){
      if(window.Voice && Voice.cmd) Voice.cmd('repeat');
    } else if(cmd.includes('timer')){
      const m = cmd.match(/(\d+)\s*(second|minute)/);
      if(m){
        let n = parseInt(m[1],10);
        if(m[2].startsWith('minute')) n *= 60;
        if(window.Voice && Voice.setTimer) Voice.setTimer(n);
      } else {
        // fallback: open timer prompt
        const t = prompt('Set timer (seconds):', '60');
        const secs = Number(t);
        if(secs > 0 && Voice && Voice.setTimer) Voice.setTimer(secs);
      }
    } else {
      // default: speak suggestion aloud
      if(window.Voice && Voice.speak) Voice.speak(text);
    }
  });

  // start auto cycle
  startCycle();

  // optional: stop cycle when page is hidden (saves CPU)
  document.addEventListener('visibilitychange', () => {
    if(document.hidden) { stopCycle(); } else if(!cycleHandle) { startCycle(); }
  });

  // if user clicks mic button toggle listening (already wired), also briefly show hint
  voiceBtn.addEventListener('click', () => {
    hintEl.style.transition = 'opacity 0.2s';
    hintEl.style.opacity = '1';
    setTimeout(()=> hintEl.style.opacity = '', 1200);
  });
})();


  attachSearchInputHandler();


  // Voice → auto open search modal and respond to start commands
 // Voice → auto open search modal ONLY for real search commands
 Voice.setOnSpeechResult && Voice.setOnSpeechResult((text) => {
   if(!text) return;
   const t = text.toLowerCase();

   // Do NOT open modal for ingredients requests
   if(t.includes("ingredients for")) return;

   // Open search modal ONLY for actual search/find commands
   if(t.includes("search ") || t.startsWith("search") ||
     t.includes("find ")   || t.startsWith("find")) {

      const modal = document.getElementById("searchModal");
      if(modal) modal.classList.remove("hidden");
    }
  });


  // INDEX PAGE
  if(page === '' || page === 'index.html'){
    $$('.card').forEach(card => {
      card.addEventListener('click', () => {
        const rawCat = card.dataset.cat;
        const cat = normalizeCategory(rawCat);

        localStorage.setItem('cooktalk_selectedCategory', cat);
        window.location.href = 'recipes.html';
      });
    });
  }

  // RECIPES PAGE
  if(page === 'recipes.html'){
    const rawCat = localStorage.getItem('cooktalk_selectedCategory') || 'breakfast';
    const cat = normalizeCategory(rawCat);

    $('#catTitle').textContent = cat.charAt(0).toUpperCase() + cat.slice(1);

    const listEl = $('#list');
    listEl.innerHTML = '';

    const items = Object.values(RECIPES).filter(r => r.category === cat);

    items.forEach(r => {
      const b = document.createElement('button');
      b.className = 'recipe-card';
      b.innerHTML = `
        <img src="${r.image}" alt="${r.name}">
        <div class="rc-text">
          <div class="rc-name">${r.name}</div>
          <div class="rc-meta">${r.time} • ${r.servings} servings</div>
        </div>`;
      b.addEventListener('click', () =>
        window.location.href = `details.html?id=${r.id}`
      );
      listEl.appendChild(b);
    });

    attachTopSearch();
  }

  // DETAILS PAGE (already renders itself)
  if(page === 'details.html'){
    attachSearchInputHandler();
  }
});

// global helper
window.appDoSearch = q => Voice.doSearch(q);
