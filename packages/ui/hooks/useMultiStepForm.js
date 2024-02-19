export function useMultiStepForm(arr) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	function next() {
		setCurrentStepIndex((i) => {
			if (i >= arr.length - 1) return i;
			return i + 1;
		});
	}
	function prev() {
		setCurrentStepIndex((i) => {
			if (i <= 0) return i;
			return i - 1;
		});
	}
	function goto(index) {
		setCurrentStepIndex(index);
	}

	return {
		currentStepIndex,
		step: arr[currentStepIndex],
		next,
		prev,
		goto,
		steps,
	};
}
