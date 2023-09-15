import { Blocks } from "react-loader-spinner";

export default function Loader() {
  return (
    <>
      <div className="h-screen absolute top-0 w-screen flex flex-col items-center justify-center bg-black opacity-70">
        <Blocks
          visible={true}
          height="120"
          width="120"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
        <h1 className="text-2xl text-slate-300">Analyzing Your Website</h1>
      </div>
    </>
  );
}
