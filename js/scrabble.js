var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

//slots
var scrabbleBoard = {};
scrabbleBoard.slots = [];
scrabbleBoard.slots[0] = [];
scrabbleBoard.slots[0][0] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "Scrabble_Board_Blank.png"};
scrabbleBoard.slots[0][1] = { "letterMultiplier": 2, "wordMultiplier": 1, "image": "Scrabble_Board_DL.png"};
scrabbleBoard.slots[0][2] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "Scrabble_Board_Blank.png"};
scrabbleBoard.slots[0][3] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "Scrabble_Board_Blank.png"};
scrabbleBoard.slots[0][4] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "Scrabble_Board_Blank.png"};
scrabbleBoard.slots[0][5] = { "letterMultiplier": 1, "wordMultiplier": 2, "image": "Scrabble_Board_DW.png"};
scrabbleBoard.slots[0][6] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "Scrabble_Board_Blank.png"};

var word = '-------';
var wordscore = 0;
var tilepos;
var tileposid;

//main
$(document).ready(function() {

    var genResult = generateHand(); //boolean var to hold result of function (success or failure)
    $("#mulligan").click( function() {
        generateHand();
        word = '-------';
        $("#worddisplay").text("Word: " + word);
    });

    $("#reset").click( function() {
        location.reload();
    });

    $("submit").click( function() {
        validateWord(word);
    });

    $(".drag").draggable({
        snap: ".ui-droppable",
        snapMode: "inner",
        revert: "invalid",
        revertDuration: 0,
        refreshPositions: true,

        start: function(event,ui) {
            tilepos = $(this).position();
            tileposid = findOrder(tilepos);
            console.log(tilepos, tileposid)
        },

        drag: function(event, ui) {
            updateScore();
        },

        stop: function(event, ui) {
            if(tilepos != $(this).position()) {
                var letter = $(this).attr("letter");

                word = buildWord(word, letter, index);
                $("#worddisplay").text("Word: " + word);
            }
        }

    });

    $(".slot").droppable({
        tolerance: "fit",
        greedy: "true",

        drop: function(event, ui) {
            console.log("drop");
            $(ui.draggable).addClass("tileonboard");
            $(ui.draggable).removeClass("tileonrack");

            var letter = $(ui.draggable).attr("letter");
            var index = $(this).attr("id");
            console.log(index)
            index = index.charAt(5) - 1;

            word = buildWord(word, letter, index);
            $("#worddisplay").text("Word: " + word);
        }
    });

    $("#rack").droppable({
        tolerance: "fit",
        greedy: "true",

        drop: function(event, ui) {
            $(ui.draggable).addClass("tileonrack");
            $(ui.draggable).removeClass("tileonboard");
        }
    });

});

//finds tile's slot's ID on the board
function findOrder(tilepos) {
    var boardpos;
    var boardid;

    for (var i = 1; i < 7; ++i) {
        boardid = ("#board" + i);
        boardpos = $(boardid).position();

        if(tilepos == boardpos) {
            return boardid;
        }
    }

    return -1;
}

//updates score
function updateScore(value) {
    wordscore += value;
    $("#wordscore").text("Word: " + wordscore);
}

//generate rack
function generateHand() {
    $(".drag").remove();
    var letter = "";

    for(var i = 0; i < 7; ++i) {
        letter = generateTile();
        if (letter === "") {
            letter = "Blank";
        }
        //letter = checkTileCount(letter);

        $("#rack").append('<img src="Scrabble_Tile_' + letter + '.jpg" class="tileonrack drag draggable ui-widget-content" letter="' + letter + '">');

        $(".drag").draggable({
            snap: ".ui-droppable",
            snapMode: "inner",
            revert: "invalid",
            revertDuration: 0,
            refreshPositions: true
        });
    }
//check if 7 tiles succesfully loaded
    if(i === 7) {
        console.log("i = " + i);
        return true;
    }

    else {
        return false;
    }
}

//generate tiles for letters
function generateTile() {
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = '';
    result = alphabet.charAt(Math.floor((Math.random() * 26) + 1));
    //result = checkTileCount(result);
    return result;
}

//check number of tiles in rack
function checkTileCount(tile) {
    //if tile isn't valid, get a valid tile
    while(ScrabbleTiles[tile]["number-remaining"] === 0) {
        tile = generateTile();
    }
    ScrabbleTiles[tile]["number-remaining"] -= 1;
    return tile;
}

//change string to char array, then rebuild into word
function buildWord(str, letter, index) {
    let charArr = str.split("");
    var word = "";
    charArr[index] = letter;
    word = charArr.join("");
    return word;
}

//validate
function validateWord(str) {
    $("#twoletters").css("color", "red");
    //is it one word?
    let hStr = str.split("");
    var tripwire = false;
    var lttrcnt = 0;
    var errorlog = ["0", "0", "0"];

    for(var i = 0; i < str.length; ++i) {
        if (hStr[i] === "-") {
            tripwire = true;
        }
        if(tripwire === true && isLetter(hStr[i])) {
            $("#submit").disable();
            $("#oneword").css("color", "red");
            errorlog[0] = 1;
        }
    }

    //check if word has 2 letters
    for(var i = 0; i < str.length; ++i) {
        if(isLetter(hStr[i])) {
            ++lttrcnt;
        }

        if (lttrcnt === 2) {
            $("#twoletters").css("color", "green");
        }
    }

}

function isLetter(letter) {
    var alphabet = "";
    for (var i = 65; i <= 90; i++) {
        alphabet = String.fromCharCode(i);
        if (letter === alphabet) {
            return true;
        }
    }

    return false;
}

function isWord (word) {
    var FILE = 'dictionary.txt';
    $.get(FILE, function(data) {

    })
}
