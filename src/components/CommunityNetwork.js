import Navbar from "./Navbar";
import CommunityNetworkHero from "./CommunityNetworkHero";
import MainText from "./MainText";

/**
 * CommunityNetwork component that includes all the 
 * sub-components (Navbar, CommunityNetworkHero, MainText and Footer).
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */
function CommunityNetwork() {

    return (
        <div>
            <Navbar />
            <CommunityNetworkHero />
            <MainText />
        </div>
    )
}

export default CommunityNetwork;