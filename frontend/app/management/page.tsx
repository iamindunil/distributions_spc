export default function ManagementPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-orange-500 mb-4">
          Management Dashboard
        </h1>

        <p className="text-gray-600 mb-6">
          Overview of employee performance and operational insights.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-orange-50 p-4 rounded-xl">
            <h3 className="font-semibold text-orange-600">Total Employees</h3>
            <p className="text-3xl font-bold mt-2">34</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl">
            <h3 className="font-semibold text-orange-600">Active Fleets</h3>
            <p className="text-3xl font-bold mt-2">15</p>
          </div>
        </div>
      </div>
    </div>
  );
}
