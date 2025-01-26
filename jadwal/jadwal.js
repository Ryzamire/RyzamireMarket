const timeRemainingEl = document.getElementById('time-remaining');

// Helper function to parse time in HH:MM format
function parseTime(timeStr) {
    const [hour, minute] = timeStr.split(':').map(Number);
    return { hour, minute };
}


function getTimeDiff(startDate, endDate) {
    const diffMs = endDate - startDate;
    const diffHours = Math.floor(diffMs / 3600000);
    const diffMinutes = Math.floor((diffMs % 3600000) / 60000);
    const diffSeconds = Math.floor((diffMs % 60000) / 1000);
    return { hours: diffHours, minutes: diffMinutes, seconds: diffSeconds };
}


function getTimeRemaining(startTime, endTime) {
    const now = new Date();
    const start = new Date(now);
    const end = new Date(now);

    const { hour: startHour, minute: startMinute } = parseTime(startTime);
    const { hour: endHour, minute: endMinute } = parseTime(endTime);

    start.setHours(startHour, startMinute, 0, 0);
    end.setHours(endHour, endMinute, 0, 0);

    // Adjust end time if it is less than or equal to start time
    if (end <= start) {
        end.setDate(end.getDate() + 1);
    }

    if (now < start) {
        const timeDiff = getTimeDiff(now, start);
        return `Jam kerja dimulai dalam ${timeDiff.hours} jam ${timeDiff.minutes} menit ${timeDiff.seconds} detik`;
    } else if (now >= start && now <= end) {
        const timeDiff = getTimeDiff(now, end);
        return `Sisa waktu kerja: ${timeDiff.hours} jam ${timeDiff.minutes} menit ${timeDiff.seconds} detik`;
    } else {
        return 'Jam kerja telah selesai';
    }
}

// Function to get the next shift day and time
function getNextShiftTime(days, currentDayIndex) {
    const dayOrder = ['kamis', 'jumat', 'sabtu', 'minggu', 'senin', 'selasa', 'rabu'];

    for (let i = 1; i < 7; i++) {
        const nextDayIndex = (currentDayIndex + i) % 7;
        const nextDayElement = days[nextDayIndex];
        if (nextDayElement) {
            const nextStartTime = nextDayElement.getAttribute('data-start');
            const nextDayName = nextDayElement.getAttribute('data-day');
            return { dayName: nextDayName, startTime: nextStartTime };
        }
    }
    return null;
}

// Function to update the remaining time display
function updateRemainingTime() {
    const now = new Date();
    const currentDayIndex = (now.getDay() + 6) % 7; // Adjust for Monday = 0
    const days = Array.from(document.querySelectorAll('.day'));

    const dayOrder = ['kamis', 'jumat', 'sabtu', 'minggu', 'senin', 'selasa', 'rabu'];
    const sortedDays = dayOrder.map(dayName => days.find(day => day.getAttribute('data-day') === dayName)).filter(day => day);

    const currentDayElement = sortedDays[currentDayIndex];

    if (currentDayElement) {
        const startTime = currentDayElement.getAttribute('data-start');
        const endTime = currentDayElement.getAttribute('data-end');
        const remainingText = getTimeRemaining(startTime, endTime);
        timeRemainingEl.innerHTML = remainingText;

        if (remainingText === 'Jam kerja telah selesai') {
            const nextShift = getNextShiftTime(sortedDays, currentDayIndex);
            if (nextShift) {
                const nextStartTime = new Date(now);
                const { hour: nextHour, minute: nextMinute } = parseTime(nextShift.startTime);
                nextStartTime.setHours(nextHour, nextMinute, 0, 0);

                const nextDayIndex = dayOrder.indexOf(nextShift.dayName);
                if (nextDayIndex !== -1) {
                    nextStartTime.setDate(now.getDate() + ((nextDayIndex - currentDayIndex + 7) % 7));
                }

                const { hours: hoursUntilNextShift, minutes: minutesUntilNextShift, seconds: secondsUntilNextShift } = getTimeDiff(now, nextStartTime);
                const nextShiftText = `Waktu menuju jam kerja berikutnya (${nextShift.dayName}) : ${hoursUntilNextShift} jam ${minutesUntilNextShift} menit ${secondsUntilNextShift} detik`;
                timeRemainingEl.innerHTML += `<br>${nextShiftText}`;
            }
        }
    } else {
        timeRemainingEl.textContent = 'Tidak ada jadwal untuk hari ini.';
    }
}

updateRemainingTime();
setInterval(updateRemainingTime, 1000); // Update every second
