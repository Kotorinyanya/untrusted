#BEGIN_PROPERTIES#
{
    "version": "1.2",
    "commandsIntroduced": [],
    "music": "Come and Find Me"
}
#END_PROPERTIES#
/*************
 * droneArmy.js *
 *************
 *
 * You can not fight an army with a single man, can you?
 * All the drone should be deactivated by the M A G I C.
 *
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    function moveToward(obj, type) {
        var target = obj.findNearest(type);
        var leftDist = obj.getX() - target.x;
        var upDist = obj.getY() - target.y;

        var direction;
        if (upDist == 0 && leftDist == 0) {
            return;
        } if (upDist > 0 && upDist >= leftDist) {
            direction = 'up';
        } else if (upDist < 0 && upDist < leftDist) {
            direction = 'down';
        } else if (leftDist > 0 && leftDist >= upDist) {
            direction = 'left';
        } else {
            direction = 'right';
        }

        if (obj.canMove(direction)) {
            obj.move(direction);
        }
    }

    map.defineObject('attackDrone', {
        'type': 'dynamic',
        'symbol': 'd',
        'color': 'red',
        'onCollision': function (player) {
            player.killedBy('an attack drone');
        },
        'behavior': function (me) {
            moveToward(me, 'player');
#BEGIN_EDITABLE#

#END_EDITABLE#
        }
    });

    map.defineObject('reinforcementDrone', {
        'type': 'dynamic',
        'symbol': 'd',
        'color': 'yellow',
        'onCollision': function (player) {
            player.killedBy('a reinforcement drone');
        },
        'behavior': function (me) {
#BEGIN_EDITABLE#
            me.move('left');
#END_EDITABLE#
        }
    });

    map.defineObject('defenseDrone', {
        'type': 'dynamic',
        'symbol': 'd',
        'color': 'green',
        'onCollision': function (player) {
            player.killedBy('a defense drone');
        },
        'behavior': function (me) {},
#BEGIN_EDITABLE#

#END_EDITABLE#
    });


    map.placePlayer(0, 12);

    for(var j = 25; j <= 30; j++) {
        for (var i = 0; i <= 2; i++) {
            if (i !== 12 || j !== map.getWidth() - 1) {
                map.placeObject(j, i, 'attackDrone');
            }
        }
    }

    for(var j = 25; j <= 30; j++) {
        for (var i = map.getHeight() - 3; i <= map.getHeight(); i++) {
            if (i !== 12 || j !== map.getWidth() - 1) {
                map.placeObject(j, i, 'attackDrone');
            }
        }
    }


    for(var j = map.getWidth() - 13; j <= map.getWidth() - 12; j++) {
        for (var i = 4; i <= 20; i++) {
            if (i !== 12 || j !== map.getWidth() - 1) {
                map.placeObject(j, i, 'reinforcementDrone');
            }
        }
    }


    for(var j = map.getWidth() - 8; j <= map.getWidth() - 1; j++) {
        for (var i = 7; i <= 17; i++) {
            if (i !== 12 || j !== map.getWidth() - 1) {
                map.placeObject(j, i, 'defenseDrone');
            }
        }
    }
    map.placeObject(map.getWidth()-1, 12, 'exit');
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}