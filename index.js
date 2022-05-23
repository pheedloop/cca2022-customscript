$(document).ready(function() {
	// Andrew Nordlund - Since we're going to have to do all the things when the page loads,
	// aaaaaaaannnnnnnndddddd whenever someone uses the left menu to go elsewhere,
	// Imma move everything to another function, and call that from here, and I'll find a way to 
	// run it at other times too
	
	letErRip();

	$('#sidebar>ul>li>button').each(function () {
		$(this).click(function() {
			if ($("#live-meeting").is(':visible')) {
				// a modal will pop up asking "Are you sure you want to leave?"
				// 1. let's check (and fix) the a11y of that modal; and 
				// 2. only when "Yes" is clicked, we should leterrip
				
				fixWannaLeaveModal ();
				$('div.swal-overlay>div.swal-modal button.swal-button.swal-button--confirm').click(function() {
					letErRip();
				});
			} else {
				letErRip();
			}
			
		});
	});
});


function letErRip () {
	// Set timeout and ensure page is ready for a11y fixes
	setTimeout(function() {
		setCurrentPage();	// Adds aria-current=page to the left menu

		fixAllPages (); // Need to fix global a11y issues

		// If on the login page:
		if (document.location.pathname == "/CCA2022/login/auth/") fixLoginPage();
		// If on the lobby page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=lobby/i)) fixLobbyPage();
		// If on the channels page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=channels/i)) fixChannelsPage(); // French schedule
		// If on the sessions page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=sessions/i)) fixSessionsPage(); // English schedule
		// If on the career fair page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=exhibitors/i)) fixCareerFairPage();
		// If on the showcase page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=showcase/i)) fixShowcasePage();
		// If on the networking page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=attendees/i)) fixNetworkingPage();
		// If on the account page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=settings/i)) fixAccountPage();
	}, 5000);
} // End of letErRip

// fixAllPages fixes everything that appears across the Virtual Platform
function fixAllPages () {
	fixLangSwitcher();
	fixLangModal();
	fixProfilePicAlt();
	fixPheedloopAdAlt();
	fixNotifications();
	fixLiveCount();
	fixHelpDialog();
	fixToggleButton();
	fixGlobalNavHeadings();
	fixLeftNavIconFrench();
} // End of fixAllPages

function fixLoginPage() {
	fixRequestPasswordModal();	
} // End of fixLoginPage

function fixLobbyPage() {
	fixHomeBannerAlt();
	fixChatWhiteSpaceLobby();
	fixLobbyHeadings();	
} // End of fixLobbyPage

function fixChannelsPage() {
	fixChatWhiteSpaceChannelsSessions();
	fixSessionsFrenchTranslations();
	fixSpeakerBioWall();
	fixSessionsAddIcon();
} // End of fixChannelsPage

function fixSessionsPage() {
	fixChatWhiteSpaceChannelsSessions();
	fixSessionsFrenchTranslations();
	fixSpeakerBioWall();
	fixSessionsAddIcon();
} // End of fixSessionsPage

function fixCareerFairPage() {
	fixChatWhiteSpaceCareerFairShowcase();
} // End of fixCareerFairPage

function fixShowcasePage() {
	fixChatWhiteSpaceCareerFairShowcase();
} // End of fixShowcasePage

function fixNetworkingPage() {
	fixPeopleListings();
	fixGroupListings();
} // End of fixNetworkingPage

function fixGroupListings() {
	$('div#network-groups-list>div.group-item').each(function() {
		$(this).addClass("border-0 text-left");
		$(this).find('button').each(function() {
			$(this).replaceWith("<div class='btn btn-light btn-sm font-sz-sm m-0 p-1 px-3 mr-3'>" + $(this).html() + "</div>");
		});
   		// Convert the divs to buttons
		divToButton(this);
  
	});

	// Andrew Nordlund - for some reason I couldn't just attach a new click handler above.  It would get lost upon converting to <button>.  Even if I already converted to button.  This was the only way I could get it to work:  first convert the divs to buttons.  Then add click handlers to those buttons.
	$('div#network-groups-list>button.group-item').each(function() {
		$(this).click(function () {
			setTimeout (function () {
				// Networking section - Groups - expanding the content area to full width
				$("div#group-container").attr("class", "col-xl-12 scroll-fader");
				fixNetworkDeviceTranslations();
				fixNetworkingHeadings();
				fixNetworkingNewContent();
			}, 2000);
		});
	});
} // End of fixGroupListings

