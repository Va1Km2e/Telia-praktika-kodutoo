import { Outlet, Link } from "react-router-dom";

function Layout() {
    return (
        <div>
            <header style={styles.header}>
                <div style={styles.wrapper}>
                    <Link to="/" style={styles.navLink}>Home</Link>
                    <Link to="/people-list" style={styles.navLink}>People List</Link>
                </div>
            </header>

            <div>
                <main style={styles.mainContent}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

const styles = {
    header: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    wrapper: {
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        justifyContent: "left",
    },
    navLink: {
        padding: "0.5rem 1rem",
        textDecoration: "none",
        color: "#333",
        fontSize: "16px",
        fontWeight: "500",
        borderRadius: "8px",
        transition: "color 0.3s, background-color 0.3s, transform 0.3s",
    },
    mainContent: {
        width: "90vw",
        position: "absolute",
        left: "50%",
        top: 80,
        transform: "translateX(-50%)",
    }

};

export default Layout;
