import { useEffect, useState } from 'react';
import { getCandidateData, getJobsList, applyToJob } from './api';
import JobCard from './components/JobCard';
import './App.css'; // para el estilo básico de la aplicación

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configuración del candidato
  const MY_EMAIL = "ivan.rodriguez.cv@gmail.com";

  useEffect(() => {

    //Carga inicial de datos del candidato y posiciones disponibles.
    
    const loadInitialData = async () => {
      try {
        setLoading(true);
        // Ejecutamos ambas llamadas en paralelo para mejor performance
        const [candidateData, jobsData] = await Promise.all([
          getCandidateData(MY_EMAIL),
          getJobsList()
        ]);
        
        setCandidate(candidateData);
        setJobs(jobsData);
      } catch (err) {
         // Logueamos el error original en consola para depuración
        console.error("Error al cargar datos iniciales:", err);
        
        setError("No se pudo cargar la información inicial. Por favor reintenta.");

      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  if (loading) return <div className="loader">Cargando desafío de Nimble Gravity...</div>;
  if (error) return <div className="error-screen">{error}</div>;

  return (
    <main className="container">
      <header className="header">
        <h1>Nimble Gravity Bot Filter</h1>
        {candidate && (
          <div className="candidate-info">
            <p>Candidato: <strong>{candidate.firstName} {candidate.lastName}</strong></p>
            <p>Email: {candidate.email}</p>
          </div>
        )}
      </header>

      <section className="jobs-section">
        <h2>Posiciones Disponibles</h2>
        <div className="jobs-list">
          {jobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              candidate={candidate} 
              onApply={applyToJob}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;