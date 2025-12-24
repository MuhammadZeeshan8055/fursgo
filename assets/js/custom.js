const toggleBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu-items');
const header = document.querySelector('.logo-toggle-button');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    header.classList.toggle('fixed');
    document.body.classList.toggle('menu-open');
});

const groomerBtn = document.querySelector('.find-groomer');
const spaceBtn = document.querySelector('.find-space');
const groomerContent = document.querySelector('.find-groomer-content-area');
const spaceContent = document.querySelector('.find-space-content-area');

groomerBtn.addEventListener('click', () => {
    groomerContent.style.display = 'block';
    spaceContent.style.display = 'none';
    groomerBtn.classList.add('active');
    spaceBtn.classList.remove('active');
});

spaceBtn.addEventListener('click', () => {
    spaceContent.style.display = 'block';
    groomerContent.style.display = 'none';
    spaceBtn.classList.add('active');
    groomerBtn.classList.remove('active');
});


function toggleActive(containerSelector, itemSelector, activeClass) {

    const items = document.querySelectorAll(`${containerSelector} ${itemSelector}`);

    items.forEach(item => {
        item.addEventListener("click", () => {
            items.forEach(button => button.classList.remove(activeClass));
            item.classList.add(activeClass);
        });
    });
}

// Find Groomer
toggleActive(".find-grommer-content", ".pet-option", "highlight");
toggleActive(".find-grommer-content", ".weight-option", "active");

// Find Space
toggleActive(".find-space-content", ".pet-option", "highlight");
toggleActive(".find-space-content", ".weight-option", "active");


// date time picker js  

