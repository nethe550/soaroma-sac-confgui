/**
 * @author nethe550
 * @description Generates GUI elements for editing a YAML configuration file.
 */

/**
 * An enumeration of editor input types.
 * @enum
 * @property {string} Checkbox - The checkbox input type.
 * @property {string} Text - The text input type.
 * @property {string} BigText - The text input type, but with a larger input field.
 * @property {string} Number - The number input type.
 */
const InputType = {

    Checkbox: {
        type: 'checkbox',
        class: 'editor-checkbox'
    },
    Text: {
        type: 'text',
        class: 'editor-text'
    },
    BigText: {
        type: 'text',
        class: 'editor-text'
    },
    Number: {
        type: 'number',
        class: 'editor-number'
    }

};

/**
 * The EditorControlGenerator class.
 * @class
 */
class EditorControlGenerator {

    /**
     * Creates a new editor control and appends it to the specified parent element.
     * @static
     * @param {InputType} type - The type of input. (e.g. InputType.Checkbox, InputType.Text, InputType.Number)
     * @param {string} id - The unique identifier for the generated element.
     * @param {HTMLElement} parent - The parent element to append the generated element to.
     * @param {string} label - The name of the editor control.
     * @param {string} description - The description of what the editor control does.
     * @param {string|number|boolean} def - The default value to set the generated element with.
     * @returns {HTMLElement} - The generated element.
     */
    static new(type, id, parent=null, label='', description='', def=null) {

        // wrapper
        const editorControlWrapper = document.createElement('div');
        editorControlWrapper.classList.add('editor-control-wrapper');

        // input wrapper
        const editorControlInputWrapper = document.createElement('div');
        editorControlInputWrapper.classList.add('editor-control-input-wrapper');

        // input label
        const editorControlLabel = document.createElement('label');
        editorControlLabel.classList.add('editor-label');
        editorControlLabel.innerText = label;

        // input
        const editorControl = document.createElement('input');
        editorControl.type = type.type;
        editorControl.id = id;
        editorControl.classList.add(type.class);

        switch (type) {

            case InputType.Checkbox:
                editorControl.checked = def ? def : false;
                break;

            case InputType.Text:
                editorControl.value = def ? def : '';
                editorControl.placeholder = 'String';
                break;

            case InputType.BigText:
                editorControl.value = def ? def : '';
                editorControl.placeholder = 'String';

                editorControl.style.height = '3em';
                break;

            case InputType.Number:
                editorControl.value = def ? def : -1;
                editorControl.placeholder = 'Number';
                break;

        }

        editorControlInputWrapper.appendChild(editorControlLabel);
        
        editorControlInputWrapper.appendChild(editorControl);

        editorControlWrapper.appendChild(editorControlInputWrapper);

        const editorControlDescription = document.createElement('p');
        editorControlDescription.classList.add('editor-description');
        editorControlDescription.innerHTML = description;

        editorControlWrapper.appendChild(editorControlDescription);

        if (parent) parent.appendChild(editorControlWrapper);

        return editorControlWrapper;

    }

    /**
     * Creates a new dropdown and populates it with the specified editor controls.
     * @param {string} id - The id of the generated dropdown.
     * @param {HTMLElement} parent - The parent element to append the generated element to.
     * @param {string} label - The name of the dropdown.
     * @param {[HTMLElement]} options - The editor control elements to put inside the dropdown.
     * @param {boolean} collapsed - Whether to generate the element pre-collapsed.
     * @returns {HTMLElement} - The generated dropdown element.
     */
    static newDropdown(id, parent=null, label='', options=[], collapsed=true) {

        // wrapper
        const dropdownWrapper = document.createElement('div');
        dropdownWrapper.id = id;
        dropdownWrapper.classList.add('editor-dropdown-wrapper');

        // title bar
        const dropdownTitleBar = document.createElement('div');
        dropdownTitleBar.classList.add('editor-dropdown-title-bar')

        // content
        const dropdownContent = document.createElement('div');
        dropdownContent.classList.add('editor-dropdown-content');
        dropdownContent.style.display = collapsed ? 'none' : 'block';

        // title
        const dropdownTitle = document.createElement('span');
        dropdownTitle.classList.add('editor-dropdown-title');
        dropdownTitle.innerText = label;

        dropdownTitleBar.appendChild(dropdownTitle);

        // children
        for (let i = 0; i < options.length; i++) {

            options[i].classList.add('editor-dropdown-option');

            dropdownContent.appendChild(options[i]);

        }

        // open-close control
        const dropdownControl = document.createElement('img');
        dropdownControl.width = 24;
        dropdownControl.height = 24;
        dropdownControl.src = './src/css/chevron.png';
        dropdownControl.classList.add('editor-dropdown-control');

        dropdownControl.addEventListener('click', () => {

            if (dropdownContent.style.display == 'none') $(dropdownContent).fadeIn();
            else $(dropdownContent).fadeOut();

        });
        
        dropdownTitleBar.appendChild(dropdownControl);

        dropdownWrapper.appendChild(dropdownTitleBar);

        dropdownWrapper.appendChild(dropdownContent);

        if (parent) parent.appendChild(dropdownWrapper);

        return dropdownWrapper;

    }

