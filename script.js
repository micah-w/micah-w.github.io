function setPreset(width, height) {
    document.getElementById('panelWidth').value = width;
    document.getElementById('panelHeight').value = height;
}

function calculateVideoWall() {
    const panelWidthMm = parseFloat(document.getElementById('panelWidth').value);
    const panelHeightMm = parseFloat(document.getElementById('panelHeight').value);
    const panelsHorizontally = parseInt(document.getElementById('panelsHorizontally').value);
    const panelsVertically = parseInt(document.getElementById('panelsVertically').value);
    const avgWatt = parseInt(document.getElementById('avgWatt').value);
    const maxWatt = parseInt(document.getElementById('maxWatt').value);


    if (isNaN(panelWidthMm) || isNaN(panelHeightMm) || isNaN(panelsHorizontally) || isNaN(panelsVertically)) {
        alert('Please enter complete and valid information.');
        return;
    }

    // Total dimensions in millimeters
    const totalWidthMm = panelWidthMm * panelsHorizontally;
    const totalHeightMm = panelHeightMm * panelsVertically;

    // Convert millimeters to inches and feet
    const totalWidthIn = totalWidthMm / 25.4; // 1 inch = 25.4 mm
    const totalHeightIn = totalHeightMm / 25.4;

    const totalWidthFt = totalWidthIn / 12; // 12 inches = 1 foot
    const totalHeightFt = totalHeightIn / 12;

    const numPanels = panelsHorizontally * panelsVertically

    // Calculate aspect ratio in simplified form
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(totalWidthMm, totalHeightMm);
    const aspectWidth = totalWidthMm / commonDivisor;
    const aspectHeight = totalHeightMm / commonDivisor;
    const aspectRatioText = `${aspectWidth}:${aspectHeight}, ${(aspectWidth/aspectHeight).toFixed(4)}:1`;

    // Calculate Current

    const avgCurrent120 = (avgWatt / 120) * numPanels
    const avgCurrent240 = (avgWatt / 240) * numPanels

    const maxCurrent120 = (maxWatt / 120) * numPanels
    const maxCurrent240 = (maxWatt / 240) * numPanels

    // Update webpage

    document.getElementById('dimensionsM').textContent = `${(totalWidthMm / 1000).toFixed(2)} m x ${(totalHeightMm / 1000).toFixed(2)} m`;
    document.getElementById('dimensionsIn').textContent = `${totalWidthIn.toFixed(2)} in x ${totalHeightIn.toFixed(2)} in`;
    document.getElementById('dimensionsFt').textContent = `${totalWidthFt.toFixed(2)} ft x ${totalHeightFt.toFixed(2)} ft`;
    document.getElementById('aspectRatio').textContent = `Aspect Ratio: ${aspectRatioText}`;

    document.getElementById('numPanels').textContent = `${numPanels} Panels`

    document.getElementById('avgCurrent120').textContent = `${avgCurrent120.toFixed(2)}a to ${maxCurrent120.toFixed(2)}a @ 120v`
    document.getElementById('avgCurrent240').textContent = `${avgCurrent240.toFixed(2)}a to ${maxCurrent240.toFixed(2)}a @ 240v`

    if(isNaN(avgCurrent120)) {
        document.getElementById('avgCurrent120').textContent = ``
        document.getElementById('avgCurrent240').textContent = ``

    }

}