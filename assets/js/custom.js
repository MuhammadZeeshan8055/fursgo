const toggleBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu-items');
const header = document.querySelector('.logo-toggle-button');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    header.classList.toggle('fixed');
    document.body.classList.toggle('menu-open');
});

const groomerBtn = document.querySelector('.find-groomer');
const spaceBtn = document.querySelector('.find-space');
const groomerContent = document.querySelector('.find-groomer-content-area');
const spaceContent = document.querySelector('.find-space-content-area');

groomerBtn.addEventListener('click', () => {
    groomerContent.style.display = 'block';
    spaceContent.style.display = 'none';
    groomerBtn.classList.add('active');
    spaceBtn.classList.remove('active');
});

spaceBtn.addEventListener('click', () => {
    spaceContent.style.display = 'block';
    groomerContent.style.display = 'none';
    spaceBtn.classList.add('active');
    groomerBtn.classList.remove('active');
});


function toggleActive(containerSelector, itemSelector, activeClass) {
    
    const items = document.querySelectorAll(`${containerSelector} ${itemSelector}`);

    items.forEach(item => {
        item.addEventListener("click", () => {
            items.forEach(button => button.classList.remove(activeClass));
            item.classList.add(activeClass);
        });
    });
}

// Find Groomer
toggleActive(".find-grommer-content", ".pet-option", "highlight");
toggleActive(".find-grommer-content", ".weight-option", "active");

// Find Space
toggleActive(".find-space-content", ".pet-option", "highlight");
toggleActive(".find-space-content", ".weight-option", "active");
