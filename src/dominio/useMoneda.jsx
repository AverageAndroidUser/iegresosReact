import { useEffect, useState } from "react";
import { verMonedas } from "../api/monedda";

export const useMoneda = () => {
  const { data, setData } = useState();
  const { loading, setLoading } = useState(false);
  const { error, setError } = useState("");

  const verMonedas2 = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await verMonedas();
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verMonedas2();
  }, []);
  return { data, loading, error, verMonedas2 };
};
