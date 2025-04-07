import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Mock activities data
const mockActivities = [
  {
    id: 1,
    activity_type: 'Car Travel',
    input_value: '50',
    input_unit: 'km',
    timestamp: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    id: 2,
    activity_type: 'Electricity Usage',
    input_value: '5',
    input_unit: 'kwh',
    timestamp: new Date(Date.now() - 7200000) // 2 hours ago
  },
  {
    id: 3,
    activity_type: 'Waste Disposal',
    input_value: '2',
    input_unit: 'kg',
    timestamp: new Date(Date.now() - 10800000) // 3 hours ago
  }
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activities, setActivities] = useState(mockActivities);
  const [formData, setFormData] = useState({
    activity_type: '',
    input_value: '',
    input_unit: 'kg',
    timestamp: new Date()
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add new activity to the list
    const newActivity = {
      id: activities.length + 1,
      ...formData,
      timestamp: new Date()
    };
    setActivities([newActivity, ...activities]);
    // Reset form
    setFormData({
      activity_type: '',
      input_value: '',
      input_unit: 'kg',
      timestamp: new Date()
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user.displayName}!
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Log New Activity</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Activity Type
              </label>
              <input
                type="text"
                name="activity_type"
                value={formData.activity_type}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Value
              </label>
              <input
                type="number"
                name="input_value"
                value={formData.input_value}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit
              </label>
              <select
                name="input_unit"
                value={formData.input_unit}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="km">Kilometers (km)</option>
                <option value="kwh">Kilowatt Hours (kWh)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log Activity
            </button>
          </form>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="border-b pb-4">
                <p className="font-medium">{activity.activity_type}</p>
                <p className="text-gray-600">
                  {activity.input_value} {activity.input_unit}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 