export default function dateConverter(input) {
	const date = new Date(input).getTime();

	const now = new Date().getTime();

	const diff = now - date;

	const minutes = Math.floor(diff / 1000 / 60);

	//if published seconds ago

	if (minutes < 1) {
		return `Just Now`;
	}

	//if published minutes ago

	if (minutes < 60) {
		return `${minutes} minutes ago`;
	}

	//if published hours ago

	const hours = Math.floor(diff / 1000 / 60 / 60);

	if (hours < 24) {
		return `${hours} hours ago`;
	}

	//if published days ago

	const days = Math.floor(hours / 24);

	if (days < 30) {
		if (days === 1) {
			return `Yesterday`;
		} else {
			return `${days} days ago`;
		}
	}

	//if published months ago

	const months = Math.floor(days / 30);

	if (months < 12) {
		if (months === 1) {
			return `${months} month ago`;
		} else {
			return `${months} months ago`;
		}
	}

	//if published years ago

	const years = Math.floor(months / 12);
	if (years === 1) {
		return `${years} year ago`;
	} else {
		return `${years} years ago`;
	}
}
