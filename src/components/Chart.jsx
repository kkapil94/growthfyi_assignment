import { CChart } from "@coreui/react-chartjs";

export default function Chart({data}) {
    const mainData = data?.categories
    console.log(mainData['best-practices'].score,"i am score");
  return (
    <>
      <CChart
        className="w-[32rem] flex flex-col items-center"
        type="polarArea"
        data={{
          labels: ["On-Page Score", "Performance", "SEO", "Best Practices"],
          datasets: [
            {
              data: [80,mainData?.performance.score*100, mainData?.seo.score*100, mainData['best-practices'].score*100],
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