    /**
     * Adds editor controls to an existing dropdown.
     * @param {HTMLElement} dropdown - The dropdown to add the editor options to.
     * @param {[HTMLElement]} options - The editor controls to add to the dropdown.
     * @returns {HTMLElement} - The modified dropdown.
     */
    static addToDropdown(dropdown, options=[]) {

        let dropdownContent = dropdown.getElementsByClassName('editor-dropdown-content');

        if (!dropdownContent) console.error(`Failed to find content panel in dropdown. (#${dropdown.id})`);

        // select first option if found
        if (dropdownContent.length) dropdownContent = dropdownContent[0];

        for (let i = 0; i < options.length; i++) {

            options[i].classList.add('editor-dropdown-option');

            dropdownContent.appendChild(options[i]);

        }

        return dropdown;

    }

    /**
     * Creates a new editor control section.
     * @static
     * @param {string} title - This section's title.
     * @param {HTMLElement} parent - The parent element to append the generated element to.
     * @param {boolean} collapsed - Whether to generate the element pre-collapsed or not.
     * @returns {HTMLElement} - The generated element.
     */
    static newSection(title, parent, collapsed=false) {

        // wrapper
        const section = document.createElement('section');
        section.classList.add('editor-section');

        // content
        const content = document.createElement('div');
        content.classList.add('editor-section-content');
        content.style.display = collapsed ? 'none' : 'block';

        // title bar
        const titleBar = document.createElement('div');
        titleBar.classList.add('editor-section-title-bar')

        // title
        const _title = document.createElement('span');
        _title.classList.add('editor-section-title');
        _title.innerText = title;

        // open-close control
        const sectionControl = document.createElement('img');
        sectionControl.width = 24;
        sectionControl.height = 24;
        sectionControl.src = './src/css/chevron.png';
        sectionControl.classList.add('editor-section-control');

        sectionControl.addEventListener('click', () => {

            if (content.style.display == 'none') $(content).fadeIn();
            else $(content).fadeOut();

        });

        titleBar.appendChild(_title);

        titleBar.appendChild(sectionControl);

        section.appendChild(titleBar);

        section.appendChild(content);

        parent.appendChild(section);

        return section;

    }

}


/**
 * Generates and populates all GUI editor components from the current configuration.
 * @function
 */
