
let state = { plan:null, completed:{}, startedAt:Date.now(), streak:0 };
const $ = id => document.getElementById(id);

function loadSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem("studyflow"));
    if (saved) state = {...state, ...saved};
  } catch(e) {}
}
function save() { localStorage.setItem("studyflow", JSON.stringify(state)); }

function formatHours(minutes) {
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}
function allTasks() {
  return (state.plan?.plan || []).flatMap(d => d.tasks.filter(t => t.type !== "rest").map(t => ({...t, day:d.day})));
}
function completedCount() { return Object.values(state.completed).filter(Boolean).length; }

function render() {
  if (!state.plan) return;
  $("dashboard").classList.remove("hidden");
  $("goalTitle").textContent = state.plan.subject;
  const tasks = allTasks();
  const done = completedCount();
  const percent = tasks.length ? Math.round(done / tasks.length * 100) : 0;
  $("topicsDone").textContent = done;
  $("progressText").textContent = percent + "%";
  $("progressBar").style.width = percent + "%";
  $("miniPercent").textContent = percent + "%";
  $("progressMessage").textContent = percent === 100 ? "You did it! Take the win — then rest. 🏆" :
    percent >= 60 ? "You're building real momentum. Keep the next step small. 🔥" :
    "Start with one small task. That's enough for now. 🌱";

  let dayMin=0, weekMin=0, monthMin=0;
  const now = new Date();
  const dayNum = now.getDay();
  tasks.forEach((t,i) => {
    if (state.completed[`${t.day}-${i}`]) {
      const mins = t.minutes;
      // Demo-friendly totals: completed minutes are attributed to the selected period.
      monthMin += mins;
      if (t.day <= 7) weekMin += mins;
      if (t.day === 1) dayMin += mins;
    }
  });
  $("dayHours").textContent = formatHours(dayMin);
  $("weekHours").textContent = formatHours(weekMin);
  $("monthHours").textContent = formatHours(monthMin);
  $("streakBadge").textContent = `🔥 ${state.streak || 0} day streak`;

  $("planList").innerHTML = state.plan.plan.map((d) => `
    <div class="day-card ${d.day===1 ? "today":""}">
      <div class="day-head">
        <div class="day-title">${d.label}${d.day===1 ? " · Start here" : ""}</div>
        <div class="day-time">${d.total_minutes ? formatHours(d.total_minutes) : "Rest"}</div>
      </div>
      ${d.tasks[0].type === "rest" ? `<div class="rest">🌿 ${d.tasks[0].detail}</div>` :
        d.tasks.map((t,idx) => {
          const key = `${d.day}-${idx}`;
          const isDone = !!state.completed[key];
          return `<div class="task ${isDone ? "done":""}">
            <button class="check" onclick="toggleTask('${key}', ${t.minutes})">${isDone ? "✓":""}</button>
            <div><div class="task-title">${t.title}</div><div class="task-detail">${t.detail}</div></div>
            <div class="task-min">${t.minutes} min</div>
          </div>`;
        }).join("")}
    </div>`).join("");
}

function toggleTask(key, minutes) {
  const wasDone = !!state.completed[key];
  state.completed[key] = !wasDone;
  if (!wasDone) {
    state.streak = Math.max(1, (state.streak || 0));
    const msgs = [
      ["Great work! You kept your promise to yourself. 🌟","🌟"],
      ["Nice! Another step closer to your goal. 💪","💪"],
      ["You showed up — that matters more than perfection. 🧠","🧠"],
      ["Brilliant progress! Take a breath and be proud. 🎉","🎉"],
      ["One task down. Future-you will thank you! 🚀","🚀"]
    ];
    const pick = msgs[Math.floor(Math.random()*msgs.length)];
    $("celebrationText").textContent = pick[0];
    $("celebrationEmoji").textContent = pick[1];
    $("celebration").classList.remove("hidden");
  }
  save(); render();
}

$("generateBtn").onclick = async () => {
  const error = $("error"); error.textContent = "";
  const btn = $("generateBtn"); btn.disabled = true; btn.textContent = "Building your plan…";
  try {
    const res = await fetch("/api/plan", {method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({subject:$("subject").value, days:$("days").value, minutes:$("minutes").value})});
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    state.plan = data; state.completed = {}; state.streak = 0; save(); render();
    $("dashboard").scrollIntoView({behavior:"smooth"});
  } catch(e) { error.textContent = e.message; }
  btn.disabled = false; btn.innerHTML = 'Create my study plan <span>→</span>';
};
$("newPlanBtn").onclick = () => window.scrollTo({top:0, behavior:"smooth"});
$("closeCelebration").onclick = () => $("celebration").classList.add("hidden");
$("celebration").onclick = e => { if(e.target.id === "celebration") $("celebration").classList.add("hidden"); };
$("themeBtn").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("studyflow-theme", document.body.classList.contains("dark") ? "dark" : "light");
  $("themeBtn").textContent = document.body.classList.contains("dark") ? "☀" : "☾";
};
if (localStorage.getItem("studyflow-theme")==="dark") { document.body.classList.add("dark"); $("themeBtn").textContent="☀"; }
loadSaved(); render();
