import axios from "axios";
import { redirect } from "next/navigation";

export default async function currentUser(server) {
	axios.defaults.withCredentials = true;
	const res = await axios.get(`${server}/api/v1/user/current-user`);
	const response = res.data;

	if (response.statusCode !== 200) {
		return null;
	}

	const currentUser = response.data;
	if (currentUser) {
		return currentUser;
	} else {
		return null;
	}
}
