export default {
	async Button1onClick () {
		//	write code here
		let data = await Api1.run();
		console.log(Button1.recaptchaToken);
		console.log(data);
	}
}