export default function Categories({data}){
    return(
        <>
           {data&& <div  className="mx-16 mb-20">
            <div className="text-4xl mb-12 flex items-center justify-center">
              <div className="h-[2px] w-40 bg-slate-200"></div>
              <h1 className="mx-8 text-slate-200">{data.title} Details</h1>
              <div className="h-[2px] w-40 bg-slate-200"></div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {data &&
                data?.auditRefs.slice(0,30).map((item) => (
                  <div className="flex border-2 border-solid border-slate-500 h-20 bg-slate-200 rounded-xl">
                    <div className="flex items-center justify-center w-12">{item.weight ? "✅" : "❌"}</div>
                    <div className="text-2xl text-slate-700 flex items-center">Page has {item.id}</div>
                  </div>
                ))}
            </div>
          </div>}
        </>
    )
}