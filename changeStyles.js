const stylesSelector = document.getElementById('styles-selector');
stylesSelector.addEventListener('change', function(event) {
	const newCss = 'buttons/' + event.target.selectedOptions[0].value + ".css";
	console.log(newCss);
	changeCSS(newCss, 1);
});

function changeCSS(cssFile, cssLinkIndex) {
    const oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    const newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

function sidebarHandler() {
	sidebar.classList.toggle('sidebar-activated');
	sidebarActivator.classList.toggle('sidebar-activate-activated');
}

const sidebar = document.querySelector('.sidebar');
const sidebarActivator = document.querySelector('.sidebar-activate');
sidebar.onclick = sidebarHandler;
sidebarActivator.onclick = sidebarHandler;
sidebarActivator.onmouseover = sidebarHandler;

document.querySelector('.sidebar-content').addEventListener('click', function(event) {
	event.stopPropagation()
});
