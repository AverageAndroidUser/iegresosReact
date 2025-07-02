//LLamados a API

export const verMonedas = async () => {
  try {
    const response = await fetch("ruta", {
      method: "GET",
      headers: {
        "Conten-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("No se pudo obtenr la informacion");
    }
    const result = await response.json();
    return { data: result };
  } catch (error) {
    return Promise.reject(error);
  }
};
