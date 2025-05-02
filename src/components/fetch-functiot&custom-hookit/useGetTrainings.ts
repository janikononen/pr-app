import { useEffect, useState } from "react";
import { Training } from "../../types";

// custom hook treenien hakemiseen sekä fetch-funktio
export function useGetTranings() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  useEffect(() => {
    fetchTrainings();
  }, []);

  // fetch-funktio treenien hakemiseen
  const fetchTrainings = () => {
    fetch(
      `${import.meta.env.VITE_API_URL}gettrainings`
    )
      .then((Response) => {
        if (Response.ok) return Response.json();
        throw new Error("response was not ok");
      })
      .then((data) => {
        setTrainings(data);
      })
      .catch((error) => {
        console.error("Error fetching trainings:", error);
      });
  };
  return { trainings, fetchTrainings };
}
