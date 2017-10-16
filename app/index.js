/*
 * Copyright (c) 2017 Akos Kiss.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import clock from "clock";
import document from "document";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the led elements
function getLed(id) {
  return document.getElementById(id);
}

let hourLeds = [
  [ getLed("h1-1"), getLed("h1-2"), getLed("h1-4"), getLed("h1-8") ],
  [ getLed("h10-1"), getLed("h10-2"), getLed("h10-4"), getLed("h10-8") ],
];

let minuteLeds = [
  [ getLed("m1-1"), getLed("m1-2"), getLed("m1-4"), getLed("m1-8") ],
  [ getLed("m10-1"), getLed("m10-2"), getLed("m10-4"), getLed("m10-8") ],
];

let secondLeds = [
  [ getLed("s1-1"), getLed("s1-2"), getLed("s1-4"), getLed("s1-8") ],
  [ getLed("s10-1"), getLed("s10-2"), getLed("s10-4"), getLed("s10-8") ],
];

let yearLeds = [
  [ getLed("Y1-1"), getLed("Y1-2"), getLed("Y1-4"), getLed("Y1-8") ],
  [ getLed("Y10-1"), getLed("Y10-2"), getLed("Y10-4"), getLed("Y10-8") ],
  [ getLed("Y100-1"), getLed("Y100-2"), getLed("Y100-4"), getLed("Y100-8") ],
  [ getLed("Y1000-1"), getLed("Y1000-2"), getLed("Y1000-4"), getLed("Y1000-8") ],
];

let monthLeds = [
  [ getLed("M1-1"), getLed("M1-2"), getLed("M1-4"), getLed("M1-8") ],
  [ getLed("M10-1"), getLed("M10-2"), getLed("M10-4"), getLed("M10-8") ],
];

let dayLeds = [
  [ getLed("D1-1"), getLed("D1-2"), getLed("D1-4"), getLed("D1-8") ],
  [ getLed("D10-1"), getLed("D10-2"), getLed("D10-4"), getLed("D10-8") ],
];

// Update the leds with the current time
function updateLeds(value, leds, color) {
  for (var digitLeds of leds) {
    var digit = value % 10;
    value = Math.floor(value / 10);
    for (var led of digitLeds) {
      var state = digit % 2;
      digit = Math.floor(digit / 2);
      if (state == 0) {
        led.style.fill = "#123524"; // phthalo green for off
      }
      else {
        led.style.fill = color;
      }
    }
  }
}

var lastHour = null;
var lastMinute = null;
var lastSecond = null;

var lastYear = null;
var lastMonth = null;
var lastDay = null;

function updateClock() {
  let today = new Date();
  
  let hour = today.getHours();
  let mins = today.getMinutes();
  let secs = today.getSeconds();
  let years = today.getFullYear();
  let months = today.getMonth() + 1;
  let days = today.getDate();

  // lime time leds
  if (lastHour !== hour) {
    lastHour = hour;
    updateLeds(hour, hourLeds, "#bfff00");
  }
  if (lastMinute !== mins) {
    lastMinute = mins;
    updateLeds(mins, minuteLeds, "#bfff00");
  }
  if (lastSecond !== secs) {
    lastSecond = secs;
    updateLeds(secs, secondLeds, "#bfff00");
  }

  // darkened lime date leds
  if (lastYear !== years) {
    lastYear = years;
    updateLeds(years, yearLeds, "#5f7f00");
  }
  if (lastMonth !== months) {
    lastMonth = months;
    updateLeds(months, monthLeds, "#5f7f00");
  }
  if (lastDay !== days) {
    lastDay = days;
    updateLeds(days, dayLeds, "#5f7f00");
  }
}

// Update the clock every tick event
clock.ontick = updateClock;

// Don't start with a blank screen
updateClock();
