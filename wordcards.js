this.wordcards = this.numero || {};

this.wordcards.game = function(retValue) {
  console.log("Welcome to WordCards!");

  var wordList = [];
  var wordId = 0;  

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
        width: 100%;
        max-width: var(--game-max-width);
        margin: 0 auto;
        height: calc(100% - var(--header-height));
        display: flex;
        flex-direction: column;
        font-
      }
      #buttons {
  			width: 100%;
  			max-width: var(--game-max-width);
  			margin: 0 auto;
  			height: var(--keyboard-height);
  			display: flex;
  			flex-direction: column;
        font-size: 1.2em;

  		}
      button {
        padding-top: 1rem;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        font-size: x-large;
        border-radius: 0px;
        border: none;
        background-color: lightskyblue;
      }
      #wordBoard {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        overflow: hidden;
        flex-direction: column;
      }
      .tile {
        font-size: xx-large;
      }
      .tile[data-animation='flip-in'] {
        animation-name: FlipIn;
        animation-duration: 512ms;
        animation-timing-function: ease-in;
      }
      @keyframes FlipIn {
        0% { transform: rotateY(0); }
        100% { transform: rotateY(-90deg); }
      }
      .tile[data-animation='flip-out'] {
      animation-name: FlipOut;
      animation-duration: 250ms;
      animation-timing-function: ease-in;
    }
    @keyframes FlipOut {
      0% { transform: rotateY(-90deg); }
      100% { transform: rotateY(0);}
    }
    </style>
    <header>
      <div></div>
      <div class="title">WordCards</div>
      <div></div>
    </header>
    <div id="game">
      <div id="wordBoard" class="tile">
        <p id="guessWord"></p>
        <p id="rest"></p>
      </div>
      <div id="buttons">
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
        key: "connectedCallback",
        value: function () {
          var lThis = this;

          this.shadowRoot.appendChild(wordcardsRootElement.content.cloneNode(!0));
          fetch("./output.json")
            .then(response => { return response.json(); })
            .then(responseJSON => {this.wordsLoaded(responseJSON); });


          this.shadowRoot.querySelector("#showButton").addEventListener("click",
            function() {
              // lThis.getNewWord();
              var board = lThis.shadowRoot.querySelector("#wordBoard");
              board.dataset.animation = "flip-in";
              board.addEventListener("animationend", function(a) {
                console.log("Animation ended " + a.animationName);
                if (a.animationName === "FlipIn") {
                  var wordDict = wordList[wordId];
                  lThis.shadowRoot.querySelector("#guessWord").innerHTML = wordDict["trad"];
                  lThis.shadowRoot.querySelector("#rest").innerHTML = wordDict["sentence"]
                  board.dataset.animation = "flip-out";
                } else if (a.animationName === "FlipOut") {

                }
              });
          });

          this.shadowRoot.querySelector("#nextButton").addEventListener("click",
            function() {
              lThis.getNewWord();
            });
        }
      }, {
        key: "getNewWord",
        value: function () {
          wordId = Math.floor(Math.random() * wordList.length);
          var wordDict = wordList[wordId];
          console.log(wordId.toString() + "th word: " + wordDict["word"]);
          this.shadowRoot.querySelector("#guessWord").innerHTML = wordDict["word"];
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
