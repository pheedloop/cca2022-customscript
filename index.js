$(document).ready(function() {
	console.log("Hello there, world");
	fixAllPages ();

	// If on the login page:
	if (document.location.pathname == "/CCA2022/login/auth/") fixLoginPage();
});

// fixAllPages fixes everything that appears across the Virtual Platform
function fixAllPages () {
	fixLangSwitcher();
	fixLangModal();
} // End of fixAllPages

function fixLangSwitcher() {
	// Andrew Nordlund - Add lang attributes to the language switcher:
	$('#languages-modal a.list-group-item.list-group-item-action:contains("Français")').html('<span lang="en">French</span> (<span lang="fr">Français</span>)');
} // End of fixAllPages

function fixLangModal() {
	// Changes <h5> to <h2 class="h5"> and adds aria-label="close" to the close button
	$('#languages-modal>div>div.modal-content>div.modal-header>h5:first-child').replaceWith("<h2 class='h5'>" + $('#languages-modal>div>div.modal-content>div.modal-header>h5:first-child').html() + "</h2>");
	$('#languages-modal>div>div.modal-content>div.modal-header>button.close').attr("aria-label", "Close");
} // End of fixLangModal

function fixLoginPage() {
	fixRequestPasswordModal();	
} // End of fixLoginPage

function fixRequestPasswordModal () {
	$('div#login-form-container>div.mt-3>a:first').click(function () {
		setTimeout(function () {
			$('div.swal-title').replaceWith("<h2 id='reqNewPasswordH2' class='swal-title'>" + $('div.swal-title').html() + "</h2>");
			$('div.swal-text').replaceWith("<label class='swal-text' for='reqNewPasswordTxt' id='reqNewPasswordLbl'>" + $('div.swal-text').html() +"</label>");
			$('input.swal-content__input').attr("id", "reqNewPasswordTxt").attr("autocomplete","email");
    
			let observer = new MutationObserver(mutationRecords => {
				for (let mutation of mutationRecords) {
					if (mutation.type === 'attributes' && mutation.oldValue.match(/swal-overlay--show-modal/)) {
						$('div#login-form-container>div.mt-3>a:first').focus();
					}
				}
			});
			let nd = $('div.swal-overlay--show-modal')[0];
			observer.observe(nd, {attributes : true, attributeFilter: ['class'], attributeOldValue : true});
		}, 200);
	});
} // End of fixRequestPasswordModal
