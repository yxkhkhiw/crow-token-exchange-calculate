const data = JSON.parse(localStorage.getItem("data")) || {
    papyrus: {
        crow: 0,
        diamond: 0,
        total: 1,
        select: 1,
    },
    morion: {
        crow: 0,
        diamond: 0,
        total: 1,
        select: 1,
    },
    promote: {
        crow: 0,
        diamond: 0,
        total: 1,
        select: 1,
    },
    gear: {
        crow: 0,
        diamond: 0,
        total: 1,
        select: 1,
    },
    tear: {
        crow: 0,
        diamond: 0,
        total: 1,
        select: 1,
    },
    feather: {
        crow: 0,
        diamond: 0,
        total: 1,
        select: 1,
    },
    setting: {
        tax: true,
        profit: true,
    },
};

const token = document.querySelector(".token");
const mint = document.querySelector(".mint");
const sell = document.querySelector(".sell");
const sellN = document.querySelector(".sellN");
const profitT = document.querySelector(".profitT");
const profitD = document.querySelector(".profitD");
const totalPercent = document.querySelector(".total-percent");

function setTotal() {
    const crow =
        data.papyrus.select * (data.papyrus.crow * data.papyrus.total) +
        data.morion.select * (data.morion.crow * data.morion.total) +
        data.promote.select * (data.promote.crow * data.promote.total) +
        data.gear.select * (data.gear.crow * data.gear.total) +
        data.tear.select * (data.tear.crow * data.tear.total) +
        data.feather.select * (data.feather.crow * data.feather.total);

    const diamond =
        data.papyrus.select * (data.papyrus.diamond * data.papyrus.total) +
        data.morion.select * (data.morion.diamond * data.morion.total) +
        data.promote.select * (data.promote.diamond * data.promote.total) +
        data.gear.select * (data.gear.diamond * data.gear.total) +
        data.tear.select * (data.tear.diamond * data.tear.total) +
        data.feather.select * (data.feather.diamond * data.feather.total);

    token.textContent = crow.toFixed(2);

    mint.textContent = (crow * 84).toFixed(2);

    sell.textContent = diamond.toFixed(2);

    const n5 = diamond - (diamond * 5) / 100;

    sellN.textContent = n5.toFixed(2);

    profitT.textContent = (n5 / 84 - crow).toFixed(2);

    profitD.textContent = (n5 - crow * 84).toFixed(2);

    const percent = (
        ((n5 - crow * 84).toFixed(2) / (crow * 84).toFixed(2)) *
        100
    ).toFixed(2);

    if (Number(percent) > 0) totalPercent.style.color = "green";
    else totalPercent.style.color = "red";

    percent != "NaN"
        ? (totalPercent.textContent = percent + "%")
        : (totalPercent.textContent = "0%");
}

const resetAll = document.documentElement.querySelector(".reset-all");

resetAll.addEventListener("click", () => {
    localStorage.removeItem("data");

    location.reload();
});

document.addEventListener("input", () => {
    localStorage.setItem("data", JSON.stringify(data));

    setTotal();
});

const items = document.querySelectorAll(".item");

items.forEach((el, i) => {
    if (i === 0) return;
    if (el.id == "crow") return;

    const input1 = el.querySelector(`[data-crow=${el.id}]`);
    const input2 = el.querySelector(`[data-diamond=${el.id}]`);
    const input3 = el.querySelector(`[data-total=${el.id}]`);
    const reset = el.querySelector(`[data-button=${el.id}]`);

    input1.value = data[el.id].crow;
    input2.value = data[el.id].diamond;
    input3.value = data[el.id].total;
    setValue(input1, input2);
    setTotal();
    setPercent(el);

    input1.addEventListener("input", (e) => {
        if (e.target.value == "00") e.target.value = 0;

        setValue(input1, input2);
        setPercent(el);
    });

    input2.addEventListener("input", (e) => {
        if (e.target.value == "00") e.target.value = 0;

        setValue(input1, input2);
        setPercent(el);
    });

    input3.addEventListener("input", (e) => {
        if (e.target.value == "00") e.target.value = 0;

        data[el.id].total = e.target.value;

        setValue(input1, input2);
    });

    reset.addEventListener("click", () => {
        input1.value = 0;
        input2.value = 0;
        input3.value = 1;

        setValue(input1, input2);
        setTotal();
        setPercent(el);

        localStorage.setItem("data", JSON.stringify(data));
    });

    const logo = el.querySelector(".logo");
    const imageLogo = logo.querySelector("img");
    const textLogo = logo.querySelector("p");

    imageLogo.addEventListener("click", () =>
        logoEventHandle(imageLogo, imageLogo)
    );
    textLogo.addEventListener("click", () =>
        logoEventHandle(textLogo, imageLogo)
    );

    if (data[imageLogo.getAttribute("data-img")].select == 0)
        imageLogo.style.borderColor = "#ccc";
});

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
    localStorage.setItem("data", JSON.stringify(data));
    setTotal();
}

function setResult(num1, num2) {
    const crowToken = 84;
    const percent = (num2 * 5) / 100;
    const tax = num2 - percent;
    const result = tax - num1 * crowToken;

    return result.toFixed(2);
}

function setValue(e, e2) {
    const result = document.querySelector(`[data-result=${e.dataset.crow}]`);

    data[e.dataset.crow].crow = Number(e.value);
    data[e2.dataset.diamond].diamond = Number(e2.value);

    const resultNum =
        setResult(data[e.dataset.crow].crow, data[e2.dataset.diamond].diamond) *
        data[e.dataset.crow].total;

    if (resultNum > 0) result.value = "+" + resultNum.toFixed(2);
    else result.value = resultNum.toFixed(2);
}

function setPercent(e) {
    const percent = document.querySelector(`[data-percent=${e.id}]`);
    const text = (
        (setResult(data[e.id].crow, data[e.id].diamond) /
            (data[e.id].crow * 84)) *
        100
    ).toFixed(2);

    if (Number(text) > 0) percent.style.color = "green";
    else percent.style.color = "red";

    percent.textContent = text != "NaN" ? text + "%" : "0%";
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
