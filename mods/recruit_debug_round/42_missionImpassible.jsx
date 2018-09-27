#BEGIN_PROPERTIES#
{
    "version": "1.2.3",
    "commandsIntroduced":
        ["map.getCanvasContext", "canvas.beginPath", "canvas.strokeStyle",
         "canvas.lineWidth", "canvas.moveTo", "canvas.lineTo",
         "canvas.stroke", "map.createLine", "map.validateAtLeastXLines"],
    "music": "Soixante-8",
    "mapProperties": {
        "showDrawingCanvas": true
    }
}
#END_PROPERTIES#
/*************
 * missionImpassible.js *
 *************
 *
 * It is impassible to get pass 10k lasers.
 * There gotta be another way out.
 *
 * Use the  M A G I C
 *      -- javascript closure.
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startLevel(map) {
#START_OF_START_LEVEL#
    map.displayChapter("MISSION IMPASSIBLE");
    map.placePlayer(0, 0);
    map.placeObject(map.getWidth()-1, map.getHeight()-1, 'exit');
    var player = map.getPlayer();

    for (var i = 0; i < 10000; i++) {
        var startX = getRandomInt(0, 600);
        var startY = getRandomInt(0, 500);
        var angle = getRandomInt(0, 360);
        var length = getRandomInt(200, 300);
        var color = "#"+((1<<24)*Math.random()|0).toString(16);
        createLaser(startX, startY, angle, length, color);
    }

    function createLaser(centerX, centerY, angleInDegrees, length, color) {
        var angleInRadians = angleInDegrees * Math.PI / 180;

        var x1 = centerX - Math.cos(angleInRadians) * length / 2;
        var y1 = centerY + Math.sin(angleInRadians) * length / 2;
        var x2 = centerX + Math.cos(angleInRadians) * length / 2;
        var y2 = centerY - Math.sin(angleInRadians) * length / 2;


        map.createLine([x1, y1], [x2, y2], function (player) {
            if (player.getColor() != color) {
                player.killedBy('a ' + color + ' laser');
            }
        });
        // huhmm... buggy program
#BEGIN_EDITABLE#

#END_EDITABLE#
    }
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.finalLevel = true;
    map.validateExactlyXManyObjects(1, 'exit');
    map.validateAtLeastXLines(10000);
}
