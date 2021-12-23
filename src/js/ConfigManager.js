/**
 * @author nethe550
 * @description The global configuration manager. Manages any and all uploaded, exported, and edited configurations.
 */

/**
 * The ConfigManager class.
 * @class
 */
class ConfigManager {

    /**
     * Creates a new configuration manager.
     * @param {AceEditor} ide - The IDE editor instance.
     * @param {HTMLElement} uploadModal - The upload modal root.
     * @param {HTMLInputElement} uploadModalInput - The upload modal file input.
     * @param {HTMLInputElement} uploadModaCancel - The upload modal cancel button.
     * @param {PageManager} pageManager - The page manager.
     * @param {{ upload: HTMLButtonElement, export: HTMLButtonElement }} buttons - The Upload, Export, and other buttons.
     */
    constructor(ide, uploadModal, uploadModalInput, uploadModalCancel, pageManager, buttons={}) {

        this.ide = ide;

        this.uploadModal = uploadModal;

        this.uploadModalInput = uploadModalInput;

        this.uploadModalCancel = uploadModalCancel;

        this.pageManager = pageManager;

        this.buttons = buttons;


        this.config = {};

        this.jsonConfig = '';

        this.yamlConfig = '';


        // open first page
        this.pageManager.openPage(0);

        // register upload modal input
        this.uploadModalInput.addEventListener('input', ((e) => {
        
            // if file was uploaded
            if ('files' in e.target && e.target.files.length > 0) {
                
                let reader = new FileReader();
                
                // read file
                reader.onload = e => {
                    
                    this.jsonConfig = e.target.result.toString();

                    this.config = jsyaml.load(e.target.result.toString()); // the working config
                    this.yamlConfig = jsyaml.dump(this.config); // the yaml representation of the config
                    console.log(this.yamlConfig);
                    this.jsonConfig = JSON.stringify(this.config, null, 4); // the json representation of the config
                    this.updateEditor();
        
                };
                
                reader.readAsText(e.target.files[0]);
        
                // close modal
                this.closeModal();
        
            }
        
        }).bind(this));

        // register upload modal cancel button
        this.uploadModalCancel.addEventListener('click', this.closeModal.bind(this));

        // register upload button
        if (this.buttons['upload']) this.buttons.upload.addEventListener('click', this.openModal.bind(this));

        // register export button
        if (this.buttons['export']) this.buttons.export.addEventListener('click', this.exportConfig.bind(this));

        // register default config buttons
        for (let button of ['recommended', 'default', 'sensitive', 'insensitive', 'auto-insensitive', 'gameratbeast9']) {

            let el = document.getElementById(`${button}-config`);

            if (el) el.addEventListener('click', this.loadConfig.bind(this, button));

        }

    }

    /**
     * Opens the upload modal.
     */
    openModal() {

        $(this.uploadModal).fadeIn(125);

    }

    /**
     * Closes the upload modal.
     */
    closeModal() {

        $(this.uploadModal).fadeOut(125);

    }

    /**
     * Loads a configuration from a file.
     * @param {string} name - The name of the configuration to load.
     */
    loadConfig(name) {

        let file = new XMLHttpRequest();

        file.responseType = 'text';

        file.open('GET', `${window.location.href.replace('/index.html', '')}/src/config/defaults/${name}.txt`, true);
        
        file.onreadystatechange = (() => {

            if (file.readyState === 4) {

                if (file.status === 200 || file.status == 0) {
                    
                    this.config = jsyaml.load(file.responseText); // the working config
                    this.yamlConfig = jsyaml.dump(this.config); // the yaml representation of the config
                    this.jsonConfig = JSON.stringify(this.config, null, 4); // the json representation of the config
                    this.updateEditor();

                }
                else console.error(`Failed to find configuration file '${name}'.`);

            }

        }).bind(this);

        file.send(null);

    }

    /**
     * Exports the config to a downloadable file.
     */
    exportConfig() {

        let blob = new Blob(['Failed to export configuration.']);

        // export ide config
        if (this.pageManager.currentPage == 1) blob = new Blob([this.ide.getSession().getValue()], { type: 'text/yaml' });
        // export editor config
        else  blob = new Blob([this.yamlConfig], { type: 'text/yaml' });
        
        let button = document.getElementById('export');

        button.href = URL.createObjectURL(blob);
        button.dataset.downloadurl = ['text/yaml', button.download, button.href].join(':');

        // revoke object url after download timeout of 40 seconds.
        // these files should be only a couple kilobytes at most, so this rarely, if ever, affects the download process.
        setTimeout(() => { URL.revokeObjectURL(button.href); }, 40000);

    }

    /**
     * Update all references to the config in the GUI.
     */
    updateEditor() {

        this.ide.setValue(this.yamlConfig ? this.yamlConfig : "Failed to load uploaded configuration.");
        this.ide.clearSelection();

        GenerateEditorControls(this.config);

        // open editor page
        this.pageManager.openPage(2);

    }

    /**
     * Updates a key in the current configuration reference.
     * @param {*} value - The value to update the key to.
     * @param {string} key - The key to update.
     * @param {string} key2 - If the value is nested, this is the second key.
     */
    updateConfig(value, key, key2=null) {

        if (key2) this.config[key][key2] = value;
        else this.config[key] = value;

        this.yamlConfig = jsyaml.dump(this.config);
        this.jsonConfig = JSON.stringify(this.config, null, 4);
        
    }

}