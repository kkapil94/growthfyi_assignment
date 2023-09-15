import axios from "axios";
import { useEffect, useState } from "react";

const useGetCategoriesReport = (post_data) => {
  let id
  const [report, setReport] = useState(null);
  const getCategoriesData = async () => {
    const postRes = await axios.post(
      "https://api.dataforseo.com/v3/on_page/lighthouse/task_post",
      post_data,
      {
        auth: {
          username: import.meta.env.VITE_USERNAME,
          password: import.meta.env.VITE_PASSWORD,
        },
        headers: {
          "content-type": "application/json",
        },
      }
    );
    id = postRes?.data?.tasks[0]?.id;
    const func = async () => {
      const { data } = await axios.get(
        `https://api.dataforseo.com/v3/on_page/lighthouse/task_get/json/${id}`,
        {
          auth: {
            username: import.meta.env.VITE_USERNAME,
            password: import.meta.env.VITE_PASSWORD,
          },
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (data?.tasks[0]?.result) {
        setReport(data);
        clearInterval(timeout);
      }
    };
    const timeout = setInterval(func, 3000);
  };

  useEffect(() => {
    getCategoriesData();
    return(
      clearTimeout(timeout)
    )
  }, []);
  return report;
};

export default useGetCategoriesReport;
