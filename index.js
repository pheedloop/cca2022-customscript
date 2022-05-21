$(document).ready(function() {
	console.log("Hello there, world");
	fixAllPages ();

	// If on the login page:
	if (document.location.pathname == "/CCA2022/login/auth/") fixLoginPage();
	// If on the home page:
	if (window.location.href.match(/\/CCA2022\/virtual\/\?page=lobby/i)) fixLobbyPage();
});

// fixAllPages fixes everything that appears across the Virtual Platform
function fixAllPages () {
	fixLangSwitcher();
	fixLangModal();
} // End of fixAllPages

function fixLoginPage() {
	fixRequestPasswordModal();	
} // End of fixLoginPage

function fixLobbyPage() {
	fixHomeBannerAlt();	
} // End of fixLoginPage

function fixLangSwitcher() {
	// Andrew Nordlund - Add lang attributes to the language switcher:
	$('#languages-modal a.list-group-item.list-group-item-action:contains("Français")').html('<span lang="en">French</span> (<span lang="fr">Français</span>)');
} // End of fixAllPages

function fixHomeBannerAlt() {
	// Roch Lambert - Fix the homepage alternative text
	if(getCookie("language")==="fr"){
		jQuery(document).ready(function() {
			setTimeout(function() {
				// Update the alternative text on the homepage
				$("#banner").find("img").attr("alt", "Une bannière avec 2 logos, le Congrès canadien sur l'inclusion des personnes en situation de handicap, 26-27 mai 2022. Une image des points connectés qui représente les partenariats et la collaboration au sein du gouvernement du Canada.");
			}, 1000);
		});
	} else {
		jQuery(document).ready(function() {
			setTimeout(function() {
				// Update the alternative text on the homepage
				$("#banner").find("img").attr("alt", "A banner with 2 logos, the Canadian Congress on Disability Inclusion, May 26-27 2022. An image of connected dots that signifies partnerships and collaboration within the Government of Canada.");
			}, 1000);
		});
	}
} // End of fixHomeBannerAlt

function fixLangModal() {
	// Changes <h5> to <h2 class="h5"> and adds aria-label="close" to the close button
	$('#languages-modal>div>div.modal-content>div.modal-header>h5:first-child').replaceWith("<h2 class='h5'>" + $('#languages-modal>div>div.modal-content>div.modal-header>h5:first-child').html() + "</h2>");
	$('#languages-modal>div>div.modal-content>div.modal-header>button.close').attr("aria-label", "Close");
} // End of fixLangModal

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
