import "./css/index.css";
import IMask from "imask";

const ccLogo = document.querySelector(".cc-logo span:last-child img");
const background = document.querySelector(".cc");

const cardNumber = document.querySelector("form #card-number");
const cardHolder = document.querySelector("form #card-holder");
const expirationDate = document.querySelector("form #expiration-date");
const securityCode = document.querySelector("form #security-code");

const addButton = document.querySelector("form .button");
const modal = document.querySelector(".overlay-modal");
const modalButton = document.querySelector(".overlay-modal button");
const error = document.querySelector(".error");

function setCardType(type) {
  const colors = {
    visa: {
      background: "url('./bg-visa.svg')",
    },
    mastercard4: {
      background: "url('./bg-mastercard.svg')",
    },
    jcb: {
      background: "url('./bg-jcb.svg')",
    },
    elo: {
      background: "url('./bg-elo.svg')",
    },
    amex: {
      background: "url('./bg-amex.svg')",
    },
    aura: {
      background: "url('./bg-aura.svg')",
    },
    banese: {
      background: "url('./bg-amex.svg')",
    },
    cabal: {
      background: "url('./bg-amex.svg')",
    },
    diners: {
      background: "url('./bg-amex.svg')",
    },
    discover: {
      background: "url('./bg-aura.svg')",
    },
    fortbrasil: {
      background: "url('./bg-amex.svg')",
    },
    grandcard: {
      background: "url('./bg-amex.svg')",
    },
    hipercard: {
      background: "url('./bg-amex.svg')",
    },
    personalcard: {
      background: "url('./bg-amex.svg')",
    },
    sorocred: {
      background: "url('./bg-amex.svg')",
    },
    valecard: {
      background: "url('./bg-amex.svg')",
    },
    default: {
      background: "url('./bg-default2.svg')",
    },
  };

  background.style.backgroundImage = colors[type].background;
  ccLogo.setAttribute("src", `./cc-${type}.svg`);
}

//number mask
// learned how to mask something in a way that makes IMask work better and to solve bugs//
const cardNumberMasked = IMask(cardNumber, {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|22[2-9]\d|^2[3-7]\d{0,2}\d{0,12})/,
      cardtype: "mastercard4",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^6\d{0,15}/,
      cardtype: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^1\d{0,15}/,
      cardtype: "jcb",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^3[47]\d{13,14}$/,
      cardtype: "amex",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^((?!504175))^((?!5067))(^50[0-9])/,
      cardtype: "aura",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^636117/,
      cardtype: "banese",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(60420[1-9]|6042[1-9][0-9]|6043[0-9]{2}|604400)/,
      cardtype: "cabal",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(36[0-8][0-9]{3}|369[0-8][0-9]{2}|3699[0-8][0-9]|36999[0-9])/,
      cardtype: "diners",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^6(?:011|5[0-9]{2})[0-9]{12}/,
      cardtype: "discover",
    },
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
      cardtype: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],

  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");
    const foundMask = dynamicMasked.compiledMasks.find((item) => {
      return number.match(item.regex);
    });
    return foundMask;
  },
});

//holder masked//
//learnt how to mask letters only
const cardHolderMasked = IMask(cardHolder, { mask: /[a-zA-Z\s]$/ });

//expiration date
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: Number(new Date().getUTCFullYear().toString().slice(2)),
      to: Number(new Date().getUTCFullYear().toString().slice(2)) + 10,
    },

    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
};

const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

//security code
const securityCodePattern = {
  mask: "0000",
};
const securityCodeMasked = IMask(securityCode, securityCodePattern);

//clean visual patterns
const inputsArray = [
  cardNumberMasked,
  cardHolderMasked,
  expirationDateMasked,
  securityCodeMasked,
];

function cleanInputs() {
  cardHolderMasked.value = "";
  cardNumberMasked.value = "";
  expirationDateMasked.value = "";
  securityCodeMasked.value = "";
}

//mexer aqui para corrigir a deficiência de correção de erros de digitação (não aparecer o campo e o erro)
addButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !cardHolderMasked.value ||
    !cardNumberMasked.value ||
    !expirationDateMasked.value ||
    !securityCodeMasked.value
  ) {
  } else {
    modal.classList.add("active");
    modal.addEventListener("click", (event) => {
      if (event.currentTarget === event.target) {
        modal.classList.remove("active");
        cleanInputs();
      }
    });
  }

  modalButton.addEventListener("click", () => {
    modal.classList.remove("active");
    cleanInputs();
  });

  inputsArray.forEach((item) => {
    if (item.value === "") {
      item.el.input.classList.add("invalid");
      item.el.input.classList.add("title");
      let title = document.querySelector(".title");
      title = "Campo requer preenchimento.";
      error.classList.add("active");
    } else {
      error.classList.remove("active");
      item.el.input.classList.remove("invalid");
      item.el.input.classList.add("title");
    }
  });
});

//document.querySelector("form").addEventListener("submit", (event) => {
//event.preventDefault()
//})

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype;
  setCardType(cardType);
  console.log(cardType);
  updateCardNumber(cardNumberMasked.value);
});

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number");
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number;
}

cardHolderMasked.on("accept", translateCardHolder);

function translateCardHolder() {
  const ccHolder = document.querySelector(".cc-holder .value");
  const check1 = document.querySelector("#defaultPt.selected");
  const check2 = document.querySelector("#defaultEn.selected");

  if (check1) {
    ccHolder.innerText =
      cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value;
  } else if (check2) {
    ccHolder.innerText =
      cardHolder.value.length === 0 ? "JAMES SMITH" : cardHolder.value;
  }
}

expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value);
});

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-expiration .value");
  ccExpiration.innerText = date.length === 0 ? "02/32" : date;
}

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value);
});

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value");
  ccSecurity.innerText = code.length === 0 ? "123" : code;
}

//language change

const languageButton = document.querySelector("#app header label:nth-child(3)");
const languageButton2 = document.querySelector("#app label:nth-child(4)");
const selectEnglish = document.querySelectorAll('div span[lang="en"]');
const selectPortuguese = document.querySelectorAll('div span[lang="pt-BR"]');
translate(selectPortuguese, selectEnglish);
languageButton.addEventListener("click", (event) => {
  event.preventDefault();
  translate(selectEnglish, selectPortuguese);
});

languageButton2.addEventListener("click", (event) => {
  event.preventDefault();
  translate(selectPortuguese, selectEnglish);
});

function translate(language, language2) {
  for (let i = 0; i < language.length; i++) {
    const element = language[i].classList;
    element.add("selected");
    const element2 = language2[i].classList;
    element2.remove("selected");
  }

  const check1 = document.querySelector("#defaultPt.selected");
  const check2 = document.querySelector("#defaultEn.selected");
  const cardHolder = document.querySelector("#holdervalue");

  if (cardHolder.innerText === "FULANO DA SILVA" && check2) {
    cardHolder.innerText = "JAMES SMITH";
  } else if (cardHolder.innerText === "JAMES SMITH" && check1) {
    cardHolder.innerText = "FULANO DA SILVA";
  } else if (cardHolder.innertext) {
    cardHolder.innertext = cardHolder;
  }
}

const redesButton = document.querySelector(".redes");

window.addEventListener("load", () => {
  redesButton.classList.add("active");
});

redesButton.addEventListener("animationend", () => {
  redesButton.classList.remove("active");
});
