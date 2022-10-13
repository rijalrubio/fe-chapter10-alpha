import { Leaderboard, ListGames } from '../../components';

function Game() {
  return (
    <>
      <div className="bg-gray-100">
        {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 "> */}
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <div className="mx-auto flex flex-col md:flex-row w-10/12 align-middle object-center">
            <div className="column-2 w-full md:w-8/12 h-full md:mx-2 my-2">
              <ListGames />
            </div>
            <div className="column-3 w-full md:w-4/12 h-full md:mx-2 my-2">
              <Leaderboard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
