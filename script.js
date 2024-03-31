const data = JSON.parse(localStorage.getItem("data")) || {
    papyrus: {
        crow: 0,
        diamond: 0,
        total: 1,
    },
    morion: {
        crow: 0,
        diamond: 0,
        total: 1,
    },
    promote: {
        crow: 0,
        diamond: 0,
        total: 1,
    },
    gear: {
        crow: 0,
        diamond: 0,
        total: 1,
    },
    tear: {
        crow: 0,
        diamond: 0,
        total: 1,
    },
    feather: {
        crow: 0,
        diamond: 0,
        total: 1,
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

function setTotal() {
    const crow =
        data.papyrus.crow * data.papyrus.total +
        data.morion.crow * data.morion.total +
        data.promote.crow * data.morion.total +
        data.gear.crow * data.gear.total +
        data.tear.crow * data.tear.total +
        data.feather.crow * data.feather.total;

    const diamond =
        data.papyrus.diamond * data.papyrus.total +
        data.morion.diamond * data.morion.total +
        data.promote.diamond * data.morion.total +
        data.gear.diamond * data.gear.total +
        data.tear.diamond * data.tear.total +
        data.feather.diamond * data.feather.total;

    token.textContent = crow.toFixed(2);

    mint.textContent = (crow * 84).toFixed(2);

    sell.textContent = diamond.toFixed(2);

    const n5 = diamond - (diamond * 5) / 100;

    sellN.textContent = n5.toFixed(2);

    profitT.textContent = (n5 / 84 - crow).toFixed(2);

    profitD.textContent = (n5 - crow * 84).toFixed(2);
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

items.forEach((e, i) => {
    if (i === 0) return;
    if (e.id == "crow") return;

    const input1 = e.querySelector(`[data-crow=${e.id}]`);
    const input2 = e.querySelector(`[data-diamond=${e.id}]`);
    const input3 = e.querySelector(`[data-total=${e.id}]`);
    const reset = e.querySelector(`[data-button=${e.id}]`);

    input1.value = data[input1.dataset.crow].crow;
    input2.value = data[input2.dataset.diamond].diamond;
    input3.value = data[input3.dataset.total].total;
    setValue(input1, input2);
    setTotal();

    input1.addEventListener("input", (e) => {
        if (e.target.value == "00") e.target.value = 0;

        setValue(input1, input2);
    });

    input2.addEventListener("input", (e) => {
        if (e.target.value == "00") e.target.value = 0;

        setValue(input1, input2);
    });

    input3.addEventListener("input", (e) => {
        if (e.target.value == "00") e.target.value = 0;

        data[input3.dataset.total].total = e.target.value;

        setValue(input1, input2);
    });

    reset.addEventListener("click", () => {
        input1.value = 0;
        input2.value = 0;
        input3.value = 1;

        setValue(input1, input2);
        setTotal();

        localStorage.setItem("data", JSON.stringify(data));
    });
});

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
