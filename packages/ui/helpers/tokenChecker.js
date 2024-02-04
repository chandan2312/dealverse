import axios from "axios";

export default async function tokenChecker(server) {
	axios.defaults.withCredentials = true;
	const res = await axios.post(`${server}/api/v1/user/token-checker`);
	const tokenAvailable = res.data.message;
	if (tokenAvailable) {
		return true;
	} else {
		return false;
	}
}
