const openMenu = document.querySelector('.openMenu')
const closeMenu = document.querySelector('.closeMenu')
const navItem = document.querySelector('.nav-items')



openMenu.addEventListener('click', show)
closeMenu.addEventListener('click', close)

function show() {
    navItem.style.display = 'flex';
    navItem.style.top = '0';

}
function close() {
    navItem.style.top = '-100%';

}







