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
  let target;
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
  const onPageChecks = taskData?.tasks[0]?.result[0]?.items[0]?.checks;
  for (const key in onPageChecks) {
    const newObj = {};
    newObj[key] = newObj[key];
    checksArray.push(newObj);
  }
  const onPageData = taskData?.tasks[0]?.result[0]?.items[0]?.meta;
  for (const key in onPageData) {
    const newObj = {};
    newObj[key] = onPageData[key];
    onPageDataArray.push(newObj);
  }
  const categories = categoriesData?.tasks[0]?.result[0]?.categories;
  for (const key in onPageData?.content) {
    const newObj = {};
    newObj[key] = onPageData?.content[key];
    onPageDataArray2.push(newObj);
  }
  useEffect(()=>{
    if (screenshot?.tasks_error == 1 || screenshot?.tasks[0]?.result?.error_message || taskData?.tasks[0]?.result) {
      toast.error("Enter valid url");
      navigate("/");
    }
  },[])

  return (
    <>
      {!screenshot || !taskData||!categoriesData  ? (
        <Loader />
      ) : (
        <div className="mt-12 mx-8 border-2 border-solid border-slate-400">
          <div className="w-full mt-8 mb-12 flex items-center ">
            <div className="w-6/12 flex justify-center">
              <img src={screenshot} alt="" className="w-5/6 object-contain" />
            </div>
            <div className="w-6/12 flex justify-center">
              <Chart
                liveData={categoriesData?.tasks[0]?.result[0]}
                taskData={taskData?.tasks[0]?.result[0]?.items[0]?.onpage_score}
              />
            </div>
          </div>
          {!taskData||!categoriesData?<Loader/>:<div>
            <div id="on-page" className="mb-16">
              <div className="flex items-center justify-center">
                <div className="h-[2px] w-40 bg-slate-200"></div>
                <h2 className="text-4xl mx-5 text-slate-200 text-center">
                  On-Page Results
                </h2>
                <div className="h-[2px] w-40 bg-slate-200"></div>
              </div>
              <div>
                {onPageDataArray.length && (
                  <div className="grid grid-cols-4 gap-8 mx-16 mt-20">
                    {onPageDataArray.slice(9, 16).map((item) => (
                      <div className="border-2  border-solid rounded-2xl border-slate-200 flex flex-col justify-center items-center h-32">
                        <h6 className="text-4xl text-slate-300">
                          {item[Object.keys(item)[0]]}
                        </h6>
                        <h6 className="text-2xl text-slate-200">
                          {Object.keys(item)[0].replace(/\_/g, " ")}
                        </h6>
                      </div>
                    ))}
                    {onPageDataArray2.length &&
                      onPageDataArray2.map((item) => (
                        <div className="border-2  border-solid rounded-2xl border-slate-200 flex flex-col justify-center items-center h-32">
                          <h6 className="text-4xl text-slate-300">
                            {Number(item[Object.keys(item)[0]]).toPrecision(1)}
                          </h6>
                          <h6 className="text-2xl text-slate-200 px-4 text-center">
                            {Object.keys(item)[0].replace(/\_/g, " ")}
                          </h6>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div id="checks">
              <div className="grid grid-cols-3 mx-16 gap-8">
                {checksArray.slice(0, 25).map((item) => (
                  <div className="flex border-2 gap-4 border-solid rounded-xl border-slate-200 h-16 bg-slate-100">
                    <div className="flex items-center justify-center w-12">
                      {item[Object.keys(item)[0]] ? "✅" : "❌"}
                    </div>
                    <div className="flex items-center justify-center ">
                      <h3 className="text-2xl text-slate-500">
                        {Object.keys(item)[0].replace(/\_/g, " ")}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div id="h-tags" className="mx-16 mt-11 mb-24">
              <h3 className="text-5xl mb-8 text-slate-200">H - tags</h3>
              <div className="flex gap-4">
                <div className="w-6/12 h-fit border-2 border-solid border-slate-400 p-8 rounded-2xl bg-slate-200">
                  <h2 className="text-3xl mb-6 text-slate-500">
                    We Found #{onPageData?.htags?.h1?.length} H1 tag
                  </h2>
                  <ol className="list-decimal pl-12">
                    {onPageData?.htags?.h1?.map((item) => (
                      <li className="text-slate-700 text-2xl">{item}</li>
                    ))}
                  </ol>
                </div>
                <div className="w-6/12 border-2 border-solid border-slate-400 p-8 rounded-2xl bg-slate-200">
                  <h2 className="text-3xl mb-6 text-slate-500">
                    We Found #{onPageData?.htags?.h2?.length} H2 tag
                  </h2>
                  <ol className="list-decimal pl-12">
                    {onPageData?.htags?.h2?.map((item) => (
                      <li className="text-slate-700 text-2xl">{item}</li>
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
