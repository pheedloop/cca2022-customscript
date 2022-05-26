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
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=lobby/i)) { fixLobbyPage(); $('h1#annonceH1').focus(); }
		// If on the channels page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=channels/i)) {setupChannelsPageFixes(); fixChannelsPage(); $('#page').attr("tabindex","-1").focus();} // French schedule
		// If on the sessions page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=sessions/i)) {setupSessionsPageFixes(); fixSessionsPage(); $('#page').attr("tabindex","-1").focus();} // English schedule
		// If on the career fair page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=exhibitors/i)) {setupCareerFairPageFixes(); fixCareerFairPage(); $('#page').attr("tabindex","-1").focus(); }
		// If on the showcase page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=showcase/i)) {setupShowcasePageFixes(); fixShowcasePage();  $('#page').attr("tabindex","-1").focus(); }
		// If on the networking page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=attendees/i)) {setupNetworkingPageFixes(); fixNetworkingPage(); $('#page').attr("tabindex","-1").focus(); }
		// If on the account page:
		if (window.location.href.match(/\/CCA2022\/virtual\/\?page=settings/i)) { fixAccountPage(); $('#accInfoH1').focus(); }
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
	fixLeftNavFrenchSize();
	fixHelpDriftChat();
} // End of fixAllPages

function fixLoginPage() {
	fixRequestPasswordModal();	
	fixLoginDateTranslation();
} // End of fixLoginPage

function fixLobbyPage() {
	fixHomeBannerAlt();
	fixChatWhiteSpaceLobby();
	fixLobbyHeadings();	
} // End of fixLobbyPage

function setupChannelsPageFixes () {
	// whenever someone clicks on a session, then the fixes to this page have to be applied.  But they can't be applied
	// right away because not everything is loaded.  So, after they click, wait a second (maybe too much?) and then
	// run through all the fixes.
	$('div.session-selector').click(function() {
		setTimeout (function() {
  			fixChannelsPage();
		}, 1000);
	});
} // End of setupChannelsPageFixes

function setupSessionsPageFixes () {
	// whenever someone clicks on a session, then the fixes to this page have to be applied.  But they can't be applied
	// right away because not everything is loaded.  So, after they click, wait a second (maybe too much?) and then
	// run through all the fixes.
	$('div.session-selector').click(function() {
		setTimeout (function() {
  			fixSessionsPage();
		}, 1000);
	});
} // End of setupChannelsPageFixes

function fixChannelsPage() {
	// Andrew Nordlund - Okay, you need to do this on page load (after clicking a left nav button) _and_ after clicking on an event or speaker's info
	// in the page.
	addSkipLinks("#session-container");
	fixChatWhiteSpaceChannelsSessions();
	fixSessionsFrenchTranslations();
	fixSpeakerBioWall();
	addAddToSchedText();
	fixSessionsAddIcon();
	fixSessionsAccordion();
	fixSocialMediaButtonSessionSpeakers();
	fixAdda11yNotesChannels();	
} // End of fixChannelsPage

function fixSessionsPage() {
	// Andrew Nordlund - Okay, you need to do this on page load (after clicking a left nav button) _and_ after clicking on an event or speaker's info in the page.
	addSkipLinks("#session-container");
	fixChatWhiteSpaceChannelsSessions();
	fixSessionsFrenchTranslations();
	fixSpeakerBioWall();
	addAddToSchedText();
	fixSessionsAddIcon();
	fixSessionsAccordion();
	fixSocialMediaButtonSessionSpeakers();
	fixAdda11yNotesSessions();	
} // End of fixSessionsPage

