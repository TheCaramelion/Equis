import { Link } from "react-router-dom"

const Error = () => {
    return <div>
        <h2>Error!</h2>
        <Link to="/signin" className="bg-blue-500 py-1 px-3 rounded-full text-white"></Link>
    </div>
}

export default Error;