(function () {
    // Find all datetime-wrapper instances
    const datetimeWrappers = document.querySelectorAll('.datetime-wrapper');

    datetimeWrappers.forEach((wrapper, index) => {
        // Get elements within this specific wrapper
        const dateField = wrapper.querySelector('.field.date');
        const dateInput = dateField.querySelector('.fake-input');
        const datePopover = dateField.querySelector('.popover');
        const daysGrid = datePopover.querySelector('.days-grid');
        const monthLabel = datePopover.querySelector('#monthLabel');
        const prevMonthBtn = datePopover.querySelector('#prevMonth');
        const nextMonthBtn = datePopover.querySelector('#nextMonth');
        const weekdayRow = datePopover.querySelector('.weekday-row');

        const timeField = wrapper.querySelector('.field.time');
        const timeInput = timeField.querySelector('.fake-input');
        const timeList = datePopover.querySelector('.time-list');

        // Weekdays - start with Monday
        const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

        // Current selection state for this instance
        let selectedDate = new Date();
        let viewYear = selectedDate.getFullYear();
        let viewMonth = selectedDate.getMonth();
        let selectedTime = '13:00';

        // Render weekday headers
        function renderWeekdays() {
            weekdayRow.innerHTML = '';
            for (const d of weekdays) {
                const el = document.createElement('div');
                el.textContent = d;
                weekdayRow.appendChild(el);
            }
        }

        // Format functions
        function pad(n) { return n < 10 ? '0' + n : n; }
        function monthName(m) { return new Date(2000, m, 1).toLocaleString('en', { month: 'long' }); }
        function formatDateForInput(d) {
            const day = pad(d.getDate());
            const mon = monthName(d.getMonth());
            const yr = d.getFullYear();
            return `${day} ${mon} ${yr}`;
        }

        // Build calendar days
        function renderCalendar(year, month) {
            monthLabel.textContent = `${monthName(month)} ${year}`;
            daysGrid.innerHTML = '';

            const firstDay = new Date(year, month, 1);
            const startOffset = (firstDay.getDay() + 6) % 7;
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            const prevMonthDays = startOffset;
            const prevMonthLastDay = new Date(year, month, 0).getDate();

            const total = prevMonthDays + daysInMonth;
            const rows = Math.ceil(total / 7);
            const cells = rows * 7;

            for (let i = 0; i < cells; i++) {
                const cell = document.createElement('div');
                cell.className = 'day';

                const dayIndex = i - prevMonthDays + 1;
                if (i < prevMonthDays) {
                    const d = prevMonthLastDay - (prevMonthDays - 1 - i);
                    cell.textContent = d;
                    cell.classList.add('outside');
                } else if (dayIndex > daysInMonth) {
                    const d = dayIndex - daysInMonth;
                    cell.textContent = d;
                    cell.classList.add('outside');
                } else {
                    cell.textContent = dayIndex;
                    const cellDate = new Date(year, month, dayIndex);
                    if (isSameDate(cellDate, selectedDate)) {
                        cell.classList.add('selected');
                    } else if (isToday(cellDate)) {
                        cell.classList.add('today');
                    }
                    cell.tabIndex = 0;
                    cell.addEventListener('click', () => {
                        selectedDate = cellDate;
                        dateInput.value = formatDateForInput(selectedDate);
                        renderCalendar(viewYear, viewMonth);
                    });
                }
                daysGrid.appendChild(cell);
            }
        }

        function isSameDate(a, b) {
            return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
        }
        function isToday(d) {
            const t = new Date();
            return isSameDate(d, t);
        }

        // Time list
        function generateTimes() {
            timeList.innerHTML = '';
            for (let hour = 0; hour < 24; hour++) {
                const label = formatHourLabel(hour);
                const timeValue = pad(hour) + ':00';
                const item = document.createElement('div');
                item.className = 'time-item';
                item.textContent = label;
                item.dataset.time = timeValue;
                item.tabIndex = 0;
                item.addEventListener('click', () => {
                    selectTime(timeValue, item);
                });
                timeList.appendChild(item);
            }
        }

        function formatHourLabel(hour) {
            return (hour < 10 ? '0' : '') + hour + ':00';
        }

        function selectTime(timeStr, itemElement) {
            selectedTime = timeStr;
            const [hh, mm] = timeStr.split(':').map(Number);
            timeInput.value = formatHourLabel(hh);
            timeList.querySelectorAll('.time-item').forEach(i => i.classList.remove('selected'));
            itemElement.classList.add('selected');
            closeAllPopovers();
        }

        // Toggle popovers
        function openPopover(pop) {
            closeAllPopovers();
            pop.style.display = 'block';
            pop.previousElementSibling.setAttribute('aria-expanded', 'true');

            dateField.style.borderBottomLeftRadius = '0px';
            timeField.style.borderBottomRightRadius = '0px';
        }

        function closePopover(pop) {
            pop.style.display = 'none';
            if (pop.previousElementSibling) pop.previousElementSibling.setAttribute('aria-expanded', 'false');

            dateField.style.borderBottomLeftRadius = '10px';
            timeField.style.borderBottomRightRadius = '10px';
        }

        function closeAllPopovers() {
            document.querySelectorAll('.popover').forEach(p => p.style.display = 'none');
            document.querySelectorAll('.input-row').forEach(r => r.setAttribute('aria-expanded', 'false'));

            document.querySelectorAll('.field.date').forEach(f => f.style.borderBottomLeftRadius = '10px');
            document.querySelectorAll('.field.time').forEach(f => f.style.borderBottomRightRadius = '10px');
        }

        // Attach open handlers
        dateField.querySelector('.input-row').addEventListener('click', (e) => {
            const isOpen = datePopover.style.display === 'block';
            if (isOpen) closePopover(datePopover);
            else openPopover(datePopover);
        });

        dateField.querySelector('.input-row').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dateField.querySelector('.input-row').click();
            }
        });

        timeField.querySelector('.input-row').addEventListener('click', () => {
            openPopover(datePopover);
            if (selectedTime) {
                const el = timeList.querySelector(`.time-item[data-time="${selectedTime}"]`);
                if (el) el.scrollIntoView({ block: 'center' });
            }
        });

        timeField.querySelector('.input-row').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                timeField.querySelector('.input-row').click();
            }
        });

        // Prev / Next month
        prevMonthBtn.addEventListener('click', () => {
            viewMonth--;
            if (viewMonth < 0) { viewMonth = 11; viewYear--; }
            renderCalendar(viewYear, viewMonth);
        });

        nextMonthBtn.addEventListener('click', () => {
            viewMonth++;
            if (viewMonth > 11) { viewMonth = 0; viewYear++; }
            renderCalendar(viewYear, viewMonth);
        });

        // Initialize UI values
        function init() {
            renderWeekdays();
            renderCalendar(viewYear, viewMonth);
            generateTimes();
            dateInput.value = formatDateForInput(selectedDate);

            setTimeout(() => {
                const el = timeList.querySelector(`.time-item[data-time="${selectedTime}"]`);
                if (el) el.classList.add('selected');
                timeInput.value = '13:00';
            }, 10);
        }

        init();
    });

    // Click outside to close - global handler
    document.addEventListener('click', (e) => {
        const isInsideDatetime = e.target.closest('.datetime-wrapper');
        if (!isInsideDatetime) {
            document.querySelectorAll('.popover').forEach(p => p.style.display = 'none');
            document.querySelectorAll('.input-row').forEach(r => r.setAttribute('aria-expanded', 'false'));
            document.querySelectorAll('.field.date').forEach(f => f.style.borderBottomLeftRadius = '10px');
            document.querySelectorAll('.field.time').forEach(f => f.style.borderBottomRightRadius = '10px');
        }
    });

    // Escape key closes
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.popover').forEach(p => p.style.display = 'none');
            document.querySelectorAll('.input-row').forEach(r => r.setAttribute('aria-expanded', 'false'));
            document.querySelectorAll('.field.date').forEach(f => f.style.borderBottomLeftRadius = '10px');
            document.querySelectorAll('.field.time').forEach(f => f.style.borderBottomRightRadius = '10px');
        }
    });
})();


// custom select dropdown js  

document.querySelectorAll('.custom-select').forEach(select => {
    const trigger = select.querySelector('.select-trigger');
    const options = select.querySelectorAll('.select-options li');
    const datePopovers = document.querySelectorAll('.popover');
    const text = select.querySelector('.selected-text');
    const hiddenInput = select.querySelector('input[type="hidden"]');

    trigger.addEventListener('click', e => {
        e.stopPropagation();

        datePopovers.forEach(popover => {
            popover.style.display = 'none';
        });

        // close other selects & reset their radius
        document.querySelectorAll('.custom-select').forEach(s => {
            if (s !== select) {
                s.classList.remove('open');
                const t = s.querySelector('.select-trigger');
                t.style.cssText = `
                    border-bottom-left-radius: 12px;
                    border-bottom-right-radius: 12px;
                `;
            }
        });

        // toggle current
        const isOpen = select.classList.toggle('open');

        trigger.style.cssText = isOpen
            ? `border-bottom-left-radius: 0; border-bottom-right-radius: 0;`
            : `border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;`;
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            text.textContent = option.textContent;
            text.style.color = '#333';
            hiddenInput.value = option.dataset.value;

            select.classList.remove('open');
            trigger.style.cssText = `
                border-bottom-left-radius: 12px;
                border-bottom-right-radius: 12px;
            `;
        });
    });
});

// click outside
document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select').forEach(select => {
        select.classList.remove('open');
        const trigger = select.querySelector('.select-trigger');
        trigger.style.cssText = `
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
        `;
    });
});