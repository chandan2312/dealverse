import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
	const storedValue = localStorage.getItem(key) || initialValue;

	const [value, setValue] = useState(storedValue);

	const updateValue = (newValue) => {
		setValue(newValue);
		localStorage.setItem(key, newValue);
	};

	return [value, updateValue];
};

export default useLocalStorage;