function fixPeopleListings() {
	// First set all those divs to buttons
	$('div#item-list div.item').each(function() {
		$(this).addClass("border-0 text-left");
   		divToButton(this);
  
	});

	// Andrew Nordlund - for some reason I couldn't just attach a new click handler above.  It would get lost upon converting to <button>.  Even if I already converted to button.  This was the only way I could get it to work:  first convert the divs to buttons.  Then add click handlers to those buttons.
	
	$('div#item-list button.item').each(function() {
		$(this).click(function () {
			// Check for swal
			$('div.swal-overlay--show-modal').each(function() {
				fixWannaLeaveModal();
				$('div.swal-overlay>div.swal-modal button.swal-button.swal-button--confirm').click(function() {
					setTimeout (function () {
						fixChatWhiteSpaceNetworking ();
					}, 2000);
				});
			});
		});
	});
	
} // End of fixPeopleListings

function divToButton (div) {
	let NewElement = "<button";
	$.each(div.attributes, function(i, attrib) {
		NewElement += ' ' + attrib.name + '="' + attrib.value + '"';
	});
	$(div).replaceWith(NewElement + ">" + $(div).html() + "</button>");
} // End of divToButton

// Don't use.  Don't delete yet.  Maybe delete later.  Don't use.
function divToButton-old (div) {
	let NewElement = "<button";
	$.each(div.attributes, function(i, attrib) {
		NewElement += ' ' + attrib.name + '="' + attrib.value + '"';
	});
	div.replaceWith(NewElement + ">"+ $(this).html() + "</button>");
} // End of divToButton

function fixAccountPage() {
	fixAccountHeadings();
	fixAccountForm();
} // End of fixAccountPage

function fixLangSwitcher() {
	// Roch Lambert - Add lang attributes to the language switcher:
	$("#languages-modal").find("a:contains('Français')").html('<span lang="en">French</span> (<span lang="fr">Français</span>)');
} // End of fixLangSwitcher

function fixHomeBannerAlt() {
	// Roch Lambert - Fix the homepage alternative text
	if(getCookie("language")==="fr"){
		// Update the alternative text on the homepage
		$("#banner").find("img").attr("alt", "Une bannière avec 2 logos, le Congrès canadien sur l'inclusion des personnes en situation de handicap, 26-27 mai 2022. Une image des points connectés qui représente les partenariats et la collaboration au sein du gouvernement du Canada.");
	} else {
		// Update the alternative text on the homepage
		$("#banner").find("img").attr("alt", "A banner with 2 logos, the Canadian Congress on Disability Inclusion, May 26-27 2022. An image of connected dots that signifies partnerships and collaboration within the Government of Canada.");
	};
} // End of fixHomeBannerAlt

function fixLangModal() {
	// Changes <h5> to <h2 class="h5"> and adds aria-label="close" to the close button
	$('#languages-modal>div>div.modal-content>div.modal-header>h5:first-child').replaceWith("<h2 class='h5'>" + $('#languages-modal>div>div.modal-content>div.modal-header>h5:first-child').html() + "</h2>");
	$('#languages-modal>div>div.modal-content>div.modal-header>button.close').attr("aria-label", "Close");
} // End of fixLangModal

function fixNotifications() {
	// Andrew Nordlund - Give the Notifications button an accessible name.  Start with the word "Notifications"
	$('#notifications-toggle').append($('<span id="notification-word" style="display:none;"></span>').text("Notifications"));
	$('#notifications-toggle').attr("aria-labelledby", "notification-word notification-count");	
	// Remove the unnecessary aria-label
	$('#notification-count').removeAttr('aria-label');
} // End of fixNotifications

