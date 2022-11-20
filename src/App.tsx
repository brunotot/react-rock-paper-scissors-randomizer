import "./App.scss";
import Board from "./components/Board";

function App() {
	return (
		<>
			<Board rockCount={30} paperCount={30} scissorsCount={30} />
		</>
	);
}

export default App;
