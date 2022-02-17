window.onload = () => {
	const alert = document.getElementById("alert");

	alert.addEventListener("click", function () {
		this.remove();
	});

	setTimeout(() => {
		alert.remove();
	}, 3000);
};
