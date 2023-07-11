// Create server and port number.
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csvParser = require('csv-parser');
const app = express();
const PORT = 5000;

// Constant paths to the files used to read and write job data.
const TXT_PATH = '../data/urls.txt';
const CSV_PATH = '../data/jobs.csv'

// CORS headers.
app.use(cors());

// Handles getting the data from the csv to display.
app.get('/csv', (req, res) => {
    // Need to load data from txt file to a set and then only
    // add new objects to the response if the url is not already
    // in the file.
    urlSet = new Set();
    fs.createReadStream(TXT_PATH)
        .on('data', (data) => {
            strings = data.toString().split('\n')
            for (let s of strings) { urlSet.add(s) }
        })
        .on('end', () => {
            let jobArr = [];
            let idCounter = 0;
            newSet = new Set();
            fs.createReadStream(CSV_PATH)
                .pipe(csvParser())
                .on('data', (data) => {
                    if (!urlSet.has(data.url)) {
                        jobArr.push({title: data.title, company: data.company, 
                                    location: data.location, date: data.date, 
                                    description: data.description, url: data.url,
                                    id: idCounter});
                        idCounter++;
                    }
                })
                .on('end', () => res.send(jobArr))
                .on('error', (error) => console.error('Error: ', error))
        })
        .on('error', (error) => console.error('Error: ', error))
})

// Handles writting url to txt file.
app.post('/txt', (req, res) => {
    let receivedString = '';

    req.on('data', (chunk) => {
        receivedString += chunk;
    })

    req.on('end', () => {
        fs.appendFile(TXT_PATH, receivedString + '\n',  (err) => {
            if (err) { console.log('Error writing to file.') }
        })
    })
})

app.listen(PORT, () => {
    console.log('Listening on port: %d.', PORT)
})