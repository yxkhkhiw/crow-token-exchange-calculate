const data = JSON.parse(localStorage.getItem("earn")) || {
    papyrus: {
        crow: 0,
        diamond: 0,
        fee: 0,
        select: 1,
    },
    morion: {
        crow: 0,
        diamond: 0,
        fee: 0,
        select: 1,
    },
    promote: {
        crow: 0,
        diamond: 0,
        fee: 0,
        select: 1,
    },
    gear: {
        crow: 0,
        diamond: 0,
        fee: 0,
        select: 1,
    },
    tear: {
        crow: 0,
        diamond: 0,
        fee: 0,
        select: 1,
    },
    feather: {
        crow: 0,
        diamond: 0,
        fee: 0,
        select: 1,
    },
};

document.addEventListener("input", () => {
    localStorage.setItem("earn", JSON.stringify(data));

    setTotal();
});

const resetAll = document.documentElement.querySelector(".reset-all");

resetAll.addEventListener("click", () => {
    localStorage.removeItem("earn");

    location.reload();
});

import hook from "./webhook.js";
hook("earn");

const token = document.querySelector(".token");
const mint = document.querySelector(".mint");
const totalPercent = document.querySelector(".total-percent");

function setTotal() {
    const crow =
        data.papyrus.select * data.papyrus.crow +
        data.morion.select * data.morion.crow +
        data.promote.select * data.promote.crow +
        data.gear.select * data.gear.crow +
        data.tear.select * data.tear.crow +
        data.feather.select * data.feather.crow;

    const diamond =
        data.papyrus.select * (data.papyrus.diamond + data.papyrus.fee) +
        data.morion.select * (data.morion.diamond + data.morion.fee) +
        data.promote.select * (data.promote.diamond + data.promote.fee) +
        data.gear.select * (data.gear.diamond + data.gear.fee) +
        data.tear.select * (data.tear.diamond + data.tear.fee) +
        data.feather.select * (data.feather.diamond + data.feather.fee);

    token.textContent = crow.toFixed(2);

    mint.textContent = diamond.toFixed(2);

    const resultNum = diamond / crow;

    calper(totalPercent, resultNum);
}

const donate = document.querySelector(".donate");
const playWallet = document.querySelector(".play-wallet");
const playWalletImage = document.querySelector(".play-wallet-image");

donate.addEventListener("mouseleave", () => {
    playWallet.style.width = "30px";
    playWallet.style.height = "30px";
});

playWalletImage.addEventListener("mouseover", () => {
    playWallet.style.width = "500px";
    playWallet.style.height = "200px";
});

//

const items = document.querySelectorAll(".item");

items.forEach((el, i) => {
    if (i === 0) return;
    if (el.id == "crow") return;

    const input1 = el.querySelector(`[data-crow=${el.id}]`);
    const input2 = el.querySelector(`[data-diamond=${el.id}]`);
    const input3 = el.querySelector(`[data-fee=${el.id}]`);
    const reset = el.querySelector(`[data-button=${el.id}]`);

    data[el.id].crow == 0 ? (input1.value = "") : (input1.value = data[el.id].crow);
    data[el.id].diamond == 0 ? (input2.value = "") : (input2.value = data[el.id].diamond);
    data[el.id].fee == 0 ? (input3.value = "") : (input3.value = data[el.id].fee);

    setValue(input1, input2, input3);
    setTotal();
    setPercent(el);

    input1.addEventListener("input", (e) => {
        if (e.target.value == "00") e.target.value = 0;

        setValue(input1, input2, input3);
        setPercent(el);
    });

    input2.addEventListener("input", (e) => {
        if (e.target.value == "00") e.target.value = 0;

        setValue(input1, input2, input3);
        setPercent(el);
    });

    input3.addEventListener("input", (e) => {
        if (e.target.value == "00") e.target.value = 0;

        setValue(input1, input2, input3);
        setPercent(el);
    });

    reset.addEventListener("click", () => {
        input1.value = "";
        input2.value = "";
        input3.value = "";

        setValue(input1, input2, input3);
        setTotal();
        setPercent(el);

        localStorage.setItem("earn", JSON.stringify(data));
    });

    const logo = el.querySelector(".logo");
    const imageLogo = logo.querySelector("img");
    const textLogo = logo.querySelector("p");

    imageLogo.addEventListener("click", () => logoEventHandle(imageLogo, imageLogo));
    textLogo.addEventListener("click", () => logoEventHandle(textLogo, imageLogo));

    if (data[imageLogo.getAttribute("data-img")].select == 0) imageLogo.style.borderColor = "#ccc";
});
//

function setResult(num1, num2, num3) {
    return (num2 + num3) / num1;
}

function setValue(e, e2, e3) {
    const result = document.querySelector(`[data-result=${e.dataset.crow}]`);

    data[e.dataset.crow].crow = Number(e.value);
    data[e2.dataset.diamond].diamond = Number(e2.value);
    data[e3.dataset.fee].fee = Number(e3.value);

    const resultNum = setResult(data[e.dataset.crow].crow, data[e2.dataset.diamond].diamond, data[e3.dataset.fee].fee);

    if (resultNum == 0 || isNaN(resultNum)) return (result.value = "");

    if (resultNum > 0) result.value = resultNum.toFixed(2);
    else result.value = resultNum.toFixed(2);
}

function setPercent(e) {
    const percent = document.querySelector(`[data-percent=${e.id}]`);

    const resultNum = setResult(data[e.id].crow, data[e.id].diamond, data[e.id].fee);
    calper(percent, resultNum);
}

function calper(e, num) {
    let text = 0;

    if (num > 84) text = (((num - 84) / 84) * 100).toFixed(1);
    else text = (((84 - num) / 84) * 100).toFixed(1);

    if (num > 84) {
        text = `+${text}%`;
        e.style.color = "red";
    } else {
        text = `-${text}%`;
        e.style.color = "green";
    }

    text == "-NaN%" || text == "+NaN%" || text == "-0.0%" ? (e.textContent = "0%") : (e.textContent = text);
}

//

function logoEventHandle(e, e2) {
    const image = e.getAttribute("data-img");
    const text = e.getAttribute("data-text");

    if (text) logoCheck(text, e2);
    else logoCheck(image, e2);
}

function logoCheck(e, e2) {
    if (!e && !e2) return;

    if (data[e].select == 0) {
        data[e].select = 1;
        e2.style.borderColor = "cyan";
    } else {
        data[e].select = 0;
        e2.style.borderColor = "#ccc";
    }
    localStorage.setItem("earn", JSON.stringify(data));
    setTotal();
}
