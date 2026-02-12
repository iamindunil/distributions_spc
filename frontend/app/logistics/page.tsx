export default function LogisticsPage() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-orange-500 mb-4">
          Logistics Overview
        </h1>

        <p className="text-gray-600">
          Manage fleet movement, routes, and live distribution tracking here.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-orange-50 p-4 rounded-xl">
            <h3 className="font-semibold text-orange-600">Active Routes</h3>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl">
            <h3 className="font-semibold text-orange-600">Vehicles On Duty</h3>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl">
            <h3 className="font-semibold text-orange-600">Pending Deliveries</h3>
            <p className="text-3xl font-bold mt-2">23</p>
          </div>
        </div>
      </div>
    </div>
  );
}
