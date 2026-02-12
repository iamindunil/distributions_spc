export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-orange-500 mb-4">
          System Settings
        </h1>

        <p className="text-gray-600 mb-6">
          Configure system preferences and application settings.
        </p>

        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-xl">
            Notification Preferences
          </div>

          <div className="bg-orange-50 p-4 rounded-xl">
            User Roles & Permissions
          </div>

          <div className="bg-orange-50 p-4 rounded-xl">
            Security Settings
          </div>
        </div>
      </div>
    </div>
  );
}
