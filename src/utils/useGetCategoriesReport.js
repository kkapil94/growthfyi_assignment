import { data } from "autoprefixer";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetCategoriesReport = (post_data) => {
    let id;
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
        
  };

  useEffect(() => {
    // getCategoriesData();
  }, []);
  // const {data} = await axios.get()
};

export default useGetCategoriesReport;