function fixLiveCount() {
	// Roch Lambert - Give the Livecount information an accessible name. Start with the word "Live attendees"
	if(getCookie("language")==="fr"){
		$('#live-count-container').append($('<span id="live-count-word" style="display:none;"></span>').text("Participants en ligne"));
	} else {
		$('#live-count-container').append($('<span id="live-count-word" style="display:none;"></span>').text("Live attendees"));
	};
	$('#live-count').attr("aria-labelledby", "live-count-word");
	// Remove the unnecessary aria-label
	$('#live-count-container').removeAttr('aria-label');
} // End of fixLiveCount

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

function fixWannaLeaveModal () {
	$('div.swal-overlay>div.swal-modal>div.swal-title').replaceWith("<h2 id='wannaLeaveH2' class='swal-title'>" + $('div.swal-overlay>div.swal-modal>div.swal-title').html() + "</h2>");
	$('div.swal-overlay>div.swal-modal>div.swal-text').attr("id", "wannaLeaveTextDiv");
	$('div.swal-overlay>div.swal-modal button.swal-button').each(function() {
		$(this).attr("aria-describedby", "wannaLeaveH2 wannaLeaveTestDiv");
	});
} // End of fixWannaLeaveModal

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
	
} // End of fixChatWhiteSpaceNetworking

function fixProfilePicAlt () {
	// Update the alternative text on the homepage
	$(".pr-3").find("img").attr("alt", "");
} // End of fixProfilePicAlt

function fixPheedloopAdAlt () {
	// Update the alternative text on the homepage
	$("#ad-checker").attr("alt", "");
} // End of fixPheedloopAdAlt

function fixAccountHeadings () {
	// Andrew Nordlund - Should fix heading structure.
	$('h1.card-header').each(function () {
		$(this).replaceWith('<h2 class="card-header">' + $(this).html() + '</h2>');
	});
	// Roch Lambert - Now add hidden <h1> for semantic purposes
	if (!$('h1#accInfoH1').length) {
		if(getCookie("language")==="fr"){
			$('#page').prepend('<h1 class="wb-inv" id="accInfoH1">Informations sur le compte</h1>');
		} else {
			$('#page').prepend('<h1 class="wb-inv" id="accInfoH1">Account information</h1>');
		}
	}
} // End of fixAccountHeadings

function fixAccountForm () {
	// Andrew Nordlund - change text, password, urls, and textareas to have associated labels
	$(":text, :password, input[type=url], textarea").each(function() {
		let nm = $(this).attr("name");
		$(this).attr("id", nm);
		$(this).prev().attr("for", nm);
	});
	
	// Andrew Nordlund - fix the timezone input
	let tz = $("#timezone");
	tz.prev().find(">:first-child").attr("id", "tz-desc");
	tz.attr("aria-describedby", "tz-desc");
	tz.prev().prev().attr("for", "timezone");
	
	// Andrew Nordlund - fix toggle switches to give them a label
	$("input[type=checkbox]").each(function(i) {
		let pn = $(this).parent();
		let lbl = pn.next();
		pn.replaceWith('<span class="switch">' + pn.html() + '</span>');
		lbl.replaceWith('<label class="pl-3 pb-1" for="' + $(this).attr("id") +'">' + lbl.html() + '</label>');
	});
	
	// Andrew Nordlund - Fix file inputs...except <input type=file aria-describedby> doesn't enjoy wide support.
	$(":file").each(function(index) {
		let pn = $(this).parents("div.form-group");
		pn.find("small").attr("id", "small" + index);
		let lbl = pn.find("label.mb-0");
		lbl.replaceWith('<legend class="mb-0" style="font-size:1.0rem;" id="legend' + index + '">' + lbl.html() + '</legend>');
		pn.replaceWith('<fieldset class="form-group" aria-labelledby="legend' + index + ' small' + index + '">' + pn.html() + '</fieldset>');    
	});
} // End of fixAccountForm

