import Leaderboard from '../../components/Leaderboard';
import ListGames from '../../components/ListGames';


function Game() {
  return (
    <>
    <div className="bg-gray-100">
      {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 "> */}
        <div class="mx-auto flex flex-col md:flex-row w-11/12 align-middle object-center">
          <div class="column-2 w-full md:w-6/12 h-full border-2 border-dashed md:mx-2 my-2 rounded-md">
            <ListGames />
          </div>
          <div class="column-3 w-full md:w-4/12 h-full border-2 border-dashed md:mx-2 my-2 rounded-md">
            <Leaderboard />
          </div> 
      </div>  
      {/* </div> */}
    </div>
    
    
    
  
    </>
  );
}

export default Game;