function playIntro(display, map, i) {
	if (i < 0) {
        display._intro = true;
    } else {
        if (typeof i === 'undefined') { i = map.getHeight(); }
        display.clear();
        display.drawText(0, i - 2, "%c{#0f0}> initialize");
        display.drawText(17, i + 3, "C N S S   D E V");
        display.drawText(21, i + 5, "- mod - ");
        display.drawText(15, i + 7, "THE GAME OF UNTRUSTED");
        display.drawText(15, i + 12, "JavaScript is amazing");
        display.drawText(14, i + 14, "DO NOT TRUST JAVASCRPIT");
        display.drawText(10, i + 22, "Press any key to begin ...");
        setTimeout(function () {
            display.playIntro(map, i - 1);
        }, 100);
    }
}
