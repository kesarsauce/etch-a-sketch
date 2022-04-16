container = document.querySelector('.container');
penColor = 'black';

gridSize = 16;

saveGridSizeBtn = document.querySelector('input#save-grid-size');

saveGridSizeBtn.addEventListener('click', updateGridSize);

loadGrid();

function colorizeGrid(){
    switch(penColor){
        case 'black':{
            this.style.backgroundColor = 'rgb(0, 0, 0)';
            break;
        }
        case 'rgb':{
            rgbColor(this);
            break;
        }
        case 'white':{
            this.style.backgroundColor = 'rgb(255, 255, 255)';
            break;
        }
    }
}

function rgbColor(square){
    if(square.style.backgroundColor && square.style.backgroundColor!=='rgb(255, 255, 255)'){
        regRGB = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
        rgb = square.style.backgroundColor.match(regRGB).slice(1,);
        rgb.forEach((color, index)=>{rgb[index]=color-Math.round(color/5);})
        square.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
    else{
        randomR = Math.round(255*Math.random());
        randomG = Math.round(255*Math.random());
        randomB = Math.round(255*Math.random());
        square.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
}

dashboardBtns = document.querySelectorAll('.dashboard img');
dashboardBtns.forEach((btn)=>{btn.addEventListener('click', changePenColor)});

function changePenColor(){
    dashboardBtns.forEach((btn)=>btn.classList.remove('selected'));

    this.classList.add('selected');
    penColor = this.id.replace('-pen', '');
}

function updateGridSize(){
    inputValue = document.getElementById('grid-size-input').value;
    if(isNaN(inputValue)){
        return;
    }
    gridSize = inputValue;
    container.innerHTML='';
    loadGrid();
}

function loadGrid(){
    for(let i=1; i<=gridSize; i++){
        for(let j=1; j<=gridSize; j++){
            div = document.createElement('div');
            div.id=`${i}-${j}`;
            div.classList.add('grid');
            div.style.height = `${100/gridSize}%`;
            div.style.flex = `1 0 ${100/gridSize}%`
            div.addEventListener('mouseover', colorizeGrid);
            container.appendChild(div);
        }
    }
}