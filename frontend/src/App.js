import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';

function App() {
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [currentView, setCurrentView] = useState(null); 

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

    const jobTitleCounts = jobs.reduce((acc, job) => {
        acc[job.jobTitle] = (acc[job.jobTitle] || 0) + 1;
        return acc;
    }, {});

    const pieData = {
        labels: Object.keys(jobTitleCounts),
        datasets: [{
            data: Object.values(jobTitleCounts),
            backgroundColor: [/* Array of colors corresponding to job titles */],
        }]
    };

    const applicationDatesCounts = jobs.reduce((acc, job) => {
        acc[job.applicationDate] = (acc[job.applicationDate] || 0) + 1;
        return acc;
    }, {});

    const heatmapColors = Object.values(applicationDatesCounts).map(count => {
        if (count === 0) return '#FFFFFF';
        if (count <= 2) return '#CCCCCC';
        if (count <= 6) return '#666666';
        return '#000000';
    });

    const barData = {
        labels: Object.keys(applicationDatesCounts),
        datasets: [{
            label: 'Job Applications',
            data: Object.values(applicationDatesCounts),
            backgroundColor: heatmapColors,
        }]
    };

    return (
        <div className="App" style={{ filter: currentView ? 'blur(8px)' : 'none' }}>
            <h1>Job Applications</h1>
            <table className="table-bordered">
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
            
            <button onClick={() => setCurrentView('pie')}>Pie Chart</button>
            <button onClick={() => setCurrentView('heatmap')}>Heatmap</button>

            {currentView && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    background: 'white',
                    padding: '20px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                    borderRadius: '10px',
                }}>
                    {currentView === 'pie' && <Pie data={pieData} />}
                    {currentView === 'heatmap' && <Bar data={barData} />}

                    <button style={{
                        marginTop: '20px',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }} onClick={() => setCurrentView(null)}>Close</button>
                </div>
            )}

            {currentView && (
                <div onClick={() => setCurrentView(null)} style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 900
                }} />
            )}
        </div>
    );
}

export default App;
