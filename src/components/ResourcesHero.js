import '../styles/ResourcesHero.css';

/**
 * ResourcesHero component that displays the oversized 
 * image and the text at the top of the website.
 * 
 * @author Alexantros Tamboutsiaris W20001556
 */
function ResourcesHero() {

    return (
        <div>
            <div className="heroSection1">
                <img alt="HeroImg" src="http://unn-w20001556.newnumyspace.co.uk/IC3_Images/Hero_Images/resourcesHero.jpg" />
            </div>
            <div className="heroText1">
                <h1>Resources</h1>
                <p>Information, news and resources related to IC3 and digital construction.</p>
                <a href="/contact" className="heroButton1">Contact Us</a>
            </div>
        </div>
    )
}

export default ResourcesHero;