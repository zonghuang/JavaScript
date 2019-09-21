const buttons = document.querySelectorAll('button');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', createParagraph);
}

function createParagraph() {
    const para = document.createElement('p');
    para.textContent = '你点击了这个按钮！';
    document.body.appendChild(para);
}