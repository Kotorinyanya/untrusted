#BEGIN_PROPERTIES#
{
    "version"
:
    "1.2",
        "commandsIntroduced"
:
    ["object.onDestroy", "object.projectile",
        "map.countObjects", "map.isStartOfLevel",
        "map.validateAtMostXDynamicObjects", "map.validateNoTimers",
        "object.impassable", "object.type"],
        "music"
:
    "Adversity",
        "mapProperties"
:
    {
        "refreshRate"
    :
        50,
            "quickValidateCallback"
    :
        true
    }
}
#END_PROPERTIES#

/*****************
 * bossFight.js *
 *****************
 *
 * NO FARTHER, DR. EVAL!!!!
 * YOU WILL NOT GET OUT OF HERE ALIVE!!!!
 * IT'S TIME YOU SEE MY TRUE FORM!!!!
 * FACE MY ROBOT WRATH!!!!!
 */

function startLevel(map) {
#START_OF_START_LEVEL#
	map.defineObject('boss', {
        'type': 'dynamic',
        'symbol': '🐒',
        'color': 'red',
        'interval': 200,
        'onCollision': function (player) {
            player.killedBy('the boss');
        },
        'behavior': function (me) {
            if (!me.direction) {
                me.direction = 'right';
            }
            if (me.canMove(me.direction)) {
                me.move(me.direction);
            } else {
                me.direction = (me.direction == 'right') ? 'left' : 'right';
            }
            if (Math.random() < 0.8) {
                map.placeObject(me.getX(), me.getY() + 3, 'bullet');
            }
        },
        'onDestroy': function (me) {
            if (map.countObjects('boss') == 0) {
                map.placeObject(me.getX(), me.getY(), 'theAlgorithm');
            }
        }
    });

    map.defineObject('bullet', {
        'type': 'dynamic',
        'symbol': '.',
        'color': 'red',
        'interval': 100,
        'projectile': true,
        'behavior': function (me) {
            me.move('down');
        }
    });

    map.placePlayer(0, map.getHeight() - 3);
    map.placeObject(map.getWidth() - 1, map.getHeight() - 1, 'exit');

    // Not so tough now, huh?
    map.getPlayer().removeItem('phone');
    map.placeObject(map.getWidth() - 1, map.getHeight() - 3, 'phone');

    map.placeObject(0, map.getHeight() - 4, 'block');
    map.placeObject(1, map.getHeight() - 4, 'block');
    map.placeObject(2, map.getHeight() - 4, 'block');
    map.placeObject(2, map.getHeight() - 3, 'block');
    map.placeObject(map.getWidth() - 1, map.getHeight() - 4, 'block');
    map.placeObject(map.getWidth() - 2, map.getHeight() - 4, 'block');
    map.placeObject(map.getWidth() - 3, map.getHeight() - 4, 'block');
    map.placeObject(map.getWidth() - 3, map.getHeight() - 3, 'block');

    for (var x = 0; x < map.getWidth(); x++) {
        map.placeObject(x, 4, 'block');
    }

    for (var x = 9; x < map.getWidth() * 3 / 4; x += 2) {
        map.placeObject(x, 5, 'boss');
    }
    for (var x = 10; x < map.getWidth() * 3 / 4; x += 2) {
        map.placeObject(x, 6, 'boss');
    }
    for (var x = 11; x < map.getWidth() * 3 / 4 - 2; x += 2) {
        map.placeObject(x, 7, 'boss');
    }
#BEGIN_EDITABLE#







#END_EDITABLE#

#END_OF_START_LEVEL#

}

function validateLevel(map) {
    // called at start of level and whenever a callback executes
    map.validateAtMostXObjects(59, 'block');
    map.validateAtMostXObjects(1, 'phone');

    if (map.countObjects('theAlgorithm') > 0 && map.countObjects('boss') > 0) {
        throw "The Algorithm can only be dropped by the boss!";
    }

    // only called at start of level
    if (map.isStartOfLevel()) {
        map.validateAtMostXDynamicObjects(42);
        map.validateNoTimers();
    }
}

function onExit(map) {
    if (!map.getPlayer().hasItem('theAlgorithm')) {
        map.writeStatus("You must take back the Algorithm!!");
        return false;
    } else if (!map.getPlayer().hasItem('phone')) {
        map.writeStatus("We need the phone!");
        return false;
    } else {
        return true;
    }
}