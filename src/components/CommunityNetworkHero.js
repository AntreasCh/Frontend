import '../styles/CommunityNetworkHero.css';

/**
 * ResourcesHero component that displays the oversized 
 * image and the text at the top of the website.
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */
function ResourcesHero() {

    return (
        <div>
            <div className="heroSection2">
                <img alt="HeroImg" src="http://unn-w20001556.newnumyspace.co.uk/IC3_Images/Hero_Images/community&networkHero.jpg" />
            </div>
            <div className="heroText2">
                <h1>Community and Network</h1>
                <p>Regional and Business Growth through IC3.</p>
                <a href="/contact" className="heroButton2">Contact Us</a>
            </div>
        </div>
    )
}

export default ResourcesHero;