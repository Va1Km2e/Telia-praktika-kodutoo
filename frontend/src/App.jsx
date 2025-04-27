import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PeopleList from "./pages/PeopleList";
import HomePage from "./pages/HomePage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="people-list" element={<PeopleList />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
