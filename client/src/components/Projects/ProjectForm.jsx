import React, { useState } from 'react';
import { createProject } from '../../services/projectService';

const ProjectForm = ({ onClose, onProjectCreated }) => {
  const [form, setForm] = useState({ name: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createProject(form);
      onProjectCreated(res.data.project);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-medium">Project Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
        placeholder="My New Project"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {loading ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
};

export default ProjectForm;
