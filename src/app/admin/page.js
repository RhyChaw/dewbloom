// app/admin/page.jsx
"use client";

import React, { useState } from "react";

function emptyLesson() {
  return { id: cryptoRandomId(), title: "New Lesson", durationMinutes: 5, content: "" };
}
function emptyModule() {
  return { id: cryptoRandomId(), title: "New Module", badge: "", lessons: [emptyLesson()] };
}
function cryptoRandomId() {
  // lightweight random id (browser)
  return Math.random().toString(36).slice(2, 9);
}

export default function AdminPage() {
  const [course, setCourse] = useState({
    courseId: "dewbloom-dbt",
    title: "New DBT Course",
    description: "Short course description",
    slug: "dewbloom-dbt",
    modules: [emptyModule()],
    pacing: { biteMinutes: { min: 3, max: 7 } },
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  function updateCourse(updater) {
    setCourse((c) => {
      const next = typeof updater === "function" ? updater(c) : { ...c, ...updater };
      return next;
    });
  }

  /* Module helpers */
  function addModule() {
    updateCourse((c) => ({ ...c, modules: [...c.modules, emptyModule()] }));
  }
  function removeModule(modId) {
    updateCourse((c) => ({ ...c, modules: c.modules.filter((m) => m.id !== modId) }));
  }
  function moveModule(modId, dir) {
    updateCourse((c) => {
      const modules = [...c.modules];
      const idx = modules.findIndex((m) => m.id === modId);
      if (idx === -1) return c;
      const swap = idx + dir;
      if (swap < 0 || swap >= modules.length) return c;
      [modules[idx], modules[swap]] = [modules[swap], modules[idx]];
      return { ...c, modules };
    });
  }
  function updateModule(modId, patch) {
    updateCourse((c) => ({
      ...c,
      modules: c.modules.map((m) => (m.id === modId ? { ...m, ...patch } : m)),
    }));
  }

  /* Lesson helpers */
  function addLesson(modId) {
    updateCourse((c) => ({
      ...c,
      modules: c.modules.map((m) =>
        m.id === modId ? { ...m, lessons: [...m.lessons, emptyLesson()] } : m
      ),
    }));
  }
  function removeLesson(modId, lessonId) {
    updateCourse((c) => ({
      ...c,
      modules: c.modules.map((m) =>
        m.id === modId ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) } : m
      ),
    }));
  }
  function moveLesson(modId, lessonId, dir) {
    updateCourse((c) => {
      const modules = c.modules.map((m) => {
        if (m.id !== modId) return m;
        const lessons = [...m.lessons];
        const idx = lessons.findIndex((l) => l.id === lessonId);
        if (idx === -1) return m;
        const swap = idx + dir;
        if (swap < 0 || swap >= lessons.length) return m;
        [lessons[idx], lessons[swap]] = [lessons[swap], lessons[idx]];
        return { ...m, lessons };
      });
      return { ...c, modules };
    });
  }
  function updateLesson(modId, lessonId, patch) {
    updateCourse((c) => ({
      ...c,
      modules: c.modules.map((m) =>
        m.id === modId
          ? { ...m, lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, ...patch } : l)) }
          : m
      ),
    }));
  }

  /* Export JSON */
  function downloadJSON() {
    const dataStr = JSON.stringify(course, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${course.slug || course.courseId || "course"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* POST to API (optional) */
  async function saveToServer() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      setMessage({ type: "success", text: "Course saved to server." });
    } catch (err) {
      setMessage({ type: "error", text: "Save failed: " + (err.message || err) });
    } finally {
      setSaving(false);
    }
  }

  /* Quick validation */
  function validateCourse() {
    if (!course.title || !course.slug) return "Course title and slug are required.";
    if (!course.modules.length) return "At least one module required.";
    for (const m of course.modules) {
      if (!m.title) return "All modules must have a title.";
      if (!m.lessons.length) return `Module "${m.title}" needs at least one lesson.`;
      for (const l of m.lessons) {
        if (!l.title) return `All lessons in "${m.title}" must have a title.`;
      }
    }
    return null;
  }

  const validationError = validateCourse();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">DewBloom — Admin: Create / Edit Course</h1>
          <div className="space-x-2">
            <button
              onClick={() => {
                updateCourse({
                  courseId: cryptoRandomId(),
                  slug: (course.title || "course").toLowerCase().replace(/\s+/g, "-"),
                });
                setMessage({ type: "info", text: "New course ID generated." });
              }}
              className="px-3 py-2 rounded-md bg-white border hover:bg-slate-50"
            >
              New ID
            </button>
            <button
              onClick={downloadJSON}
              className="px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Export JSON
            </button>
            <button
              disabled={!!validationError || saving}
              onClick={saveToServer}
              className="px-3 py-2 rounded-md bg-indigo-600 text-white disabled:opacity-60 hover:bg-indigo-700"
            >
              {saving ? "Saving..." : "Save to Server"}
            </button>
          </div>
        </header>

        {message && (
          <div
            className={
              "mb-6 p-3 rounded-md " +
              (message.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800")
            }
          >
            {message.text}
          </div>
        )}

        {/* Course basic details */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Course Details</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                value={course.title}
                onChange={(e) => updateCourse({ title: e.target.value })}
                className="w-full border rounded p-2"
                placeholder="Course title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                value={course.slug}
                onChange={(e) => updateCourse({ slug: e.target.value })}
                className="w-full border rounded p-2"
                placeholder="course-slug"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Course ID</label>
              <input
                value={course.courseId}
                onChange={(e) => updateCourse({ courseId: e.target.value })}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={course.description}
              onChange={(e) => updateCourse({ description: e.target.value })}
              className="w-full border rounded p-2 h-24"
            />
          </div>
        </section>

        {/* Modules */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Modules</h2>
            <div className="space-x-2">
              <button
                onClick={addModule}
                className="px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
              >
                + Add Module
              </button>
            </div>
          </div>

          {course.modules.map((mod, mi) => (
            <div key={mod.id} className="mb-4 border rounded p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Module title</label>
                  <input
                    value={mod.title}
                    onChange={(e) => updateModule(mod.id, { title: e.target.value })}
                    className="w-full border rounded p-2"
                    placeholder={`Module ${mi + 1}`}
                  />
                </div>
                <div className="w-48">
                  <label className="block text-sm font-medium mb-1">Badge / Tag</label>
                  <input
                    value={mod.badge}
                    onChange={(e) => updateModule(mod.id, { badge: e.target.value })}
                    className="w-full border rounded p-2"
                    placeholder="e.g. Module"
                  />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => moveModule(mod.id, -1)}
                    className="px-2 py-1 rounded bg-slate-100"
                    title="Move up"
                    disabled={mi === 0}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveModule(mod.id, 1)}
                    className="px-2 py-1 rounded bg-slate-100"
                    title="Move down"
                    disabled={mi === course.modules.length - 1}
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeModule(mod.id)}
                    className="px-2 py-1 rounded bg-red-50 text-red-700 border"
                    title="Remove module"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Lessons */}
              <div className="mt-4 pl-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Lessons</h3>
                  <button
                    onClick={() => addLesson(mod.id)}
                    className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
                  >
                    + Add Lesson
                  </button>
                </div>

                {mod.lessons.map((lesson, li) => (
                  <div key={lesson.id} className="mb-3 border rounded p-3 bg-slate-50">
                    <div className="flex items-start gap-3">
                      <div className="w-10 text-xs text-slate-600">{li + 1}</div>
                      <div className="flex-1">
                        <input
                          value={lesson.title}
                          onChange={(e) => updateLesson(mod.id, lesson.id, { title: e.target.value })}
                          className="w-full border rounded p-2 mb-2"
                          placeholder="Lesson title"
                        />
                        <textarea
                          value={lesson.content}
                          onChange={(e) => updateLesson(mod.id, lesson.id, { content: e.target.value })}
                          className="w-full border rounded p-2 h-20"
                          placeholder="Short lesson content / summary"
                        />
                      </div>

                      <div className="w-36 flex flex-col items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          value={lesson.durationMinutes}
                          onChange={(e) =>
                            updateLesson(mod.id, lesson.id, { durationMinutes: Number(e.target.value || 1) })
                          }
                          className="w-full border rounded p-2 text-sm"
                          title="Duration in minutes"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => moveLesson(mod.id, lesson.id, -1)}
                            className="px-2 py-1 rounded bg-slate-100"
                            disabled={li === 0}
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveLesson(mod.id, lesson.id, 1)}
                            className="px-2 py-1 rounded bg-slate-100"
                            disabled={li === mod.lessons.length - 1}
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => removeLesson(mod.id, lesson.id)}
                            className="px-2 py-1 rounded bg-red-50 text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* JSON Preview */}
        <section className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Course JSON Preview</h2>
            <div className="text-sm text-slate-500">Validate before export</div>
          </div>

          {validationError ? (
            <div className="mb-4 p-3 text-sm text-red-800 bg-red-50 rounded">{validationError}</div>
          ) : null}

          <pre className="bg-slate-900 text-slate-100 p-4 rounded overflow-auto text-sm max-h-96">
            {JSON.stringify(course, null, 2)}
          </pre>
        </section>

        <footer className="text-sm text-slate-500">
          Tip: wire the server route <code>/api/admin/courses</code> to accept POSTed JSON and persist into your database.
        </footer>
      </div>
    </div>
  );
}
