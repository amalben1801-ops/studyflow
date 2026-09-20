
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

ENCOURAGEMENTS = [
    ("Great work! You kept your promise to yourself. 🌟", "🌟"),
    ("Nice! Another step closer to your goal. 💪", "💪"),
    ("You showed up — that matters more than perfection. 🧠", "🧠"),
    ("Brilliant progress! Take a breath and be proud. 🎉", "🎉"),
    ("One task down. Future-you will thank you! 🚀", "🚀"),
]

def make_tasks(subject, minutes, day, total_days):
    # Keep individual blocks realistic: generally 25–60 minutes.
    available = max(30, minutes)
    if day == total_days:
        return [
            {"title": "Final review & confidence check", "minutes": min(45, available),
             "type": "review", "detail": f"Review the most important ideas from {subject} without trying to relearn everything."},
            {"title": "Quick self-test", "minutes": min(25, max(20, available - min(45, available))),
             "type": "practice", "detail": "Answer a few questions from memory, then check only what you missed."},
        ]

    if day % 5 == 0:
        return [
            {"title": "Light review", "minutes": min(30, available), "type": "review",
             "detail": f"Refresh key ideas from {subject} using flashcards, notes, or a short recap."},
            {"title": "Easy practice", "minutes": min(25, max(20, available - min(30, available))), "type": "practice",
             "detail": "Do a small set of practice questions. Stop while it still feels manageable."},
        ]

    blocks = []
    first = min(50, max(25, round(available * 0.45)))
    second = min(45, max(20, round(available * 0.35)))
    remaining = max(0, available - first - second)
    blocks.append({"title": f"Learn: {subject}", "minutes": first, "type": "learn",
                   "detail": "Focus on one small concept. Write down 3–5 things you can explain without looking."})
    blocks.append({"title": "Active recall", "minutes": second, "type": "practice",
                   "detail": "Close your notes and explain what you learned, or answer practice questions from memory."})
    if remaining >= 15:
        blocks.append({"title": "Wrap-up & plan tomorrow", "minutes": remaining, "type": "review",
                       "detail": "Fix one weak spot, mark what you finished, and choose tomorrow's first task."})
    return blocks

def generate_plan(subject, days, minutes):
    plan = []
    for day in range(1, days + 1):
        if days >= 7 and day == days // 2:
            tasks = [{"title": "Rest / reset day", "minutes": 0, "type": "rest",
                      "detail": "No catch-up marathon. Rest, sleep well, and return tomorrow with a fresh brain."}]
        else:
            tasks = make_tasks(subject, minutes, day, days)
        plan.append({
            "day": day,
            "label": "Today" if day == 1 else f"Day {day}",
            "tasks": tasks,
            "total_minutes": sum(t["minutes"] for t in tasks)
        })
    return plan

@app.route("/")
def index():
    return render_template("index.html")

@app.post("/api/plan")
def plan():
    data = request.get_json(silent=True) or {}
    subject = str(data.get("subject", "")).strip()
    try:
        days = int(data.get("days", 7))
        minutes = int(data.get("minutes", 60))
    except (TypeError, ValueError):
        return jsonify({"error": "Please enter valid numbers."}), 400

    if not subject:
        return jsonify({"error": "Tell us what you're studying."}), 400
    if not 1 <= days <= 90:
        return jsonify({"error": "Choose between 1 and 90 days."}), 400
    if not 20 <= minutes <= 480:
        return jsonify({"error": "Choose between 20 and 480 minutes per day."}), 400

    return jsonify({
        "subject": subject,
        "days": days,
        "minutes_per_day": minutes,
        "plan": generate_plan(subject, days, minutes)
    })

if __name__ == "__main__":
    app.run(debug=True)
