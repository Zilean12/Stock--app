// CustomCursor.js

document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    const svgCursor = document.createElement('img');
    svgCursor.src = 'cursor.svg'; // Path to your cursor.svg file
    cursor.appendChild(svgCursor);
    document.body.appendChild(cursor);
  
    document.addEventListener('mousemove', function (e) {
      cursor.style.left = e.pageX + 'px';
      cursor.style.top = e.pageY + 'px';
    });
  });
  