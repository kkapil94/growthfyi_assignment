import { useNavigate } from "react-router-dom";
import useGetReport from "../utils/useGetReport";
import useGetScreenshot from "../utils/useGetScreenshot";
import {  useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";
import useGetCategoriesReport from "../utils/useGetCategoriesReport";
import Chart from "./Chart";
import Categories from "./Categories";

export default function Report() {
  const url = sessionStorage.getItem("url")
  const navigate = useNavigate();
  const onPageDataArray = [];
  const onPageDataArray2 = [];
  const checksArray = [];
  let categories;
  let target;
  let onPageData;
  if (url?.slice(0, 8) == "https://") {
    target = url;
  } else {
    target = `https://${url}`;
  }

  const screenshot_data = [
    {
      url: target,
      full_page_screenshot: false,
    },
  ];

  const task_post_data = [
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
      for_mobile: true,
    },
  ];
  const screenshot = useGetScreenshot(screenshot_data);
  const taskData = useGetReport(task_post_data);
  const categoriesData = useGetCategoriesReport(light_house_post_data)
  if (categoriesData) {
    
    const onPageChecks = taskData?.tasks[0]?.result[0]?.items[0]?.checks;
    for (const key in onPageChecks) {
      const newObj = {};
      newObj[key] = newObj[key];
      checksArray.push(newObj);
    }
    onPageData = taskData?.tasks[0]?.result[0]?.items[0]?.meta;
    for (const key in onPageData) {
      const newObj = {};
      newObj[key] = onPageData[key];
      onPageDataArray.push(newObj);
    }
    categories = categoriesData?.tasks[0]?.result[0]?.categories;
    for (const key in onPageData?.content) {
      const newObj = {};
      newObj[key] = onPageData?.content[key];
      onPageDataArray2.push(newObj);
    }
  }
  useEffect(()=>{
    if (taskData?.tasks[0]?.status_message == "Invalid Field: 'url - Domain Not Found'.") {
      navigate("/")
      toast.error("Please enter valid url!")
    }
  })
  return (
    <>
      {!screenshot || !taskData||!categoriesData  ? (
        <Loader />
      ) : (
        <div className="mt-12 xs:max-md:mt-4 mx-8 xs:max-md:mx-2 border-2 xs:max-md:border-none border-solid border-slate-400">
          <div className="w-full mt-8 mb-12 xs:max-md:mb-2 flex xs:max-md:flex-col xs:max-md:gap-12 items-center ">
            <div className="w-6/12 xs:max-md:w-full flex justify-center">
              <img src={screenshot} alt="" className="w-[95%] object-contain" />
            </div>
            <div className="w-6/12 xs:max-md:w-full flex justify-center">
              <Chart
                liveData={categoriesData?.tasks[0]?.result[0]}
                taskData={taskData?.tasks[0]?.result[0]?.items[0]?.onpage_score}
              />
            </div>
          </div>
          {!taskData||!categoriesData?<Loader/>:<div>
            <div id="on-page" className="mb-16 ">
              <div className="flex items-center justify-center">
                <div className="h-[2px] w-40 xs:max-md:w-16 bg-slate-200"></div>
                <h2 className="text-4xl xs:max-md:text-lg mx-5 xs:max-md:mx-1 text-slate-200 text-center">
                  On-Page Results
                </h2>
                <div className="h-[2px] w-40 xs:max-md:w-16 bg-slate-200"></div>
              </div>
              <div>
                {onPageDataArray.length && (
                  <div className="grid grid-cols-4 md:max-lg:grid-cols-3 xs:max-md:grid-cols-2  gap-4 xs:max-md:gap-1 mx-16 md:max-lg:mx-4 xs:max-md:mx-1 xs:max-md:mt-4 mt-20">
                    {onPageDataArray.slice(9, 16).map((item) => (
                      <div className="border-2 xs:max-md:h-14 border-solid rounded-2xl xs:max-md:rounded-lg border-slate-200 flex flex-col justify-center items-center md:max-2xl:h-24">
                        <h6 className="text-3xl xs:max-md:text-lg text-slate-300 xs:max-md:leading-4">
                          {item[Object.keys(item)[0]]}
                        </h6>
                        <h6 className="text-xl xs:max-md:text-sm text-slate-200 xs:max-md:leading-4">
                          {Object.keys(item)[0].replace(/\_/g, " ")}
                        </h6>
                      </div>
                    ))}
                    {onPageDataArray2.length &&
                      onPageDataArray2.map((item) => (
                        <div className="border-2 xs:max-md:h-14  border-solid rounded-2xl xs:max-md:rounded-lg border-slate-200 flex flex-col justify-center items-center md:max-2xl:h-24">
                          <h6 className="text-3xl xs:max-md:text-lg text-slate-300 xs:max-md:leading-4">
                            {Number(item[Object.keys(item)[0]]).toFixed(2)}
                          </h6>
                          <h6 className="text-xl xs:max-md:text-sm text-slate-200 text-center xs:max-md:leading-4">
                            {Object.keys(item)[0].replace(/\_/g, " ")}
                          </h6>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div id="checks">
              <div className="grid grid-cols-3 xs:max-md:grid-cols-2 mx-16 xs:max-md:mx-1 md:max-lg:mx-4 xs:max-md:gap-1 gap-4">
                {checksArray.slice(0, 25).map((item) => (
                  <div className="flex border-2 gap-4  xs:max-md:gap-1 border-solid rounded-xl xs:max-md:rounded-md border-slate-200 h-16 xs:max-md:h-14 bg-slate-100">
                    <div className="flex items-center justify-center w-12 xs:max-md:w-4 md:max-xl:w-8  xs:max-md:text-xs">
                      {item[Object.keys(item)[0]] ? "✅" : "❌"}
                    </div>
                    <div className="flex items-center ">
                      <h3 className="text-xl xs:max-md:text-sm md:max-lg:text-lg text-slate-500 xs:max-md:leading-4">
                        {Object.keys(item)[0].replace(/\_/g, " ")}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div id="h-tags" className="mx-16 xs:max-md:mx-1  md:max-lg:mx-4 mt-11 xs:max-md:mt-4 mb-24 xs:max-md:mb-4">
              <h3 className="text-4xl xs:max-md:text-2xl mb-8 md:max-xl:text-4xl xs:max-md:mb-4 text-slate-200">H - tags</h3>
              <div className="flex xs:max-md:flex-col gap-4">
                <div className="w-6/12 xs:max-md:w-full h-fit border-2 border-solid border-slate-400 p-8 xs:max-md:p-2 rounded-2xl bg-slate-200">
                  <h2 className="text-3xl md:max-xl:text-2xl xs:max-md:text-lg mb-6 xs:max-md:mb-2 text-slate-500">
                    We Found #{onPageData?.htags?.h1?.length?onPageData?.htags?.h1?.length:0} H1 tag
                  </h2>
                  <ol className="list-decimal pl-12">
                    {onPageData?.htags?.h1?.map((item) => (
                      <li className="text-slate-700 text-xl xs:max-md:text-sm">{item}</li>
                    ))}
                  </ol>
                </div>
                <div className="w-6/12 xs:max-md:w-full border-2 h-fit border-solid border-slate-400 p-8 rounded-2xl bg-slate-200 xs:max-md:p-2">
                  <h2 className="text-3xl md:max-xl:text-2xl xs:max-md:text-lg mb-6 xs:max-md:mb-2 text-slate-500">
                    We Found #{onPageData?.htags?.h2?.length?onPageData?.htags?.h2?.length:0} H2 tag
                  </h2>
                  <ol className="list-decimal pl-12">
                    {onPageData?.htags?.h2?.map((item) => (
                      <li className="text-slate-700 text-xl xs:max-md:text-sm">{item}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
            <Categories data={categories?.seo} />
            <Categories data={categories?.accessibility} />
            <Categories data={categories?.["best-practices"]} />
            <Categories data={categories?.performance} />
          </div>}
        </div>
      )}
    </>
  );
}
