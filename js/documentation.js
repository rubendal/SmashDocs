sidebarLinks = [
	new PageLink("home", "Home"),
	new PageLink("damage", "Damage multipliers"),
	new PageLink("di", "DI/LSI"),
	new PageLink("staleness", "Staleness queue")
];


for (var i = 0; i < sidebarLinks.length; i++) {
	$('#documentationSections').append(sidebarLinks[i].GetLink());
}

GoToPage('home');