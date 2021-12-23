/**
 * @author nethe550
 * @description Manages page states and switches between them.
 */

/**
 * @class
 */
class PageManager {

    /**
     * Creates a new page manager instance.
     * @param {[HTMLElement]} pages - The pages to manage.
     * @param {number} openPage - The page index to initially open.
     */
    constructor(pages, openPage=0) {

        /**
         * @type {[HTMLElement]}
         */
        this.pages = [];

        /**
         * @type {[HTMLButtonElement]}
         */
        this.pageButtons = [];

        /**
         * @type {number}
         */
        this.currentPage = openPage;

        for (let page of pages) {

            this.pages.push(document.getElementById(`${page}-page`));
            this.pageButtons.push(document.getElementById(`open-page-${page}`));

        }

        this.register();
        this.openPage(openPage);

    }

    /**
     * Registers a click event to all page buttons and switches pages accordingly.
     */
    register() {

        const buttons = document.getElementsByClassName('page-nav-button');

        for (let i = 0; i < buttons.length; i++) {

            document.getElementById(buttons[i].id).addEventListener('click', () => this.openPage.bind(this)(i));

        }

    }

    /**
     * Opens the specified page.
     * @param {number} index - The page index to open.
     */
    openPage(index) {

        this.currentPage = index;

        for (let i = 0; i < this.pages.length; i++) {

            if (index == i) {

                this.pages[i].style.display = 'initial';
                this.pageButtons[i].style.background = 'var(--accent-color)';
            }
            else {
                this.pages[i].style.display = 'none';
                this.pageButtons[i].style.background = 'var(--button-background)';
            }

        }

    }

}