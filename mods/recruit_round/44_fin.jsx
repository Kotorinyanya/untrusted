#BEGIN_PROPERTIES#
{
    "version": "1.2.1",
    "music": "Yuzu"
}
#END_PROPERTIES#
/**************
 * fin.js *
 *************
 *
 * Congratulations!
 *
 * you have cleared all the stages
 *
 * welcome to JavaScript !
 *
 * "ZmxhZzpjbnNze3l1enVzb2Z0X2lzX21vcmVfYW1hemluZ30="
 *
 *             -- CNSS DEV
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    var credits = [
        [15, 4, "CONGRATULATIONS !"],
        [19, 6, "ALL CLEAR"],
        [8, 12, "your flag can be downloaded at"],
        [8, 14, "http://t.cn/RzBcYcS"],
        [8, 18, "相 信 我 ，真 的 不 是 g b f "]
    ];

    function drawCredits(i) {
        if (i >= credits.length) {
            return;
        }

        // redraw lines bottom to top to avoid cutting off letters
        for (var j = i; j >= 0; j--) {
            var line = credits[j];
            map._display.drawText(line[0], line[1], line[2]);
        }

        map.timeout(function () {drawCredits(i+1);}, 2000)
    }

    map.timeout(function () {drawCredits(0);}, 4000);
#END_OF_START_LEVEL#
}
