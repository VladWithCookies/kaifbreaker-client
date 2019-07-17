import Cookies from 'js-cookie'

const isLoggedIn = () => !!Cookies.get('token')

export default isLoggedIn
