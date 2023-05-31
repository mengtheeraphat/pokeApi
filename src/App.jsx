import {useState, useEffect} from "react";
import "./App.css";
import axios from "axios";
import ReactLoading from "react-loading";

//Component
import FavPoke from "./components/FavPoke";

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal
          }
        );

        setPoke(response.data);
        setError("");
      } catch (error) {
        setError("Something went wrong!", error);
      } finally {
        setLoading(false);
      }
    };

    loadPoke();

    return () => abortController.abort();
  }, [number]);

  console.log(poke);

  const prevPoke = () => {
    setNumber((number) => number - 1);
  };

  const nextPoke = () => {
    setNumber((number) => number + 1);
  };

  const addFav = () => {
    setFav((previousState) => [...previousState, poke]);
  };

  console.log("Pokemon ID :", number);
  console.log("Your Favorite Pokemon :", fav);

  return (
    <div class="block max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          {loading ? (
            <ReactLoading
              type="spin"
              color="black"
              height={"20%"}
              width={"20%"}
            />
          ) : (
            <>
              <h1>{poke?.name}</h1>
              <button onClick={addFav}>Add Favorite</button>
              <img
                src={poke?.sprites?.other?.home.front_default}
                alt={poke?.name}
              />
              <ul>
                {poke?.abilities?.map((abil, idexfile) => (
                  <li key={idexfile}>{abil.ability.name}</li>
                ))}
              </ul>
              <button onClick={prevPoke}>Previous</button>
              <button onClick={nextPoke}>Next</button>
            </>
          )}
        </div>
        <div>
          <h2>Your Favorite Pokemon</h2>
          <FavPoke fav={fav} />
        </div>
      </div>
    </div>
  );
}

export default App;
