import { Blocks } from "react-loader-spinner";

export default function Loader() {
  return (
    <>
      <div className="h-screen absolute top-0 w-screen flex items-center justify-center bg-black opacity-70">
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div>
    </>
  );
}
