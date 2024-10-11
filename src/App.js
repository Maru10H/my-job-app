import React, { useState, useEffect } from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/results.json`)
      .then(response => response.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading JSON:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="App">
      <h1 className="title">Lista de empleos</h1>
      <h2 className="title is-5">Total: {jobs.length}</h2>
      <div className="columns is-multiline">
        {jobs.map((job, index) => (
          <div className="column is-one-third" key={index}>
            <div className="card">
              <div className="card-content">
                <p className="title is-4">{job.Puesto}</p>
                <p className="subtitle is-6">{job.Ubicacion}</p>
                {job.modalidad ? <p>{job.modalidad}</p> : null}
                <p><strong>Publicación:</strong> {job.Publicacion}</p>
                <p>
                  <a href={job.Link} target="_blank" rel="noopener noreferrer">
                    Ver más
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
