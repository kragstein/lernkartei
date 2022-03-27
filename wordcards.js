this.wordcards = this.wordcards || {};

this.wordcards.game = function(retValue) {
  console.log("Welcome to WordCards!");

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
        background-color: #D4E2EB;
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
        background-color: #F2EECB;
        margin: 30px 0;
        border-radius: 20px;
      }
      #numbered {
        width: 95%;
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
        padding: 0 5%;
      }
      .word-type {
        color: darkgrey;
        font-style: italic;
      }

      @media (max-height: 600px) {
        #wordBoard {
          line-height: 2em;
          padding: 10x;
        }
        .words {
          font-size: normal;
          margin-block-start: 0em;
        }
        .wordType {
          font-size: normal;
        }
        .sentence {
          font-size: normal;
        }
        button {
          font-size: medium;
          line-height: normal;
          padding-top: 1rem;
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        }
        p {
          margin-block-start: 0em;
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
      padding: 8px;
      color: #787c7e;
      font-size: 12px;
    }
    #progression {
      position: absolute;
      top: var(--header-height);
      left: 0;
      padding: 8px;
      color: #787c7e;
      font-size: 12px;
    }
    #mode {
      position: absolute;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      width: 14ex;
      top: var(--header-height);
      padding: 8px;
      color: #787c7e;
      font-size: 12px;
    }
    .old-selection {
      background-color: lightsteelblue;
    }
    .new-selection {
      background-color: deepskyblue;
    }
    </style>
    <header>
      <div></div>
      <div class="title">WordCards</div>
      <div></div>
    </header>
    <div id="game">
      <div id="progression">1/20</div>
      <div id="mode">New Words</div>
      <div id="wordId">#-1</div>
      <div id="wordBoard" class="tile">
        <p id="guessWord"class="words"></p>
        <p id="wordType" class="word-type"></p>
        <p id="tradWord" class="words"></p>
        <p id="sentence" class="sentence"></p>
        <p id="tradSentence" class="sentence"></p>
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
          <button id="hard" class="multi">Hard</button>
          <button id="medium" class="multi middle">Medium</button>
          <button id="easy" class="multi">Easy</button>
        </div>
        <button id="nextButton">Next</button>
      </div>
    </div>
  `;

  // var wordList = [];
  var wordId = 0;
  var offset = 0;
  var currentWord = void 0;
  var maxWords = 10;
  var startWordLoaded = 150;
  var gameType = "";

  var mode = "New Words";

  var notTriedWords = new Map();
  var hardWord = new Map();
  var mediumWord = new Map();
  var easyWord = new Map();
  var wordStatus = new Map();

  function getRandomKey(collection) {
    let index = Math.floor(Math.random() * collection.size);
    let cntr = 0;
    for (let key of collection.keys()) {
      if (cntr++ === index) {
        return key;
      }
    }
  }

  var wordcardsRoot = function (htmlElement) {
    setPrototype(returnFunction, htmlElement);
    var element = constructElement(returnFunction);

    function returnFunction() {
      var e;
      isInstanceOf(this, returnFunction);
      (e = element.call(this)).attachShadow({ mode: "open" });

      addKeyValueToDict(NotInitializedError(e), "$easyButton", 0);
      addKeyValueToDict(NotInitializedError(e), "$mediumButton", 0);
      addKeyValueToDict(NotInitializedError(e), "$hardButton", 0);
      addKeyValueToDict(NotInitializedError(e), "$wordBoard", 0);
      addKeyValueToDict(NotInitializedError(e), "$nextButton", 0);
      addKeyValueToDict(NotInitializedError(e), "$reportButtons", 0);
      return e;
    }

    addKeyFunction(returnFunction , [
      {
        key: "connectedCallback",
        value: function () {
          // Keep a reference to the root this, to call from callbacks
          var rootThis = this;
          // Add the wordcardsRoot
          this.shadowRoot.appendChild(wordcardsRootElement.content.cloneNode(!0));

          this.$easyButton = this.shadowRoot.querySelector("#easy");
          this.$mediumButton = this.shadowRoot.querySelector("#medium");
          this.$hardButton = this.shadowRoot.querySelector("#hard");
          this.$wordBoard = rootThis.shadowRoot.querySelector("#wordBoard");
          this.$nextButton = this.shadowRoot.querySelector("#nextButton");
          this.$reportButtons = this.shadowRoot.querySelector("#report");


          offset = 1;

          fetch("./output1to500.json")
            .then(response => { return response.json(); })
            .then(responseJSON => {
              this.wordsLoaded(responseJSON);
            }
          );


          this.$wordBoard.dataset.state = "guess";

          this.$wordBoard.addEventListener("animationend", function(a) {
            if (a.animationName === "FlipIn") {
              if (rootThis.$wordBoard.dataset.state === "guess") {
                rootThis.showSolution();
                rootThis.$wordBoard.dataset.state = "solution";
                rootThis.$wordBoard.dataset.animation = "flip-out";
              } else if (rootThis.$wordBoard.dataset.state === "solution") {
                rootThis.hideSolution();
                rootThis.$wordBoard.dataset.state = "guess";
                rootThis.$wordBoard.dataset.animation = "flip-out";
              }
            } else if (a.animationName === "FlipOut") {

            }
          });

          this.$wordBoard.addEventListener("click", function() {
            this.dataset.animation = "flip-in";
          });

          this.$nextButton.addEventListener("click",
            function() {
              rootThis.hideSolution();
              rootThis.getNewWord();
            });

          this.$hardButton.addEventListener("click",
            function() {
              rootThis.evaluateWord("hard");
          });
          this.$mediumButton.addEventListener("click",
            function() {
              rootThis.evaluateWord("medium");
          });
          this.$easyButton.addEventListener("click",
            function() {
              rootThis.evaluateWord("easy");
          });
        }
      }, {
        key: "getNewWord",
        value: function () {
          if (notTriedWords.size > 0) {
            // wordId = wordId + 1;
            // wordId = Math.floor(Math.random() * wordList.length);
            // wordId = 1;
            wordId = getRandomKey(notTriedWords);
            currentWord = notTriedWords.get(wordId);
          } else if (hardWord.size > 0) {
            wordId = getRandomKey(hardWord);
            maxWords = hardWord.size;
            mode = "Hard words";
            currentWord = hardWord.get(wordId);
          } else if (mediumWord.size > 0) {
            wordId = getRandomKey(mediumWord);
            maxWords = mediumWord.size;
            mode = "Medium words";
            currentWord = mediumWord.get(wordId);
          } else if (easyWord.size > 0) {
            wordId = getRandomKey(easyWord);
            maxWords = easyWord.size;
            mode = "Easy words";
            currentWord = easyWord.get(wordId);
          }

          Array.from(this.$reportButtons.children).forEach(function (b) {
            b.classList.remove("new-selection");
          });

          this.shadowRoot.querySelector("#guessWord").innerHTML = currentWord["word"];
          this.shadowRoot.querySelector("#sentence").innerHTML = "";
          this.shadowRoot.querySelector("#tradSentence").innerHTML = "";
          this.shadowRoot.querySelector("#wordId").innerHTML = "#" + (wordId);
          this.shadowRoot.querySelector("#mode").innerHTML = mode;
          this.shadowRoot.querySelector("#progression").innerHTML =
            (maxWords - notTriedWords.size) + "/" + maxWords;

          if (wordStatus.has(wordId)) {
            Array.from(this.$reportButtons.children).forEach(function (b) {
              b.classList.remove("old-selection");
            });
            this.shadowRoot.querySelector("#" + wordStatus.get(wordId)).classList.add("old-selection");
          }

          this.$wordBoard.dataset.state = "guess";
        }
      }, {
        key: "evaluateWord",
        value: function(difficulty) {

          if (mode === "Hard words") {
            hardWord.delete(wordId);
          } else if (mode === "Medium words") {
            mediumWord.delete(wordId);
          } else if (mode === "Easy words") {
            easyWord.delete(wordId);
          } else {
            notTriedWords.delete(wordId);
          }

          Array.from(this.$reportButtons.children).forEach(function (b) {
            b.classList.remove("new-selection");
          });

          if (difficulty === "easy") {
            this.$easyButton.classList.add("new-selection");
            wordStatus.set(wordId, "easy");
            easyWord.set(wordId, currentWord);
          } else if (difficulty === "medium") {
            this.$mediumButton.classList.add("new-selection");
            wordStatus.set(wordId, "medium");
            mediumWord.set(wordId, currentWord);
          } else if (difficulty === "hard") {
            this.$hardButton.classList.add("new-selection");
            wordStatus.set(wordId, "hard");
            hardWord.set(wordId, currentWord);
          }
        }
      }, {
        key: "wordsLoaded",
        value: function (loadedWordList) {
          if (!gameType) {
            for ([index, word] of loadedWordList.entries()) {
              if (index < startWordLoaded) {
                continue;
              } else if (index < startWordLoaded + maxWords) {
                notTriedWords.set(word["index"], word);
              } else {
                break;
              }
            }
          } else {
            for ([index, word] of loadedWordList.entries()) {
              if (word["type"] === gameType) {
                notTriedWords.set(word["index"], word);
              }
              if (word["numbered"]) {
                for (const number of word["numbered"]) {
                  if (number["type"] === gameType) {
                    notTriedWords.set(word["index"], word);
                  }
                }
              }
            }
            maxWords = notTriedWords.size;
          }
          this.getNewWord();
        }
      }, {
        key: "showSolution",
        value: function() {
          // var wordDict = wordList[wordId];
          // var wordDict = notTriedWords.get(wordId);
          if (currentWord["trad"]) {
            this.shadowRoot.querySelector("#tradWord").innerHTML = currentWord["trad"];
          }
          if (currentWord["type"]) {
            this.shadowRoot.querySelector("#wordType").innerHTML = currentWord["type"];
          }
          if (currentWord["sentence"]) {
            var sentenceHTML = currentWord["sentence"].split("–");
            this.shadowRoot.querySelector("#sentence").innerHTML = sentenceHTML[0];
            this.shadowRoot.querySelector("#tradSentence").innerHTML = sentenceHTML[1];
          }
          if (currentWord["numbered"]) {
            for (const [i, v] of currentWord["numbered"].entries()) {
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
          this.shadowRoot.querySelector("#tradSentence").innerHTML = "";
          this.shadowRoot.querySelector("#wordType").innerHTML = "";

          for (var i = 0; i < 3; i++) {
            this.shadowRoot.querySelector("#trad" + (i + 1)).innerHTML = "";
            this.shadowRoot.querySelector("#type" + (i + 1)).innerHTML = "";
            this.shadowRoot.querySelector("#sentence" + (i + 1)).innerHTML = "";
          }
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

  // retValue.wordList = wordList;
  retValue.notTriedWords = notTriedWords;
  retValue.easyWord = easyWord;
  retValue.mediumWord = mediumWord;
  retValue.hardWord = hardWord;
  return retValue;

}({});