function setupCareerFairPageFixes () {
	// Whenever someone clicks on a new exhibitor block, we need to apply fixes...but it's more complicated than Avril Lavign's ex-boyfriend's situations.
	// If they're just looking at the exhibitor's profile, then go ahead and show them the destination exhibitor's profile.  BUT if they're
	// in a live session, they'll get a "Are you sure you wanna leave this live sesh?"  If they click "No", then forgedaboudit.  If they
	// click "Yes", then at _that_ point, wait a second, or two?  Let's make it two, and _then_ apply the fixes.
	//
	// Not yet tested
	$('div#items-list>div.item').click(function() {
		setTimeout (function() {
			if ($('div.swal-overlay--show-modal')[0]) {
					$('div.swal-overlay--show-modal').each(function() {
						fixWannaLeaveModal();
						$('div.swal-overlay>div.swal-modal button.swal-button.swal-button--confirm').click(function() {
							setTimeout (function () {
					  			fixCareerFairPage();
							}, 2000);
						});
					});
			} else {
				fixCareerFairPage();
			}
		}, 2000);
	});
} // End of setupCareerFairPageFixes


function fixCareerFairPage() {
	fixChatWhiteSpaceCareerFairShowcase();
	fixSocialMediaButtonCareerFairShowcase();
	$('div#content>div.row>div.item-container').first().attr("id", "item-container");
	addSkipLinks("#item-container");
} // End of fixCareerFairPage


function setupShowcasePageFixes () {
	// Whenever someone clicks on a new showcase block, the showcase block appears on the right without our
	// fixes applied.  But they don't show up right away.  So wait a sec, then apply fixes.
	// This one should be easy-peasy.  Networking and Career Fair should be harder.
	// Not yet tested
	$('div#items-list>div.item').click(function() {
		setTimeout (function() {
  			fixShowcasePage();
		}, 1000);
	});
} // End of setupShowcasePageFixes

function fixShowcasePage() {
	fixChatWhiteSpaceCareerFairShowcase();
	fixSocialMediaButtonCareerFairShowcase();
	$('div#content>div.row>div.item-container').first().attr("id", "item-container");
	addSkipLinks("#item-container");
} // End of fixShowcasePage

function setupNetworkingPageFixes () {
	// Of Career Fair, Showcase, and Networking, this should be the hardest, even more complexer than the other's.  I really should have left the Avril
	// Lavign comment until this one.  Networking has two parts:  People and Groups.
	// Whenever someone clicks on a person or sesh, the fixes have to be applied
	//
	// Okay, Part of the page correction is to turn the divs into buttons...maybe we don't need anything here....
	// Okay...as it is:
	// person -> person works
	// person -> group: works
	// group -> group: works
	// group -> person: works.  Oh okay....maybe we don't actually need to fix this,,,,
	$('div#items-list>div>div.item').click(function() {
		setTimeout (function() {
  			fixNetworkingPage();
		}, 1000);
	});
} // End of setupNetworkingPageFixes

function fixNetworkingPage() {
	fixChatWhiteSpaceNetworking();
	fixPeopleListings();
	fixGroupListings();
	fixSocialMediaButtonNetworking();
	fixGroupFilterSection();
	$('div#content>div.row>div.item-container').first().attr("id", "item-container");
	addSkipLinks("#item-container");
} // End of fixNetworkingPage

function fixAccountPage() {
	fixAccountHeadings();
	fixAccountForm();
	fixAccountLockOptions();
	fixSliders();	
} // End of fixAccountPage

function fixSliders() {
	$('span.switch').click(function(){
		$(this).find('input:first')[0].click();
	});
	$('span.switch').keyup(function(e){
		if (e.key == " " || e.code == "Space" || e.keyCode == 32) $(this).find('input:first')[0].click();
	});
} // End of fixSliders

