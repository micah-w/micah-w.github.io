function setPreset(width, height) {
    document.getElementById('panelWidth').value = width;
    document.getElementById('panelHeight').value = height;
}

function calculateVideoWall() {
    const panelWidthMm = parseFloat(document.getElementById('panelWidth').value);
    const panelHeightMm = parseFloat(document.getElementById('panelHeight').value);
    const panelsHorizontally = parseInt(document.getElementById('panelsHorizontally').value);
    const panelsVertically = parseInt(document.getElementById('panelsVertically').value);

    if (isNaN(panelWidthMm) || isNaN(panelHeightMm) || isNaN(panelsHorizontally) || isNaN(panelsVertically)) {
        alert('Please enter valid numbers.');
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

    // Calculate aspect ratio in simplified form
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(totalWidthMm, totalHeightMm);
    const aspectWidth = totalWidthMm / commonDivisor;
    const aspectHeight = totalHeightMm / commonDivisor;
    const aspectRatioText = `${aspectWidth}:${aspectHeight}, ${aspectWidth/aspectHeight}:1`;

    document.getElementById('dimensionsMm').textContent = `${totalWidthMm.toFixed(2)} mm x ${totalHeightMm.toFixed(2)} mm`;
    document.getElementById('dimensionsIn').textContent = `${totalWidthIn.toFixed(2)} in x ${totalHeightIn.toFixed(2)} in`;
    document.getElementById('dimensionsFt').textContent = `${totalWidthFt.toFixed(2)} ft x ${totalHeightFt.toFixed(2)} ft`;
    document.getElementById('aspectRatio').textContent = `Aspect Ratio: ${aspectRatioText}`;
}
