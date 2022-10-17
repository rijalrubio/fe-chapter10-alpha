import Image from 'next/image';

export default function RockPaperScissor({
  userSelection,
  onSelect,
  isDisabled,
  isShowResult
}) {
  return (
    <div className="flex flex-col w-72 gap-4">
      <button
        disabled={isDisabled}
        className={`basis-1/3 p-4 transition duration-200 hover:scale-105 bg-slate-200 hover:bg-slate-300 
          rounded-lg ${
            userSelection === 1 && isShowResult ? 'border-4 border-violet-600' : ''
          }`}
        onClick={async () => await onSelect(1)}
      >
        <div className="h-full w-full relative">
          <Image className="object-contain" src="/rock.png" layout="fill" />
        </div>
      </button>
      <button
        disabled={isDisabled}
        className={`basis-1/3 p-4 transition duration-200 hover:scale-105 bg-slate-200 hover:bg-slate-300 
                    rounded-lg ${
                      userSelection === 2 && isShowResult ? 'border-4 border-violet-600' : ''
                    }`}
        onClick={async () => await onSelect(2)}
      >
        <div className="h-full w-full relative">
          <Image className="object-contain" src="/paper.png" layout="fill" />
        </div>
      </button>
      <button
        disabled={isDisabled}
        className={`basis-1/3 p-4 transition duration-200 hover:scale-105 bg-slate-200 hover:bg-slate-300 
                  rounded-lg ${
                    userSelection === 3 && isShowResult ? 'border-4 border-violet-600' : ''
                  }`}
        onClick={async () => await onSelect(3)}
      >
        <div className="h-full w-full relative">
          <Image className="object-contain" src="/scissor.png" layout="fill" />
        </div>
      </button>
    </div>
  );
}
