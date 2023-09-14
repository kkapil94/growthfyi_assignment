import axios from "axios";
import { useState } from "react";

export default function Home() {

    const [url,setUrl] = useState()
    const post_data = [{
        url,
        enable_javascript: true,
        enable_browser_rendering:true,
        check_spell:true
    }]
    console.log(post_data);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const data =await axios.post("https://api.dataforseo.com/v3/on_page/instant_pages",post_data,{
            auth: {
                username: import.meta.env.VITE_USERNAME,
                password: import.meta.env.VITE_PASSWORD
              },
            headers:{
                'content-type': 'application/json'
            }
        })
        console.log(data);
    }
    console.log(import.meta.env.VITE_USERNAME);

  return (
    <>
      <div>
        <div className="navbar h-36 flex items-center justify-center mx-8 mt-8 rounded-md bg-slate-200 border-2 border-solid border-slate-400">
          <div>
            <img src="./growthfyi_logo.png" alt="" className="h-28" />
          </div>
        </div>
        <div className="mt-8 mx-8 border-2 border-solid rounded-md border-slate-400 flex justify-center items-center flex-col mb-10">
          <form onSubmit={handleSubmit} className="w-5/6 h-24 mx-8 mt-6 flex items-center ">
            <input
              type="text"
              name=""
              id=""
              value={url}
              placeholder="Enter Your Website's URL"
              onChange={(e)=>setUrl(e.target.value)}
              className="w-4/5 h-16 outline-none rounded-l-lg text-xl p-4 text-slate-400 bg-slate-200"
            />
            <button
              type="submit"
              className="w-1/5 h-16 px-4 text-slate-500 bg-slate-200 rounded-r-lg border-l-2 border-solid text-xl border-slate-400"
            >
              Check Your Website's Health
            </button>
          </form>
          <div className="w-5/6 mt-8 mb-8">
            <div className="w-full flex items-center">
              <div className="w-6/12">
                <img src="./Growthfyi_hero.jpg" alt="" className="w-96 object-cover rounded-lg" />
              </div>
              <p className="w-6/12 text-xl text-slate-200 leading-8 pl-8 text-justify">
                Analyze any web page with the free SEO checker by SEO Health to
                find technical errors and on-page SEO issues that might be
                holding your site back from top search engine rankings.<br/> Get your
                free SEO score as well as individual sub-scores for each of the
                categories checked, including meta-information, page quality,
                page structure, link structure, server configuration, and
                external factors.
              </p>
            </div>
            <div className="w-full flex items-center flex-row-reverse mt-12">
              <div className="w-6/12">
                <img src="./growthfyi_hero2.png" alt="" className="w-96 h-80 float-right object-cover rounded-lg" />
              </div>
              <p className="w-6/12 text-xl text-slate-200 leading-8 pr-8 text-justify">
              The Seobility SEO Checker identifies errors and SEO issues in your meta-information, such as:
              <ul className="list-image-[url(./list_img.png)] pl-6">
                <li>meta titles and descriptions that are too short or too long for the search result snippet</li>
                <li>meta tags that prevent search engines from indexing your website</li>
                <li>missing canonical links</li>
                <li>inconsistent language declarations and ...many more</li>
              </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