function fixSessionsFrenchTranslations () {
	if(getCookie("language")==="fr"){
		// Grab the date and change to french format on the left hand side
		$('.session-selector').find('h6.mt-2').each(function(i,elem){
			let html = $(elem).html().replace(/May 26/g,'26 mai');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').each(function(i,elem){
			let html = $(elem).html().replace(/May 27/g,'27 mai');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/9:30/g,'9 h 30');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/10:00 AM/g,'10 h');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/10:00/g,'10 h');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/10:15 AM/g,'10 h 15');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/10:15/g,'10 h 15');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/10:45 AM/g,'10 h 45');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/10:45/g,'10 h 45');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/11:45 AM/g,'11 h 45');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/11:45/g,'11 h 45');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/12:00 PM/g,'12 h 00');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/12:00/g,'12 h 00');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/12:45 PM/g,'12 h 45');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/1:00 PM/g,'13 h');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/1:00/g,'13 h');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/2:00 PM/g,'14 h');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/2:00/g,'14 h');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/2:15 PM/g,'14 h 15');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/2:15/g,'14 h 15');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/3:00 PM/g,'15 h 00');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/3:00/g,'15 h 00');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/3:15 PM/g,'15 h 15');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/3:15/g,'15 h 15');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/3:30 PM/g,'15 h 30');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/3:30/g,'15 h 30');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:15 PM/g,'16 h 15');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:15/g,'16 h 15');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:25/g,'16 h 25');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:30 PM/g,'16 h 30');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:30/g,'16 h 30');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:35 PM/g,'16 h 35');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:35/g,'16 h 35');
			$(this).html(html);
		});
		$('.session-selector').find('h6.mt-2').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/6:00 PM/g,'18 h');
			$(this).html(html);
		});
		
		// Grab the date and change to french format on the right hand side
		$('#session-container').find('.mb-3.virtual-subtitle').each(function(i,elem){
			let html = $(elem).html().replace(/Thursday May 26th/g,'Jeudi 26 mai');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').each(function(i,elem){
			let html = $(elem).html().replace(/Friday May 27th/g,'Vendredi 27 mai');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').each(function(i,elem){
			let html = $(elem).html().replace(/EDT/g,'HNE');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/9:30/g,'9 h 30');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/10:00 AM/g,'10 h');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/10:00/g,'10 h');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/10:15 AM/g,'10 h 15');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/10:15/g,'10 h 15');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/10:45 AM/g,'10 h 45');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/10:45/g,'10 h 45');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/11:45 AM/g,'11 h 45');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/11:45/g,'11 h 45');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/12:00 PM/g,'12 h 00');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/12:00/g,'12 h 00');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/12:45 PM/g,'12 h 45');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/1:00 PM/g,'13 h');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/1:00/g,'13 h');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/2:00 PM/g,'14 h');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/2:00/g,'14 h');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/2:15 PM/g,'14 h 15');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/2:15/g,'14 h 15');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/3:00 PM/g,'15 h 00');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/3:00/g,'15 h 00');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/3:15 PM/g,'15 h 15');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/3:15/g,'15 h 15');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/3:30 PM/g,'15 h 30');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/3:30/g,'15 h 30');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:15 PM/g,'16 h 15');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:15/g,'16 h 15');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:25/g,'16 h 25');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:30 PM/g,'16 h 30');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:30/g,'16 h 30');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:35 PM/g,'16 h 35');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/4:35/g,'16 h 35');
			$(this).html(html);
		});
		$('#session-container').find('.mb-3.virtual-subtitle').find('.tz-date-adjust').each(function(i,elem){
			let html = $(elem).html().replace(/6:00 PM/g,'18 h');
			$(this).html(html);
		});
	};
} // End of fixSessionsFrenchTranslations

function fixHelpDialog() {
	// Fix the heading level on the dialog window
	$('#instructions-modal').find("h5.modal-title").replaceWith("<h2 class='h5' id='instructions-modal-heading'>" + $('#instructions-modal').find("h5.modal-title").html() + "</h2>");
	// Set the correct title
	$('#instructions-modal').attr("aria-labelledby","instructions-modal-heading");
} // End of fixHelpDialog

