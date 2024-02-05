import { Link } from "react-router-dom"
import "../admin/ad_css/admin.css"

function Admin(){
    return(
        <div className="body-admin">
            <div className="card">
            <div className="card-header">
                <h3> Admin Page</h3>
            </div>
            <div className="card-footer">
                <ul className="list-unstyled">
                    <li><Link to={"/addmovie"} className="btn btn-add-movie">Add Movie</Link></li>
                    <li><Link to={"/listmovie"} className="btn btn-list-movie">List Movie</Link></li>
                    <li><Link to={"/upcomingposter"} className="btn btn-poster-movie">Upcoming Poster</Link></li>

                </ul>
            </div>
            </div>
        </div>
    )
}

export default Admin