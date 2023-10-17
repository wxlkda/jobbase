import React, { useState, useEffect } from 'react';

function App() {
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/')
            .then(response => response.json())
            .then(data => setJobs(data));
    }, []);

    const handleSubmit = async () => {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.error) {
            setError(data.error);
        } else {
            if (formData.id) {
                setJobs(jobs.map(job => job.id === data.id ? data : job));
            } else {
                setJobs(prevJobs => [...prevJobs, data]);
            }
            setFormData({});
        }
    };

    const handleEdit = (job) => {
        setFormData(job);
    };

    return (
        <div className="App">
            <h1>Job Applications</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Application Date</th>
                        <th>Status</th>
                        <th>Link</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job.id}>
                            <td>{job.id}</td>
                            <td>{job.jobTitle}</td>
                            <td>{job.company}</td>
                            <td>{job.applicationDate}</td>
                            <td>{job.status}</td>
                            <td><a href={job.link}>Link</a></td>
                            <td><button onClick={() => handleEdit(job)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2>{formData.id ? 'Edit Job Application' : 'Add Job Application'}</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input placeholder="Job Title" value={formData.jobTitle || ''} onChange={e => setFormData({ ...formData, jobTitle: e.target.value })} />
                <input placeholder="Company" value={formData.company || ''} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                <input type="date" placeholder="Application Date" value={formData.applicationDate || ''} onChange={e => setFormData({ ...formData, applicationDate: e.target.value })} />
                <input placeholder="Status" value={formData.status || ''} onChange={e => setFormData({ ...formData, status: e.target.value })} />
                <input placeholder="Link" value={formData.link || ''} onChange={e => setFormData({ ...formData, link: e.target.value })} />
                <button onClick={handleSubmit}>{formData.id ? 'Update' : 'Add'}</button>
            </div>
        </div>
    );
}

export default App;
