import Nav from "../components/navbar/Nav";



export default function Home() {
  return (
    <main className="min-h-screen bg-img-bg-main bg-cover bg-no-repeat">
      <Nav />
      <div className="flex flex-col items-center">
        <h1 className="font-water text-white text-center text-7xl mt-20 tracking-wider">La province gangrenée</h1>
        <div className="mx-auto mt-40 bg-white w-1/2 h-60 bg-opacity-10 flex flex-col justify-center text-white rounded-md">
          <p className="text-center font-krona text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

       <a className="text-center font-krona text-white border border-white bg-white bg-opacity-10 mt-20 py-7 font-bold rounded w-1/4 hover:bg-opacity-20" href="/servers"> ACCÉDER AU SERVEUR</a>
      </div>
    </main>
  );
}