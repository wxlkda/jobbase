const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jobApplications = require('./models/jobApplications');
console.log(jobApplications);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const jobs = await jobApplications.findAll();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

app.post('/', async (req, res) => {
    try {
        const jobData = req.body;
        let job;
        if (jobData.id) {
            job = await jobApplications.findByPk(jobData.id);
            await job.update(jobData);
        } else {
            job = await jobApplications.create(jobData);
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save job' });
    }
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../frontend/build/index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
