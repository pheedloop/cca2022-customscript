$(document).ready(function() {
  console.log("Hello there, world");
});

// fixAllPages fixes everything that appears across the Virtual Platform
function fixAllPages () {
	fixLangSwitcher();
} // End of fixAllPages

// fixLangSwitcher
function fixLangSwitcher() {
	// Andrew Nordlund - Add lang attributes to the language switcher:
	$('#languages-modal a.list-group-item.list-group-item-action:contains("Français")').html('<span lang="en">French</span> (<span lang="fr">Français</span>)');
} // End of fixAllPages
