import { useCookies } from 'react-cookie';
import HomeIcon from '@mui/icons-material/Home'
import TagIcon from '@mui/icons-material/Tag'
import PersonIcon from '@mui/icons-material/Person'
import { Link } from 'react-router-dom'

const LeftSideBar = () => {
    const [cookies] = useCookies(['access_token']);  // Access 'access_token' cookie
    let username = "";

    console.log("The Cookie:" + cookies.access_token)

    if (cookies.access_token) {
        try {
            const tokenData = JSON.parse(cookies.access_token);
            username = tokenData.username;
        } catch (error) {
            console.error("Error parsing the access_token cookie:", error);
        }
    }

    return (
        <div className='flex flex-col h-full md:h-[90vh] justify-between mr-6'>
            <div className='mt-6 flex flex-col space-y-4'>
                <Link to="/">
                    <div className='flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer'>
                        <HomeIcon fontSize='large'/>
                        <p>Home</p>
                    </div>
                </Link>
                <Link to="/explore">
                    <div className='flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer'>
                        <TagIcon fontSize='large'/>
                        <p>Explore</p>
                    </div>
                </Link>
                <Link to="/profile/">
                    <div className='flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer'>
                        <PersonIcon fontSize='large'/>
                        <p>Profile</p>
                    </div>
                </Link>
            </div>
            <div className='flex justify-between'>
                <div>
                    <p className='font-bold'>{username}</p>  {/* Display the username from the token */}
                    <p className='font-bold'>@{username}</p>  {/* Display the username as @username */}
                </div>
                <div>
                    <Link to="signin">
                        <button className='bg-red-500 px-4 py-2 text-white rounded-full'>
                            Logout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LeftSideBar;
