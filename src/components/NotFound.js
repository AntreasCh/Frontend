import Navbar from "./Navbar";

/**
 * Not found page that displays an error 
 * message when the page is not found.
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */
function NotFound() {
    return (
        <div>
            <Navbar />
            <h1 style={{ paddingTop: "15%" }}>404 Page Not Found</h1>
        </div>
    );
}

export default NotFound;