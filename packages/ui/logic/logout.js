import axios from "axios";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../store/slices/userSlice";

const logout = async (server) => {
	const dispatch = useDispatch();

	axios.defaults.withCredentials = true;
	const res = await axios.post(`${server}/api/v1/user/logout`);
	const response = await res.data;
	console.log(response);
	if (response.statusCode === 200) {
		dispatch(setIsLogin(false));
	}
};

export default logout;
