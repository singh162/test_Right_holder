export default {
	index: 1, // Tracks the current index for new titles
	titleList: [
		{ id: 1, titleName: "", FilePicker2Copy: [] } // Start with one empty title entry
	],

	// Function to add a new title entry
	addTitle: () => {
		const newId = ++this.index; // Increment index and generate new ID
		this.titleList.push({ id: newId, titleName: "", FilePicker2Copy: [] }); // Add new entry
		this.updateListData(); // Refresh the List widget data
	},

	// Function to delete a title entry by ID
	deleteInputField: (id) => {
		this.titleList = this.titleList.filter(item => item.id !== id); // Remove entry by ID
		this.updateListData(); // Refresh the List widget data
	},

	// Function to reset the file list for a title entry
	removeFileListOnCrossClick: (id) => {
		const index = this.titleList.findIndex(item => item.id === id);
		if (index !== -1) {
			List2.listData[List2.pageNo-1].FilePicker2Copy = [];
			this.titleList[index].FilePicker2Copy = []; // Reset the file array
			resetWidget("FilePicker2Copy", true); // Reset the FilePicker widget
		}
	},

	// Function to handle input changes for title name and file selection
	handleInputChange: (id, field, value) => {
		const entry = this.titleList.find(item => item.id === id);
		if (entry) {
			if (field === "FilePicker2Copy") {
				if (entry.FilePicker2Copy.length < 3) {
					entry.FilePicker2Copy.push(value); // Add new file if under limit
				} else {
					console.warn("Cannot add more than 3 files."); // Limit check
				}
			} else {
				entry[field] = value; // Update title name
			}
		}
		this.updateListData(); // Refresh the List widget data
	},

	// Helper function to update the List widget data
	updateListData: () => {
		List2.listData.push(this.titleList);
	}
};
