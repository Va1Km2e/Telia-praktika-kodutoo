import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PeopleList from "./pages/PeopleList"; // Your only page right now

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="people-list" element={<PeopleList />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