function populateEditor() {

    // clear editor
    const gui_editor = document.getElementById('editor-controls');
    gui_editor.innerHTML = '';

    const parsed = jsyaml.load(window['sac-configuration']);

    console.log(JSON.stringify(parsed, null, 4));

    /* Flag System */
    {

        const flag_system_section = EditorControlGenerator.newSection('Flag System:', gui_editor);

        // enableAntiCheat
        EditorControlGenerator.new(
            InputType.Checkbox,
            'editor-control-flag_system-enableAntiCheat',
            flag_system_section,
            'Enable Anti-Cheat',
            'The on / off switch for the entire plugin. If turned off, the plugin will not check for any violations.',
            parsed['flag-system']['enableAntiCheat']
        );
        
        // disablerTimeOnJoin
        EditorControlGenerator.new(
            InputType.Number,
            'editor-control-flag_system-disablerTimeOnJoin',
            flag_system_section,
            'Disabler Time on Join',
            'Disables the anti-cheat temporarily for a player when they first join. Time is measured in ticks, so 20 = 1 second. This can be helpful for preventing falses upon joining.',
            parsed['flag-system']['disablerTimeOnJoin']
        );

        // cancelEventIfHacking
        EditorControlGenerator.new(
            InputType.Checkbox,
            'editor-control-flag_system-cancelEventIfHacking',
            flag_system_section,
            'Cancel Event if Hacking',
            'If turned on, this cancels a player\'s current game event if they are flagged as hacking.<br /><br />Some notes:<ul style="margin:0.25em"><li>If turned off, the anticheat will detect violations incredibly quick, but won\'t take action on them.</li><li>If turned on, the anti-cheat detection becomes slightly less sensitive.</li></ul>',
            parsed['flag-system']['cancelEventIfHacking']
        );

        // teleportSensitivity
        EditorControlGenerator.new(
            InputType.Number,
            'editor-control-flag_system-teleportSensitivity',
            flag_system_section,
            'Teleport Sensitivity',
            'How sensitive the anti-cheat should be about teleporting. Lower numbers may cause many false flags, and higher numbers may not detect certain hacks. A good balance is 5, and the recommended minimum is 2. Values under 2 make the anti-cheat too sensitive.',
            parsed['flag-system']['teleportSensitivity']
        );

        // warnFlaggedPlayer
        EditorControlGenerator.new(
            InputType.Checkbox,
            'edtior-control-flag_system-warnFlaggedPlayer',
            flag_system_section,
            'Warn Flagged Players',
            'If turned on, the anti-cheat will notify and warn players who are hacking.',
            parsed['flag-system']['warnFlaggedPlayer']
        );
        
        // clearViolations
        EditorControlGenerator.newDropdown(
            'editor-dropdown-flag_system-clearViolations',
            flag_system_section,
            'Clear Violations',
            [

                // clearAllViolationsTimer
                EditorControlGenerator.new(
                    InputType.Checkbox,
                    'editor-control-flag_system-clearAllViolationsTimer',
                    flag_system_section,
                    'Clear Violations',
                    'If turned on, every player will have their violations cleared after a certain amount of time defined below as \'Clear Violations Time\'',
                    parsed['flag-system']['clearAllViolationsTimer']
                ),

                // clearAllViolationsTimerNum
                EditorControlGenerator.new(
                    InputType.Number,
                    'edtior-control-flag_system-clearAllViolationsTimerNum',
                    flag_system_section,
                    'Clear Violations Time',
                    '<span class="editor-dependent">(DEPENDENT)</span>The amount of time to wait (in seconds) to clear players\' violations. Dependent on \'Clear Violatons Time\' defined above.',
                    parsed['flag-system']['clearAllViolationsTimerNum']
                )

            ]
        );

        // autoKick
        EditorControlGenerator.newDropdown(
            'editor-dropdown-flag_system-autoKick',
            flag_system_section,
            'Auto Kick',
            [

                // autoViolationKick
                EditorControlGenerator.new(
                    InputType.Checkbox,
                    'editor-control-flag_system-autoViolationKick',
                    flag_system_section,
                    'Enable Auto Violation Kick',
                    'If turned on, the anti-cheat will automatically kick players from the server if they are deemed to be hacking.',
                    parsed['flag-system']['autoViolationKick']
                ),

                // violationKickNumUntilKick
                EditorControlGenerator.new(
                    InputType.Number,
                    'editor-control-flag_system-violationKickNumUntilKick',
                    flag_system_section,
                    'Violations Until Kick',
                    '<span class="editor-dependent">(DEPENDENT)</span>The number of violations that can occur before a player is kicked. This is dependent on \'Auto Violation Kick\' defined above.',
                    parsed['flag-system']['violationKickNumUntilKick']
                ),

                // useUsageForAutoKick
                EditorControlGenerator.new(
                    InputType.Checkbox,
                    'editor-control-flag_system-useUsageForAutoKick',
                    flag_system_section,
                    'Use Usage for Auto Kick',
                    '<span class="editor-dependent">(DEPENDENT)</span>If turned on, the anti-cheat will execute the \'Usage Kick\' command defined below when a player kick is triggered, instead of SAC\'s built-in kick system. This is dependent on \'Violations Until Kick\' defined above being on.',
                    parsed['flag-system']['useUsageForAutoKick']
                ),

                // usageKick
                EditorControlGenerator.new(
                    InputType.Text,
                    'editor-control-flag_system-usageKick',
                    flag_system_section,
                    'Usage Kick',
                    '<span class="editor-dependent">(DEPENDENT)</span>This is the command executed if \'Use Usage for Auto Kick\' is turned on. Make sure to exclude the ( / ) slash at the beginning!',
                    parsed['flag-system']['usageKick']
                )

            ]    
        );

        // enableAutoBan
        EditorControlGenerator.newDropdown(
            'editor-dropdown-flag_system-autoBan',
            flag_system_section,
            'Auto Ban',
            [

                // enableAutoBan.enableAutoBan
                EditorControlGenerator.new(
                    InputType.Checkbox,
                    'edtior-control-flag_system-enableAutoBan-enableAutoBan',
                    flag_system_section,
                    'Enable Auto Ban',
                    'If turned on, the anti-cheat will automatically ban flagged players.',
                    parsed['flag-system']['enableAutoBan']['enableAutoBan']
                ),

                // enableAutoBan.useUsageForAutoBan
                EditorControlGenerator.new(
                    InputType.Checkbox,
                    'editor-control-flag_system-enableAutoBan-useUsageForAutoBan',
                    flag_system_section,
                    'Use Usage for Auto Ban',
                    '<span class="editor-dependent">(DEPENDENT)</span>If enabled, If turned on, the anti-cheat will execute the \'Usage\' command defined below when a player ban is triggered, instead of SAC\'s built-in ban system.',
                    parsed['flag-system']['enableAutoBan']['useUsageForAutoBan']
                ),

                // enableAutoBan.usage
                EditorControlGenerator.new(
                    InputType.Text,
                    'editor-control-flag_system-enableAutoBan-usage',
                    flag_system_section,
                    'Usage',
                    '<span class="editor-dependent">(DEPENDENT)</span>This is the command executed if \'Use Usage for Auto Ban\' is turned on. Make sure to exclude the ( / ) slash at the beginning!',
                    parsed['flag-system']['enableAutoBan']['usage']
                ),

                // enableAutoBan.numPlayerKickUntilBan
                EditorControlGenerator.new(
                    InputType.Number,
                    'editor-control-flag_system-enableAutoBan-numPlayerKickUntilBan',
                    flag_system_section,
                    'Number of Kicks Before Ban',
                    '<span class="editor-dependent">(DEPENDENT)</span>This is dependent on both \'Auto Ban\' and \'Auto Kick\'. This specifies the number of times a player will be kicked before being banned.',
                    parsed['flag-system']['enableAutoBan']['numPlayerKickUntilBan']
                ),

                // enableAutoBan.autoBanTime
                EditorControlGenerator.new(
                    InputType.Number,
                    'editor-control-flag_system-enableAutoBan-autoBanTime',
                    flag_system_section,
                    'Auto Ban Length',
                    '<span class="editor-dependent">(DEPENDENT)</span>The amount of time (in hours) an auto ban will stay in effect for.',
                    parsed['flag-system']['enableAutoBan']['autoBanTime']
                )

            ]
        );

        // blacklisted-worlds
        EditorControlGenerator.newDropdown(
            'editor-dropdown-flag_system-blacklisted_worlds',
            flag_system_section,
            'Blacklisted Worlds',
            [

                // blacklisted-worlds
                EditorControlGenerator.new(
                    InputType.BigText,
                    'editor-control-flag_system-blacklisted_worlds',
                    flag_system_section,
                    'Blacklisted Worlds',
                    'A comma-separated list of worlds to turn off the anti-cheat in. (e.g. "world1, world2, world3, world4" etc.)',
                    parsed['flag-system']['blacklisted-worlds'].join(', ')
                )

            ]
        );

    }

    /* Thresholds */
    {
        const thresholds_section = EditorControlGenerator.newSection('Thresholds:', gui_editor);

        // irregularEventCount
        EditorControlGenerator.newDropdown(
            'editor-dropdown-thresholders-irregularEventCount',
            thresholds_section,
            'Irregular Event Counts',
            [

                // irregularEventCountLow
                EditorControlGenerator.new(
                    InputType.Number, 
                    'editor-control-thresholders-irregularEventCountLow', 
                    thresholds_section, 
                    'Irregular Event Count (Low)', 
                    'Lower, more sensitive bound of irregular event counts. Minimum amount of Regen or Timer irregular events to trigger violations.', 
                    parsed['thresholders']['irregularEventCountLow']
                ),

                // irregularEventCountMedium
                EditorControlGenerator.new(
                    InputType.Number, 
                    'editor-control-thresholders-irregularEventCountMedium', 
                    thresholds_section, 
                    'Irregular Event Count (Medium)', 
                    'Medium, average bound of irregular event counts. Average amount of Regen or Timer irregular events to trigger violations.', 
                    parsed['thresholders']['irregularEventCountMedium']
                ),

                // irregularEventCountHigh
                EditorControlGenerator.new(
                    InputType.Number, 
                    'editor-control-thresholders-irregularEventCountHigh', 
                    thresholds_section, 
                    'Irregular Event Count (High)', 
                    'High, extreme bound of irregular event counts. High amount of Regen or Timer irregular events to trigger violations.', 
                    parsed['thresholders']['irregularEventCountHigh']
                )

            ]
        );

        // violationThresholds
        EditorControlGenerator.newDropdown(
            'editor-dropdown-thresholders-violationThresholds',
            thresholds_section,
            'Violation Weights',
            [

                // roundedThresholdLow
                EditorControlGenerator.new(
                    InputType.Number, 
                    'editor-control-thresholders-roundedThresholdLow', 
                    thresholds_section, 
                    'Low Weight (Low Violation)', 
                    'Lower, more forgiving flag punishment. Applies this many violations per \'low-likelihood\' flag.', 
                    parsed['thresholders']['roundedThresholdLow']
                ),

                // roundedThresholdMedium
                EditorControlGenerator.new(
                    InputType.Number, 
                    'editor-control-thresholders-roundedThresholdMedium', 
                    thresholds_section, 
                    'Medium Weight (Medium Violation)', 
                    'Medium, average flag punishment. Applies this many violations per \'medium-likelihood\' flag.', 
                    parsed['thresholders']['roundedThresholdMedium']
                ),

                // roundedThresholdHigh
                EditorControlGenerator.new(
                    InputType.Number, 
                    'editor-control-thresholders-roundedThresholdHigh', 
                    thresholds_section, 
                    'High Weight (High Violation)', 
                    'High, severe flag punishment. Applies this many violations per \'high-likelihood\' flag.', 
                    parsed['thresholders']['roundedThresholdHigh']
                )

            ]
        );

    }

    /* Spaced Violation Messages */
    {

        const spaced_violation_messages = EditorControlGenerator.newSection('Space Violation Messages', gui_editor);

        // spacedViolationMessages
        EditorControlGenerator.new(
            InputType.Checkbox,
            'editor-control-spacedViolationMessages-spacedViolationMessages',
            spaced_violation_messages,
            'Space Violation Messages',
            'If turned on, the anti-cheat will only log every X violations, where X is the value of \'Violation Space Amount\' defined below.',
            parsed['spacedViolationMessages']['spacedViolationMessages']
        );

        // spacedViolationNotificationsNum
        EditorControlGenerator.new(
            InputType.Number,
            'editor-control-spacedViolationMessages-spacedViolationNotificationsNum',
            spaced_violation_messages,
            'Violation Space Amount',
            'Depends on if \'Space Violation Messages\' defined above is on. This is the number of violations a player must get flagged for before it logs a violation for them.<br/><br/>For example if this option is set to 4, and if a player gets flagged 16 times, the logs will only show 4 violations; one log every 4 violations.',
            parsed['spacedViolationMessages']['spacedViolationNotificationsNum']
        );

    }

    /* Item Attribute Checking */
    {

        const item_attribute_checking = EditorControlGenerator.newSection('Item Attribute Checking', gui_editor);

        // enableItemAttributeChecking
        EditorControlGenerator.new(
            InputType.Checkbox,
            'editor-control-item_attribute-enableItemAttributeChecking',
            item_attribute_checking,
            'Enable Item Attribute Checking',
            'If turned on, the anti-cheat will check for illegal / malformed item attributes.<br/><strong>Only turn this to true if your server uses item attributes, (Potion effects and enchantmentss don\'t count as item attributes!)</strong>',
            parsed['item-attribute']['enableItemAttributeChecking']
        );

        // counter
        EditorControlGenerator.new(
            InputType.Number,
            'editor-control-item_attribute-counter',
            item_attribute_checking,
            'Item Attribute Checking for Next Movement Packets',
            'When a player unequips a piece of armour, the item attribute checking will be disabled for X amount of movement packets sent after unequipping to prevent some false flags.',
            parsed['item-attribute']['counter']
        );

    }

    /* Movement */
    {

        const movement_section = EditorControlGenerator.newSection('Movement', gui_editor);

        /* BHop */
        {

            EditorControlGenerator.new(
                InputType.Number,
                'editor-control-movement-checkBHop-iceIncrease',
                movement_section,
                'Ice Speed Increase',
                'How much a player\'s speed will increase when walking on ice. This prevents Bunny Hop and Speed from accidentally flagging players on ice.',
                parsed['movement']['checkBHop']['iceIncrease']
            );

            // BHop options
            EditorControlGenerator.newDropdown(
                'editor-dropdown-movement-checkBHop-checkBHop',
                movement_section,
                'Check BHop',
                [

                    // checkBHop.checkBHop
                    EditorControlGenerator.new(
                        InputType.Checkbox,
                        'editor-control-movement-checkBHop-checkBHop',
                        movement_section,
                        'Check Bunny Hop',
                        'If turned on, the anti-cheat will run checks on players to detect Bunny Hop hacks.',
                        parsed['movement']['checkBHop']['checkBHop']
                    ),

                    // checkBHop.speedCheckMidAirA
                    EditorControlGenerator.new(
                        InputType.Number,
                        'editor-control-movement-checkBHop-speedCheckMidAirA',
                        movement_section,
                        'Max Speed over Block A',
                        'This sets the maximum speed a player can move at while on the ground. Linked with Bunny Hop checks. Dependent on \'Check Bunny Hop\' being turned on.',
                        parsed['movement']['checkBHop']['speedCheckMidAirA']
                    ),

                    // checkBHop.speedCheckbHopAlternativeB
                    EditorControlGenerator.new(
                        InputType.Number,
                        'editor-control-movement-checkBHop-speedCheckbHopAlternativeB',
                        movement_section,
                        'Max Speed over Block B',
                        'This sets an alternative speed a player can move at while 2 blocks off the ground. Linked with Bunny Hop checks. Dependent on \'Check Bunny Hop\' being turned on.',
                        parsed['movement']['checkBHop']['speedCheckbHopAlternativeB']
                    ),

                    // checkBHop.BhopUntilHackingA
                    EditorControlGenerator.new(
                        InputType.Number,
                        'editor-control-movement-checkBHop-BhopUntilHackingA',
                        movement_section,
                        'Bunny Hop A Flag Count Before Violation',
                        'This is the number of times a player can be flagged for \'Max Speed over Block A\' before it adds a violation to them. Dependent on \'Check Bunny Hop\' being turned on and \'Max Speed over Block A\' defined above.',
                        parsed['movement']['checkBHop']['BhopUntilHackingA']
                    ),

                    // checkBHop.BhopUntilHackingAlternativeB
                    EditorControlGenerator.new(
                        InputType.Number,
                        'editor-control-movement-checkBHop-BhopUntilHackingAlternativeB',
                        movement_section,
                        'Bunny Hop B Flag Count Before Violation',
                        'This is the number of times a player can be flagged for \'Max Speed over Block B\' before it adds a violation to them. Dependent on \'Check Bunny Hop\' being turned on and \'Max Speed over Block B\' defined above.',
                        parsed['movement']['checkBHop']['BhopUntilHackingAlternativeB']        
                    )

                ]
            )

        }

        /* Fast Ladder */
        {

            // checkFastLadder
            EditorControlGenerator.newDropdown(
                'editor-dropdown-movement-checkFastLadder',
                movement_section,
                'Fast Ladder',
                [

                    // checkFastLadder.checkFastLadder
                    EditorControlGenerator.new(
                        InputType.Checkbox,
                        'editor-control-movement-checkFastLadder-checkFastLadder',
                        movement_section,
                        'Check Fast Ladder',
                        'If turned on, the anti-cheat will detect Fast Ladder hacks.',
                        parsed['movement']['checkFastLadder']['checkFastLadder']
                    ),

                    // checkFastLadder.numUntilCheckingFastClimbA
                    EditorControlGenerator.new(
                        InputType.Number,
                        'editor-control-movement-checkFastLadder-numUntilCheckingFastClimbA',
                        movement_section,
                        'Suspect Count Before Flag',
                        'This is the amount of times the anti-cheat will suspect a player of using Fast Ladder before actually flagging them. Depends on \'Check Fast Ladder\' being turned on.',
                        parsed['movement']['checkFastLadder']['numUntilCheckingFastClimbA']
                    ),

                    // checkFastLadder.speedMaxClimbingA
                    EditorControlGenerator.new(
                        InputType.Number,
                        'editor-control-movement-checkFastLadder-speedMaxClimbingA',
                        movement_section,
                        'Maximum Climb Speed',
                        'This is the maximum speed a player can climb up ladders, water, lava, vines, etc. before the anti-cheat will flag them for Fast Ladder.',
                        parsed['movement']['checkFastLadder']['speedMaxClimbingA']
                    )

                ]
            )

        }

    }
}