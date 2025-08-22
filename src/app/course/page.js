export default function DewBloomCoursePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-slate-800">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            DewBloom 🌱 — DBT Skills Course Map
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl">
            A Duolingo‑style learning path for Dialectical Behavior Therapy (DBT) skills
            training—organized into modules, submodules, app activities, and pacing you can
            wire directly into your Next.js app.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#toc" className="px-4 py-2 rounded-2xl bg-emerald-600 text-white shadow hover:bg-emerald-700">Jump to Contents</a>
            <a href="#json" className="px-4 py-2 rounded-2xl bg-white border border-emerald-200 shadow hover:bg-emerald-50">JSON Schema (preview)</a>
          </div>
        </div>
      </section>

      {/* TOC */}
      <section id="toc" className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-bold">Table of Contents</h2>
        <ol className="mt-4 grid md:grid-cols-2 gap-3 list-decimal list-inside">
          <li><a className="underline hover:text-emerald-700" href="#orientation">0) Onboarding & Orientation (Seed)</a></li>
          <li><a className="underline hover:text-emerald-700" href="#mindfulness">1) Core Mindfulness (Sprout)</a></li>
          <li><a className="underline hover:text-emerald-700" href="#ie">2) Interpersonal Effectiveness (Stem)</a></li>
          <li><a className="underline hover:text-emerald-700" href="#er">3) Emotion Regulation (Leaf)</a></li>
          <li><a className="underline hover:text-emerald-700" href="#dt">4) Distress Tolerance (Bloom)</a></li>
          <li><a className="underline hover:text-emerald-700" href="#maintenance">5) Generalization & Maintenance (Fruit)</a></li>
          <li><a className="underline hover:text-emerald-700" href="#pacing">Recommended Pacing</a></li>
          <li><a className="underline hover:text-emerald-700" href="#features">Core App Features to Build</a></li>
          <li><a className="underline hover:text-emerald-700" href="#paths">Paths & Personalization</a></li>
          <li><a className="underline hover:text-emerald-700" href="#safety">Content Safety & Licensing Notes</a></li>
        </ol>
      </section>

      {/* Orientation */}
      <Section id="orientation" title="0) Onboarding & Orientation (Seed)" badge="Foundations">
        <p>
          <strong>Goal:</strong> Prime learners on what DBT is, how DewBloom works, and how progress is tracked.
        </p>
        <ul className="mt-3 space-y-2 list-disc pl-6">
          <li>What DBT is; why skills training; cycle structure.</li>
          <li>Brief on the four skills modules.</li>
          <li>Expectation setting; how to use worksheets/practice between sessions.</li>
          <li>Values/goals intake to personalize pathways.</li>
        </ul>
        <h4 className="mt-6 font-semibold">App activities</h4>
        <ul className="mt-2 space-y-2 list-disc pl-6">
          <li>60‑sec explainer + mini‑quiz.</li>
          <li>“Set your targets” checklist (practice frequency, crisis plan toggle).</li>
          <li>Streaks & reminders setup.</li>
        </ul>
      </Section>

      {/* Mindfulness */}
      <Section id="mindfulness" title="1) Core Mindfulness (Sprout)" badge="Module">
        <p>
          Mindfulness is the foundation and recurs before each module. Teach “Wise Mind,” the
          “What” and “How” skills, then optional spiritual/“middle path” perspectives.
        </p>
        <h4 className="mt-6 font-semibold">Submodules</h4>
        <ol className="mt-2 space-y-2 list-decimal pl-6">
          <li>
            Wise Mind & States of Mind — <em>What</em>: observe, describe, participate; <em>How</em>:
            nonjudgmentally, one‑mindfully, effectively.
          </li>
          <li>Practice Packs: Loving‑kindness; Balancing Doing/Being; Walking the Middle Path (optional/advanced).</li>
        </ol>
        <h4 className="mt-6 font-semibold">Typical lessons (6–8 bite‑lessons)</h4>
        <ul className="mt-2 space-y-2 list-disc pl-6">
          <li>Micro‑drills: 1–2‑minute observe/describe prompts.</li>
          <li>“What vs. How” tap‑to‑sort.</li>
          <li>Wise‑Mind check‑in widget tied to a day streak.</li>
        </ul>
        <Hint>Good worksheet targets to mirror in‑app: Mindfulness practice calendars/checklists.</Hint>
      </Section>

      {/* Interpersonal Effectiveness */}
      <Section id="ie" title="2) Interpersonal Effectiveness (Stem)" badge="Module">
        <p>
          Ask for what you need, keep relationships, and keep self‑respect: <strong>DEAR MAN</strong>, <strong>GIVE</strong>,
          <strong> FAST</strong>; when/how intensely to ask or say no; relationship building/ending; Middle Path skills.
        </p>
        <h4 className="mt-6 font-semibold">Submodules</h4>
        <ol className="mt-2 space-y-2 list-decimal pl-6">
          <li>Clarifying priorities & goals in interactions.</li>
          <li>Objectives effectiveness — <strong>DEAR MAN</strong>.</li>
          <li>Relationship effectiveness — <strong>GIVE</strong> (+ levels of validation).</li>
          <li>Self‑respect effectiveness — <strong>FAST</strong>.</li>
          <li>Whether/how intensely to ask or say no; troubleshooting.</li>
          <li>Building/ending relationships; Mindfulness of others.</li>
          <li>Walking the Middle Path (dialectics, validation, behavior change).</li>
        </ol>
        <h4 className="mt-6 font-semibold">Lesson ideas (10–12 bite‑lessons)</h4>
        <ul className="mt-2 space-y-2 list-disc pl-6">
          <li>Interactive <strong>DEAR MAN</strong> builder (auto‑generate scripts).</li>
          <li>Validation levels (“expand the V”) swipe‑cards.</li>
          <li>“Ask or let go?” intensity calculator mini‑tool.</li>
        </ul>
        <h4 className="mt-6 font-semibold">Worksheet/UI alignment</h4>
        <ul className="mt-2 space-y-2 list-disc pl-6">
          <li>DEAR MAN/GIVE/FAST checklists and decisioning tools.</li>
          <li>Relationships & Middle Path handouts/mini‑lessons.</li>
        </ul>
      </Section>

      {/* Emotion Regulation */}
      <Section id="er" title="3) Emotion Regulation (Leaf)" badge="Module">
        <p>
          Understand & label emotions; change responses (<strong>Check the Facts</strong>, <strong>Opposite Action</strong>,
          <strong> Problem Solving</strong>); reduce vulnerability (<strong>ABC PLEASE</strong>); manage really tough emotions.
        </p>
        <h4 className="mt-6 font-semibold">Submodules</h4>
        <ol className="mt-2 space-y-2 list-decimal pl-6">
          <li>Understanding & naming emotions.</li>
          <li>Changing emotions: <strong>Check the Facts</strong>, <strong>Opposite Action</strong>, <strong>Problem Solving</strong>.</li>
          <li>
            Reducing vulnerability: <strong>ABC PLEASE</strong> — Accumulate Positive Emotions (short/long term), Build
            Mastery, Cope Ahead, PLUS body‑care (PLEASE), sleep & nightmare protocol.
          </li>
          <li>Managing really difficult emotions: mindfulness of current emotions; troubleshooting.</li>
        </ol>
        <h4 className="mt-6 font-semibold">Lesson ideas (12–14 bite‑lessons)</h4>
        <ul className="mt-2 space-y-2 list-disc pl-6">
          <li>“Check the Facts” decision tree with examples.</li>
          <li>“Opposite Action” picker (maps emotion → urge → opposite).</li>
          <li>
            <strong>ABC PLEASE</strong> weekly planner: Pleasant Events Diary, Mastery ladder, Cope‑Ahead rehearsal.
          </li>
        </ul>
        <h4 className="mt-6 font-semibold">Worksheet alignment</h4>
        <ul className="mt-2 space-y-2 list-disc pl-6">
          <li>Change‑skills worksheets (facts‑checking, opposite action, problem solving).</li>
          <li>ABC PLEASE (pleasant events diary, mastery, sleep hygiene/nightmare protocol).</li>
          <li>Managing strong emotions (mindfulness of current emotions; exposure style practices).</li>
        </ul>
      </Section>

      {/* Distress Tolerance */}
      <Section id="dt" title="4) Distress Tolerance (Bloom)" badge="Module">
        <p>
          Survive crises without making things worse; accept reality when it can’t be changed.
          Six crisis survival categories + reality acceptance; addiction sub‑track optional.
        </p>
        <h4 className="mt-6 font-semibold">Submodules</h4>
        <div className="mt-2 grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold">A. Crisis Survival</h5>
            <ol className="mt-2 space-y-2 list-decimal pl-6">
              <li><strong>STOP</strong></li>
              <li><strong>Pros & Cons</strong></li>
              <li><strong>TIP</strong> (Temperature, Intense exercise, Paced breathing, Paired muscle relaxation)</li>
              <li>Distract with <strong>ACCEPTS</strong></li>
              <li>Self‑soothe (5 senses + body scan)</li>
              <li><strong>IMPROVE</strong></li>
            </ol>
          </div>
          <div>
            <h5 className="font-semibold">B. Reality Acceptance</h5>
            <ol className="mt-2 space-y-2 list-decimal pl-6">
              <li>Radical Acceptance</li>
              <li>Turning the Mind</li>
              <li>Willingness vs. Willfulness</li>
              <li>Half‑Smiling/Willing Hands</li>
              <li>Mindfulness of Current Thoughts</li>
            </ol>
          </div>
        </div>
        <h4 className="mt-6 font-semibold">Lesson ideas (12–14 bite‑lessons)</h4>
        <ul className="mt-2 space-y-2 list-disc pl-6">
          <li>“STOP” quick‑action drill (tap‑through rehearsal).</li>
          <li>
            <strong>TIP</strong> coach with safety notes and timers (ice water caution & paced breathing counts).
          </li>
          <li>“Pros & Cons” decisional balance board.</li>
          <li>Radical Acceptance slider exercises and turning‑the‑mind practice cues.</li>
        </ul>
        <h4 className="mt-6 font-semibold">Worksheet alignment</h4>
        <ul className="mt-2 space-y-2 list-disc pl-6">
          <li>Crisis survival: STOP, Pros & Cons, TIP, ACCEPTS, Self‑soothe, IMPROVE.</li>
          <li>Reality acceptance: Radical Acceptance, Turning the Mind, Willingness vs Willfulness, Half‑Smile/Willing Hands, Mindfulness of Thoughts.</li>
          <li>Addiction track (optional) for urges and replacement behaviors.</li>
        </ul>
      </Section>

      {/* Maintenance */}
      <Section id="maintenance" title="5) Generalization & Maintenance (Fruit)" badge="Integration">
        <p>
          <strong>Goal:</strong> Keep skills alive; troubleshoot; personalize a relapse‑prevention plan.
        </p>
        <ul className="mt-3 space-y-2 list-disc pl-6">
          <li>Monthly “skills audit” + “when what you’re doing isn’t working” review.</li>
          <li>Personal crisis card (STOP/TIP/contacts) and environment prompts.</li>
          <li>
            Option to repeat the skills cycle (DBT commonly cycles modules; typical adult pacing:
            Mindfulness 2 weeks; IE 5; DT 6; ER 7; one full pass ≈ 24 weeks, then repeat). Build a
            “Repeat Cycle” toggle for year‑long practice.
          </li>
        </ul>
      </Section>

      {/* Pacing */}
      <Section id="pacing" title="Recommended Pacing" badge="Planner">
        <ul className="space-y-2 list-disc pl-6">
          <li><strong>Mindfulness</strong>: 6–8 micro‑lessons (repeat before each module).</li>
          <li><strong>Interpersonal Effectiveness</strong>: ~10–12 micro‑lessons.</li>
          <li><strong>Emotion Regulation</strong>: ~12–14 micro‑lessons.</li>
          <li><strong>Distress Tolerance</strong>: ~12–14 micro‑lessons.</li>
        </ul>
        <p className="mt-3">
          Each bite ≈ 3–7 minutes, with a 1–2 minute practice prompt and a 30‑sec reflection.
          This maps neatly onto a 24‑week cycle while keeping it snackable.
        </p>
      </Section>

      {/* Features */}
      <Section id="features" title="Core App Features to Build" badge="Product">
        <ol className="space-y-4 list-decimal pl-6">
          <li>
            <strong>Daily Skills Coach</strong>
            <ul className="mt-2 space-y-1 list-disc pl-6">
              <li>Rotates “Mindfulness warm‑up → Module bite → Micro‑practice → Reflection.”</li>
              <li>Use module‑specific checklists/calendars from worksheets (turn into tappable UI).</li>
            </ul>
          </li>
          <li>
            <strong>Practice Builders</strong>
            <ul className="mt-2 space-y-1 list-disc pl-6">
              <li><strong>DEAR MAN</strong> script generator.</li>
              <li><strong>Opposite Action</strong> plan builder.</li>
              <li><strong>Cope Ahead</strong> rehearsal (store as templates).</li>
            </ul>
          </li>
          <li>
            <strong>ABC PLEASE Planner</strong>
            <ul className="mt-2 space-y-1 list-disc pl-6">
              <li>Pleasant Events Diary with streaks.</li>
              <li>Mastery ladder (difficulty slider).</li>
              <li>Sleep hygiene & Nightmare protocol toggles.</li>
            </ul>
          </li>
          <li>
            <strong>Crisis Drawer (always‑on FAB)</strong>
            <ul className="mt-2 space-y-1 list-disc pl-6">
              <li>STOP, TIP timers, Pros & Cons board, Self‑soothe playlist, IMPROVE cards.</li>
              <li>Include health cautions for cold‑water TIP.</li>
            </ul>
          </li>
          <li>
            <strong>Middle Path Mini‑Course</strong>
            <ul className="mt-2 space-y-1 list-disc pl-6">
              <li>Dialectics & validation micro‑cards—great for adolescents/relationships track.</li>
            </ul>
          </li>
          <li>
            <strong>Troubleshooter</strong>
            <ul className="mt-2 space-y-1 list-disc pl-6">
              <li>
                “When what you’re doing isn’t working” decision tree that routes to alternative skills.
              </li>
            </ul>
          </li>
        </ol>
      </Section>

      {/* Paths */}
      <Section id="paths" title="Paths & Personalization" badge="Adaptive">
        <ul className="space-y-2 list-disc pl-6">
          <li>
            <strong>Standard Path (Adults)</strong>: Mindfulness → IE → ER → DT, repeating mindfulness between modules.
          </li>
          <li>
            <strong>Alt Start</strong>: If a user flags frequent crises, unlock Crisis Survival quick‑wins early
            (clinics often hand these out day one).
          </li>
          <li>
            <strong>Adolescent/Family Flavor</strong>: Make “Walking the Middle Path” a required mini‑track.
          </li>
        </ul>
      </Section>

      {/* Safety */}
      <Section id="safety" title="Content Safety & Licensing Notes" badge="Compliance">
        <ul className="space-y-2 list-disc pl-6">
          <li>
            Summarize and create <em>interactive versions</em> of handouts/worksheets inside the app UI.
            Avoid distributing verbatim PDFs or long verbatim passages.
          </li>
          <li>
            Convert content into checklists, calendars, guided forms tied to the skill names above.
          </li>
          <li>
            Keep skill names intact (e.g., DEAR MAN, GIVE, FAST, ABC PLEASE, STOP, TIP, ACCEPTS, IMPROVE) for
            clinical fidelity.
          </li>
        </ul>
      </Section>

      {/* JSON Schema Preview */}
      <section id="json" className="mx-auto max-w-5xl px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-bold">Course JSON (Preview)</h2>
        <p className="mt-2 text-slate-600">Use this as a seed for routes/components. IDs are stable slugs.</p>
        <pre className="mt-6 whitespace-pre-wrap rounded-2xl bg-slate-900 text-slate-100 p-5 text-sm overflow-x-auto shadow">
{`
{
  "courseId": "dewbloom-dbt",
  "title": "DewBloom — DBT Skills",
  "modules": [
    {
      "id": "orientation",
      "title": "Onboarding & Orientation (Seed)",
      "goals": [
        "What DBT is; why skills training; cycle structure",
        "Four modules overview; expectations; worksheets/practice",
        "Values/goals intake and personalization"
      ],
      "activities": ["explainer_quiz", "targets_checklist", "streaks_setup"]
    },
    {
      "id": "mindfulness",
      "title": "Core Mindfulness (Sprout)",
      "submodules": [
        {
          "id": "wise-mind",
          "title": "Wise Mind & States of Mind",
          "what": ["observe", "describe", "participate"],
          "how": ["nonjudgmentally", "one-mindfully", "effectively"]
        },
        {
          "id": "practice-packs",
          "title": "Practice Packs",
          "items": ["Loving-kindness", "Doing/Being balance", "Middle Path"]
        }
      ],
      "lessons": 8
    },
    {
      "id": "interpersonal-effectiveness",
      "title": "Interpersonal Effectiveness (Stem)",
      "submodules": [
        "priorities-goals",
        "dear-man",
        "give-validation",
        "fast-self-respect",
        "intensity-ask-say-no",
        "relationships-building-ending",
        "middle-path"
      ],
      "lessons": 12,
      "builders": ["dear_man_generator", "validation_cards", "intensity_calculator"]
    },
    {
      "id": "emotion-regulation",
      "title": "Emotion Regulation (Leaf)",
      "submodules": [
        "naming-emotions",
        "check-the-facts",
        "opposite-action",
        "problem-solving",
        "abc-please",
        "managing-strong-emotions"
      ],
      "lessons": 14,
      "builders": ["facts_tree", "opposite_action_picker", "abc_please_planner"]
    },
    {
      "id": "distress-tolerance",
      "title": "Distress Tolerance (Bloom)",
      "submodules": {
        "crisis-survival": ["STOP", "pros-cons", "TIP", "ACCEPTS", "self-soothe", "IMPROVE"],
        "reality-acceptance": ["radical-acceptance", "turning-the-mind", "willingness", "half-smile", "mindfulness-of-thoughts"]
      },
      "lessons": 14,
      "builders": ["stop_drill", "tip_coach", "pros_cons_board", "acceptance_sliders"]
    },
    {
      "id": "maintenance",
      "title": "Generalization & Maintenance (Fruit)",
      "goals": ["monthly_skills_audit", "personal_crisis_card", "repeat_cycle_toggle"],
      "lessons": 6
    }
  ],
  "pacing": {
    "mindfulness": 8,
    "ie": 12,
    "er": 14,
    "dt": 14,
    "bite_minutes": {"min": 3, "max": 7}
  },
  "features": [
    "daily_skills_coach",
    "practice_builders",
    "abc_please_planner",
    "crisis_drawer",
    "middle_path_minicourse",
    "troubleshooter"
  ],
  "paths": {
    "standard": ["mindfulness", "interpersonal-effectiveness", "emotion-regulation", "distress-tolerance"],
    "alt_start": ["distress-tolerance:crisis-survival"],
    "adolescent": ["middle-path"]
  }
}
`}
        </pre>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-5xl px-6 pb-20 text-sm text-slate-500">
        <p>
          © {new Date().getFullYear()} DewBloom. This course map summarizes DBT skills for educational UI design and
          is not a substitute for professional care.
        </p>
      </footer>
    </main>
  );
}
function Section({ id, title, badge, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100 p-6">
        <div className="flex items-center gap-3">
          {badge && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold ring-1 ring-emerald-200">
              {badge}
            </span>
          )}
          <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
        </div>
        <div className="mt-4 prose prose-slate max-w-none">
          {children}
        </div>
      </div>
    </section>
  );
}

function Hint({ children }) {
  return (
    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900 text-sm">
      <strong className="block mb-1">Builder Hint</strong>
      <div>{children}</div>
    </div>
  );
}