function fixGroupFilterSection () {
	let observer = new MutationObserver(mutationRecords => {
		//console.log ("There's a mutation!");
		for (let mutation of mutationRecords) {
			//console.log ("Mutation type: " + mutation.type);
			if (mutation.type === 'childList') {
				fixAttendees();
				fixExhibitors ()
			}
		}
	});
	// Watch for changes in online participants, which are listed in a different area than the rest
	let nd = $('div.attendees-list-online')[0];
	observer.observe(nd, {childList : true, subtree : true});
	
	// Watch for changes in the list of exhibitors, speakers, etc.
	let nd2 = $('div#items-list>div')[0];
	observer.observe(nd2, {childList : true, subtree : true});

	// Now watch the Filters list for a click.
	// But before you can do that, you need to watch the filters button for a click
	// Add class an-mod so you don't repeatedly add hundreds of click listeners
	$('#items-filter button.btn.dropdown-toggle').click(function () {
		if ($(this).hasClass ("an-mod")) {
			// do nothing for now
			//console.log ("Looks live I've already modified it.");
		} else {
			//console.log ("Looks like it's not been modified.  Do it now.");
			$(this).addClass("an-mod");
			setTimeout(function(){
    				$('#items-filter ul.dropdown-menu>li>a').click(function() {
				      	setTimeout (function() {
      						//console.log ("Fixing group listings....");
						fixChatWhiteSpaceNetworking();
			        		fixAttendees();
	        				fixExhibitors ();
						fixSocialMediaButtonNetworking();
						fixGroupFilterSection();
				    	  }, 500);
			  	  });
			}, 500);
		  }
	});
} // End of fixGroupFilterSection

// fixExhibitors is to fix the list of people (except Online Now) from the filter drop-down on the Networking page
function fixExhibitors () {
	$('div#items-list>div[aria-liave=polite]').removeAttr("aria-live");	// This should prolly go elsewhere too
	$('div#items-list>div>div.item').each(function() {
		$(this).addClass("border-0 text-left");
		divToButton(this);
		$(this).click(function () {
			setTimeout (function () {
				// Networking section - Groups - expanding the content area to full width
				$("div#group-container").attr("class", "col-xl-12 scroll-fader");
			  	$("div#attendee-container").attr("class", "col-xl-12 scroll-fader");	// Experimental....will it work?
				fixChatWhiteSpaceNetworking();
				fixNetworkingHeadings();
				fixNetworkDeviceTranslations();
		        	fixSocialMediaButtonNetworking();
        			fixNetworkingPage();
			}, 2000);
		});
	});
} // End of fixExhibitors

// fixAttendees is to fix the list of attendees that shows up whenever "Online now" is selected in the filter on the Networking page
function fixAttendees() {
	$('div#items-list>div[aria-liave=polite]').removeAttr("aria-live");
	$('div.attendees-list-online>div.item').each(function() {
		$(this).addClass("border-0 text-left");
		divToButton(this);
    
		$(this).click(function () {
			setTimeout (function () {
				// Networking section - Groups - expanding the content area to full width
				$("div#group-container").attr("class", "col-xl-12 scroll-fader");
				$("div#attendee-container").attr("class", "col-xl-12 scroll-fader");	// Experimental....will it work?
        
				fixChatWhiteSpaceNetworking();
				fixNetworkingHeadings();
				fixNetworkDeviceTranslations();
		        	fixSocialMediaButtonNetworking();
        			fixNetworkingPage();
			}, 2000);
		});
	});
} // End of fixAttendees

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
				fixNetworkingHeadings();
				fixNetworkDeviceTranslations();	
			}, 2000);
		});
	});
	
	// Roch Lambert - Need delay to fix translation in french when clicking on the groups button
	if(getCookie("language")==="fr") {
		$('div.attendees-container>ul>li.nav-item>a#nav-tab-network-groups').click(function () {
			setTimeout (function () {
				// Roch Lambert - Set the correct language
				$('div#network-groups-list').find('div.d-flex>div.btn').each(function () {
					$(this).contents().filter(function() {
						return this.nodeType == 3
					}).each(function(){
						this.textContent = this.textContent.replace('Live','En direct');
					});
				});
			}, 2000);
		});
	};
} // End of fixGroupListings

