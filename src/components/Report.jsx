import { useNavigate } from "react-router-dom";
import context from "../context";
import useGetReport from "../utils/useGetReport";
import useGetScreenshot from "../utils/useGetScreenshot";
import live from "../../seo_live.json"
import report from "../../seo_report.json"
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";
import useGetCategoriesReport from "../utils/useGetCategoriesReport";
import Chart from "./Chart";

export default function Report() {
  const { url } = useContext(context);
  const navigate = useNavigate();
  const onPageDataArray = [];
  let target;
  if (url?.slice(0, 8) == "https://") {
    target = url;
  } else {
    target = `https://${url}`;
  }

  const onPageData = report?.tasks[0]?.result[0]?.items[0]?.meta
   for (const key in onPageData){
    const newObj = {}
    newObj[key] = onPageData[key]
    onPageDataArray.push(newObj)
  }
  console.log(onPageDataArray);
  const screenshot_data = [
    {
      url: target,
      full_page_screenshot: false,
    },
  ];

  const post_data = [
    {
      url: target,
      enable_javascript: true,
      enable_browser_rendering: true,
      check_spell: true,
    },
  ];

  const light_house_post_data = [
    {
        url: target,
        for_mobile:true,
    }
  ]
  // const categoriesData = useGetCategoriesReport(light_house_post_data);
//   const screenshot = useGetScreenshot(screenshot_data);
const screenshot = true
  if (screenshot?.tasks_error == 1) {
    toast.error("Enter valid url");
    navigate("/");
  }
console.log(live);
console.log(report);
  return (
    <>
      {!screenshot ? (
        <Loader />
      ) : (
        <div className="mt-12 mx-8 border-2 border-solid border-slate-400">
          <div className="w-full mt-8 mb-12 flex items-center ">
            <div className="w-6/12 flex justify-center">
              <img src="./web_img.png" alt="" className="w-5/6 object-contain"/>
            </div>
            <div className="w-6/12 flex justify-center">
              <Chart data={live?.tasks[0]?.result[0]}/>
            </div>
          </div>
          <div className="mb-48">
            <div className="flex items-center justify-center">
              <div className="h-[2px] w-40 bg-slate-200"></div>
              <h2 className="text-4xl mx-5 text-slate-200 text-center">On-Page Results</h2>
              <div className="h-[2px] w-40 bg-slate-200"></div>
            </div>
            <div>
              {onPageDataArray&&<div>
                {onPageDataArray.slice(9,onPageDataArray.length).map(item=>(
                  <div>
                    <h6></h6>
                  </div>
                ))
                }
              </div>

              }
            </div>
          </div>
        </div>
      )}
    </>
  );
}
