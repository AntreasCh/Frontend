
import ResourcesHero from "./ResourcesHero";
import Category from "./Category";
import Category2 from "./Category2";
import ParentPage from './ParentPage';
/**
 * Resources component that includes all the 
 * sub-components (Navbar, ResourcesHero, Category and Footer).
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */
function Resources() {
    const auth = localStorage.getItem('user_type');
    if(auth==="admin")
    {
      
      return (
        <ParentPage>
        <div>
          
            <ResourcesHero />
            <Category />
        </div>
        </ParentPage>
      )
  
    }
  

    return (
        <ParentPage>
        <div>
          
            <ResourcesHero />
            <Category2 />
        </div>
        </ParentPage>
    )
}

export default Resources;