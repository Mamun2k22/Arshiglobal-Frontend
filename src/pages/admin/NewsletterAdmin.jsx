// components/AdminDashboard/NewsletterAdmin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Trash2, 
  Search, 
  Download, 
  Mail, 
  Calendar, 
  CheckCircle, 
  Users,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

const NewsletterAdmin = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    week: 0,
    month: 0
  });
  const [exportLoading, setExportLoading] = useState(false);

  // Fetch subscribers on component mount
  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Filter subscribers when search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = subscribers.filter(sub => 
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubscribers(filtered);
    } else {
      setFilteredSubscribers(subscribers);
    }
    setCurrentPage(1);
  }, [searchTerm, subscribers]);

  // Calculate statistics
  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const todayCount = subscribers.filter(s => new Date(s.createdAt) >= today).length;
    const weekCount = subscribers.filter(s => new Date(s.createdAt) >= weekAgo).length;
    const monthCount = subscribers.filter(s => new Date(s.createdAt) >= monthAgo).length;

    setStats({
      total: subscribers.length,
      today: todayCount,
      week: weekCount,
      month: monthCount
    });
  }, [subscribers]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/newsletter', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSubscribers(response.data.items || []);
      setFilteredSubscribers(response.data.items || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch subscribers. Please check your authentication.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscriber = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return;

    try {
      await axios.delete(`/api/newsletter/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      setSubscribers(prev => prev.filter(sub => sub._id !== id));
      setSuccess('Subscriber deleted successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete subscriber');
      console.error('Delete error:', err);
    }
  };

  const deleteSelected = async () => {
    if (selectedRows.length === 0) return;
    
    if (!window.confirm(`Are you sure you want to delete ${selectedRows.length} subscriber(s)?`)) return;

    try {
      const deletePromises = selectedRows.map(id =>
        axios.delete(`/api/newsletter/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      );

      await Promise.all(deletePromises);
      setSubscribers(prev => prev.filter(sub => !selectedRows.includes(sub._id)));
      setSelectedRows([]);
      setSuccess(`${selectedRows.length} subscriber(s) deleted successfully`);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete selected subscribers');
      console.error('Bulk delete error:', err);
    }
  };

  const exportToCSV = () => {
    setExportLoading(true);
    
    const headers = ['Email', 'Date Subscribed', 'ID'];
    const csvData = subscribers.map(sub => [
      sub.email,
      new Date(sub.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      sub._id
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setExportLoading(false);
    setSuccess('CSV exported successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const currentPageIds = paginatedSubscribers.map(sub => sub._id);
      setSelectedRows(currentPageIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedSubscribers = filteredSubscribers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);

  const StatsCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color.replace('text', 'bg').replace('-600', '-100')}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Newsletter Subscribers</h1>
          <p className="text-gray-600 mt-2">Manage your newsletter subscribers and export data</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportToCSV}
            disabled={exportLoading || subscribers.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            {exportLoading ? 'Exporting...' : 'Export CSV'}
          </button>
          {selectedRows.length > 0 && (
            <button
              onClick={deleteSelected}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected ({selectedRows.length})
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          icon={Users}
          title="Total Subscribers"
          value={stats.total}
          color="text-blue-600"
        />
        <StatsCard 
          icon={Mail}
          title="Today"
          value={stats.today}
          color="text-green-600"
        />
        <StatsCard 
          icon={Calendar}
          title="Last 7 Days"
          value={stats.week}
          color="text-purple-600"
        />
        <StatsCard 
          icon={Filter}
          title="Last 30 Days"
          value={stats.month}
          color="text-orange-600"
        />
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-600">{success}</p>
        </div>
      )}

      {/* Search and Controls */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === paginatedSubscribers.length && paginatedSubscribers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Subscribed
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedSubscribers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No subscribers found</p>
                    {searchTerm && (
                      <p className="text-gray-400 mt-2">Try a different search term</p>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedSubscribers.map((subscriber) => (
                  <tr 
                    key={subscriber._id} 
                    className={`hover:bg-gray-50 transition-colors ${
                      selectedRows.includes(subscriber._id) ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(subscriber._id)}
                        onChange={() => handleSelectRow(subscriber._id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{subscriber.email}</p>
                          <p className="text-xs text-gray-500 font-mono truncate max-w-xs">
                            ID: {subscriber._id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {formatDate(subscriber.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteSubscriber(subscriber._id)}
                        className="flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastItem, filteredSubscribers.length)}
              </span>{' '}
              of <span className="font-medium">{filteredSubscribers.length}</span> results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterAdmin;