function Footer() {
    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col">
                    <h1>DuviSeite</h1>
                    <a>Vite</a>
                    <a>Code</a>
                    <a>Spring</a>
                </div>
                <div className="col">
                    <h2>Courses</h2>
                    <ul>
                        <li>Languages</li>
                        <li>Coding</li>
                        <li>Math</li>
                        <li>Physics</li>
                        <li>Bible</li>
                    </ul>
                </div>
                <div className="col">
                    <h2>Resources</h2>
                    <ul>
                        <li>Notion</li>
                        <li>Bible</li>
                        <li>Kitchen</li>
                        <li>Schwimmen</li>
                        <li>Practice</li>
                    </ul>
                </div>
                <div className="col">
                    <form>
                        <label htmlFor="newsletterEmail">Newsletter</label>
                        <input id="newsletterEmail" type="text" name="newsletterEmail" placeholder="Suscribe to our newsletter"></input>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">Terms of Usage</div>
                <div className="col">License</div>
                <div className="col">Credits</div>
                <div className="col">Agreements</div>
                <div className="col">Associations</div>
            </div>
            <div className="row">
                <div className="col text-center"><h5>Copyright</h5></div>
            </div>
        </div>
    )
}

export default Footer;