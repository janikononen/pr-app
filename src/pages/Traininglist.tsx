import { useEffect, useState } from "react";
import { Training } from "../types";
import TrainingTable from "../components/TrainingTable";

function Traininglist() {
  const [Trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings"
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

  return (
    <div>
      <h1>Training List</h1>
      <TrainingTable
        trainingsData={Trainings}
        fetchTrainings={fetchTrainings}
      />
    </div>
  );
}

export default Traininglist;
