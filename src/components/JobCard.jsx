import { useState } from "react";

/**
 * Componente que representa una posición individual en el listado.
 * Maneja su propio estado para el input del repositorio y el envío.
 */

const JobCard = ({ job, candidate, onApply }) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica antes de enviar
    if (!repoUrl.includes("github.com")) {
      alert("Por favor, ingresa una URL de GitHub válida.");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      // Preparamos el objeto según los requerimientos del Step 5
      const payload = {
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl: repoUrl,
      };

      const result = await onApply(payload);
      
      if (result.ok) {
        setStatus("success");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p className="job-id">ID de posición: {job.id}</p>

      {status === "success" ? (
        <div className="status-success">✅ ¡Postulación enviada con éxito!</div>
      ) : (

        <form onSubmit={handleSubmit} className="job-form">
          <label htmlFor={`url-${job.id}`}>Repositorio GitHub:</label>
          <input
            id={`url-${job.id}`}
            type="url"
            placeholder="https://github.com/tu-usuario/tu-repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Submit"}
          </button>
          {status === "error" && (
            <p className="status-error">❌ {errorMessage}</p>
          )}
        </form>
      )}
    </div>
  );
};

export default JobCard;