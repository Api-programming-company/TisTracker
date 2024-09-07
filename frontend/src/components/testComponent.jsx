// src/components/TestComponent.js
import React, { useState } from "react";
import { useGetTestQuery, usePostTestMutation } from "../api/testSlice";

const TestComponent = () => {
  const { data: getData, error: getError, isLoading: isGetLoading } = useGetTestQuery();
  const [postTest, { data: postData, error: postError, isLoading: isPosting }] = usePostTestMutation();

  const [postResult, setPostResult] = useState(null);

  const handlePostTest = async () => {
    try {
      const result = await postTest({ message: "Hello, World!" }).unwrap();
      setPostResult(result);
      console.log("POST exitoso", result);
    } catch (err) {
      console.error("Error en POST", err);
    }
  };

  if (isGetLoading) return <p>Cargando datos...</p>;
  if (getError) return <p>Error al obtener datos: {getError.message}</p>;

  return (
    <div>
      <h1>Test API</h1>
      <h2>Datos GET:</h2>
      <pre>{JSON.stringify(getData, null, 2)}</pre>

      <button onClick={handlePostTest} disabled={isPosting}>
        Enviar POST
      </button>

      {isPosting && <p>Enviando...</p>}
      {postError && <p>Error en POST: {postError.message}</p>}
      {postData && (
        <div>
          <h2>Datos mandados:</h2>
          <pre>{JSON.stringify(postData, null, 2)}</pre>
        </div>
      )}
      {postResult && (
        <div>
          <h2>Resultado del POST (Estado Local):</h2>
          <pre>{JSON.stringify(postResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestComponent;
