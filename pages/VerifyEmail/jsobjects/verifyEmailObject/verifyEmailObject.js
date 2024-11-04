export default {
	rightHolderData:"",
	async verifyEmail() {
		// Check if the token exists and is valid
		const token = appsmith.URL.queryParams.token;
		console.log("token",token);
		// Retrieve the 'token' parameter from the URL
		const verificationEntry = await getVerificationEntry.run({token:token});
		console.log("verificationEntry",verificationEntry);
		if (verificationEntry.length > 0) {
			const { rightHolder_id, expire_at } = verificationEntry[0];
			console.log("expire_at",expire_at,rightHolder_id);
			this.rightHolderData = await getRightHolder.run({id: rightHolder_id })[0];
			// Check if the token has expired
			if (moment().isBefore(expire_at)) {
				console.log("user_id",rightHolder_id,rightHolder_id);

				// Update the user record to mark the email as verified
				await updateUserEmailVerified.run({ id: rightHolder_id });

				// Delete the verification entry
				// await deleteVerificationEntry.run({token:token });
				navigateTo('Login', {}, 'SAME_WINDOW');
			} else {
				showModal(ExpireModal.name) // Token expired
			}
		}
	}

}