const menuButton = document.querySelector('.menu-button');
const scrollUpButton = document.querySelector('.scroll-up');
const navList = [].slice.call(document.querySelector('.nav-list').children);
const navListMobile = [].slice.call(document.querySelector('.nav-list--mobile ul').children);

function hasClass(classList, className) {
    const classes = [].slice.call(classList);
    return classes.indexOf(className) !== -1;
}

function removeActiveClassFromLinks(navList) {
    navList.forEach(function (el) {
        el.children[0].classList.remove('active');
    });
}

scrollUpButton.style.display = 'none';

// scrolls page to the top when clicked
function onClickScrollButton(e) {
    e.preventDefault();

    removeActiveClassFromLinks(navList);
    removeActiveClassFromLinks(navListMobile);

    document.body.scrollTop = 0; // for safari
    document.documentElement.scrollTop = 0;

    window.location = '#';

    menuButton.classList.remove('open');
}
scrollUpButton.addEventListener('click', onClickScrollButton);

function onLoad() {
    // check if iWhatever device a la https://stackoverflow.com/a/9039885
    if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !window.MSStream) {
        document.querySelector('body').classList.add('is-apple-mobile');
    }

    // toggle active links on load
    const link = navList.filter(function (el) {
        return el.children[0].hash === window.location.hash;
    })[0];

    if (link) {
        link.children[0].classList.add('active');
    }

    // hide transform: translate animation on load
    setTimeout(function () {
        document.querySelector('.nav-list--mobile').classList.remove('hidden-on-load');
    }, 200);
}
window.addEventListener('load', onLoad);

// show/ hide scroll button
function onScroll() {
    if (document.body.scrollTop > 48 || document.documentElement.scrollTop > 48) {
        scrollUpButton.style.display = 'block';
    } else {
        removeActiveClassFromLinks(navList);
        removeActiveClassFromLinks(navListMobile);

        scrollUpButton.style.display = 'none';
    }
}
window.addEventListener('scroll', onScroll);

function onClick(e) {
    const classes = e.target.classList;

    // toggle active links
    if (classes.contains('link')) {
        removeActiveClassFromLinks(navList);
        removeActiveClassFromLinks(navListMobile);

        classes.add('active');

        menuButton.classList.remove('open');
    }
    // toggle mobile menu
    if (classes.contains('menu-button')) {
        menuButton.classList.toggle('open');
    }
}
window.addEventListener('click', onClick);

function onResize() {
    if (window.innerWidth > 649) {
        menuButton.classList.remove('open');
    }
}
window.addEventListener('resize', onResize);
