export default {
	whereFilter: "",
	async filtersObject() {
		try {
			let where = await this.applyCondition(Select4Copy1.selectedOptionValue, Select4CopyCopy.selectedOptionLabel, Input16Copy.text);
			console.log("where", where);
			this.whereFilter = ` and ${where}`;

			// Fetch data with the updated filter
			await countTitles.run();
			let data = await getTitlesServerFilters.run();
			viewTitlesObject.titleData = data;
			// Reset widgets and close modal
			showModal(Modal8.name);
			// resetWidget("Select4Copy1", true);
			// resetWidget("Select4CopyCopy", true);
			// resetWidget("Input16Copy", true);
		} catch (error) {
			console.error("Error in filtersObject:", error);
			showAlert("An error occurred while applying filters. Please try again.", "error");
		}
	},

	async clearFilter() {
		try {
			this.whereFilter = '';

			// Fetch data without filters
			await countTitles.run();
			let data = await getTitlesServerFilters.run();
			viewTitlesObject.titleData = data;

			// Reset widgets
			resetWidget("Select4Copy1", true);
			resetWidget("Select4CopyCopy", true);
			resetWidget("Input16Copy", true);
		} catch (error) {
			console.error("Error in clearFilter:", error);
			showAlert("An error occurred while clearing filters. Please try again.", "error");
		}
	},

	async applyCondition(field, condition, value) {
		try {
			let whereClause;
			switch (condition) {
				case 'Contains':
					whereClause = `complaints_title.${field} LIKE '%${value}%'`;
					break;
				case 'Does Not Contain':
					whereClause = `complaints_title.${field} NOT LIKE '%${value}%'`;
					break;
				case 'Starts With':
					whereClause = `complaints_title.${field} LIKE '${value}%'`;
					break;
				case 'Ends With':
					whereClause = `complaints_title.${field} LIKE '%${value}'`;
					break;
				case 'Is Exactly':
					whereClause = `complaints_title.${field} = '${value}'`;
					break;
				case 'Empty':
					whereClause = `complaints_title.${field} = ''`;
					break;
				case 'Not Empty':
					whereClause = `complaints_title.${field} != ''`;
					break;
				default:
					whereClause = ''; // Default (no filtering)
			}
			return whereClause;
		} catch (error) {
			console.error("Error in applyCondition:", error);
			throw new Error("An error occurred while building the filter condition.");
		}
	}
}
