
import CommunityNetworkHero from "./CommunityNetworkHero";
import MainText from "./MainText";
import MainText2 from "./MainText2";
import ParentPage from './ParentPage';
/**
 * CommunityNetwork component that includes all the 
 * sub-components (Navbar, CommunityNetworkHero, MainText and Footer).
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */
function CommunityNetwork() {
    
  const auth = localStorage.getItem('user_type');
  if(auth==="admin")
  {
    
    return (
        <ParentPage>
        <div>
          
            <CommunityNetworkHero />
            <MainText />
        </div>
        </ParentPage>
    )

  }

    return (
        <ParentPage>
        <div>
          
            <CommunityNetworkHero />
            <MainText2 />
        </div>
        </ParentPage>
    )
}

export default CommunityNetwork;