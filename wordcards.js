this.wordcards = this.numero || {};

this.wordcards.game = function(retValue) {
  console.log("Welcome to WordCards!");

  var wordList = [];
  var wordId = -1;
  var offset = 1;

  var wordcardsRootElement = document.createElement("template");
  wordcardsRootElement.innerHTML = `
    <style>
      header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        padding: 0 16px;
        height: var(--header-height);
        border-bottom: 1px solid grey;
      }
      header .title {
        font-weight: 700;
        font-size: 37px;
        line-height: 100%;
        letter-spacing: 0.01em;
        text-align: center;
        left: 0;
        right: 0;
        pointer-events: none;
      }
      #game {
        width: 90%;
        max-width: var(--game-max-width);
        margin: 0 auto;
        height: calc(100% - var(--header-height));
        display: flex;
        flex-direction: column;
        padding: 0 16px;
      }
      #buttons {
  			width: 100%;
  			max-width: var(--game-max-width);
  			margin: 0 auto;
  			height: var(--keyboard-height);
  			display: flex;
  			flex-direction: column;

  		}
      button {
        padding-top: 1rem;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        font-size: 25px;
        border-radius: 0px;
        border: none;
        background-color: lightskyblue;
        color: black;
      }
      p {
        margin-block-start: 0;
        margin-block-end: 0.5em;
      }
      #report {
        width: 100%;
        justify-content: space-between;
        display: flex;
      }
      .multi {
        flex-grow: 1;
      }
      .middle {
        margin-right: 10px;
        margin-left: 10px;
      }

      #wordBoard {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        overflow: auto;
        flex-direction: column;
      }
      #numbered {
        width: 100%;
      }
      .words {
        font-size: 30px;
        font-weight: bold;
        margin-block-start: 1.3em;
      }
      .wordType {
        font-size: 30px;
        font-style: italic;
        color: darkgrey;
      }
      .sentence {
        font-size: large;
      }
      .word-type {
        color: darkgrey;
        font-style: italic;
      }

      @media (max-height: 600px) {
        .words {
          font-size: medium;
          line-height: 2.5em;
        }
        .sentence {
          font-size: medium;
          line-height: 2.0em;
        }
        button {
          font-size: medium;
          line-height: normal;
        }
        p {
          margin-block-end: 0em;
        }
      }
      .tile[data-animation='flip-in'] {
        animation-name: FlipIn;
        animation-duration: 256ms;
        animation-timing-function: ease-in;
      }
      @keyframes FlipIn {
        0% { transform: rotateY(0); }
        100% { transform: rotateY(-90deg); }
      }
      .tile[data-animation='flip-out'] {
      animation-name: FlipOut;
      animation-duration: 256ms;
      animation-timing-function: ease-in;
    }
    @keyframes FlipOut {
      0% { transform: rotateY(-90deg); }
      100% { transform: rotateY(0);}
    }
    #wordId {
        position: absolute;
        top: var(--header-height);
        right: 0;
        padding: 16px;
        color: #787c7e;
        font-size: 12px;
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
    </style>
    <header>
      <div></div>
      <div class="title">WordCards</div>
      <div></div>
    </header>
    <div id="game">
      <div id="wordId">#11</div>
      <div id="wordBoard" class="tile">
        <p id="guessWord"class="words"></p>
        <p id="wordType" class="word-type"></p>
        <p id="tradWord" class="words"></p>
        <p id="type"></p>
        <div id="sentence" class="sentence"></div>
        <div id="numbered">
          <div id="number1">
            <p id="trad1" class="words"></p>
            <p id="type1"class="word-type"></p>
            <p id="sentence1" class="sentence"></p>
          </div>
          <div id="number2"></div>
            <p id="trad2" class="words"></p>
            <p id="type2" class="word-type"></p>
            <p id="sentence2" class="sentence"></p>
          <div id="number3">
            <p id="trad3" class="words"></p>
            <p id="type3" class="word-type"></p>
            <p id="sentence3" class="sentence"></p>
          </div>
        </div>
      </div>
      <div id="buttons">
        <div id="report">
          <button class="multi">Hard</button>
          <button class="multi middle">Medium</button>
          <button class="multi">Easy</button>
        </div>
        <button id="showButton">Show</button>
        <button id="nextButton">Next</button>
      </div>
    </div>
  `;

  var wordcardsRoot = function (htmlElement) {
    setPrototype(returnFunction, htmlElement);
    var element = constructElement(returnFunction);

    function returnFunction() {
      var e;
      isInstanceOf(this, returnFunction);
      (e = element.call(this)).attachShadow({ mode: "open" });
      return e;
    }



    addKeyFunction(returnFunction , [
      {
        key: "getNewWord",
        value: function () {
          wordId = wordId + 1;
          // wordId = Math.floor(Math.random() * wordList.length);
          // wordId = 1;
          var wordDict = wordList[wordId];
          console.log(wordId.toString() + "th word: " + wordDict["word"]);
          this.shadowRoot.querySelector("#guessWord").innerHTML = wordDict["word"];
          this.shadowRoot.querySelector("#sentence").innerHTML = "";
          this.shadowRoot.querySelector("#wordId").innerHTML = "#" + (wordId + offset);
        }
      }, {
        key: "connectedCallback",
        value: function () {
          var rootThis = this;

          offset = 1;
          this.shadowRoot.appendChild(wordcardsRootElement.content.cloneNode(!0));
          fetch("./output1to500.json")
            .then(response => { return response.json(); })
            .then(responseJSON => {this.wordsLoaded(responseJSON); });


          this.shadowRoot.querySelector("#showButton").addEventListener("click",
            function() {
              // rootThis.getNewWord();
              var board = rootThis.shadowRoot.querySelector("#wordBoard");
              board.dataset.animation = "flip-in";
              board.addEventListener("animationend", function(a) {
                console.log("Animation ended " + a.animationName);
                if (a.animationName === "FlipIn") {
                  rootThis.showSolution();
                  board.dataset.animation = "flip-out";
                } else if (a.animationName === "FlipOut") {

                }
              });
          });

          this.shadowRoot.querySelector("#nextButton").addEventListener("click",
            function() {
              rootThis.hideSolution();
              rootThis.getNewWord();
            });
        }
      }, {
        key: "showSolution",
        value: function() {
          var wordDict = wordList[wordId];
          if (wordDict["trad"]) {
            this.shadowRoot.querySelector("#tradWord").innerHTML = wordDict["trad"];
          }
          if (wordDict["type"]) {
            this.shadowRoot.querySelector("#wordType").innerHTML = wordDict["type"];
          }
          if (wordDict["sentence"]) {
            var sentenceHTML = wordDict["sentence"].split("–");
            this.shadowRoot.querySelector("#sentence").innerHTML =
            "<p>" + sentenceHTML[0] + "</p>" +
            "<p>" + sentenceHTML[1] + "</p>";
          }
          if (wordDict["numbered"]) {
            for (const [i, v] of wordDict["numbered"].entries()) {
              console.log("index: " + i + ", value: " + v["sentence"]);
              this.shadowRoot.querySelector("#trad" + (i + 1)).innerHTML = (i+1) + ". " + v["trad"];
              this.shadowRoot.querySelector("#type" + (i + 1)).innerHTML = v["type"];
              var sentenceHTML = v["sentence"].split("–");
              this.shadowRoot.querySelector("#sentence" + (i + 1)).innerHTML =
              "<p>" + sentenceHTML[0] + "</p>" +
              "<p>" + sentenceHTML[1] + "</p>";
            }
          }
        }
      }, {
        key: "hideSolution",
        value: function () {
          this.shadowRoot.querySelector("#tradWord").innerHTML = "";
          this.shadowRoot.querySelector("#sentence").innerHTML = "";
          this.shadowRoot.querySelector("#wordType").innerHTML = "";

          for (var i = 0; i < 3; i++) {
            this.shadowRoot.querySelector("#trad" + (i + 1)).innerHTML = "";
            this.shadowRoot.querySelector("#type" + (i + 1)).innerHTML = "";
            this.shadowRoot.querySelector("#sentence" + (i + 1)).innerHTML = "";
          }
        }
      }, {
        key: "wordsLoaded",
        value: function (loadedWordList) {
          wordList = loadedWordList;
          this.getNewWord();
        }
      }
    ]);

    return returnFunction;
  }(SomethingElement(HTMLElement));


  customElements.define("word-cards", wordcardsRoot);


  // Function magic to make new tags

  function addKeyFunction(e, a, s) {
    return a && addDictToElement(e.prototype, a),
    s && addDictToElement(e, s), e;
  }

  function addDictToElement(elementToBuild, functionDict) {
    for (var s = 0; s < functionDict.length; s++) {
      var t = functionDict[s];
      t.enumerable = t.enumerable || !1,
      t.configurable = !0,
      "value" in t && (t.writable = !0),
      Object.defineProperty(elementToBuild, t.key, t)
    }
  }

  function addKeyValueToDict(e /* dict */, a /* string */, s /* integer */) {
        return a in e ? Object.defineProperty(e, a, {
            value: s,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[a] = s, e
    }

  function NotInitializedError(e) {
    if (void 0 === e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called");
    return e;
  }

  function isReflectAvailable() {
    if ("undefined" == typeof Reflect || !Reflect.construct) {
      // Only undefined in Internet explorer
      // https://developer.mozilla.org/en-US/docs/
      // Web/JavaScript/Reference/Global_Objects/Reflect
      return !1; // false
    }
    if (Reflect.construct.sham) {
      return !1; // false
    }

    if ("function" == typeof Proxy) return !0; // True

    try {
      return Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], (function() {}))), !0
    } catch (e) {
      return !1 // False
    }
  }

  function set__proto__(returnFunction, htmlElement) {
    return function (returnFunction, htmlElement) {
      return returnFunction.__proto__ = htmlElement, returnFunction;
    }(returnFunction, htmlElement);
  }

  function setPrototype(returnFunction, htmlElement) {
    if ("function" != typeof htmlElement && null !== htmlElement)
    throw new TypeError("Super expression must either be null or a function");

    returnFunction.prototype = Object.create(htmlElement.prototype, {
      constructor: {
        value: returnFunction,
        writable: !0, // true
        configurable: !0 // true
      }
    });
    set__proto__(returnFunction, htmlElement)
  }

  function ReflectConstructApply(e, a, s) {
    var res = Reflect.construct.apply(null, arguments);
    return res;
  }

  function isInstanceOf(e, a) {
    if (!(e instanceof a))
    throw new TypeError("Cannot call a class as a function")
  }

  function getPrototypeOf(returnFunction) {
    if (Object.setPrototypeOf) {
      return Object.getPrototypeOf (returnFunction);
    } else {
      return function(returnFunction) {
        return returnFunction.__proto__ || Object.getPrototypeOf(returnFunction);
      } (returnFunction);
    }
  }

  function constructElement(returnFunction) {
    return function() {
      var htmlElement;
      addDictToElement = getPrototypeOf(returnFunction);
      if (isReflectAvailable()) {
        var n = getPrototypeOf(this).constructor;
        htmlElement = Reflect.construct(
          addDictToElement, /* target */
          arguments, /* argument list */
          n /* new target, constructor whose prototype is going to be used */ )
      } else htmlElement = addDictToElement.apply(this, arguments);

      isInitialized(this, htmlElement)
      return htmlElement;
    }
  }

  function isInitialized(e, a) {
    var result = (!a || "object" != typeof a && "function" != typeof a ? NotInitializedError(e) : a);
    return result;
  }

  function SomethingElement(e) {
    var returnElement = function (htmlElement) {
      function t() {
        return ReflectConstructApply(
          htmlElement, arguments, getPrototypeOf(this).constructor);
        }
        t.prototype = Object.create(htmlElement.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })
        return set__proto__(t, e);
    }(e);
    return returnElement;
  }

  return retValue;

}({});
