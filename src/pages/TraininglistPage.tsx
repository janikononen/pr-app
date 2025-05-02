import TrainingTable from "../components/tables/TrainingTable";
import { useGetTranings } from "../components/fetch-functiot&custom-hookit/useGetTrainings";
import { useEffect } from "react";

function TraininglistPage() {
  const { trainings, fetchTrainings } = useGetTranings();
  console.log(trainings);
  useEffect(() => {
    document.title = "Training List";
  }, []);
  return (
    <div>
      <div>
        <h1>Training List</h1>
        <p> Here is a list of trainings</p>
        <TrainingTable
          trainingsData={trainings}
          fetchTrainings={fetchTrainings}
        />
      </div>
    </div>
  );
}

export default TraininglistPage;
