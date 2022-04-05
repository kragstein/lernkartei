this.lernkartei = this.lernkartei || {};

this.lernkartei.game = function(retValue) {
  console.log("Willkommen bei meiner Lernkartei!");

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
        -webkit-appearance: none;
  		}
      .play-button {
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
        margin-block-start: 0.3em;
        margin-block-end: 0.3em;
      }
      #tradWord {
        margin-block-end: 1em;
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
        text-align: center;
      }
      .sentence {
        font-size: large;
        padding: 0 5%;
        text-align: center;
      }
      .word-type {
        color: #333;
        font-style: italic;
        font-size: 22px;
        font-style: italic;
        color: darkgrey;
        text-align: center;
      }

      @media (max-height: 600px) {
        .words {
          font-size: normal;

        }
        .wordType {
          font-size: normal;
        }
        .sentence {
          font-size: normal;
        }
        button.play-button {
          line-height: normal;
          padding-top: 1rem;
          padding-bottom: 1rem;
          margin-bottom: 1rem;
          -webkit-appearance: none;
        }
        .play-button {
            font-size: 18px;
        }
        p {

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
    button.icon {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0 4px;
    }
    .hidden {
      display: none;
    }
    .shown {
      display: inline-block;
    }
    </style>
    <header>
      <div id="cards-button" class="icon">
        <game-icon icon="cards"></game-icon>
      </div>
      <div class="title">Lernkartei</div>
      <div>
      <button id="settings-button" class="icon" tabindex="-1">
        <game-icon icon="settings"></game-icon>
      </button>
      </div>
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
          <button id="hard" class="multi play-button">Hard</button>
          <button id="medium" class="multi middle play-button">Medium</button>
          <button id="easy" class="multi play-button">Easy</button>
        </div>
        <button id="nextButton" class="play-button">Next</button>
      </div>
      <full-page></full-page>
    </div>
  `;

  // var wordList = [];
  var wordId = 0;
  var currentWord = void 0;
  var maxWords = 500;
  var startWordLoaded = 0;
  var gameType = "all";

  var mode = "New Words";

  var allWords = {};  // 547 holen,

  var notTriedWords = new Map();
  var hardWord = new Map();
  var mediumWord = new Map();
  var easyWord = new Map();
  var wordStatus = new Map();

  // Word categorisation
  var playCategories = ["all", "noun", "verb", "adj", "adv", "part", "prep",
                        "pron", "conj", "rest"];

  function isMemberCategory(word, category) {
    var wordType = word["type"];
    if (wordType === "all") { return true; }
    if (wordType === category) {
      return true;
    } else if (category === "noun" && isWordNoun(word)) {
      return true;
    }
    if (word["numbered"]) {
      for (const number of word["numbered"]) {
        if (number["type"] === category) {
          return true;
        } else if (category === "noun" && isWordNoun(number)) {
          return true;
        }
      }
    }
    return false;
  }

  function isWordNoun(word) {
    var wordType = word["type"];
    if (wordType.includes("der") ||
        wordType.includes("die") ||
        wordType.includes("das")) {
          return true;
        }
    else return false;
  }

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


          fetch("./words_json/1to1500.json")
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

          this.$nextButton.addEventListener("click", () => {
            rootThis.hideSolution();
            rootThis.getNewWord();
          });

          this.$hardButton.addEventListener("click", () =>
            rootThis.evaluateWord("hard"));
          this.$mediumButton.addEventListener("click", () =>
            rootThis.evaluateWord("medium"));
          this.$easyButton.addEventListener("click", () =>
            rootThis.evaluateWord("easy"));

          this.shadowRoot.getElementById("settings-button").
           addEventListener("click", (function(e) {
             // this will be the settings button here
             rootThis.showSettingsFullPage();
           }));

           this.addEventListener("new-game", function() {
            this.wordsLoaded();
          });
          window.addEventListener("keydown", (function(a) {
            if (!0 !== a.repeat) {
              switch(a.key) {
                case "n":
                  rootThis.hideSolution();
                  rootThis.getNewWord();
                  break;
                case "e":
                  rootThis.evaluateWord("easy")
                  break;
                case "m":
                  rootThis.evaluateWord("medium");
                  break;
                case "h":
                  rootThis.evaluateWord("hard");
                  break;
                case "s":
                  rootThis.$wordBoard.dataset.animation = "flip-in";
                  break;
             }
           }
         }));
        }
      }, {
        key: "showSettingsFullPage",
        value: function () {
          var fullPageDiv = this.shadowRoot.querySelector("full-page");
          var s = document.createElement("p");
          s.setAttribute("id", "settings-title");
          s.innerHTML = "Settings";
          fullPageDiv.appendChild(s);
          var settings = document.createElement("game-settings");
          settings.setAttribute("page", "");
          settings.setAttribute("slot", "content");
          fullPageDiv.appendChild(settings);
          fullPageDiv.setAttribute("open", "");
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
          } else if (hardWord.size > 0 && mode !== "Medium words") {
            wordId = getRandomKey(hardWord);
            maxWords = hardWord.size;
            mode = "Hard words";
            currentWord = hardWord.get(wordId);
          } else if (mediumWord.size > 0 && mode !== "Easy words") {
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
          this.setNewWord();
        }
      }, {
        key: "setNewWord",
        value: function () {
          this.hideSolution();
          this.shadowRoot.querySelector("#guessWord").innerHTML = currentWord["word"];

          this.shadowRoot.querySelector("#wordId").innerHTML = "#" + (wordId);
          this.shadowRoot.querySelector("#mode").innerHTML = mode;
          this.shadowRoot.querySelector("#progression").innerHTML =
            "Tot: " + notTriedWords.size;
          console.log(`Not tried words: ${notTriedWords.size}`)

          Array.from(this.$reportButtons.children).forEach(function (b) {
            b.classList.remove("new-selection");
          });
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
          var index = 0;
          notTriedWords = new Map();
          hardWord = new Map();
          mediumWord = new Map();
          easyWord = new Map();
          wordStatus = new Map();
          if (loadedWordList) {
            allWords = loadedWordList;
          }
          if (gameType === "all") {
            for ([index, word] of allWords.entries()) {
              if (index < startWordLoaded) {
                continue;
              } else if (index < startWordLoaded + maxWords) {
                notTriedWords.set(word["index"], word);
              } else {
                break;
              }
            }
          } else {
            for ([index, word] of allWords.entries()) {
              if (notTriedWords.size >= maxWords) { break; }
              if (isMemberCategory(word, gameType)) {
                notTriedWords.set(word["index"], word);
              }
              if (word["numbered"]) {
                for (const number of word["numbered"]) {
                  if (isMemberCategory(word, gameType)) {
                    notTriedWords.set(word["index"], word);
                  }
                }
              }
            }
            // maxWords = notTriedWords.size;
          }
          this.getNewWord();
        }
      }, {
        key: "showDiv",
        value: function(selector, isShown) {
          if (isShown) {
            this.shadowRoot.querySelector(selector).classList.add("shown");
            this.shadowRoot.querySelector(selector).classList.remove("hidden");
          } else {
            this.shadowRoot.querySelector(selector).classList.add("hidden");
            this.shadowRoot.querySelector(selector).classList.remove("shown");
          }
        }
      }, {
        key: "showSolution",
        value: function() {
          // var wordDict = wordList[wordId];
          // var wordDict = notTriedWords.get(wordId);
          if (currentWord["trad"]) {
            this.shadowRoot.querySelector("#tradWord").innerHTML = currentWord["trad"];
            this.showDiv("#tradWord", true);
          } else {
            this.showDiv("#tradWord", false);
          }
          if (currentWord["type"]) {
            this.shadowRoot.querySelector("#wordType").innerHTML = currentWord["type"];
            this.showDiv("#wordType", true);
          } else {
            this.showDiv("#wordType", false);
          }
          if (currentWord["sentence"]) {
            var sentenceHTML = currentWord["sentence"].split("–");
            this.shadowRoot.querySelector("#sentence").innerHTML = sentenceHTML[0];
            this.shadowRoot.querySelector("#tradSentence").innerHTML = sentenceHTML[1];
            this.showDiv("#sentence", true);
            this.showDiv("#tradSentence", true);
          } else {
            this.showDiv("#sentence", false);
            this.showDiv("#tradSentence", false);
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

  // Settings page content
  var settingsElement = document.createElement("template");
  settingsElement.innerHTML = `
    <style>
      .setting {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #d4d5d9;
        padding: 16px 0;
      }
      .text {
        padding-right: 8px;
        flex-grow: 1;
      }
      section {
        padding: 0 1em 0;
      }
      .title {
        font-size: 24px;
      }
      .description {
        font-size: 16px;
        color: #777b7d;
        margin-top: 12px;
      }
      #footnote {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 16px;
        color: #787c7e;
        font-size: 12px;
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      a, a:visited {
        color: #787c7e;
      }
      button {
        border-radius: 10px;
        border: 0;
        background-color: #DDD;
        -webkit-appearance: none;
      }
      .setting-line {
        display: flex;
        margin-top: 1em;
      }
      .setting-item {
        flex-grow: 1;
        padding: 1em 0 1em;
        margin: 0 1em 0;
      }
      .selected {
        background-color: LightSkyBlue;
      }
    </style>

    <section id="best-results-container">
    </section>

    <section style="">
      <div class="setting" >
        <div class="text">
          <div class="title">Word type</div>
          <div class="description">What type of word do you want to practice?</div>
          <div class="setting-line">
            <button class="setting-item" id="all">All</button>
            <button class="setting-item" id="noun">Nouns</button>
            <button class="setting-item" id="verb">Verbs</button>
            <button class="setting-item" id="adj">Adjectives</button>
          </div>
          <div class="setting-line">
            <button class="setting-item" id="adv">Adverbs</button>
            <button class="setting-item" id="part">Particules</button>
            <button class="setting-item" id="prep">Prepositions</button>
          </div>
          <div class="setting-line">
            <button class="setting-item" id="pron">Pronouns</button>
            <button class="setting-item" id="conj">Conjunctions</button>
            <button class="setting-item" id="rest">Rest</button>
          </div>
        </div>
      </div>
      <div class="setting">
        <div class="text">
          <div class="title">Size</div>
          <div class="description">How many words per game ?</div>
          <div class="setting-line">
            <button class="setting-item" id="w50">50</button>
            <button class="setting-item" id="w100">100</button>
            <button class="setting-item" id="w200">200</button>
            <button class="setting-item" id="w500">500</button>
            <button class="setting-item" id="w1000">1000</button>
          </div>
        </div>
      </div>
    </section>
    <section style="margin-bottom: 16px;">
      <div class="setting">
        <div class="text">
          <div class="title">More ?</div>
        </div>
        <div class="control"><a href="./">Link</a></div>
      </div>
    </section>

    <div id="footnote">
      <div>Lenrkartei 2022</div>
      <div id="puzzle-number">#0</div>
    </div>
  `;
  var settings = function(htmlElement) {
  setPrototype(returnFunction, htmlElement);
  var element = constructElement(returnFunction);

  function returnFunction() {
    var e;
    isInstanceOf(this, returnFunction);
    (e = element.call(this)).attachShadow({ mode: "open" });
    return e;
  }

  addKeyFunction(returnFunction , [{
    key: "connectedCallback",
    value: function() {
      var lThis = this;
      this.shadowRoot.appendChild(settingsElement.content.cloneNode(!0));

      var settingsButtons = this.shadowRoot.querySelectorAll("button");

      settingsButtons.forEach(function(button, i) {
        button.addEventListener("click", function () {
          var b = this;
          var count = b.id.substring(1);
          // console.log(`Button: ${b.id}`);
          if (parseInt(count, 10)) {
            maxWords = parseInt(count, 10);
            console.log(`maxWords: ${maxWords}`);
          } else {
            gameType = b.id;
            console.log(`GameType: ${gameType}`);
          }
          lThis.render();
        });
      });
      this.render();
    }
  }, {
    key: "disconnectedCallback",
    value: function () {
      this.dispatchEvent(new CustomEvent("new-game",
        { bubbles: !0, composed: !0 }));
    }
  }, {
    key: "render",
    value: function () {
      var settingsButtons = this.shadowRoot.querySelectorAll("button");
        settingsButtons.forEach((item, i) => {
          item.classList.remove("selected");
        });

        if (gameType) {
          var gameTypeDiv = this.shadowRoot.querySelector(
            "#" + gameType);
          gameTypeDiv.classList.add("selected");
        }

        var maxWordsDiv = this.shadowRoot.querySelector(
          "#w" + maxWords);
        maxWordsDiv.classList.add("selected");

        // this.dispatchEvent(new CustomEvent("new-game",
        //   { bubbles: !0, composed: !0 }));
      }
  }]);

    return returnFunction;
  }(SomethingElement(HTMLElement));
  customElements.define("game-settings", settings);

  // Full page menu
  var fullPageElement = document.createElement("template");
    fullPageElement.innerHTML = `
	<style>
		.overlay {
			display: none;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			justify-content: center;
			background-color: white;
			animation: SlideIn 100ms linear;
			z-index: 2000;
		}
		:host([open]) .overlay {
			display: flex;
		}
		.content {
			position: relative;
			color: black;
			padding: 0 32px;
			max-width: var(--game-max-width);
			width: 100%;
			overflow-y: auto;
			height: 100%;
			display: flex;
			flex-direction: column;
		}
		.content-container {
			height: 100%;
		}
		.overlay.closing {
			animation: SlideOut 150ms linear;
		}
		header {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
		}
		h1 {
			font-weight: 700;
			font-size: 16px;
			letter-spacing: 0.5px;
			text-transform: uppercase;
			text-align: center;
			margin-bottom: 10px;
		}
		game-icon {
			position: absolute;
			right: 0;
      top: 10px;
			user-select: none;
			cursor: pointer;
		}
		@media only screen and (min-device-width : 320px)
                       and (max-device-width : 480px) {
			.content {
				max-width: 100%;
				padding: 0;
			}
			game-icon {
				padding: 0 16px;
			}
		}
		@keyframes SlideIn {
			0% {
				transform: translateY(30px);
				opacity: 0;
			}
			100% {
				transform: translateY(0px);
				opacity: 1;
			}
		}
		@keyframes SlideOut {
			0% {
				transform: translateY(0px);
				opacity: 1;
			}
			90% {
				opacity: 0;
			}
			100% {
				opacity: 0;
				transform: translateY(60px);
			}
		}
	</style>
	<div class="overlay">
		<div class="content">
			<header>
				<h1><slot></slot></h1>
				<game-icon icon="close"></game-icon>
			</header>
			<div class="content-container">
				<slot name="content"></slot>
			</div>
		</div>
	</div>`;

  var fullPage = function(htmlElement) {

    setPrototype(returnFunction, htmlElement);
    var element = constructElement(returnFunction);

    function returnFunction() {
      var e;
      isInstanceOf(this, returnFunction);
      (e = element.call(this)).attachShadow({ mode: "open" });
      return e;
    }

    addKeyFunction(returnFunction, [{
      key: "connectedCallback",
      value: function() {
        var e = this;
        this.shadowRoot.appendChild(fullPageElement.content.cloneNode(!0));
				this.shadowRoot.querySelector("game-icon").addEventListener("click",
          function(a) {
            e.shadowRoot.querySelector(".overlay").classList.add("closing");
          });
        this.shadowRoot.addEventListener("animationend",
          function(a) {
            if ("SlideOut" === a.animationName) {
              e.shadowRoot.querySelector(".overlay").classList.remove("closing");
              Array.from(e.childNodes).forEach((function(a) {
                e.removeChild(a);
              }));
              e.removeAttribute("open");
              this.dispatchEvent(new CustomEvent("new-game", {
                bubbles: !0, // bubbles up the DOM tree, to be catched
                composed: !0, // propagates across the shadow DOM to regular DOM
              }));
            }
          });
        }
      }
    ]);
    return returnFunction;
  }(SomethingElement(HTMLElement));
  customElements.define("full-page", fullPage);

  // Icons

  // icons
  var iconSizes = {
    settings: "0 0 48 46",
    close: "0 0 22 22",
    cards: "0 0 350 355",
  };
  var iconPaths = {
    settings: `
    M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756
    c0.473-0.473,0.733-1.104,0.733-1.774 c0-0.669-0.262-1.301-0.733-1.773
    l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815
    C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52
    h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607  c-1.766,0.431-3.38,1.104
    -4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,
    8.205 C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,
    1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501 C1.117,
    18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438
    c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763 c-0.474,0.473-0.734,
    1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,
    0.733,1.772,0.733 s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,
    3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128
    c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869
    -1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735 c0.67,0,1.301
    -0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772
    c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77 c0.92-1.514,1.627-3.179,
    2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,
    44.837,18.443,43.454,18.443z M22.976,30.85c-4.378,0-7.928-3.517-7.928
    -7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85
    C30.906,27.334,27.355,30.85,22.976,30.85z`,
    close: `
    M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42
    1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3
    a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z`,
    cards:`
    M189.994,91.351h84.857c5.522,0,10-4.477,10-10s-4.478-10-10-10h-84.857c
    -5.522,0-10,4.477-10,10 S184.471,91.351,189.994,91.351z M189.994,131.351h
    84.857c5.522,0,10-4.477,10-10s-4.478-10-10-10h-84.857c-5.522,0-10,4.477-10,
    10 S184.471,131.351,189.994,131.351z M324.851,312.702c-5.522,0-10,4.477-10,
    10v10h-277v-10c0-5.523-4.478-10-10-10s-10,4.477-10,10v20c0,5.523,4.478,10,
    10,10h297c5.522,0,10-4.477,10-10v-20C334.851,317.179,330.374,312.702,
    324.851,312.702z M324.851,262.702c-5.522,0-10,4.477-10,10v10h-277v-10c0
    -5.523-4.478-10-10-10s-10,4.477-10,10v20c0,5.523,4.478,10,10,10 h297c5.522,
    0,10-4.477,10-10v-20C334.851,267.179,330.374,262.702,324.851,262.702z
    M324.851,212.702c-5.522,0-10,4.477-10,10v10h-277v-10c0-5.523-4.478-10-10-10
    s-10,4.477-10,10v20c0,5.523,4.478,10,10,10 h297c5.522,0,10-4.477,10-10v-20
    C334.851,217.179,330.374,212.702,324.851,212.702z M77.851,146.351h64c5.522,
    0,10-4.477,10-10s-4.478-10-10-10h-64c-5.522,0-10,4.477-10,10S72.329,146.351
    ,77.851,146.351z M109.851,116.351c16.542,0,30-13.458,30-30s-13.458-30-30-30
    s-30,13.458-30,30S93.309,116.351,109.851,116.351z M109.851,76.351c5.514,0,
    10,4.486,10,10s-4.486,10-10,10s-10-4.486-10-10S104.337,76.351,109.851,
    76.351z M324.851,0h-297c-5.522,0-10,4.477-10,10v182.702c0,5.523,4.478,10,10
    ,10h297c5.522,0,10-4.477,10-10V10 C334.851,4.477,330.374,0,324.851,0z
    M314.851,182.702h-277V20h277V182.702z
    `
  };

  var iconElement = document.createElement("template");
  iconElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24"
         viewBox="0 0 50 50" width="24">
      <path fill=black />
    </svg>
  `;

  var icon = function(htmlElement) {
    setPrototype(returnFunction, htmlElement);
    var element = constructElement(returnFunction);

    function returnFunction() {
      var e;
      isInstanceOf(this, returnFunction);
      (e = element.call(this)).attachShadow({ mode: "open" });
      return e;
    }

    addKeyFunction(returnFunction , [{
      key: "connectedCallback",
      value: function() {
        this.shadowRoot.appendChild(iconElement.content.cloneNode(!0));
        var e = this.getAttribute("icon");
        this.shadowRoot.querySelector("path").setAttribute("d", iconPaths[e]);
        this.shadowRoot.querySelector("svg").setAttribute("viewBox", iconSizes[e]);
      }
    }]);

    return returnFunction;
  }(SomethingElement(HTMLElement));

  customElements.define("game-icon", icon);


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
