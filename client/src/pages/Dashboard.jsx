import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tasks/dashboard/stats')
      .then(r => setStats(r.data))
      .catch(() => setStats({ total: 0, todo: 0, inprogress: 0, done: 0, overdue: 0, byUser: [] }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  const cards = [
    { label: 'Total Tasks', value: stats.total, color: '#f0c040' },
    { label: 'To Do', value: stats.todo, color: '#8888aa' },
    { label: 'In Progress', value: stats.inprogress, color: '#60b4f0' },
    { label: 'Done', value: stats.done, color: '#60d090' },
    { label: 'Overdue', value: stats.overdue, color: '#e05a5a' },
  ];

  return (
    <div className="dashboard fade-in">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-sub">Welcome back, {user?.name}</p>
        </div>
        <Link to="/projects" className="btn-primary">View Projects →</Link>
      </div>

      <div className="stat-grid">
        {cards.map(c => (
          <div className="stat-card" key={c.label} style={{'--c': c.color}}>
            <div className="stat-value">{c.value ?? 0}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>

      {stats.byUser?.length > 0 && (
        <div className="section">
          <h2>Tasks per Team Member</h2>
          <div className="user-tasks">
            {stats.byUser.map(u => (
              <div className="user-task-row" key={u.name}>
                <div className="user-avatar-sm">{u.name[0]}</div>
                <span className="ut-name">{u.name}</span>
                <div className="ut-bar-wrap">
                  <div className="ut-bar" style={{ width: `${Math.min(100, (u.count / (stats.total || 1)) * 100)}%` }} />
                </div>
                <span className="ut-count">{u.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.total === 0 && (
        <div className="empty-state">
          <div className="empty-icon">◈</div>
          <h3>No tasks yet</h3>
          <p>Create a project and start adding tasks</p>
          <Link to="/projects" className="btn-primary">Create Project</Link>
        </div>
      )}
    </div>
  );
}
