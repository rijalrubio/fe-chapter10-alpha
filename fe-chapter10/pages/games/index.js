import Leaderboard from '../../components/Leaderboard';
import ListGames from '../../components/ListGames';


function Game() {
  return (
    <>
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ListGames />
        <Leaderboard />
      </div>
    </div>  
    </>
  );
}

export default Game;