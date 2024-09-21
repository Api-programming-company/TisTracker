const authMiddleware = (storeAPI) => (next) => (action) => {
    // Verifica si la acción tiene un error 401 (no autorizado)
    if (action.payload && action.payload.status === 401) {
      console.log("deberiamos mandarlo al login!!!!");
  
      localStorage.removeItem("user");
      // Redirigir al usuario a la página de inicio de sesión
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    // Pasa la acción al siguiente middleware o reducer
    return next(action);
  };
  
  export default authMiddleware;
  