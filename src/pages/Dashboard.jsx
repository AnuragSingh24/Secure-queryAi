import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FiLogOut } from 'react-icons/fi';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const token = localStorage.getItem('token');
  const role = user?.role?.toUpperCase() || 'GUEST';

  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [execLoading, setExecLoading] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const roleTableAccess = {
    ADMIN: ['EmployeeDetails', 'PayrollData', 'ProjectInfo'],
    ANALYST: ['ProjectInfo', 'EmployeeDetails'],
    EMPLOYEE: ['ProjectInfo'],
  };

  const handleQuery = async () => {
    setLoading(true);
    setResponse(null);
    setTableData(null);
    try {
      const res = await axios.post(
        'https://secure-query.onrender.com/api/query/nlq',
        { nlq: prompt, token },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResponse(res.data);
    } catch (err) {
      setResponse({ error: err?.response?.data?.error || 'Request Failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteSQL = async () => {
    if (!response?.result) return;
    setExecLoading(true);
    setTableData(null);
    try {
      const res = await axios.post(
        'https://secure-query.onrender.com/api/query/execute',
        { query: response.result },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTableData(res.data?.data || []);
    } catch (err) {
      setTableData([]);
      alert('Execution failed: ' + (err.response?.data?.error || 'Unknown error'));
    } finally {
      setExecLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = 'http://localhost:5173/';
  };

  const renderResponse = () => {
    if (!response) return null;

    if (response.error) {
      return (
        <div className="bg-red-900 text-red-200 p-4 mt-4 rounded-lg border border-red-400">
          <strong>Error:</strong> {response.error}
        </div>
      );
    }

    return (
    <div className="bg-green-900 text-green-200 p-4 mt-4 rounded-lg border border-green-400 space-y-3">
    <strong>SQL Query:</strong>
    <div className="bg-black p-2 rounded text-sm overflow-auto max-w-full">
      <pre className="whitespace-pre text-wrap break-words">{response.result}</pre>
    </div>
    <button
      className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      onClick={handleExecuteSQL}
    >
      ▶️ {execLoading ? 'Executing...' : 'Execute SQL'}
    </button>
  </div>
    );
  };

  const renderTable = () => {
    if (!tableData || tableData.length === 0) return null;

    const headers = Object.keys(tableData[0]);

    return (
      <div className="mt-6 overflow-x-auto bg-gray-800 p-4 rounded-xl border border-gray-700 shadow">
        <h3 className="text-xl font-semibold mb-3 text-blue-300">Query Results</h3>
        <table className="w-full text-left text-sm table-auto border-collapse">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              {headers.map((head) => (
                <th key={head} className="px-4 py-2 border-b border-gray-600">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-700">
                {headers.map((key) => (
                  <td key={key} className="px-4 py-2 border-b border-gray-700">
                    {formatValue(row[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const formatValue = (value) => {
    if (value === null || value === undefined) return <span className="italic text-gray-400">null</span>;
    if (typeof value === 'string' && value.includes('T')) {
      const date = new Date(value);
      return isNaN(date.getTime()) ? value : date.toISOString().split('T')[0];
    }
    return value.toString();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 font-sans overflow-hidden">
      <div className="absolute top-4 right-4 w-48 h-48 z-0 opacity-80">
        <DotLottieReact
          src="https://lottie.host/c4dfef53-4b88-4b90-a743-b013524b6231/YlMzWl0g1J.lottie"
          loop
          autoplay
        />
      </div>

      {/* Logout Button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center space-y-4 border border-gray-600">
            <h2 className="text-xl font-bold text-white">Are you sure you want to log out?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-5 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-2 text-blue-400">Welcome, {user.name || 'User'} 👋</h1>
          <p className="text-lg text-gray-400">Role: <span className="font-semibold text-white">{role}</span></p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 p-6">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Your Information</h2>
          <div className="space-y-2 text-lg">
            <p><span className="text-gray-400">Email:</span> {user.email || 'N/A'}</p>
            <p><span className="text-gray-400">Role:</span> {role}</p>
            <p>
              <span className="text-gray-400">Accessible Tables:</span>{' '}
              {roleTableAccess[role]?.length ? (
                <span className="text-green-300 font-medium">
                  {roleTableAccess[role].join(', ')}
                </span>
              ) : (
                <span className="italic text-red-300">None</span>
              )}
            </p>
          </div>
        </div>

        {role === 'ADMIN' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard title="Users" value="43" />
              <DashboardCard title="Audit Logs" value="1024" />
              <DashboardCard title="Errors" value="12" />
            </div>
            <div className="text-center mt-6">
              <Link
                to="/audit-log"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
              >
                View Audit Logs
              </Link>
            </div>
          </>
        )}

        {role === 'ANALYST' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Reports Generated" value="278" />
            <DashboardCard title="Dashboards Shared" value="54" />
            <DashboardCard title="Live Feeds" value="7" />
          </div>
        )}

        {role === 'EMPLOYEE' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Assigned Tasks" value="15" />
            <DashboardCard title="Upcoming Meetings" value="3" />
            <DashboardCard title="Leave Balance" value="5 Days" />
          </div>
        )}

        <div className="mt-10 bg-gray-900 p-6 rounded-2xl border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-300">Natural Language Query</h2>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='e.g., "Get the data from EmployeeDetails table"'
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleQuery}
            disabled={loading || !prompt.trim()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            {loading ? 'Submitting...' : 'Submit Prompt'}
          </button>

          {renderResponse()}
          {renderTable()}
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-transform hover:scale-105 duration-300">
    <p className="text-sm text-gray-400">{title}</p>
    <h3 className="text-3xl font-bold mt-2 text-white">{value}</h3>
  </div>
);

export default Dashboard;
