/** Servicio para interactuar con la API de Nimble Gravity. */

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

/**
 * Paso 2: Obtiene la información del candidato mediante su email.
 */

export const getCandidateData = async (email) => {
    const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);
    
    if (!response.ok) {
        // Esto nos ayudará a ver qué dice la API si falla
        const errorBody = await response.text();
        console.error("Respuesta de error de la API:", errorBody);
        throw new Error("Error al obtener datos del candidato");
    }
    return response.json();
};

/**
 * Paso 3: Obtiene el listado de posiciones laborales disponibles.
 */

export const getJobsList = async () => {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
    if (!response.ok) throw new Error("Error al obtener la lista de trabajos");
    return response.json();
}

/**
 * Paso 5: Envía la postulación a una posición específica.
 * @param {Object} payload - Datos requeridos: uuid, jobId, candidateId, repoUrl.
 */

export const applyToJob = async (payload) => {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

// Si la API falla, intentamos leer el mensaje de error del body para feedback

if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al enviar la postulación");
}
return response.json();
};
