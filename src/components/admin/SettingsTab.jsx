"use client"

import { useState, useEffect } from "react"
import { Save, Settings as SettingsIcon, CheckCircle } from "lucide-react"

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    CORS_ORIGINS: '*',
    API_V1_PREFIX: '/api/v1',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setError(null)
      const response = await fetch("/api/admin/settings")
      if (response.ok) {
        const data = await response.json()
        setSettings(prev => ({ ...prev, ...data }))
      }
    } catch (err) {
      console.error("Error loading settings:", err)
      setError("Failed to load settings")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to save settings")
      }
    } catch (err) {
      console.error("Error saving settings:", err)
      setError("Network error. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Settings</h2>
            <p className="text-gray-600 text-sm mt-1">
              Configure app-wide settings
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 card-surface p-4 bg-red-50 border-red-200 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 card-surface p-4 bg-green-50 border-green-200 text-green-700 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Settings saved successfully!
        </div>
      )}

      <div className="card-surface p-6 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            CORS Origins
          </label>
          <input
            type="text"
            value={settings.CORS_ORIGINS || '*'}
            onChange={(e) => setSettings({ ...settings, CORS_ORIGINS: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
            placeholder="* or comma-separated URLs"
          />
          <p className="mt-2 text-xs text-gray-500">
            Use * for all origins, or comma-separated list (e.g., https://app.com,https://flutter.app)
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            API Prefix
          </label>
          <input
            type="text"
            value={settings.API_V1_PREFIX || '/api/v1'}
            onChange={(e) => setSettings({ ...settings, API_V1_PREFIX: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
            placeholder="/api/v1"
          />
          <p className="mt-2 text-xs text-gray-500">
            Base path for all API routes
          </p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  )
}
