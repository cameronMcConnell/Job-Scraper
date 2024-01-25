import React, { useState, useEffect } from 'react';
import Description from './Description';
import '../styles/App.css';

// This will be used to map the jobs to a table. 
interface jobObject {
  title: string,
  company: string,
  location: string,
  date: string,
  description: string,
  url: string,
  id: number
}

const App = (): JSX.Element => {
  // Maps to table.
  let [jobs, setJobs] = useState<jobObject[]>([]);

  // Handled by onClick event from show description.
  let [isDescription, setIsDescription] = useState<boolean>(false);
  
  // Prop passed to the Description componennt.
  let [jobDescription, setJobDescription] = useState<string>('');

  let [jobTitle, setJobTitle] = useState<string>('');

  let [location, setLocation] = useState<string>('');

  let [numberOfJobs, setNumberOfJobs] = useState<number>(1);

  // Headers to the table columns.
  const columnHeaders: string[] = ['Title', 'Company', 'Location', 'Date', 'Description', 'Url', 'Not Interested', 'Applied'];

  // Props for the description component.
  let descriptionProps = {description: jobDescription, setIsDescription: setIsDescription, setJobDescription: setJobDescription};

  // Init table on start up.
  useEffect(() => fetchJobs(), []);

  // Fetch the data from the backend/express server.
  const fetchJobs = (): void => {
    fetch('http://localhost:5000/csv')
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);     
      })
      .catch((error) => {
        console.error('Error: ', error);
      })
  }

  // Submits job url to server to be logged into txt file.
  const logURL = (event: React.ChangeEvent<HTMLInputElement>, stringToSend: string): void => {
    if (event.target.checked) {
      fetch('http://localhost:5000/txt', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: stringToSend,
      })
      .catch((error) => console.error('Error: ', error))
    }
  }

  // Submit of data from user input.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (jobTitle && location) {
      fetchJobs()
    } 
  }

  return (
    <div id='main-container'>
      {isDescription ? <Description {...descriptionProps}/> : ''}
      <header>
        <h1>Job-Scraper</h1>
      </header>
      <main>
        <table>
          <tbody>
            <tr>
              {columnHeaders.map((header: string) => (<th>{header}</th>))}
            </tr>
            {jobs.map((job: jobObject) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>{job.date}</td>
              <td><button onClick={() => {setJobDescription(job.description); setIsDescription(true)}}>Show Desc.</button></td>
              <td><a href={job.url} target='_blank' rel='noreferrer'>Apply</a></td>
              <td><input type='checkbox' onChange={(e) => logURL(e, job.url)}/></td>
              <td><input type='checkbox' onChange={(e) => logURL(e, job.url)}/></td>
            </tr>))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;