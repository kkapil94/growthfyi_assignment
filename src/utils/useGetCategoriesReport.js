import { data } from "autoprefixer";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetCategoriesReport = (post_data) => {
    let id;
    let mainData;
    const [report,setReport] = useState(null)
  const getCategoriesData = async () => {
        const postRes = await axios.post("https://api.dataforseo.com/v3/on_page/lighthouse/task_post",post_data,{
            auth: {
                username: import.meta.env.VITE_USERNAME,
            password: import.meta.env.VITE_PASSWORD
              },
             headers:{
                 'content-type': 'application/json'
            }
        })
        console.log(postRes,"i am postRs");
        id = postRes?.data?.tasks[0]?.id
        console.log(id,"i am id");
        do{const { data } = await axios.get(
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
        mainData = data
        console.log(mainData,"main data");
        if (mainData?.tasks[0]?.result) {
          console.log(mainData,"deep");
          setReport(mainData)
        }
      }while(!mainData?.tasks[0]?.result)
    };
    
    useEffect(() => {
      getCategoriesData();
    }, []);
    console.log(report,"form hook");
    return report
  // return report
};

export default useGetCategoriesReport;
