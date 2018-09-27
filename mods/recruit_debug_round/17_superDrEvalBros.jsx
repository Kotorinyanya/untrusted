#BEGIN_PROPERTIES#
{
    "version"
:
    "1.2.2",
        "commandsIntroduced"
:
    ["player.move", "map.startTimer", "object.impassable", "object.type"],
        "music"
:
    "Beach Wedding Dance",
        "mapProperties"
:
    {
        "keyDelay"
    :
        25
    }
}
#END_PROPERTIES#
/**********************
 * superDrEvalBros.js *
 **********************
 *
 * You're still here?! Well, Dr. Eval, let's see
 * how well you can operate with one less dimension.
 *
 * Give up now. Unless you have a magic mushroom
 * up your sleeve, it's all over.
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    var fl = Math.floor;
    var w = map.getWidth();
    var h = map.getHeight();

    map.placePlayer(1, fl(h / 2) - 1);
    var player = map.getPlayer();

    map.placeObject(w - 1, fl(h / 2) - 1, 'exit');

    for (var x = 0; x < fl(w / 2) - 10; x++) {
        for (var y = fl(h / 2); y < h; y++) {
            map.placeObject(x, y, 'block');
        }
    }

    for (var x = fl(w / 2) + 10; x <= w; x++) {
        for (var y = fl(h / 2); y < h; y++) {
            map.placeObject(x, y, 'block');
        }
    }

    function gravity() {
        var x = player.getX();
        var y = player.getY() + 1;

        if (y === map.getHeight() - 2) {
            player.killedBy("gravity");
        }

        if (map.getObjectTypeAt(x, y) === "empty") {
            player.move("down");
        }

    }

    map.startTimer(gravity, 25);

    map.defineObject('pit', {
        'symbol': 'V',
        'type': 'dynamic',
        'onCollision': function (player, game) {
            player.killedBy('falling on spikes');
        }
    });

    for (var x = fl(w / 2) - 10; x < fl(w / 2) + 10; x++) {
        map.placeObject(x, map.getHeight() - 3, 'pit');
        map.placeObject(x, map.getHeight() - 2, 'block');
        map.placeObject(x, map.getHeight() - 1, 'block');
    }

    player.setPhoneCallback(function () {
#BEGIN_EDITABLE#
        // ... maybe I can build a bridge with my phone
#END_EDITABLE#
    });

#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
    map.validateExactlyXManyObjects(430, 'block');
}
