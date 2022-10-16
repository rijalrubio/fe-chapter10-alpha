import Image from "next/image";

export default function RockPaperScissor({ userSelection, onSelect, isDisabled, isShowResult }) {
  return (
    <div className="flex flex-col w-72 gap-4">
      <button
        disabled={isDisabled}
        className={`basis-1/3 p-4 transition duration-200  bg-slate-200
                  rounded-lg ${userSelection === 1 && isShowResult ? "border border-4 border-violet-600" : ""} 
                  ${!isDisabled ? "hover:scale-105 hover:bg-slate-300" : "cursor-not-allowed"}`}
        onClick={async () => await onSelect(1)}
      >
        <div className="h-full w-full relative">
          <Image
            className="object-contain"
            src="/rock.png"
            layout="fill"
          />
        </div>
      </button>
      <button
        disabled={isDisabled}
        className={`basis-1/3 p-4 transition duration-200  bg-slate-200
                  rounded-lg ${userSelection === 2 && isShowResult ? "border border-4 border-violet-600" : ""} 
                  ${!isDisabled ? "hover:scale-105 hover:bg-slate-300" : "cursor-not-allowed"}`}
        onClick={async () => await onSelect(2)}
      >
        <div className="h-full w-full relative">
          <Image
            className="object-contain"
            src="/paper.png"
            layout="fill"
          />
        </div>
      </button>
      <button
        disabled={isDisabled}
        className={`basis-1/3 p-4 transition duration-200  bg-slate-200
                  rounded-lg ${userSelection === 3 && isShowResult ? "border border-4 border-violet-600" : ""} 
                  ${!isDisabled ? "hover:scale-105 hover:bg-slate-300" : "cursor-not-allowed"}`}
        onClick={async () => await onSelect(3)}
      >
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