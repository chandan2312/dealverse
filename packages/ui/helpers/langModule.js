// class langClass {
// 	constructor() {
// 		this.lg = "en";
// 	}

// 	langSelector(selectedLang) {
// 		this.lg = selectedLang;
// 		return this.lg;
// 	}

// 	lang() {
// 		return this.lg;
// 	}
// }

// const langModule = new langClass();
// export default langModule;

// langSelectorModule.js
const langModule = (() => {
	let lg = "en";

	function langSelector(selectedLang) {
		lg = selectedLang;
		return lg;
	}

	function lang() {
		return lg;
	}

	return {
		langSelector,
		lang,
	};
})();

export default langModule;
