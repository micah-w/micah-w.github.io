function setPreset(width, height) {
    document.getElementById('panelWidth').value = width;
    document.getElementById('panelHeight').value = height;
  }

function openForm() {
    document.getElementById("preferences").style.display = "block";
  }
  
function closeForm() {
    document.getElementById("preferences").style.display = "none";
  }

function toggleCutout() {
    console.log("cutout called");
    if (document.getElementById('cutoutCheck').checked) {
        document.getElementById("numCutout").style.display = "block";
        document.getElementById("numCutoutLabel").style.display = "block";
    } else {
        document.getElementById("numCutout").style.display = "none";
        document.getElementById("numCutoutLabel").style.display = "none";
    }
}


function calculateVideoWall() {
    const panelWidthMm = parseFloat(document.getElementById('panelWidth').value);
    const panelHeightMm = parseFloat(document.getElementById('panelHeight').value);
    const panelsHorizontally = parseInt(document.getElementById('panelsHorizontally').value);
    const panelsVertically = parseInt(document.getElementById('panelsVertically').value);
    var numCutout = parseInt(document.getElementById('numCutout').value);
    const pixWide = parseInt(document.getElementById('pixWide').value);
    const pixHigh = parseInt(document.getElementById('pixHigh').value);
    const avgWatt = parseInt(document.getElementById('avgWatt').value);
    const maxWatt = parseInt(document.getElementById('maxWatt').value);


    if (isNaN(panelWidthMm) || isNaN(panelHeightMm) || isNaN(panelsHorizontally) || isNaN(panelsVertically)) {
        alert('Please enter complete and valid information.');
        return;
    }

    if (isNaN(numCutout)) {
        numCutout = 0;
    }

    // Total dimensions in millimeters
    const totalWidthMm = panelWidthMm * panelsHorizontally;
    const totalHeightMm = panelHeightMm * panelsVertically;

    // Convert millimeters to inches and feet
    const totalWidthIn = totalWidthMm / 25.4; // 1 inch = 25.4 mm
    const totalHeightIn = totalHeightMm / 25.4;

    const totalWidthFt = totalWidthIn / 12; // 12 inches = 1 foot
    const totalHeightFt = totalHeightIn / 12;

    const numPanels = (panelsHorizontally * panelsVertically) - numCutout;

    // Calculate aspect ratio in simplified form
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const commonDivisor = gcd(totalWidthMm, totalHeightMm);
    const aspectWidth = totalWidthMm / commonDivisor;
    const aspectHeight = totalHeightMm / commonDivisor;
    const aspectRatioText = `${aspectWidth}:${aspectHeight}, ${(aspectWidth/aspectHeight).toFixed(4)}:1`;

    // Calculate Px
    const totalPixX = pixWide * panelsHorizontally
    const totalPixY = pixHigh * panelsVertically

    // Calculate Current
    const avgCurrent120 = (avgWatt / 120) * numPanels
    const avgCurrent240 = (avgWatt / 240) * numPanels

    const maxCurrent120 = (maxWatt / 120) * numPanels
    const maxCurrent240 = (maxWatt / 240) * numPanels


    // Update webpage
    if(document.getElementById('M').checked) {
        document.getElementById('dimensionsX').textContent = `${(totalWidthMm / 1000).toFixed(2)} m`;
        document.getElementById('dimensionsY').textContent = `${(totalHeightMm / 1000).toFixed(2)} m`;
    }
    else if(document.getElementById('In').checked) {
        document.getElementById('dimensionsX').textContent = `${totalWidthIn.toFixed(2)} in`;
        document.getElementById('dimensionsY').textContent = `${totalHeightIn.toFixed(2)} in`;
    }
    else if(document.getElementById('Ft').checked) {
        document.getElementById('dimensionsX').textContent = `${totalWidthFt.toFixed(2)} ft`;
        document.getElementById('dimensionsY').textContent = `${totalHeightFt.toFixed(2)} ft`;

    }

    document.getElementById('aspectRatio').textContent = `Aspect Ratio: ${aspectRatioText}`;

    document.getElementById('numPanels').textContent = `${numPanels} Panels`

    document.getElementById('resolution').textContent = `${totalPixX} x ${totalPixY} pixels`

    document.getElementById('avgCurrent120').textContent = `${avgCurrent120.toFixed(2)}a to ${maxCurrent120.toFixed(2)}a @ 120v`
    document.getElementById('avgCurrent240').textContent = `${avgCurrent240.toFixed(2)}a to ${maxCurrent240.toFixed(2)}a @ 240v`


    // if is blank, blank result
    if(isNaN(avgCurrent120)) {
        document.getElementById('avgCurrent120').textContent = ``
        document.getElementById('avgCurrent240').textContent = ``
    }
    if(isNaN(totalPixX || totalPixY)) {
        document.getElementById('resolution').textContent = ``
    }

}