function fixNetworkDeviceTranslations() {
	if(getCookie("language")==="fr"){
		// First we need to check if the iframe is loaded
		$('#live-meeting').on('load', function() {
			// Fix the heading title translation
			$('#live-meeting').contents().find("#root").find('h4:first').html("Paramètres du dispositif");
		});
	};
} // End of fixNetworkDeviceTranslations

function fixNetworkingHeadings() {
	// Fix the group networking as there is no <h1> element
	$('#group-container').find('div#topic').replaceWith('<h1 id="topic" class="font-sz-xl font-weight-bold">' + $('#group-container').find('div#topic').html() + '</h1>')
} // End of fixNetworkingHeadings

function fixToggleButton() {
	$('#sidebar').find('#toggle-icon').remove();
	$('#sidebar').find('#toggle-icon-hidden').remove();
} // End of fixToggleButton

function fixLobbyHeadings() {
	// First let's remove the date because they are not bilingual
	$('#announcements').find('h6.card-subtitle').remove();
	// Now Fix the french heading to an <h2> element, English is done via the Pheedloop system
	$('#announcements').find('h5.card-title').each(function () {
		$(this).replaceWith('<h2 class="card-title font-sz-xl font-weight-bold" lang="fr">' + $(this).html() + '</h2>');
	});
	// Now add a hidden <h1> for semantic purposes
	if (!$('h1#annonceH1').length) {
		if(getCookie("language")==="fr"){
			$('#announcements').prepend('<h1 class="wb-inv" id="annonceH1">Annonces</h1>');
		} else {
			$('#announcements').prepend('<h1 class="wb-inv" id="annonceH1">Announcements</h1>');
		};
	}
} // End of fixLobbyHeadings

function fixGlobalNavHeadings() {
	// Let's add a heading for the left navigation
	if (!$('h2#leftNavMenuH2').length) $('#sidebar').prepend('<h2 class="wb-inv" id="leftNavMenuH2">Menu</h2>');
	// Let's add a heading for the tools section
	if (!$('h2#langMenuH2').length) {
		if(getCookie("language")==="fr") {
			$('#header').find('div.mr-4').prepend('<h2 class="wb-inv" id="langMenuH2">Sélection de la langue et outils</h2>');
		} else {
			$('#header').find('div.mr-4').prepend('<h2 class="wb-inv" id="langMenuH2">Language selection and tools</h2>');
		}
	}
} // End of fixGlobalNavHeadings

function fixSpeakerBioWall() {
		// Let's split the paragraphs for the bio's in two because it's long!
		var text = $('#speakers>div.card-body>ul.list-unstyled>div.mt-1>p').text();
		var tokens = text.split('. ');
		var n = Math.floor(tokens.length/2);
		var htmltext = '<p>'+tokens.slice(0, n).join('.') + '.</p><p>' + tokens.slice(n+1, tokens.length).join('.') + '</p>';
		$('#speakers>div.card-body>ul.list-unstyled>div.mt-1>p').html(htmltext);
} // End of fixSpeakerBioWall

function setCurrentPage () {
	$('#sidebar>ul>li[aria-current=page]').removeAttr("aria-current");
	$('#sidebar>ul>li>button.active').parent().attr("aria-current","page");
} // End of setCurrentPage

function fixNetworkingNewContent () {
	$('.attendees-container').removeAttr("aria-live");
	$('#attendee-container').attr("aria-live","polite");
} // End of fixNetworkingNewContent

function fixSessionsAddIcon () {
	// Loop through all the sessions
	$('.sessions-container').find('div.session-selector').each(function () {
		// Get value of the ID of the session
		var sid = $(this).find("div.title>i").attr("id");
		$(this).find('div.title>span').attr("id", sid + '-title');
		$(this).find("div.title>i").attr("aria-labelledby", sid + '-title');
	});
} // End of fixSessionsAddIcon

function fixLeftNavIconFrench () {
	// Find french program link in sidebar and change class
	$("#sidebar").find('i.fa-video').attr('class', 'fas fa-calendar-check icon');
} // End of fixLeftNavIconFrench
