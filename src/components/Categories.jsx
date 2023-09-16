export default function Categories({data}){
  return(
      <>
         {data&& <div  className="mx-16 xs:max-md:mx-1  md:max-lg:mx-4 xs:max-md:mb-6 mb-20">
          <div className="text-4xl mb-12 xs:max-md:mb-4 flex items-center justify-center">
            <div className="h-[2px] w-40  xs:max-md:w-16 bg-slate-200"></div>
            <h1 className="mx-5 xs:max-md:mx-1 text-center xs:max-md:text-lg text-slate-200">{data.title} Details</h1>
            <div className="h-[2px] w-40 xs:max-md:w-16 bg-slate-200"></div>
          </div>
          <div className="grid grid-cols-3 xs:max-md:grid-cols-2 gap-4 xs:max-md:gap-1">
            {data &&
              data?.auditRefs.slice(0,30).map((item) => (
                <div className="flex border-2 border-solid border-slate-500 h-16 xs:max-md:h-14 bg-slate-100 xs:max-md:rounded-md xs:max-md:gap-1 rounded-xl">
                  <div className="flex items-center justify-center w-12 xs:max-md:w-4 xs:max-md:text-xs">{item.weight ? "✅" : "❌"}</div>
                  <div className="text-xl xs:max-md:text-sm md:max-lg:text-lg xs:max-md:leading-4 text-slate-700 flex items-center">Page has {item.id}</div>
                </div>
              ))}
          </div>
        </div>}
      </>
  )
}