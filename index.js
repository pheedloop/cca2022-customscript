$(document).ready(function() {
	// Set timeout and ensure page is ready for a11y fixes
	setTimeout(function() {
		fixAllPages ();

		// If on the login page:
		if (document.location.pathname == "/CCA2022/login/auth/") fixLoginPage();
		// If on the lobby page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=lobby/i)) fixLobbyPage();
		// If on the channels page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=channels/i)) fixChannelsPage();
		// If on the sessions page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=sessions/i)) fixSessionsPage();
		// If on the career fair page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=exhibitors/i)) fixCareerFairPage();
		// If on the showcase page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=showcase/i)) fixShowcasePage();
		// If on the networking page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=attendees/i)) fixNetworkingPage();
		// If on the account page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=settings/i)) fixAccountPage();
	}, 2500);
});

// Need to re-execute jQuery when dynamically updating content
$('#page').bind('DOMSubtreeModified', function(e) {
	$(document).ready(function() {
		// Set timeout and ensure page is ready for a11y fixes
		setTimeout(function() {
			// No need to run the fixAllPages() function since that content is not updated dynamically
			
			// If on the login page:
			if (document.location.pathname == "/CCA2022/login/auth/") fixLoginPage();
			// If on the lobby page:
			if (window.location.href.match(/\/CCA2022\/virtual\/\?page=lobby/i)) fixLobbyPage();
			// If on the channels page:
			if (window.location.href.match(/\/CCA2022\/virtual\/\?page=channels/i)) fixChannelsPage();
			// If on the sessions page:
			if (window.location.href.match(/\/CCA2022\/virtual\/\?page=sessions/i)) fixSessionsPage();
			// If on the career fair page:
			if (window.location.href.match(/\/CCA2022\/virtual\/\?page=exhibitors/i)) fixCareerFairPage();
			// If on the showcase page:
			if (window.location.href.match(/\/CCA2022\/virtual\/\?page=showcase/i)) fixShowcasePage();
			// If on the networking page:
			if (window.location.href.match(/\/CCA2022\/virtual\/\?page=attendees/i)) fixNetworkingPage();
			// If on the account page:
			if (window.location.href.match(/\/CCA2022\/virtual\/\?page=settings/i)) fixAccountPage();
		}, 2500);
	});
});

// fixAllPages fixes everything that appears across the Virtual Platform
function fixAllPages () {
	fixLangSwitcher();
	fixLangModal();
	fixChatWhiteSpace();
	fixProfilePicAlt();
	fixPheedloopAdAlt();
} // End of fixAllPages

function fixLoginPage() {
	fixRequestPasswordModal();	
} // End of fixLoginPage

function fixLobbyPage() {
	fixHomeBannerAlt();
	fixChatWhiteSpaceLobby();	
} // End of fixLobbyPage

function fixChannelsPage() {
	fixChatWhiteSpaceChannelsSessions();
} // End of fixChannelsPage

function fixSessionsPage() {
	fixChatWhiteSpaceChannelsSessions();
} // End of fixSessionsPage

function fixCareerFairPage() {
	fixChatWhiteSpaceCareerFairShowcase();
} // End of fixCareerFairPage

function fixShowcasePage() {
	fixChatWhiteSpaceCareerFairShowcase();
} // End of fixShowcasePage

function fixNetworkingPage() {
	fixChatWhiteSpaceNetworking();
} // End of fixNetworkingPage

function fixAccountPage() {
} // End of fixAccountPage

function fixLangSwitcher() {
	// Andrew Nordlund - Add lang attributes to the language switcher:
	$('#languages-modal a.list-group-item.list-group-item-action:contains("Français")').html('<span lang="en">French</span> (<span lang="fr">Français</span>)');
} // End of fixAllPages

function fixHomeBannerAlt() {
	// Roch Lambert - Fix the homepage alternative text
	if(getCookie("language")==="fr"){
		// Update the alternative text on the homepage
		$("#banner").find("img").attr("alt", "Une bannière avec 2 logos, le Congrès canadien sur l'inclusion des personnes en situation de handicap, 26-27 mai 2022. Une image des points connectés qui représente les partenariats et la collaboration au sein du gouvernement du Canada.");
	} else {
		// Update the alternative text on the homepage
		$("#banner").find("img").attr("alt", "A banner with 2 logos, the Canadian Congress on Disability Inclusion, May 26-27 2022. An image of connected dots that signifies partnerships and collaboration within the Government of Canada.");
	}
} // End of fixHomeBannerAlt

function fixLangModal() {
	// Changes <h5> to <h2 class="h5"> and adds aria-label="close" to the close button
	$('#languages-modal>div>div.modal-content>div.modal-header>h5:first-child').replaceWith("<h2 class='h5'>" + $('#languages-modal>div>div.modal-content>div.modal-header>h5:first-child').html() + "</h2>");
	$('#languages-modal>div>div.modal-content>div.modal-header>button.close').attr("aria-label", "Close");
} // End of fixLangModal

function fixRequestPasswordModal () {
	$('div#login-form-container>div.mt-3>a:first').click(function () {
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
	});
} // End of fixRequestPasswordModal

function fixChatWhiteSpaceLobby () {
	// Fix the chat bug with the extra whitespace
	// Lobby section - expanding the content area to full width
	$("div#content").attr("class", "col-12 col-xl-12");
} // End of fixChatWhiteSpaceLobby

function fixChatWhiteSpaceChannelsSessions () {
	// Fix the chat bug with the extra whitespace
	// Channels / Sessions section - expanding the content area to full width
	$("div#session-container").attr("class", "col-xl-12 scroll-fader");
} // End of fixChatWhiteSpaceChannelsSessions

function fixChatWhiteSpaceCareerFairShowcase () {
	// Fix the chat bug with the extra whitespace
	// Career Fair / Showcase section - expanding the content area to full width
	$("div#exhibitor-container").attr("class", "col-xl-12 scroll-fader");
} // End of fixChatWhiteSpaceCareerFairShowcase

function fixChatWhiteSpaceNetworking () {
	// Fix the chat bug with the extra whitespace
	// Networking section - expanding the content area to full width
	$("div#attendee-container").attr("class", "col-xl-12 scroll-fader");
	// Networking section - Groups - expanding the content area to full width
	$("div#group-container").attr("class", "col-xl-12 scroll-fader");
} // End of fixChatWhiteSpaceNetworking

function fixProfilePicAlt () {
	// Update the alternative text on the homepage
	$(".pr-3").find("img").attr("alt", "");
} // End of fixProfilePicAlt

function fixPheedloopAdAlt () {
	// Update the alternative text on the homepage
	$("#ad-checker").attr("alt", "");
} // End of fixPheedloopAdAlt
