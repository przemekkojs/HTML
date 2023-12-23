"use strict";

function ready(callback) {
    if (document.readyState != 'loading')
		callback();	
    else if (document.addEventListener)
		document.addEventListener('DOMContentLoaded', callback);	
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState == 'complete') callback();
    });
}

ready(function() {
    init();
});

function init() {
	let generateTable = document.getElementsByClassName('button')[0];
	let multiplicationTable = document.getElementById('multiplicationTable');
	multiplicationTable.innerHTML = "<a>Tu pojawi się tabliczka mnożenia!</a>";
	
	let tableSize = 0;

	generateTable.onclick = function() {
		tableSize = askForTable(5, 20);
		createTable(tableSize);
	};
}

function askForTable(minSize, maxSize) {
	let result = prompt(`Podaj rozmiar tabliczki mnożenia w zakresie [${minSize}, ${maxSize}]`);
		
	if (result < minSize) {
		alert(`Tablica o rozmiarze ${result} jest zbyt mała. Zmieniono rozmiar tabeli na ${minSize}`);
		result = minSize;
	}
	else if (result > maxSize) {
		alert(`Tablica o rozmiarze ${result} jest zbyt duża. Zmieniono rozmiar tabeli na ${maxSize}`);
		result = maxSize;
	}
	
	return result;
}

function createTable(size) {
	multiplicationTable.innerHTML = "";
	
	let numbers = Array.from({length: size}, () => (Math.floor(Math.random() * 99) + 1));
	let firstRow = document.createElement('tr');
	let xCell = document.createElement('td');
	
	xCell.innerText = 'x'
	
	firstRow.className = 'table-header';
	firstRow.appendChild(xCell);
	
	for (let index = 0; index < size; index++) {
		let currentColumn = document.createElement('td');
		currentColumn.innerHTML = `<span>${numbers[index]}</span>`;
		
		firstRow.appendChild(currentColumn);
	}
	
	multiplicationTable.appendChild(firstRow);
	
	for (let y = 0; y < size; y++) {
		let currentRow = document.createElement('tr');
		let firstColumn = document.createElement('td');
		
		firstColumn.className = 'table-header';
		firstColumn.innerHTML = `<span>${numbers[y]}</span>`;
		
		currentRow.appendChild(firstColumn);
		
		for (let x = 0; x < size; x++) {
			let currentColumn = document.createElement('td');
			let currentNumber = numbers[x] * numbers[y];
			
			let cellClass = currentNumber % 2 == 0 ? 'even' : 'odd';
			
			currentColumn.innerHTML = `<span class="${cellClass}">${currentNumber}</span>`;
			
			currentRow.appendChild(currentColumn);
		}
		
		multiplicationTable.appendChild(currentRow);
	}
}