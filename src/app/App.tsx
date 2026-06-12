import { CONFIG } from "@/shared/model/config";

function App() {
  fetch("/api/v1/loans?page=1")
    .then((res) => res.json())
    .then(console.log);
  return (
    <>
      <h1>Start Page</h1> <p>{CONFIG.API_BASE_URL}</p>
    </>
  );
}

export default App;
