import { CChart } from "@coreui/react-chartjs";

export default function Chart({liveData,taskData}) {
    const mainData = liveData?.categories
  return (
    <>
      <CChart
        className="w-[85%] flex flex-col items-center"
        type="polarArea"
        data={{
          labels: ["On-Page Score", "Performance", "SEO", "Best Practices"],
          datasets: [
            {
              data: [taskData,mainData?.performance.score*100, mainData?.seo.score*100, mainData['best-practices']?.score*100],
              backgroundColor: [
                "#FF6384",
                "#4BC0C0",
                "#FFCE56",
                "#E7E9ED"
              ],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: "aliceblue"
              },
            },
          },
          scales: {
            r: {
              grid: {
                color: "white",
              },
            },
          },
        }}
      />
    </>
  );
}
