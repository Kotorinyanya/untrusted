#BEGIN_PROPERTIES#
{
    "version": "1.2",
    "commandsIntroduced":
        ["player.killedBy", "object.onCollision"],
    "music": "The_Waves_Call_Her_Name"
}
#END_PROPERTIES#
/**********************
 * fordingTheRiver.js *
 **********************
 *
 * And there's the river. Fortunately, I was prepared for this.
 * See the raft on the other side?
 *
 * Everything is going according to plan.
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    var raftDirection = 'down';

    map.placePlayer(map.getWidth()-1, map.getHeight()-1);
    var player = map.getPlayer();

    map.defineObject('raft', {
        'type': 'dynamic',
        'symbol': '▓',
        'color': '#420',
        'transport': true, // (prevents player from drowning in water)
        'behavior': function (me) {
            me.move(raftDirection);
        }
    });

    map.defineObject('water', {
        'symbol': '░',
        'color': '#44f',
        'onCollision': function (player) {
            player.killedBy('drowning in deep dark water');
        }
    });

    for (var x = 0; x < map.getWidth(); x++) {
        for (var y = 5; y < 15; y++) {
            if ( 17 < x && x < 23 && 8 < y && y < 12) {
                continue;
            }
            map.placeObject(x, y, 'water');
        }
    }

    map.defineObject('island', {
        'symbol': '.',
        'color': 'grey',
        'impassable': true
    });

    map.placeObject(20, 5, 'raft');
    map.placeObject(0, 2, 'exit');
    map.placeObject(0, 1, 'block');
    map.placeObject(1, 1, 'block');
    map.placeObject(0, 3, 'block');
    map.placeObject(1, 3, 'block');

    for ( var x = 18; x < 23; x++) {
        for ( var y = 9; y < 12; y++) {
            map.placeObject(x, y, 'island');
        }
    }
#BEGIN_EDITABLE#





#END_EDITABLE#
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
    map.validateExactlyXManyObjects(1, 'raft');
}
