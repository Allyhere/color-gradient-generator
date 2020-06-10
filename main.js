let range = document.getElementById('hue');
let getMode = document.querySelectorAll('#mode button');
let btnRandom = document.getElementById("random");
let code = document.getElementById("code");
let gradientContainer = document.getElementById("gradient");
let copyCode = document.getElementById("copy");
let mode = 'analogic';

getMode.forEach(el =>{
    el.addEventListener('click', function(){
        mode = this.id;
    })
})

range.addEventListener('change', function(ev){
    fetchColor(this.value);
})

random.addEventListener('click', ()=> fetchColor());

copyCode.addEventListener('click',function copyToClipboard(){
    const el = document.createElement('textarea');
    el.value = code.innerText;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    copyCode.firstElementChild.innerText = "Copied ! 👍";
    setTimeout(() =>{
        copyCode.firstElementChild.innerText = "Copy code!";
    },2000)
})

function fetchColor(hue){
    let color;

    
    hue ?
    color = `hsl=${hue},50%,50%` :
    color = `hex=${Math.floor(Math.random()*16777215).toString(16)}`;

    
    fetch(`https://www.thecolorapi.com/scheme?${color}&mode=${mode}&count=4`)
    .then(res => res.json())
    .then(json =>{
        assignColor(json.colors);
    })
}

function assignColor(color){
    let gradient = `linear-gradient(to right, ${color[0].hex.value}, ${color[1].hex.value}, ${color[2].hex.value}, ${color[3].hex.value}`
    
    code.innerText = `
div{
    background-image: ${gradient};
}`
    console.log(gradient);
    gradientContainer.style.background = gradient;
    
}