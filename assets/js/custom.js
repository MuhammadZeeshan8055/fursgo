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