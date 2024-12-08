export default {
	whereFilter: "",
	async filtersObject() {
		try {
			let where = await this.applyCondition(
				Select4.selectedOptionValue,
				Select4Copy.selectedOptionLabel,
				Input16.text
			);
			console.log("where", where);

			this.whereFilter = ` and ${where}`;
			await countViewComplaintStatus.run();
			await GetViewComplaintStatus.run();
			closeModal(Modal15.name);
			// resetWidget("Select4", true);
			// resetWidget("Select4Copy", true);
			// resetWidget("Input16", true);
		} catch (error) {
			console.error("Error in filtersObject:", error);
			showAlert("Failed to apply filters. Please try again.", "error");
		}
	},
	async clearFilter() {
		try {
			this.whereFilter = "";
			await countViewComplaintStatus.run();
			await GetViewComplaintStatus.run();
			resetWidget("Select4", true);
			resetWidget("Select4Copy", true);
			resetWidget("Input16", true);
		} catch (error) {
			console.error("Error in clearFilter:", error);
			showAlert("Failed to clear filters. Please try again.", "error");
		}
	},
	async applyCondition(field, condition, value) {
		try {
			let whereClause;

			switch (condition) {
				case "Contains":
					whereClause = `${field} LIKE '%${value}%'`;
					break;
				case "Does Not Contain":
					whereClause = `${field} NOT LIKE '%${value}%'`;
					break;
				case "Starts With":
					whereClause = `${field} LIKE '${value}%'`;
					break;
				case "Ends With":
					whereClause = `${field} LIKE '%${value}'`;
					break;
				case "Is Exactly":
					whereClause = `${field} = '${value}'`;
					break;
				case "Empty":
					whereClause = `${field} = ''`;
					break;
				case "Not Empty":
					whereClause = `${field} != ''`;
					break;
				default:
					whereClause = ""; // Default (no filtering)
			}

			return whereClause;
		} catch (error) {
			console.error("Error in applyCondition:", error);
			showAlert("Failed to build filter condition. Please check your inputs.", "error");
			throw error; // Re-throw to handle it upstream if needed
		}
	},
};
