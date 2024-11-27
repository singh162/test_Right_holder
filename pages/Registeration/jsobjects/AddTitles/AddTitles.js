export default {
	// Existing methods...
	generateUUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			const r = Math.random() * 16 | 0;
			const v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},

	async checkExpireUser() {
		// Fetch the expire_at value from the database
		let expireDate = await checkExpire.run({ id: appsmith.store.rightHolderUserId });
		if (expireDate.length === 0) {
			return true; // User not found
		}
		const expireAt = moment(expireDate[0].expire_at).format('YYYY-MM-DD HH:mm:ss');
		const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
		// Check if the current time is after the expire_at time
		return moment(currentTime).isAfter(expireAt); // Returns true if session expired
	},

	async addTitles() {
		try {
			// Generate UUID for the new record
			const rightHolderUserId = appsmith.store.rightHolderUserId;

			// Iterate through titleList
			for (let i = 0; i < ListTitles.titleList.length; i++) {
				const id = this.generateUUID();
				const titleItem = ListTitles.titleList[i];
				console.log("titleItem",titleItem);

				// Extract and decode the Base64 data portion from ownershipImage.data
				const base64Data = titleItem.FilePicker2Copy[0].data.split(',')[1];
				if (!base64Data) {
					showAlert("Invalid image data format for title: " + titleItem.titleName, "error");
					continue; // Skip to the next title
				}
				// Insert the record into the database
				await insertComplaintTiles.run({
					id: id,
					name: titleItem.titleName,
					ownershipImage: base64Data, // Keep it as is
					rightHolderUserId: rightHolderUserId,
					inserted_at: moment().format('YYYY-MM-DD HH:mm:ss'),
					updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
				});
			}
			showAlert("Complaint title(s) added successfully!", "success");
			resetWidget("List2",true);
			resetWidget("Checkbox1",true);
			closeModal(Modal2.name);

			// closeModal(Modal2Copy.name);

		} catch (error) {
			resetWidget("List2",true);
			resetWidget("Checkbox1",true);
			console.error("Error during addTitles:", error);
			showAlert("Failed to add complaint title: " + error.message, "error");
		}
	},
};
