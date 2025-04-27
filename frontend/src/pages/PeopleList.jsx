import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import './PeopleList.css';
import 'font-awesome/css/font-awesome.min.css';

const PeopleList = () => {
    const [people, setPeople] = useState([]);
    const [nameFilter, setNameFilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [phoneFilter, setPhoneFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [error, setError] = useState("");
    const [sortDirection, setSortDirection] = useState("DESC");
    const [sortBy, setSortBy] = useState("id");

    const navigate = useNavigate();
    const location = useLocation();

    const [editPersonId, setEditPersonId] = useState(null);
    const [editablePerson, setEditablePerson] = useState(null);

    const [isAddOverlayOpen, setIsAddOverlayOpen] = useState(false);
    const [newPerson, setNewPerson] = useState({ name: "", email: "", phoneNumber: "", birthday: "" });

    const fetchPeople = async () => {
        try {
            const queryParams = {
                page: currentPage - 1,
                size: pageSize,
                sortDirection,
                sortBy,
                name: nameFilter,
                email: emailFilter,
                phone: phoneFilter,
            };

            const response = await axios.get("/api/person/search", { params: queryParams });
            console.log(response.data);

            if (response.data.content && Array.isArray(response.data.content)) {
                setPeople(
                    response.data.content.map((person) => ({
                        id: person.id,
                        name: person.name,
                        email: person.email,
                        phoneNumber: person.phoneNumber,
                        birthday: person.birthday
                    }))
                );
            }

            setCurrentPage(response.data.pageNumber + 1);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError("Error fetching people: " + err.message);
        }
    };

    const applyFilters = () => {
        setCurrentPage(1);
        navigate({
            pathname: location.pathname,
            search: `?name=${nameFilter || ""}&email=${emailFilter || ""}&phone=${phoneFilter || ""}&page=1&size=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
        });
        fetchPeople();
    };

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            fetchPeople();
        }
    };

    const handleEditClick = (person) => {
        setEditPersonId(person.id);
        setEditablePerson({ ...person });
    };

    const handleSortChange = (e) => {
        const { name, value } = e.target;
        if (name === "sortBy") {
            setSortBy(value);
        } else if (name === "sortDirection") {
            setSortDirection(value);
        }
    };

    const handleSaveClick = async () => {
        if (!editablePerson.name || !editablePerson.email || !editablePerson.phoneNumber) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            await axios.put(`/api/person`, editablePerson);
            setEditPersonId(null);
            setEditablePerson(null);
            fetchPeople();
        } catch (err) {
            setError("Error saving person: " + err.message);
        }
    };

    const handleCancelClick = () => {
        setEditPersonId(null);
        setEditablePerson(null);
    };

    const handleCopyData = (person) => {
        const personData = JSON.stringify(person, null, 2);

        navigator.clipboard.writeText(personData).then(
            () => {
                alert("Person data copied to clipboard!");
            },
            (err) => {
                alert("Error copying data: " + err.message);
            }
        );
    };

    const handleDeletePerson = async (person) => {
        try {
            await axios.delete(`/api/person/${person.id}`);
            fetchPeople();
        } catch (err) {
            setError("Error deleting person: " + err.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditablePerson((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddPerson = async () => {
        if (!newPerson.name || !newPerson.email || !newPerson.phoneNumber) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            await axios.post('/api/person', newPerson);
            setIsAddOverlayOpen(false);
            setNewPerson({ name: "", email: "", phoneNumber: "", birthday: "" });
            fetchPeople();
        } catch (err) {
            setError("Error adding person: " + err.message);
        }
    };

    const handleNewPersonInputChange = (e) => {
        const { name, value } = e.target;
        setNewPerson((prev) => ({ ...prev, [name]: value }));
    };

    const handleOverlayClose = () => {
        setIsAddOverlayOpen(false);
        setNewPerson({ name: "", email: "", phoneNumber: "", birthday: "" });
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const name = queryParams.get("name");
        const email = queryParams.get("email");
        const phone = queryParams.get("phone");
        const page = queryParams.get("page");
        const size = queryParams.get("size");
        const sortDirectionQuery = queryParams.get("sortDirection");

        setNameFilter(name || "");
        setEmailFilter(email || "");
        setPhoneFilter(phone || "");
        setCurrentPage(page || 1);
        setPageSize(size || 20);
        if (sortDirectionQuery) setSortDirection(sortDirectionQuery);

        fetchPeople();
    }, [location.search]);

    return (
        <div className="people-list">
            <h2>People List</h2>
            <h3>Filter by Name, Email, and Phone</h3>
            <div className="input">
                <button onClick={() => setIsAddOverlayOpen(true)} className={"button"}>Add Person</button>
                <input
                    className={"textbox"}
                    type="text"
                    id="name"
                    value={nameFilter || ""}
                    onChange={(e) => setNameFilter(e.target.value)}
                    placeholder="Filter name"
                />
                <input
                    className={"textbox"}
                    type="email"
                    id="email"
                    value={emailFilter || ""}
                    onChange={(e) => setEmailFilter(e.target.value)}
                    placeholder="Filter email"
                />
                <button onClick={applyFilters} className={"button"}>Apply Filters</button>
            </div>

            <div className="sort-controls">
                <select name="sortBy" value={sortBy} onChange={handleSortChange}>
                    <option value="id">Sort by ID</option>
                    <option value="name">Sort by Name</option>
                    <option value="email">Sort by Email</option>
                </select>

                <select name="sortDirection" value={sortDirection} onChange={handleSortChange}>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
            </div>

            {people.length > 0 ? (
                <table className="styled-table">
                    <thead className={"top-row"}>
                    <tr>
                        <th style={{width: "200px"}}>Actions</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Birthday</th>
                    </tr>
                    </thead>
                    <tbody>
                    {people.map((person) => (
                        <tr key={person.id}>
                            <td>
                                <div className="action-container">
                                    {editPersonId === person.id ? (
                                        <div className="edit-buttons">
                                            <button onClick={handleSaveClick} className="small-button" style={{backgroundColor: "#4CAF50"}}>Save</button>
                                            <button onClick={handleCancelClick} className="small-button" style={{backgroundColor: "#f2777a"}}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div className="normal-buttons">
                                            <button onClick={() => handleCopyData(person)} className="small-button" style={{backgroundColor: "limegreen"}}>
                                                <i className="fa fa-copy"></i>
                                            </button>
                                            <button onClick={() => handleEditClick(person)} className="small-button" style={{backgroundColor: "#ffcb68"}}>
                                                <i className="fa fa-pencil fa-lg"></i>
                                            </button>
                                            <button onClick={() => handleDeletePerson(person)} className="small-button" style={{backgroundColor: "#f2777a"}}>
                                                <i className="fa fa-trash fa-lg"></i>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td>{person.id}</td>
                            <td>{editPersonId === person.id ? (
                                <input type="text" name="name" value={editablePerson.name} onChange={handleInputChange} />
                            ) : person.name}</td>
                            <td>{editPersonId === person.id ? (
                                <input type="email" name="email" value={editablePerson.email} onChange={handleInputChange} />
                            ) : person.email}</td>
                            <td>{editPersonId === person.id ? (
                                <input type="text" name="phoneNumber" value={editablePerson.phoneNumber} onChange={handleInputChange} />
                            ) : person.phoneNumber}</td>
                            <td>{editPersonId === person.id ? (
                                <input type="date" name="birthday" value={editablePerson.birthday} onChange={handleInputChange} />
                            ) : person.birthday}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-data">No people available</p>
            )}

            {totalPages > 1 && (
                <div className="pagination-controls">
                    <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
                        &lt;
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
                        &gt;
                    </button>
                </div>
            )}

            {error && <p className="error">{error}</p>}

            {isAddOverlayOpen && (
                <div className="overlay">
                    <div className="overlay-content">
                        <div className="overlay-fields">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={newPerson.name}
                                onChange={handleNewPersonInputChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={newPerson.email}
                                onChange={handleNewPersonInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone"
                                value={newPerson.phoneNumber}
                                onChange={handleNewPersonInputChange}
                                required
                            />
                            <input
                                type="date"
                                name="birthday"
                                placeholder="Birthday"
                                value={newPerson.birthday}
                                onChange={handleNewPersonInputChange}
                            />
                        </div>

                        <div className="overlay-buttons">
                            <button style={{backgroundColor: "#4CAF50", color: "white"}}
                                    onClick={() => handleAddPerson(newPerson)}>Save
                            </button>
                            <button style={{backgroundColor: "#f44336", color: "white"}}
                                    onClick={handleOverlayClose}>Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PeopleList;
