import TrainingTable from "../components/tables/TrainingTable";
import { useGetTranings } from "../components/fetch-functiot&custom-hookit/useGetTrainings";

function TraininglistPage() {
  const { trainings, fetchTrainings } = useGetTranings();
  console.log(trainings);
  return (
    <div>
      <h1>Training List</h1>
      <TrainingTable
        trainingsData={trainings}
        fetchTrainings={fetchTrainings}
      />
    </div>
  );
}

export default TraininglistPage;
