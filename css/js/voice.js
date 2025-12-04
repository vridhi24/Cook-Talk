// FINAL Cooky Voice Assistant – Ingredients + Category Control + Confirmation

const Voice = (function(){

  let recognition = null;
  let listening = false;

  let currentRecipe = null;
  let stepIndex = 0;
  let timerHandle = null;

  let pendingStartRecipe = null;
  let onSpeechResult = null;

  let cookyActive = false; // after first "Hey Cooky"

  // -------------------- INIT --------------------
  function init(){
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SR){
      alert("Speech Recognition not supported. Use Chrome.");
      return;
    }

    recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript.toLowerCase().trim();
      console.log("Heard:", text);

      if(onSpeechResult) onSpeechResult(text);
      handleTranscript(text);
    };

    recognition.onend = () => {
      if(listening){
        setTimeout(() => {
          try { recognition.start(); } catch(e){}
        }, 200);
      }
    };
  }
  init();

  // -------------------- SPEAK --------------------
  function speak(msg){
    if(!msg) return;
    // ❌ pehle yaha cancel() tha, isi wajah se sirf last line bol raha tha
    // Ab hum cancel nahi karenge, saari lines queue hongi
    const u = new SpeechSynthesisUtterance(msg);
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  }

  // -------------------- TOGGLE LISTENING --------------------
  function toggleListening(){
    if(!recognition) return;

    if(!listening){
      try{ recognition.start(); }catch(e){}
      listening = true;
      speak("Cooky is listening. Say Hey Cooky to begin.");
    } else {
      speak("Cooky is already listening.");
    }
  }

  // -------------------- CATEGORY CONTROL --------------------
  function openCategory(cat){
    cat = (cat || "").toLowerCase().trim();

    const map = {
      "breakfast": "breakfast",
      "lunch": "lunch",
      "dinner": "dinner",
      "snack": "snacks",
      "snacks": "snacks",
      "drink": "drinks",
      "drinks": "drinks"
    };

    const key = map[cat];
    if(!key){
      speak("I couldn't find that category.");
      return;
    }

    localStorage.setItem("cooktalk_selectedCategory", key);
    speak("Opening " + key + " recipes.");
    window.location.href = "recipes.html";
  }

  // -------------------- START BY NAME --------------------
  function startByName(name){
    if(!name){
      speak("Tell me a recipe name.");
      return;
    }

    name = name.toLowerCase().trim();

    const r = Object.values(RECIPES).find(x =>
      x.name.toLowerCase().includes(name) ||
      x.id.toLowerCase().includes(name)
    );

    if(!r){
      speak("I cannot find that recipe.");
      return;
    }

    pendingStartRecipe = r;
    speak(`Should I start ${r.name}? Say yes Cooky or no Cooky.`);
  }

  // -------------------- READ ONLY INGREDIENTS --------------------
  function readIngredients(name){
    if(!name){
      speak("Tell me a recipe name for ingredients.");
      return;
    }

    name = name.toLowerCase().trim();

    const r = Object.values(RECIPES).find(x =>
      x.name.toLowerCase().includes(name) ||
      x.id.toLowerCase().includes(name)
    );

    if(!r){
      speak("I could not find that recipe.");
      return;
    }

    speak(`Ingredients for ${r.name} are:`);

    // ab ye saari ingredients ek ek karke queue ho kar boli jayengi
    r.ingredients.forEach(i => speak(i));
  }

  // -------------------- ACTUALLY START COOKING --------------------
  function startAssistantForRecipe(id){
    const r = RECIPES[id];
    if(!r){
      speak("Recipe not found.");
      return;
    }

    currentRecipe = r;
    stepIndex = 0;

    speak(`Starting ${r.name}.`);
    speak(`Here are the ingredients for ${r.name}.`);

    r.ingredients.forEach(ing => speak(ing));

    speak("Say next when you are ready to start cooking steps.");

    cookyActive = true;

    const box = document.getElementById("assistantBox");
    if(box) box.classList.remove("hidden");

    if(!listening){
      try { recognition.start(); } catch(e){}
      listening = true;
    }
  }

  // -------------------- STEP CONTROLS --------------------
  function nextStep(){
    if(!currentRecipe){
      speak("No recipe active.");
      return;
    }

    if(stepIndex >= currentRecipe.steps.length){
      speak("You have completed the recipe!");
      return;
    }

    speak(`Step ${stepIndex+1}: ${currentRecipe.steps[stepIndex]}`);
    stepIndex++;
  }

  function repeatStep(){
    if(!currentRecipe){
      speak("Nothing to repeat.");
      return;
    }
    const idx = Math.max(0, stepIndex - 1);
    speak("Repeating: " + currentRecipe.steps[idx]);
  }

  function backStep(){
    if(!currentRecipe){
      speak("Nothing active.");
      return;
    }

    stepIndex = Math.max(1, stepIndex - 1);
    speak(`Step ${stepIndex}: ${currentRecipe.steps[stepIndex-1]}`);
  }

  function stopAssistant(){
    currentRecipe = null;
    stepIndex = 0;
    cookyActive = false;

    speak("Stopped cooking.");

    const box = document.getElementById("assistantBox");
    if(box) box.classList.add("hidden");
  }

  // -------------------- SEARCH --------------------
  function doSearch(q){
    if(!q){
      speak("Tell me a recipe or ingredient.");
      return;
    }

    const modal = document.getElementById("searchModal");
    if(modal) modal.classList.remove("hidden");

    const input = document.getElementById("searchInput");
    if(input){
      input.value = q;
      input.dispatchEvent(new Event("input"));
    }

    speak("Showing results for " + q);
  }

  // -------------------- TIMER --------------------
  function setTimer(sec){
    if(timerHandle) clearTimeout(timerHandle);

    speak(`Timer set for ${sec} seconds.`);

    timerHandle = setTimeout(() => {
      speak("Time's up!");
    }, sec*1000);
  }

  // -------------------- MAIN VOICE LOGIC --------------------
  function handleTranscript(t){
    console.log("Processing:", t);

    // Wake word
    const wakeWords = ["hey cooky", "hey cookie", "cooky", "cookie"];
    const saidWake = wakeWords.some(w => t.startsWith(w));

    let cmd = t;

    if(saidWake){
      wakeWords.forEach(w => cmd = cmd.replace(w, ""));
      cmd = cmd.trim();
      cookyActive = true;
    }

    if(!cookyActive) return;

    // YES / NO for pending start
    if(pendingStartRecipe){
      if(cmd.startsWith("yes")){
        const r = pendingStartRecipe;
        pendingStartRecipe = null;
        return startAssistantForRecipe(r.id);
      }
      if(cmd.startsWith("no")){
        pendingStartRecipe = null;
        speak("Okay.");
        return;
      }
    }

    // INGREDIENTS REQUEST (voice: "ingredients for upma")
    if(cmd.startsWith("ingredients for")){
      const name = cmd.replace("ingredients for","").trim();
      return readIngredients(name);
    }

    // CATEGORY REQUEST (voice: "show breakfast")
    if(cmd.startsWith("show ")){
      const cat = cmd.replace("show","").trim();
      return openCategory(cat);
    }

    // SEARCH
    if(cmd.startsWith("search") || cmd.startsWith("find")){
      return doSearch(cmd.replace("search","").replace("find","").trim());
    }

    // START RECIPE
    if(cmd.startsWith("start")){
      return startByName(cmd.replace("start","").trim());
    }

    // TIMER
    if(cmd.includes("timer")){
      const m = cmd.match(/(\d+)\s*(second|seconds|minute|minutes)/);
      if(m){
        let sec = parseInt(m[1],10);
        if(m[2].startsWith("minute")) sec *= 60;
        return setTimer(sec);
      }
    }

    // COOKING STEPS
    if(cmd.includes("next"))   return nextStep();
    if(cmd.includes("repeat")) return repeatStep();
    if(cmd.includes("back"))   return backStep();
    if(cmd.includes("stop"))   return stopAssistant();

    speak("I didn't understand that.");
  }

  return {
    toggleListening,
    startByName,
    startAssistantForRecipe,
    doSearch,
    setTimer,
    cmd: function(action){
      if(action==="next")   nextStep();
      if(action==="back")   backStep();
      if(action==="repeat") repeatStep();
      if(action==="stop")   stopAssistant();
    },
    setOnSpeechResult: (cb) => onSpeechResult = cb
  };

})();
