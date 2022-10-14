import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function LandingPage() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      <main className="lg:container mx-auto text-center md:text-left">
        <div className="flex flex-col md:flex-row h-screen pt-[76px]">
          <div className="flex basis-1/5 md:basis-1/2 my-auto relative">
            <img
              src="/game-illustration.png"
              alt="illustration of people playing game"
              className="object-cover mx-auto my-auto"
            />
          </div>
          <div className="flex basis-4/5 md:basis-1/2 justify-center items-center">
            <div className="px-4">
              <h1 className="text-3xl lg:text-4xl font-bold">
                Play Anything, Install Nothing.
              </h1>
              <p className="text-xl mt-4 text-slate-500 w-full md:w-2/3">
                To play, you don't have to install anything. Just choose the
                game you want to play then you'll instantly be able to play it.
                Ready to play?
              </p>
              {
                  <div className="flex gap-x-2 mt-4 justify-center md:justify-start">
                    <Link href={ !isLoggedIn ? "/register" : "/list-games" }>
                      <div className="bg-indigo-500 hover:bg-indigo-600 py-2 w-40 text-white font-semibold text-lg text-center rounded-lg">
                      { !isLoggedIn ? "Register Now" :  "Play Now"}
                      </div>
                    </Link>
                  </div>
              }
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
