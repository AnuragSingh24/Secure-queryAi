import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuditLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('https://secure-query.onrender.com/api/query/audit-log', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Audit Logs</h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
          <table className="min-w-full text-sm text-left table-auto">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">Prompt</th>
                <th className="p-3">Step 0</th>
                <th className="p-3">SQL</th>
                <th className="p-3">Decision</th>
                <th className="p-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-gray-700 hover:bg-gray-700/30 transition"
                >
                  <td className="p-3">{log.userName}</td>
                  <td className="p-3">{log.userRole}</td>
                  <td className="p-3 max-w-xs break-words">{log.prompt}</td>
                  <td className="p-3 max-w-xs break-words">{log.step0Result}</td>
                  <td className="p-3 max-w-xs break-words">{log.step1SQL}</td>
                  <td className="p-3 max-w-xs break-words">{log.step2Decision}</td>
                  <td className="p-3 text-xs text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {logs.length === 0 && (
            <p className="text-center py-4 text-gray-400">No logs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AuditLog;
