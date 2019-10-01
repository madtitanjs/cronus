import { DateHelper } from "./ts/date-helper";
import { Chevron } from "./ts/chevron";
import { Dot } from "./ts/dot";
import { DateGridItem } from "./ts/interface";

export class CronusCalendar extends HTMLElement {
    date: Date = new Date();
    ongeneratedots = (date: Date): string[] => [];
    onmonthchange = (date: Date) => { };
    ondateselected = (date: Date) => { };
    date_grid_items: DateGridItem[] = [];
    static get observedAttributes() { return ['date']; }

    constructor() {
        super();


    }

    init(date?: Date | string) {
        // Check if input is provided
        if (typeof date !== 'undefined')
            this.date = new Date(date);

        // Check if date provided is valid
        if (this.date.getTime() === NaN)
            throw new Error("Invalid date supplied");
            
        // Sanitize Date
        this.date.setHours(0, 0, 0, 0);

        // Empty out inner elements
        this.innerHTML = '';

        // Setup elements
        this.setupUI(this.date);
    }

    attributeChangedCallback(attrName: string, oldValue: string, newValue: string) {
        if (attrName === 'date') {
            console.log(newValue);
            this.init(newValue)
        }
    }

    // LIFE CYCLES
    connectedCallback() {
    }

    disconnectedCallback() {
    }

    adoptedCallback() {
    }

    setupUI(date: Date) {
        this.setupMonthSelector(date);
        this.setupDaysHeader();
        this.setupDateGrid(date);
    }

    setupMonthSelector(date: Date) {
        // SETUP MONTH SELECTOR
        const month_selector = document.createElement('section') as HTMLDivElement;
        month_selector.classList.add('month-selection');
        let btn_cl = document.createElement('button') as HTMLButtonElement;
        btn_cl.classList.add('helium-date-btn')
        let chevron_left = Chevron.left();
        btn_cl.appendChild(chevron_left);
        let btn_cr = document.createElement('button') as HTMLButtonElement;
        btn_cr.classList.add('helium-date-btn');
        let chevron_right = Chevron.right();

        btn_cr.appendChild(chevron_right);
        let month_display = document.createElement('span') as HTMLSpanElement;
        month_display.textContent = `${DateHelper.getMonthName(date.getMonth())} ${date.getFullYear()}`;

        // ATTACH BUTTON LISTENERS
        btn_cl.onclick = () => this.prevMonth();
        btn_cr.onclick = () => this.nextMonth();

        month_selector.appendChild(btn_cl);
        month_selector.appendChild(month_display);
        month_selector.appendChild(btn_cr);

        this.appendChild(month_selector)
    }

    setupDaysHeader() {
        const days_columns = 7;
        let day_header_display = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        //let day_header_display = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const day_display_container = document.createElement('div');
        day_display_container.classList.add('days-container');
        let _dayNum = 0;

        while (_dayNum < days_columns) {
            let day_header = document.createElement('div');
            day_header.classList.add('helium-day-label');
            let day_header_text = document.createElement('span')
            day_header_text.textContent = day_header_display[_dayNum];
            day_header.appendChild(day_header_text);
            day_display_container.appendChild(day_header);
            _dayNum++;
        }
        this.appendChild(day_display_container);
    }

    setupDateGrid(date: Date) {
        const _numDays = DateHelper.daysInMonth(date);
        // SETUP GRID CONTAINER
        let date_grid = document.createElement('section');
        date_grid.setAttribute('class', 'date-grid');
        let _iterateDays = 0;
        let _cloneDate = new Date(date);
        _cloneDate.setDate(1);
        // get offset in the calendar
        let firstDayNum = _cloneDate.getDay() + 1;
        // clear date grid items
        this.date_grid_items.length = 0;
        while (_iterateDays++ < _numDays) {
            let date_container = document.createElement('div');
            let date_label = document.createElement('span');
            date_container.classList.add('date-grid-item');
            // ATTACH LISTENER
            date_container.onclick = () => {
                this.renderSelects({element: date_container, date: _date_assoc});
            }

            date_label.textContent = `${_iterateDays}`;

            let dot_container = document.createElement('div');
            dot_container.classList.add('dot-container');
            let _date_assoc = new Date(this.date);
            _date_assoc.setDate(_iterateDays);
            _date_assoc.setHours(0, 0, 0, 0);
            let dots = this.ongeneratedots(_date_assoc);

            if (typeof dots !== 'undefined' && Array.isArray(dots)) {
                dots.forEach(val => {
                    dot_container.appendChild(Dot.createDot(val));
                })
            }
            date_container.appendChild(date_label);
            date_container.appendChild(dot_container);

            // Push date container to date grid item array
            this.date_grid_items.push({element: date_container, date: _date_assoc});
            date_grid.appendChild(date_container);



        }
        let firstChild = date_grid.firstChild as HTMLElement;
        firstChild.style.gridColumn = `${firstDayNum}`;

        this.appendChild(date_grid);
    }

    nextMonth() {
        this.adjustMonth(1);
        this.onmonthchange(this.date);
    }

    prevMonth() {
        this.adjustMonth(-1);
        this.onmonthchange(this.date);
    }

    select(date: Date | string) {
        let _date = new Date(date);
        let item = this.date_grid_items.find(s => DateHelper.checkSameDay(s.date, _date));
        if(typeof item !== 'undefined') {
            this.renderSelects(item);
        } else {
            console.error('Date selected is not rendered');
        }
    }

    private adjustMonth(num: number) {
        let d = new Date(this.date);
        let _d = new Date(d.setMonth(d.getMonth() + num));
        this.init(_d);
    }

    private renderSelects(item: DateGridItem) {
        let date_grid = document.createElement('section');
        let childLen = date_grid.children.length;
        while(childLen--) {
            let childGrid = date_grid.children.item(childLen) as HTMLElement;
            childGrid.classList.remove('selected');
        }
        item.element.classList.add('selected');
        this.ondateselected(item.date);
    }

}