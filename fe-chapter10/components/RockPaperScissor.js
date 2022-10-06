import Image from "next/image";

export default function RockPaperScissor({ userSelection }) {
  return (
    <div className="flex flex-col w-72 gap-4">
      <button className="basis-1/3 p-4 transition duration-200 hover:scale-105 bg-slate-200 hover:bg-slate-300 rounded-lg">
        <div className="h-full w-full relative">
          <Image
            className="object-contain"
            src="/rock.png"
            layout="fill"
          />
        </div>
      </button>
      <button className="basis-1/3 p-4 transition duration-200 hover:scale-105 bg-slate-200 hover:bg-slate-300 rounded-lg">
        <div className="h-full w-full relative">
          <Image
            className="object-contain"
            src="/paper.png"
            layout="fill"
          />
        </div>
      </button>
      <button className="basis-1/3 p-4 transition duration-200 hover:scale-105 bg-slate-200 hover:bg-slate-300 rounded-lg">
        <div className="h-full w-full relative">
          <Image
            className="object-contain"
            src="/scissor.png"
            layout="fill"
          />
        </div>
      </button>
    </div>
  );
};