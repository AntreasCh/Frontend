import Navbar from "./Navbar";
import ResourcesHero from "./ResourcesHero";
import Category from "./Category";

/**
 * Resources component that includes all the 
 * sub-components (Navbar, ResourcesHero, Category and Footer).
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */
function Resources() {

    return (
        <div>
            <Navbar />
            <ResourcesHero />
            <Category />
        </div>
    )
}

export default Resources;