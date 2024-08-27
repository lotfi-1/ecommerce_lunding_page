function display(element) {
    if (!element.classList.contains("show")) {
        element.style.display = "flex";
        element.classList.add("show");

        let op = 0;
        let id = setInterval(() => {
            op += 0.1;
            element.style.opacity = op;
            if (op >= 1)
                clearInterval(id);
        }, 20);

    } else {
        element.classList.remove("show");

        let op = 1;
        let id = setInterval(() => {
            op -= 0.1;
            element.style.opacity = op;
            if (op <= 0) {
                element.style.display = "none";
                clearInterval(id);
            }
        }, 20);


    }
}
let linksbtn = document.getElementById("btn");
let links = document.querySelector("header .links");
linksbtn.onclick = _ => {
    let span = linksbtn.children;
    closeAll(links);
    if (linksbtn.classList.contains("clickedBtn")) {
        linksbtn.classList.remove("clickedBtn");
        display(links);
        span[0].style.cssText = `
            transform : rotate(0);
        `;
        span[1].style.cssText = `
            opacity: 1;
        `;
        span[2].style.cssText = `
            transform : rotate(0);
        `;
    } else {
        display(links);
        span[0].style.cssText = `
            top: 9px;
            transform : rotate(-45deg);
        `;
        span[1].style.cssText = `
            opacity: 0;
        `;
        span[2].style.cssText = `
            top: 9px;
            transform : rotate(45deg);
        `;
        linksbtn.classList.add("clickedBtn");
    }
}

let currParent = document.querySelector(".information .curr-parent");
let currencies = document.querySelector(".information .currencies");
let selector = document.querySelector(".information .curr-parent .select");
let active = document.querySelector(".information .currencies .active");

currParent.addEventListener("click", _ => selectElement(currParent, currencies, selector, active));


let translate = document.querySelector(".information .tran-parent");
let tranSelect = document.querySelector(".information .tran-parent .select");
let tranList = document.querySelector(".information .tran-parent .translate");
let tranactive = document.querySelector(".information .tran-parent .translate .active");

translate.addEventListener("click", _ => selectElement(translate, tranList, tranSelect, tranactive));

function selectElement(parent, list, selector, active) {
    let down = parent.querySelector(".fa-angle-down");
    rotate(down);
    if (!parent.classList.contains("clicked")) {
        parent.classList.add("clicked");
        display(list);
        let arrayList = Array.from(list.children);
        arrayList.forEach(e => {
            e.onclick = _ => {
                arrayList.forEach(e => {
                    if (e.classList.contains("active"))
                        e.classList.remove("active");
                })
                active.classList.remove("active");
                e.classList.add("active");
                select(selector, e.cloneNode(true));
            }
        });
    } else {
        parent.classList.remove("clicked");
        display(list);
    }
}
function select(ele, clone) {
    let ind = 0;
    do {
        ele.removeChild(ele.firstElementChild);
        ind++;
    } while (ind < 2);
    clone.lastElementChild.classList.add("hidden");
    ele.prepend(clone.lastElementChild);
    ele.prepend(clone.firstElementChild);
}

let shopLinks = document.querySelector("header .shop .purchases");
let shop = document.querySelector("header .shop");
shop.addEventListener("click", _ => {
    closeAll(shopLinks);
    display(shopLinks);
});


// function openingMessage(e,msg){
//     e.style.position = "relative";
//     let div = document.createElement("div");
//     div.textContent = msg ;
//     div.classList.add("message","up");
//     e.append(div);
//     div.style.display = "flex";
// }
// function closingMessage(e){
//     let msg = e.lastElementChild;
//     if(msg.classList.contains("message"))
//         msg.style.display ="none";
// }


let categories = document.querySelector(".search-bar .menu");
let catlinks = document.querySelector(".search-bar .menu .catlinks");

categories.addEventListener("click", _ => {
    console.log("lotfi");
    closeAll(catlinks);
    display(catlinks);
    if (document.body.offsetWidth < 768) {
        let cat = document.querySelector(".search-bar .menu > div:first-child > span img");
        rotate(cat, "135deg");
    } else
        rotate(categories.querySelector(".fa-angle-down"));

});


function rotate(ele, deg = "180deg") {
    if (ele.classList.toggle("rotate"))
        ele.style.transform = `rotate(${deg})`;
    else
        ele.style.transform = "rotate(0)";
}


let goup = document.getElementById("goup");
let x = 0;
window.addEventListener("scroll", _ => {
    if (window.scrollY >= 400 && x === 0) {
        display(goup);
        x++;
    }
    if (window.scrollY < 400 && x !== 0) {
        x = 0
        display(goup);
    }
});
goup.addEventListener("click", _ => {
    if (window.scrollY >= 400) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }
});


// smothly 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function closeAll(ele) {
    let shown = document.querySelectorAll(".show");
    shown.forEach(e => {
        if (e !== ele){
            display(e)
        } 
    });
}



function setImages(sectionImgs, imgs) {
    sectionImgs.forEach((e, ind) => {
        e.setAttribute("src", imgs[ind])
        e.parentElement.parentElement.querySelector(".price").textContent = `$${imgs[ind].match(/p(\d+)/)[1]}`;
    });
}
window.addEventListener("load", _ => {
    let sections = document.querySelectorAll("section");

    fetch("imgs.json").then(
        (result) => {
            return result.json();
        }
    ).then(
        (data) => {
            console.log(data);
            sections.forEach(e => {
                let id = e.getAttribute("id");
                let imagesStore = document.querySelectorAll(`#${id} .box .photo img`);
                switch (id) {
                    case "phones": {
                        setImages(imagesStore, data.phones);
                    }
                        break;
                    case "watches": {
                        setImages(imagesStore, data.watches);
                    }
                        break;
                    case "shirts": {
                        setImages(imagesStore, data.shirts);
                    }
                        break;
                    case "shoes": {
                        setImages(imagesStore, data.shoes);
                    }
                        break;
                }
            })
        }
    );
});




let details = document.querySelectorAll(".box .front-side .view > div");
details.forEach(e => {
    e.addEventListener("click", _ => {
        let box = e.parentElement.parentElement.parentElement;
        let backSide = box.querySelector(".back-side");
        let frontSide = box.querySelector(".front-side")
        rot(box, frontSide, backSide);
    });
});

let cross = document.querySelectorAll(".box .back-side span");
cross.forEach(e => {
    e.addEventListener("click", _ => {
        if (e.classList.contains("exit")) {
            let box = e.parentElement.parentElement;
            let backSide = box.querySelector(".back-side");
            let frontSide = box.querySelector(".front-side")
            rot(box, frontSide, backSide, " ");
        }
        // else if (e.classList.contains("left")) {

        // } else {

        // }
    })
});

function rot(ele, front, back, origin = "back") {
    ele.style.transform = "rotate3d(0,1,0,-85deg)";
    setTimeout(_ => {
        if (origin === "back") {
            front.style.display = "none";
            back.style.display = "block";
        } else {
            front.style.display = "block";
            back.style.display = "none";
        }
        ele.style.transform = "rotate3d(0,1,0,30deg";
        setTimeout(() => {
            ele.style.transform = "rotate3d(0,1,0,0deg";
        }, 100);
    }, 100);
}