function fixPeopleListings() {
	// First set all those divs to buttons
	$('div#items-list div.item').each(function() {
		$(this).addClass("border-0 text-left");
   		divToButton(this);
	});

	// Andrew Nordlund - for some reason I couldn't just attach a new click handler above.  It would get lost upon converting to <button>.  Even if I already converted to button.  This was the only way I could get it to work:  first convert the divs to buttons.  Then add click handlers to those buttons.
	
	$('div#items-list button.item').each(function() {
		$(this).click(function () {
			// Check for swal.  hmm, it's not finding it.  Maybe if I delayed it for a bit.
			setTimeout (function() {
				if ($('div.swal-overlay--show-modal')[0]) {
					$('div.swal-overlay--show-modal').each(function() {
						fixWannaLeaveModal();
						$('div.swal-overlay>div.swal-modal button.swal-button.swal-button--confirm').click(function() {
							setTimeout (function () {
								fixChatWhiteSpaceNetworking ();
								fixNetworkingNewContent();
							}, 2000);
						});
					});
				} else {
					fixChatWhiteSpaceNetworking ();
					fixNetworkingNewContent();
				}
			}, 500);
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
function divToButtonOld (div) {
	let NewElement = "<button";
	$.each(div.attributes, function(i, attrib) {
		NewElement += ' ' + attrib.name + '="' + attrib.value + '"';
	});
	div.replaceWith(NewElement + ">"+ $(this).html() + "</button>");
} // End of divToButtonOld

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

function fixHelpDriftChat() {
	// Fix the Help icon and point it to the Drift chat
	/* if(getCookie("language")==="fr"){
		$('#sidebar').find('button#virtual-action-help').replaceWith('<a class="virtual-action d-block drift-open-chat" href="#"><span class="icon-container"><i class="fas fa-info-circle icon"></i></span><span class="ml-2">Aide</span></a>');
	} else {
		$('#sidebar').find('button#virtual-action-help').replaceWith('<a class="virtual-action d-block drift-open-chat" href="#"><span class="icon-container"><i class="fas fa-info-circle icon"></i></span><span class="ml-2">Help</span></a>');
	}; */	
	// Was causing issues so just remove it
	$('#sidebar').find('button#virtual-action-help').parent().remove();
} // End of fixHelpDriftChat

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
			$('#page').prepend('<h1 class="wb-inv" id="accInfoH1" tabindex="-1">Informations sur le compte</h1>');
		} else {
			$('#page').prepend('<h1 class="wb-inv" id="accInfoH1" tabindex="-1">Account information</h1>');
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
		let checkID = $(this).attr("id");
		let pn = $(this).parent();
		let lbl = pn.next();
		pn.replaceWith('<span class="switch">' + pn.html() + '</span>');
		lbl.replaceWith('<label class="pl-3 pb-1" for="' + $(this).attr("id") +'">' + lbl.html() + '</label>');
		lbl.click(function() {
			$('#' + checkID).click();
		});
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
			$('#announcements').prepend('<h1 class="wb-inv" id="annonceH1" tabindex="-1">Annonces</h1>');
		} else {
			$('#announcements').prepend('<h1 class="wb-inv" id="annonceH1" tabindex="-1">Announcements</h1>');
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
		};
	};
} // End of fixGlobalNavHeadings

function fixSpeakerBioWall() {
	$('#speakers').find('div.card-body').find('ul.list-unstyled>div.mt-1').each(function () {
		// Let's split the paragraphs for the bio's in two because it's long!
		var text = $(this).find('p').text();
		var tokens = text.split('. ');
		var n = Math.floor(tokens.length/2);
		var htmltext = '<p>'+tokens.slice(0, n).join('.') + '.</p><p>' + tokens.slice(n+1, tokens.length).join('.') + '</p>';
		$(this).find('p').replaceWith(htmltext);
	});
} // End of fixSpeakerBioWall

function setCurrentPage () {
	$('#sidebar>ul>li[aria-current=page]').removeAttr("aria-current");
	$('#sidebar>ul>li>button.active').parent().attr("aria-current","page");
} // End of setCurrentPage

function fixNetworkingNewContent () {
	$('.attendees-container').removeAttr("aria-live");
	$('#attendee-container').attr("aria-live","polite");
} // End of fixNetworkingNewContent

function addAddToSchedText () {
	$('div#page').append('<span id="addToSchedText" class="d-none">' + ((getCookie("language")==="fr") ? "Ajouter à l'horaire personnel" : "Add to Personal Schedule") + '</span>');

	// IMPORTANT ROCH OR MAXIM!!!  THIS NEEDS PROPER TRANSLATION!
	$('div#page').append('<span id="removeFromSchedText" class="d-none">' + ((getCookie("language")==="fr") ? "Retirer de l'horaire personnel" : "Remove from Personal Schedule") + '</span>');
} // End of addAddToSchedText

function fixSessionsAddIcon () {
	$('#content>div>div[aria-live=polite]').removeAttr("aria-live");

	$('div#items-list').attr("tabindex", "-1");

	// Loop through all the sessions
	$('.sessions-container').find('div.session-selector').each(function () {
		$(this).parent().off("keypress").attr("tabindex", "-1");
		// Get value of the ID of the session
		var sid = $(this).find("div.title>i").attr("id");
		var sid2 = sid.replace('schedule-add-icon-','');
		$(this).find('div.title>span').attr("id", sid2 + '-title').click(function() {
			virtual_portal_render_section('session', sid2);
		});
		$(this).find("div.title>i.fa-plus-square").attr("aria-labelledby", "addToSchedText " + sid2 + '-title');
		$(this).find("div.title>i.fa-check-square").attr("aria-labelledby", "removeFromSchedText " + sid2 + '-title');
		$(this).find("div.title>i").click(function() {
			virtual_session_attendance_toggle(sid2);
		});
		$(this).find("div.sub-title").attr("id", sid2 + '-subtitle');
		// We're about to introduce a scrolling issue.  Fix it here first:
		$('div.items-container').attr("style","overflow-y:clip;");
		// Now fix those blasted <h6>s
		$(this).find('h6').replaceWith(function() {
			return '<button class="h6 mt-2 mb-0 border-0 text-left bg-white" aria-describedby="' + sid2 + '-title ' + sid2 + '-subtitle"><span class="wb-inv">' + ((getCookie("language")==="fr") ? "Ouvrir " : "Open ") + '</span>' + $(this).html() + '</button>';
		}).click(function() {
			virtual_portal_render_section('session', sid2);
		});
	});
} // End of fixSessionsAddIcon

function fixLeftNavIconFrench () {
	// Find French program / English program links in sidebar and change class to audio icon depending on language
	if(getCookie("language")==="fr") {
		$('#sidebar').find('ul.virtual-nav-list').find('li:nth-child(2)').find('i').attr('class', 'fas fa-calendar-check icon');
		$('#sidebar').find('ul.virtual-nav-list').find('li:nth-child(3)').find('i').attr('class', 'fas fa-headphones icon');
	} else {
		$('#sidebar').find('ul.virtual-nav-list').find('li:nth-child(2)').find('i').attr('class', 'fas fa-headphones icon');
	};
} // End of fixLeftNavIconFrench

function fixLoginDateTranslation () {
	// Find french date on the login page and translate
	if(getCookie("language")==="fr") {
		$("#login-form-container").find('div.text-secondary').text('26 mai 2022 - 27 mai 2022');
	};
} // End of fixLoginDateTranslation

function fixLeftNavFrenchSize () {
	// Roch Lambert - Add fix for french navbar
	// Removed the french and set global so they are the same size
	//if(getCookie("language")==="fr"){
		$('#sidebar').append('<style>@media (min-width: 769px) {#sidebar {min-width: 275px !important; max-width: 275px !important;}}</style>');
	//};
} // End of fixLeftNavFrenchSize

function fixSessionsAccordion () {
	// Roch Lambert - Find accordion and remove class to prevent accordion
	$('#session-accordion').find('div.card-header').removeAttr("data-toggle data-target aria-expanded");
} // End of fixSessionsAccordion

function fixAccountLockOptions () {
	// Roch Lambert - Loop through all the speaker tags
	$('.attendee-tags').find('span.px-3').each(function () {
		// Now check if contains "Speaker"
		if ($(this).is(':contains("Speaker")')) {
			// Found speaker so set certain inputs to read-only
			$("div.form-group").find('textarea[name="about"]').prop('readonly', true);
			$("div.form-group").find('input[name="organization"]').prop('readonly', true);
			$("div.form-group").find('input[name="title"]').prop('readonly', true);
		};
	});
} // End of fixAccountLockOptions

function fixSocialMediaButtonCareerFairShowcase () {
	// Roch Lambert - There is a double tab on a social media because of a/button, let's remove the button
	$('#exhibitor-container').find('div.btn-group>a>button').each(function () {
		$(this).replaceWith("<span class='btn btn-primary px-3 py-2'>" + $(this).html() + "</span>");
	});
	// Roch Lambert - Set proper attributes on external links
	$('#exhibitor-container').find('div.btn-group>a').each(function () {
		$(this).attr("rel", "noopener noreferrer");
	});
} // End of fixSocialMediaButtonCareerFairShowcase

function fixSocialMediaButtonNetworking () {
	// Roch Lambert - There is a double tab on a social media because of a/button, let's remove the button
	$('#attendee-container').find('div.btn-group>a>button').each(function () {
		$(this).replaceWith("<span class='btn btn-primary px-3 py-2'>" + $(this).html() + "</span>");
	});
	// Roch Lambert - Set proper attributes on external links
	$('#attendee-container').find('div.btn-group>a').each(function () {
		$(this).attr("rel", "noopener noreferrer");
	});
} // End of fixSocialMediaButtonNetworking

function fixSocialMediaButtonSessionSpeakers () {
	// Roch Lambert - Fix the speaker social media icons in the session view
	// LinkedIn
	$('#session-container').find('#session-accordion').find('#speakers').find('div.media-body').find('div.d-block>a>i.fa-linkedin').each(function () {
		$(this).replaceWith("<i class='fab fa-linkedin fa-lg'><span class='wb-inv'>LinkedIn</span></i>");
	});
	// Twitter
	$('#session-container').find('#session-accordion').find('#speakers').find('div.media-body').find('div.d-block>a>i.fa-twitter-square').each(function () {
		$(this).replaceWith("<i class='fab fa-twitter-square fa-lg'><span class='wb-inv'>Twitter</span></i>");
	});
	// External website
	if(getCookie("language")==="fr"){
		$('#session-container').find('#session-accordion').find('#speakers').find('div.media-body').find('div.d-block>a>i.fa-external-link-square-alt').each(function () {
			$(this).replaceWith("<i class='fas fa-external-link-square-alt fa-lg'><span class='wb-inv'>Site web externe</span></i>");
		});
	} else {
		$('#session-container').find('#session-accordion').find('#speakers').find('div.media-body').find('div.d-block>a>i.fa-external-link-square-alt').each(function () {
			$(this).replaceWith("<i class='fas fa-external-link-square-alt fa-lg'><span class='wb-inv'>External website</span></i>");
		});
	};
	// Add external rel attribute on the links
	$('#session-container').find('#session-accordion').find('#speakers').find('div.media-body').find('div.d-block>a').each(function () {
		$(this).attr("rel", "noopener noreferrer");
	});
} // End of fixSocialMediaButtonSessionSpeakers

function fixAdda11yNotesSessions () {
	if (!$('div#a11yNoteSeshFr').length) $('#session-accordion').find('div#description').find('div.desc-notes').append('<div lang="fr" id="a11yNoteSeshFr"><h2>Notes sur l\'accessibilité :</h2><p><ul><li>Le lecteur vidéo est réglé sur lecture automatique en mode sourdine. Sélectionnez le bouton « Cliquez pour rétablir le son » sur le lecteur vidéo pour le son.</li><li>Si vous avez des difficultés à utiliser le lecteur vidéo avec votre clavier, veuillez suivre les étapes suivantes. Mettez la vidéo en focus et sélectionnez "CTRL + ?" sur votre clavier, ce qui vous montrera les raccourcis clavier qui peuvent être utilisés lorsque la vidéo est en focus. Sélectionnez "CTRL + ?" pour masquer à nouveau les raccourcis et les commandes du lecteur vidéo seront désormais visibles. Si vous avez besoin d\'aide, n\'hésitez pas à nous contacter en utilisant l\'icône de clavardage en bas à droite intitulée "Open chat with Ask Alex in the Drift Widget messenger".</li></p></div><div lang="en" id="a11yNoteSeshEn"><h2>Accessibility notes</h2><p><ul><li>The video player is set to autoplay on mute. Select the "Click to unmute" button on the video player for sound.</li><li>If you have any difficulties using the video player with your keyboard then please perform the following steps. Focus the video and select "CTRL + ?" on your keyboard, this will show you the keyboard shortcuts that can be used when the video is in focus. Select "CTRL + ?" to hide the shortcuts again and the video player controls will now be visible. If you need further help don¿t hesitate to contact us using the chat icon at bottom right labelled as "Open chat with Ask Alex in the Drift Widget messenger".</li></p></div>');
} // End of fixAdda11yNotesSessions

function fixAdda11yNotesChannels () {
	if (!$('div#a11yNoteChanFr').length) $('#session-accordion').find('div#description').find('div.desc-notes').append('<div lang="fr" id="a11yNoteChanFr"><h2>Notes sur l\'accessibilité :</h2><p><ul><li>Le lecteur vidéo est réglé sur lecture automatique en mode sourdine. Sélectionnez le bouton « Cliquez pour rétablir le son » sur le lecteur vidéo pour le son.</li><li>Si vous avez des difficultés à utiliser le lecteur vidéo avec votre clavier, veuillez suivre les étapes suivantes. Mettez la vidéo en focus et sélectionnez "CTRL + ?" sur votre clavier, ce qui vous montrera les raccourcis clavier qui peuvent être utilisés lorsque la vidéo est en focus. Sélectionnez "CTRL + ?" pour masquer à nouveau les raccourcis et les commandes du lecteur vidéo seront désormais visibles. Si vous avez besoin d\'aide, n\'hésitez pas à nous contacter en utilisant l\'icône de clavardage en bas à droite intitulée "Open chat with Ask Alex in the Drift Widget messenger".</li><li>Pour ouvrir le sous-titrage dans un nouveau onglet, accédez à <a href="https://www.streamtext.net/player?event=CARTFRCB" target="_blank" rel="noopener noreferrer">https://www.streamtext.net/player?event=CARTFRCB</a>.</li></p></div><div lang="en" id="a11yNoteChanEn"><h2>Accessibility notes</h2><p><ul><li>The video player is set to autoplay on mute. Select the "Click to unmute" button on the video player for sound.</li><li>If you have any difficulties using the video player with your keyboard then please perform the following steps. Focus the video and select “CTRL + ?” on your keyboard, this will show you the keyboard shortcuts that can be used when the video is in focus. Select “CTRL + ?” to hide the shortcuts again and the video player controls will now be visible. If you need further help don’t hesitate to contact us using the chat icon at bottom right labelled as “Open chat with Ask Alex in the Drift Widget messenger”.</li><li>To open the subtitles in a new tab, go to <a href="https://www.streamtext.net/player?event=CARTFRCB" target="_blank" rel="noopener noreferrer">https://www.streamtext.net/player?event=CARTFRCB</a>.</li></p></div>');
} // End of fixAdda11yNotesChannels

function addSkipLinks (dest) {
	let linkText = (getCookie("language")==="fr" ? "Passer au contenu principal" : "Skip to main content");
	if (!$(dest)[0].hasAttribute("tabindex")) $(dest).attr("tabindex", "-1");
	if (!$('#skipLink').length) {
		$('#page').prepend('<p id="skipLinkP" style="display: block;margin: 0;padding: 0;"><a href="#" class="skipLink" id="skipLink">' + linkText + '</a></p>');
		$('a#skipLink').click(function() { $(dest).focus()});
	}
} // End of addSkipLinks
