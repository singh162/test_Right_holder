export default {
	async verifyRepactha () {
		//	write code here
		let data = await Verify_Recaptha.run();
		return data;
	}
}