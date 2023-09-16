import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [url,setUrl] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault();
        sessionStorage.setItem("url",url)
        navigate("/report")
     }
    

  return (
    <>
      <div>
        
        <div className="mt-8 sm:max-2xl:mx-8 md:max-2xl:border-2 border-solid rounded-md border-slate-400 flex justify-center items-center flex-col mb-10">
          <form onSubmit={handleSubmit} className="w-5/6 md:max-2xl:h-24 mx-8 mt-6 flex xs:max-md:flex-col items-center ">
            <input
              type="text"
              name=""
              id=""
              value={url}
              placeholder="Enter Your Website's URL"
              onChange={(e)=>setUrl(e.target.value)}
              className="w-4/5 xs:max-md:w-full md:max-2xl:h-16 h-8 xs:max-md:text-center outline-none xs:max-md:rounded-r-lg rounded-l-lg md:max-2xl:text-xl text-lg p-4 text-slate-400 bg-slate-200"
            />
            <button
              type="submit"
              disabled={!url?true:false}
              className="disabled:opacity-70 md:max-2xl:w-2/5 xs:max-md:w-full xs:max-md:rounded-l-lg md:max-2xl:h-16 h-8 px-4  text-slate-500 bg-slate-200 rounded-r-lg border-l-2 border-solid md:max-2xl:text-xl text-md xs:max-md:mt-4 border-slate-400"
            >
              Check Your Website's Health
            </button>
          </form>
          <div className="w-5/6 mt-8 mb-8">
            <div className="w-full md:max-2xl:flex xs:max-md:flex xs:max-md:flex-col  items-center">
              <div className="md:max-2xl:w-6/12 xs:max-md:mb-12">
                <img src="./Growthfyi_hero.jpg" alt="" className="md:max-2xl:w-96 object-cover rounded-lg" />
              </div>
              <p className="md:max-2xl:w-6/12 lg:max-xl:leading-7 lg:max-2xl:text-xl md:max-lg:text:lg text-slate-200 xl:max-2xl:leading-8 md:max-lg:leading-6 md:max-2xl:pl-8 text-justify">
                Analyze any web page with the free SEO checker by SEO Health to
                find technical errors and on-page SEO issues that might be
                holding your site back from top search engine rankings.<br/> Get your
                free SEO score as well as individual sub-scores for each of the
                categories checked, including meta-information, page quality,
                page structure, link structure, server configuration, and
                external factors.
              </p>
            </div>
            <div className="w-full md:max-2xl:flex items-center xs:max-md:flex xs:max-md:flex-col md:max-2xl:flex-row-reverse mt-12">
              <div className="md:max-2xl:w-6/12 xs:max-md:mb-12">
                <img src="./growthfyi_hero2.png" alt="" className="md:max-2xl:w-96 md:max-2xl:h-72 md:max-2xl:float-right object-cover rounded-lg" />
              </div>
              <p className="md:max-2xl:w-6/12 lg:max-2xl:text-xl md:max-lg:text:lg text-slate-200 lg:max-xl:leading-7 xl:max-2xl:leading-8 md:max-lg:leading-6 md:max-2xl:pr-8 text-justify">
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
