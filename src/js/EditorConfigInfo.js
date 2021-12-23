/**
 * @author nethe550
 * @description Contains all instructions on how to construct the GUI elements, and a function to automatically generate them.
 */

/**
 * An enumeration of all dropdowns, input types, titles, descriptions, and all other associated metadata for each configuration option.
 * @enum
 */
const EditorConfigInfo = {

    optionTags: {
        optional: '<span class="editor-optional">(OPTIONAL)</span>',
        dependent: '<span class="editor-dependent">(DEPENDENT)</span>'
    },

    optionData: {

        'flag-system': {

            title: 'Flag System',

            enableAntiCheat: {
                dropdown: null,
                dependent: false,
                type: InputType.Checkbox,
                title: 'Enable Anti-Cheat',
                description: 'The on / off switch for the entire plugin. If turned off, the plugin will not check for any violations.'
            },

            disablerTimeOnJoin: {
                dropdown: null,
                dependent: false,
                type: InputType.Number,
                title: 'Disabler Time on Join',
                description: 'Disables the anti-cheat temporarily for a player when they first join. Time is measured in ticks, so 20 = 1 second. This can be helpful for preventing falses upon joining.'
            },

            cancelEventIfHacking: {
                dropdown: null,
                dependent: false,
                type: InputType.Checkbox,
                title: 'Cancel Event if Hacking',
                description: 'If turned on, this cancels a player\'s current game event if they are flagged as hacking.<br /><br />Some notes:<ul style="margin:0.25em"><li>If turned off, the anticheat will detect violations incredibly quick, but won\'t take action on them.</li><li>If turned on, the anti-cheat detection becomes slightly less sensitive.</li></ul>'
            },

            teleportSensitivity: {
                dropdown: null,
                dependent: false,
                type: InputType.Number,
                title: 'Teleport Sensitivity',
                description: 'How sensitive the anti-cheat should be about teleporting. Lower numbers may cause many false flags, and higher numbers may not detect certain hacks. A good balance is 5, and the recommended minimum is 2. Values under 2 make the anti-cheat too sensitive.'
            },

            warnFlaggedPlayer: {
                dropdown: null,
                dependent: false,
                type: InputType.Checkbox,
                title: 'Warn Flagged Players',
                description: 'If turned on, the anti-cheat will notify and warn players who are hacking.'
            },

            clearAllViolationsTimer: {
                dropdown: {
                    id: 'clearViolations',
                    title: 'Clear Violations'
                },
                dependent: false,
                type: InputType.Checkbox,
                title: 'Clear Violations',
                description: 'If turned on, every player will have their violations cleared after a certain amount of time defined below as \'Clear Violations Time\'.'
            },

            clearAllViolationsTimerNum: {
                dropdown: {
                    id: 'clearViolations',
                    title: 'Clear Violations',
                },
                dependent: true,
                type: InputType.Number,
                title: 'Clear Violations Timer',
                description: 'The amount of time to wait (in seconds) to clear players\' violations. Dependent on \'Clear Violatons Time\' defined above.'
            },

            autoViolationKick: {
                dropdown: {
                    id: 'autoKick',
                    title: 'Auto Kick'
                },
                dependent: false,
                type: InputType.Checkbox,
                title: 'Enable Auto Violation Kick',
                description: 'If turned on, the anti-cheat will automatically kick players from the server if they are deemed to be hacking.'
            },

            violationKickNumUntilKick: {
                dropdown: {
                    id: 'autoKick',
                    title: 'Auto Kick'
                },
                dependent: true,
                type: InputType.Number,
                title: 'Violations Until Kick',
                description: 'The number of violations that can occur before a player is kicked. This is dependent on \'Auto Violation Kick\' defined above.'
            },

            useUsageForAutoKick: {
                dropdown: {
                    id: 'autoKick',
                    title: 'Auto Kick'
                },
                dependent: true,
                type: InputType.Checkbox,
                title: 'Use Custom Command for Auto Kick',
                description: 'If turned on, the anti-cheat will execute the \'Custom Kick Command\' command defined below when a player kick is triggered, instead of SAC\'s built-in kick system. This is dependent on \'Violations Until Kick\' defined above being on.'
            },

            usageKick: {
                dropdown: {
                    id: 'autoKick',
                    title: 'Auto Kick'
                },
                dependent: true,
                type: InputType.Text,
                title: 'Custom Kick Command',
                description: 'This is the command executed if \'Use Custom Command for Auto Kick\' is turned on. Make sure to exclude the ( / ) slash at the beginning!'
            },

            enableAutoBan: {
                dropdown: {
                    id: 'autoBan',
                    title: 'Auto Ban'
                },
                dependent: false,
                type: InputType.Checkbox,
                title: 'Enable Auto Ban',
                description: 'If turned on, the anti-cheat will automatically ban flagged players.'
            },

            useUsageForAutoBan: {
                dropdown: {
                    id: 'autoBan',
                    title: 'Auto Ban'
                },dependent: true,
                type: InputType.Checkbox,
                title: 'Use Custom Command for Ban',
                description: 'If enabled, If turned on, the anti-cheat will execute the \'Usage\' command defined below when a player ban is triggered, instead of SAC\'s built-in ban system.'
            },

            usage: {
                dropdown: {
                    id: 'autoBan',
                    title: 'Auto Ban'
                },
                dependent: true,
                type: InputType.Text,
                title: 'Custom Ban Command',
                description: 'This is the command executed if \'Use Usage for Auto Ban\' is turned on. Make sure to exclude the ( / ) slash at the beginning!'
            },

            numPlayerKickUntilBan: {
                dropdown: {
                    id: 'autoBan',
                    title: 'Auto Ban'
                },
                dependent: true,
                type: InputType.Number,
                title: 'Number of Kicks Before Ban',
                description: 'This is dependent on both \'Auto Ban\' and \'Auto Kick\'. This specifies the number of times a player will be kicked before being banned.'
            },

            autoBanTime: {
                dropdown: {
                    id: 'autoBan',
                    title: 'Auto Ban'
                },
                dependent: true,
                type: InputType.Number,
                title: 'Auto Ban Length',
                description: 'The amount of time (in hours) an auto ban will stay in effect for.'
            },

            'blacklisted-worlds': {
                dropdown: {
                    id: 'blacklisted-worlds',
                    title: 'Blacklisted Worlds'
                },
                dependent: false,
                type: InputType.BigText,
                title: 'Blacklisted Worlds',
                description: 'A comma-separated list of worlds to turn off the anti-cheat in. (e.g. "world1, world2, world3, world4" etc.)'
            }

        },

        'thresholders': {

            title: 'Thresholds',

            irregularEventCountLow: {
                dropdown: {
                    id: 'irregularEventCount',
                    title: 'Irregular Event Count'
                },
                dependent: false,
                type: InputType.Number,
                title: 'Irregular Event Count (Low)',
                description: 'Lower, more sensitive bound of irregular event counts. Minimum amount of Regen or Timer irregular events to trigger violations.'
            },

            irregularEventCountMedium: {
                dropdown: {
                    id: 'irregularEventCount',
                    title: 'Irregular Event Count'
                },
                dependent: false,
                type: InputType.Number,
                title: 'Irregular Event Count (Medium)',
                description: 'Medium, average bound of irregular event counts. Average amount of Regen or Timer irregular events to trigger violations.'
            },

            irregularEventCountHigh: {
                dropdown: {
                    id: 'irregularEventCount',
                    title: 'Irregular Event Count'
                },
                dependent: false,
                type: InputType.Number,
                title: 'Irregular Event Count (High)',
                description: 'High, extreme bound of irregular event counts. High amount of Regen or Timer irregular events to trigger violations.'
            },

            roundedThresholdLow: {
                dropdown: {
                    id: 'roundedThreshold',
                    title: 'Violation Weights'
                },
                dependent: false,
                type: InputType.Number,
                title: 'Low Weight (Low Violation)',
                description: 'Lower, more forgiving flag punishment. Applies this many violations per \'low-likelihood\' flag.'
            },

            roundedThresholdMedium: {
                dropdown: {
                    id: 'roundedThreshold',
                    title: 'Violation Weights'
                },
                dependent: false,
                type: InputType.Number,
                title: 'Medium Weight (Medium Violation)',
                description: 'Medium, average flag punishment. Applies this many violations per \'medium-likelihood\' flag.'
            },

            roundedThresholdHigh: {
                dropdown: {
                    id: 'roundedThreshold',
                    title: 'Violation Weights'
                },
                dependent: false,
                type: InputType.Number,
                title: 'High Weight (High Violation)',
                description: 'High, severe flag punishment. Applies this many violations per \'high-likelihood\' flag.'
            }

        },

        'spacedViolationMessages': {

            title: 'Space Violation Messages',

            spacedViolationMessages: {
                dropdown: null,
                dependent: false,
                type: InputType.Checkbox,
                title: 'Space Violation Messages',
                description: 'If turned on, the anti-cheat will only log every X violations, where X is the value of \'Violation Space Amount\' defined below.'
            },

            spacedViolationNotificationsNum: {
                dropdown: null,
                dependent: true,
                type: InputType.Number,
                title: 'Violation Space Amount',
                description: 'Depends on if \'Space Violation Messages\' defined above is on. This is the number of violations a player must get flagged for before it logs a violation for them.<br/><br/>For example if this option is set to 4, and if a player gets flagged 16 times, the logs will only show 4 violations; one log every 4 violations.'
            }

        },

        'item-attribute': {

            title: 'Item Attribute Checking',

            enableItemAttributeChecking: {
                dropdown: null,
                dependent: false,
                type: InputType.Checkbox,
                title: 'Enable Item Attribute Checking',
                description: 'If turned on, the anti-cheat will check for illegal / malformed item attributes.<br/><strong>Only turn this to true if your server uses item attributes, (Potion effects and enchantmentss don\'t count as item attributes!)</strong>'
            },

            counter: {
                dropdown: null,
                dependent: true,
                type: InputType.Number,
                title: 'Item Attribute Checking for Next Movement Packets',
                description: 'When a player unequips a piece of armour, the item attribute checking will be disabled for X amount of movement packets sent after unequipping to prevent some false flags.'
            }

        },

        'movement': {

            title: 'Movement',

            iceIncrease: {
                dropdown: null,
                dependent: false,
                type: InputType.Number,
                title: 'Ice Speed Increase',
                description: 'How much a player\'s speed will increase when walking on ice. This prevents Bunny Hop and Speed from accidentally flagging players on ice.'
            },

            // BHop
            checkBHop: {
                dropdown: {
                    id: 'checkBHop',
                    title: 'Bunny Hop'
                },
                nested: 'checkBHop',
                dependent: false,
                type: InputType.Checkbox,
                title: 'Check Bunny Hop',
                description: 'If turned on, the anti-cheat will run checks on players to detect Bunny Hop hacks.'
            },

            speedCheckMidAirA: {
                dropdown: {
                    id: 'checkBHop',
                    title: 'Bunny Hop'
                },
                nested: 'checkBHop',
                dependent: true,
                type: InputType.Number,
                title: 'Max Speed over Block A',
                description: 'This sets the maximum speed a player can move at while on the ground. Linked with Bunny Hop checks. Dependent on \'Check Bunny Hop\' being turned on.'
            },

            speedCheckbHopAlternativeB: {
                dropdown: {
                    id: 'checkBHop',
                    title: 'Bunny Hop'
                },
                nested: 'checkBHop',
                dependent: true,
                type: InputType.Number,
                title: 'Max Speed over Block B',
                description: 'This sets an alternative speed a player can move at while 2 blocks off the ground. Linked with Bunny Hop checks. Dependent on \'Check Bunny Hop\' being turned on.'
            },

            BhopUntilHackingA: {
                dropdown: {
                    id: 'checkBHop',
                    title: 'Bunny Hop'
                },
                nested: 'checkBHop',
                dependent: true,
                type: InputType.Number,
                title: 'Bunny Hop A Flag Count Before Violation',
                description: 'This is the number of times a player can be flagged for \'Max Speed over Block A\' before it adds a violation to them. Dependent on \'Check Bunny Hop\' being turned on and \'Max Speed over Block A\' defined above.'
            },

            BhopUntilHackingAlternativeB: {
                dropdown: {
                    id: 'checkBHop',
                    title: 'Bunny Hop'
                },
                nested: 'checkBHop',
                dependent: true,
                type: InputType.Number,
                title: 'Bunny Hop B Flag Count Before Violation',
                description: 'This is the number of times a player can be flagged for \'Max Speed over Block B\' before it adds a violation to them. Dependent on \'Check Bunny Hop\' being turned on and \'Max Speed over Block B\' defined above.'
            },
            // END BHop

            // Fast Ladder
            checkFastLadder: {
                dropdown: {
                    id: 'checkFastLadder',
                    title: 'Fast Ladder'
                },
                nested: 'checkFastLadder',
                dependent: false,
                type: InputType.Checkbox,
                title: 'Check Fast Ladder',
                description: 'If turned on, the anti-cheat will detect Fast Ladder hacks.'
            },

            numUntilCheckingFastClimbA: {
                dropdown:{
                    id: 'checkFastLadder',
                    title: 'Fast Ladder'
                },
                nested: 'checkFastLadder',
                dependent: true,
                type: InputType.Number,
                title: 'Suspect Count Before Flag',
                description: 'This is the amount of times the anti-cheat will suspect a player of using Fast Ladder before actually flagging them. Depends on \'Check Fast Ladder\' being turned on.'
            },

            speedMaxClimbingA: {
                dropdown: {
                    id: 'checkFastLadder',
                    title: 'Fast Ladder'
                },
                nested: 'checkFastLadder',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Climb Speed',
                description: 'This is the maximum speed a player can climb up ladders, water, lava, vines, etc. before the anti-cheat will flag them for Fast Ladder.'
            },
            // END Fast Ladder

            // Flight
            checkFly: {
                dropdown: {
                    id: 'checkFly',
                    title: 'Fly',
                },
                nested: 'checkFly',
                dependent: false,
                type: InputType.Checkbox,
                title: 'Check Fly',
                description: 'If turned on, the anti-cheat will flag players for flying when they shouldn\'t.'
            },

            inAirJumpUntilHackingA: {
                dropdown: {
                    id: 'checkFly',
                    title: 'Fly',
                },
                nested: 'checkFly',
                dependent: true,
                type: InputType.Number,
                title: 'In-Air Jumps Before Violation',
                description: 'This is the number of times a player can jump while mid-air before the anti-cheat will flag them for flying. Dependent on \'Check Fly\' being turned on.'
            },

            inAirJumpUntilCheckB: {
                dropdown: {
                    id: 'checkFly',
                    title: 'Fly',
                },
                nested: 'checkFly',
                dependent: true,
                type: InputType.Number,
                title: 'In-Air Jump Timeout',
                description: 'This is the number of packets sent by a player while in the air before checking for in-air jumps. Depends on \'Check Fly\' being turned on.'
            },

            inAirUpwardUntilHackingB: {
                dropdown: {
                    id: 'checkFly',
                    title: 'Fly',
                },
                nested: 'checkFly',
                dependent: true,
                type: InputType.Number,
                title: 'In-Air Upward Movement Before Violation',
                description: 'This is the number of packets sent by a player while in the air and moving upward before adding a violation to the player. Depends on \'Check Fly\' being turned on.'
            },

            levitationDownUntilHackingC: {
                dropdown: {
                    id: 'checkFly',
                    title: 'Fly',
                },
                nested: 'checkFly',
                dependent: true,
                type: InputType.Number,
                title: 'Levitation Downward Movement Before Violation',
                description: 'This is the number of times a player with the levitation effect can move downward before adding a violation to the player. Depends on \'Check Fly\' being turned on.'
            },

            checkFlightE: {
                dropdown: {
                    id: 'checkFly',
                    title: 'Fly',
                },
                nested: 'checkFly',
                dependent: true,
                type: InputType.Checkbox,
                title: 'Check Fly (E)',
                description: 'The \'E\' fly check. Close to impossible to get a false flag from this check. Depends on \'Check Fly\' being turned on.'
            },
            // END Flight

            // Irregular Pitch
            checkIrregularPitch: {
                dropdown: {
                    id: 'checkIrregularPitch',
                    title: 'Irregular Pitch'
                },
                nested: 'checkIrregularPitch',
                dependent: false,
                type: InputType.Checkbox,
                title: 'Check Irregular Pitch',
                description: 'If turned on, the anti-cheat will flag players for illegal / irregular camera pitches.'
            },

            irregularPitchNegativeMaxA: {
                dropdown: {
                    id: 'checkIrregularPitch',
                    title: 'Irregular Pitch'
                },
                nested: 'checkIrregularPitch',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Negative Look Angle',
                description: 'The maximum angle a player can look downwards to before being flagged. Dependent on \'Check Irregular Pitch\' being turned on.'
            },

            irregularPitchPositiveMaxA: {
                dropdown: {
                    id: 'checkIrregularPitch',
                    title: 'Irregular Pitch'
                },
                nested: 'checkIrregularPitch',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Positive Look Angle',
                description: 'The maximum angle a player can look upwards to before being flagged. Dependent on \'Check Irregular Pitch\' being turned on.'
            },
            // END Irregular Pitch

            // No Fall
            checkNoFall: {
                dropdown: {
                    id: 'checkNoFall',
                    title: 'No Fall'
                },
                nested: 'checkNoFall',
                dependent: false,
                type: InputType.Checkbox,
                title: 'Check No Fall',
                description: 'If turned on, the anti-cheat will flag players who spoof their ground position, a.k.a No Fall.'
            },

            noFallBlockHeightA: {
                dropdown: {
                    id: 'checkNoFall',
                    title: 'No Fall'
                },
                nested: 'checkNoFall',
                dependent: true,
                type: InputType.Number,
                title: 'No Fall Tolerance',
                description: 'The number of blocks a player can fall from without getting flagged for No Fall.'
            },

            noFallTimerA: {
                dropdown: {
                    id: 'checkNoFall',
                    title: 'No Fall'
                },
                nested: 'checkNoFall',
                dependent: true,
                type: InputType.Number,
                title: 'No Fall Timer',
                description: 'The number of game ticks to wait while a player is falling before checking them for No Fall.'
            },
            // END No Fall

            // Glide
            checkGlide: {
                dropdown: {
                    id: 'checkGlide',
                    title: 'Glide'
                },
                nested: 'checkGlide',
                dependent: false,
                type: InputType.Checkbox,
                title: 'Check Glide',
                description: 'If turned on, the anti-cheat will flag players for gliding.'
            },

            speedMinimumWhenDescendingA: {
                dropdown: {
                    id: 'checkGlide',
                    title: 'Glide'
                },
                nested: 'checkGlide',
                dependent: true,
                type: InputType.Number,
                title: 'Minimum Descent Speed',
                description: 'This is the minimum speed at which a player can fall down at without being flagged.'
            },

            speedMinimumWhenDescendingB: {
                dropdown: {
                    id: 'checkGlide',
                    title: 'Glide'
                },
                nested: 'checkGlide',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Acceleration',
                description: 'This is the maximum acceleration a player can endure before being flagged for flying. This essentially detects a player suddenly stopping mid-air.'
            },

            glideUntilHackingA: {
                dropdown: {
                    id: 'checkGlide',
                    title: 'Glide'
                },
                nested: 'checkGlide',
                dependent: true,
                type: InputType.Number,
                title: 'Flag Amount before Violation (Minimum Descent Speed)',
                description: 'This is the amount of times a player can be flagged by the \'Minimum Descent Speed\' flag before having a violation added to them.'
            },

            glideUntilHackingB: {
                dropdown: {
                    id: 'checkGlide',
                    title: 'Glide'
                },
                nested: 'checkGlide',
                dependent: true,
                type: InputType.Number,
                title: 'Flag Amount before Violation (Maximum Acceleration)',
                description: 'This is the amount of times a player can be flagged by the \'Maximum Acceleration\' flag before having a violation added to them.'
            },
            // END Glide

            // Elytra Flight
            checkElytraFlight: {
                dropdown: {
                    id: 'checkElytraFlight',
                    title: 'Elytra Flight'
                },
                nested: 'checkElytraFlight',
                dependent: false,
                type: InputType.Checkbox,
                title: 'Check Elytra Flight',
                description: 'If turned on, the anti-cheat will flag players with elytra attempting to fly illegally / inconsistently.'
            },

            elytraFlightUntilHacking: {
                dropdown: {
                    id: 'checkElytraFlight',
                    title: 'Elytra Flight'
                },
                nested: 'checkElytraFlight',
                dependent: true,
                type: InputType.Number,
                title: 'Movement Packets While Elytra Flying Before Flag',
                description: 'This is the number of movement packets that can be recieved by a player, flying with elytra, and having not used a firework. If a player flies with elytra for more than this number, then they will be flagged for Elytra Flight'
            },

            elytraFlightLimitB: {
                dropdown: {
                    id: 'checkElytraFlight',
                    title: 'Elytra Flight'
                },
                nested: 'checkElytraFlight',
                dependent: true,
                type: InputType.Number,
                title: 'Horizontal Elytra Flight for Movement Packets Limit',
                description: 'This is the number of movement packets that a player can fly in the same Y coordinate, a.k.a. hovering, without being flagged.'
            },

            elytraFlightSpeedMinB: {
                dropdown: {
                    id: 'checkElytraFlight',
                    title: 'Elytra Flight'
                },
                nested: 'checkElytraFlight',
                dependent: true,
                type: InputType.Number,
                title: 'Minimum Valid Elytra Flight Speed',
                description: 'This is the minimum speed a player can fly at while being considered hovering without being flagged, based on \'Horizontal Elytra Flight for Movement Packets Limit\' defined above.'
            },
            // END Elytra Flight

            // Speed
            checkSpeed: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: false,
                type: InputType.Checkbox,
                title: 'Check Speed',
                description: 'If turned on, the anti-cheat will flag players moving faster than they should be.'
            },

            speedAmplifierThreshold: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Speed Amplifier Threshold',
                description: 'This is the amplifier of the speed check thresholds when a player has the speed potion effect.'
            },

            jumpAmplifierThreshold: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Jump Amplifier Threshold',
                description: 'This is the amplifier of the speed check thresholds when a player has the jump boost potion effect.'
            },

            speedCheckWhenInAirAlternativeA: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum In Air Speed',
                description: 'This is the maximum speed a player can be moving in-air while staying within the same Y coordinate.'
            },

            speedCheckWhenInAirAlternativeNumA: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Movement Packet Rate Until Flag',
                description: 'This is the amount of movement packets that a player can send while staying within the same Y coordinate before they start getting flagged.'
            },

            speedMaxUnderBlockB: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Speed Under Block',
                description: 'This is the maximum a player can be moving with a block over their head. (To account for head-hitters / sprint jumping)'
            },

            speedMaxInAirC: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Speed In Air (A)',
                description: 'The maximum speed a player can move at while in the air without being flagged. (Maximum default speed is 60)',
            },

            speedMaxInVehicleD: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Speed In Vehicle',
                description: 'The maximum speed a player can move at while in a vehicle without being flagged. (Not including boats)'
            },

            speedMaxOnGroundE: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Speed On Ground',
                description: 'The maximum speed a player can move at while on the ground without being flagged.'
            },

            speedMaxOnIceF: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Speed On Ice',
                description: 'The maximum speed a player can move at while on ice without being flagged.'
            },

            speedMaxInWaterG: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Speed In Water',
                description: 'The maximum speed a player can move at while in water without being flagged.'
            },

            speedMaxWhenAscendingH: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Ascent Speed',
                description: 'The maximum speed a player can ascend (in water, on ladder, etc.) without being flagged.'
            },

            speedMaxWhenDescendingI: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Descent Speed',
                description: 'The maximum speed a player can fall at without being flagged. (Maximum default speed is 40)'
            },

            speedCheckMidAirAlternativeJ: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Speed In Air (B)',
                description: 'The maximum speed a player can move in-air at, in the same Y coordinate, without being flagged.'
            },

            speedMaxInWaterNumK: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Speed In Water Flag Amount Before Violation',
                description: 'The number of times a player must be flagged by the \'Maximum Speed In Water\' check defined above before adding a violation to them.'
            },

            speedMaxXZL: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Diagonal Speed',
                description: 'The maximum speed a player can move diagonally at without being flagged.'
            },

            speedMaxOnBlockM: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Speed On Block',
                description: 'The maximum speed a player can move at while on a block without being flagged.'
            },

            speedMaxXZMaxL: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Speed On Block Flag Amount Before Violation',
                description: 'The number of times a player must be consistently flagged by the \'Maximum Speed On Block\' check defined above before adding a violation to them.'
            },

            speedMaxYN: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Vertical Speed',
                description: 'The maximum speed a player can ascend at without being flagged.'
            },

            maxSpeedElytra: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Elytra Speed',
                description: 'The maximum speed a player can fly with elytra at. (Maximum default speed is 40)'
            },

            speedMaxYNFlag: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Vertical Speed Flag Amount Before Violation',
                description: 'The number of times a player must be flagged by the \'Maximum Vertical Speed\' check defined above before adding a violation to them.'
            },

            onSlimeTillCheckSpeed: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'On Slime Speed Check Disable Timer',
                description: 'The number of movement packets to recieve after a player has begun standing on slime, before checking for Speed. Prevents false flags.'
            },

            maxSpeedBoatP: {
                dropdown: {
                    id: 'checkSpeed',
                    title: 'Speed'
                },
                nested: 'checkSpeed',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Boat Speed On Ice',
                description: 'The maximum speed at which a player in a boat can move at, when on or near ice.'
            },
            // END Speed

            // Spider
            checkSpider: {
                dropdown: {
                    id: 'checkSpider',
                    title: 'Spider'
                },
                nested: 'checkSpider',
                dependent: false,
                type: InputType.Checkbox,
                title: 'Check Spider',
                description: 'If turned on, the anti-cheat will flag players who use Spider, a.k.a. climbing up walls.'
            },

            spiderUpUntilHackingA: {
                dropdown: {
                    id: 'checkSpider',
                    title: 'Spider'
                },
                nested: 'checkSpider',
                dependent: true,
                type: InputType.Number,
                title: 'Climb Height Before Flag (A)',
                description: 'The maximum height, in blocks, a player can climb up a wall before flagging them.'
            },

            spiderUpUntilHackingAlternativeB: {
                dropdown: {
                    id: 'checkSpider',
                    title: 'Spider'
                },
                nested: 'checkSpider',
                dependent: true,
                type: InputType.Number,
                title: 'Climb Height Before Flag (B)',
                description: 'The maximum height, in blocks, a player can climb up a wall before flagging them. Different checking method than \'Climb Height Before Flag (A)\'.'
            },
            // END Spider

            // Irregular Movement
            checkIrrMovement: {
                dropdown: {
                    id: 'checkIrrMovement',
                    title: 'Irregular Movement'
                },
                nested: 'checkIrrMovement',
                dependent: false,
                type: InputType.Checkbox,
                title: 'Check Irregular Movement',
                description: 'if turned on, the anti-cheat will flag players who move irregularly (This also catches Bunny Hop and Speed flags).'
            },

            irrMovementPacketSamples: {
                dropdown: {
                    id: 'checkIrrMovement',
                    title: 'Irregular Movement'
                },
                nested: 'checkIrrMovement',
                dependent: true,
                type: InputType.Number,
                title: 'Irregular Movement Packet Sample Size',
                description: 'The size of irregular movement packet chunks to log. The anti-cheat will log the first and last packet in the sample.<br/><br/>Example:<br/>A sample size of 5 will log every 1st and 5th flag of each sample.'
            },

            irrMaxDistance: {
                dropdown: {
                    id: 'checkIrrMovement',
                    title: 'Irregular Movement'
                },
                nested: 'checkIrrMovement',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Discrepancy Between Packets',
                description: 'The maximum distance between two consecutive movement packets before the player is flagged.'
            },

            irrYAxisIgnore: {
                dropdown: {
                    id: 'checkIrrMovement',
                    title: 'Irregular Movement'
                },
                nested: 'checkIrrMovement',
                dependent: true,
                type: InputType.Number,
                title: 'Y Axis Ignore',
                description: 'The minimum distance between two consecutive movement packets before performing Irregular Movement checks.'
            },

            irrMovementPacketSamplesB: {
                dropdown: {
                    id: 'checkIrrMovement',
                    title: 'Irregular Movement'
                },
                nested: 'checkIrrMovement',
                dependent: true,
                type: InputType.Number,
                title: 'Irregular Movement Packet Sample Size (Alternate)',
                description: 'Does the same thing as \'Irregular Movement Packet Sample Size\' defined above, but with a different method.'
            },

            irrMaxDistanceB: {
                dropdown: {
                    id: 'checkIrrMovement',
                    title: 'Irregular Movement'
                },
                nested: 'checkIrrMovement',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Discrepancy Between Packets (Alternate)',
                description: 'Does the same thing as \'Maximum Discrepancy Between Packets\' defined above, but with a different method.'
            },

            irrYAxisIgnoreB: {
                dropdown: {
                    id: 'checkIrrMovement',
                    title: 'Irregular Movement'
                },
                nested: 'checkIrrMovement',
                dependent: true,
                type: InputType.Number,
                title: 'Y Axis Ignore (Alternate)',
                description: 'Does the same thing as \'Y Axis Ignore\' defined above, but with a different method.'
            },
            // END Irregular Movement

            // Fluid Walk
            checkWalkOnFluid: {
                dropdown: {
                    id: 'checkWalkOnFluid',
                    title: 'Fluid Walk'
                },
                nested: 'checkWalkOnFluid',
                dependent: false,
                type: InputType.Checkbox,
                title: 'Check Fluid Walk',
                description: 'If turned on, the anti-cheat will flag players who use Fluid Walk, a.k.a Water Walk, Lava Walk, or Jesus.'
            },

            fluidWalkUntilHackingAlternativeA: {
                dropdown: {
                    id: 'checkWalkOnFluid',
                    title: 'Fluid Walk'
                },
                nested: 'checkWalkOnFluid',
                dependent: true,
                type: InputType.Number,
                title: 'Movement Packet Amount On Water Before Flag',
                description: 'The amount of movement packets a player can stand on water for without being flagged.'
            },

            fluidJumpsOnWaterUntilHackingB: {
                dropdown: {
                    id: 'checkWalkOnFluid',
                    title: 'Fluid Walk'
                },
                nested: 'checkWalkOnFluid',
                dependent: true,
                type: InputType.Number,
                title: 'Movement Packet Amount Above Water Before Flag',
                description: 'The amount of movement packets a player can float above water for without being flagged.'
            },

            fluidWalkIrregularSpeedB: {
                dropdown: {
                    id: 'checkWalkOnFluid',
                    title: 'Fluid Walk'
                },
                nested: 'checkWalkOnFluid',
                dependent: true,
                type: InputType.Number,
                title: 'Maximum Speed On Water',
                description: 'The maximum speed a player can move at when on water without being flagged.'
            },

            fluidWalkUntilHackingC: {
                dropdown: {
                    id: 'checkWalkOnFluid',
                    title: 'Fluid Walk'
                },
                nested: 'checkWalkOnFluid',
                dependent: true,
                type: InputType.Number,
                title: 'Movement Packet Amount On Water Before Flag',
                description: 'The amount of movement packets a player can stand on water for without being flagged.'
            },

            fluidWalkDCheck: {
                dropdown: {
                    id: 'checkWalkOnFluid',
                    title: 'Fluid Walk'
                },
                nested: 'checkWalkOnFluid',
                dependent: true,
                type: InputType.Checkbox,
                title: '(Legacy) Hard-Coded Fluid Walk Check',
                description: 'This is not customizable, but can be enabled and disabled. The values for this check are hard-coded, and may cause some false flags.'
            },
            // END Fluid Walk

        },

        'other': {

            title: 'Other',

            ignoreZeroPing: {
                dropdown: null,
                dependent: false,
                type: InputType.Checkbox,
                title: 'Ignore Zero Ping Players',
                description: 'If turned on, the anti-cheat will ignore players with 0 ping. Players with 0 ping are usually people who are on the same machine as the server, like admins or server owners.'
            },

            debugMode: {
                dropdown: null,
                dependent: false,
                type: InputType.Checkbox,
                title: 'Debug Mode',
                description: 'If turned on, the anti-cheat will log all flags, violations, and their respective configuration variables in game chat.<br/><br/><span style="color:rgb(255,128,128)">NOTE: THIS BROADCASTS TO THE ENTIRE SERVER!</span>'
            },

            updateNotifications: {
                dropdown: null,
                dependent: false,
                type: InputType.Checkbox,
                title: 'Plugin Update Notifications',
                description: 'If turned on, players with the <code>sac.notify</code> permission will be notified in game chat if the anti-cheat is outdated or has a new update.'
            }

        }

    }

}

/**
 * Generates the necessary GUI elements from a YAML -> JSON parsed object.
 * @function
 * @param {{}} parsedYML - The YAML -> JSON parsed object.
 */
function GenerateEditorControls(parsedYML) {

    const parent = document.getElementById('editor-controls');
    parent.innerHTML = '';

    let dropdowns = {};

    // iterate through root keys
    for (let rootKey of Object.keys(EditorConfigInfo['optionData'])) {

        // if editor config info root key is in parsed YML
        if (Object.keys(parsedYML).includes(rootKey)) {
            
            // create new section for this root key
            const root_section = EditorControlGenerator.newSection(EditorConfigInfo['optionData'][rootKey]['title'] ? EditorConfigInfo['optionData'][rootKey]['title'] : rootKey, parent, true);

            // get content div to put things in this section
            let root_section_content = root_section.getElementsByClassName('editor-section-content');

            // if multiple content divs found then pick first
            if (root_section_content.length) root_section_content = root_section_content[0];

            // iterate through option keys
            for (let optionKey of Object.keys(EditorConfigInfo['optionData'][rootKey])) {

                const nested = EditorConfigInfo['optionData'][rootKey][optionKey]['nested'] || null;

                // if editor config info option key is in parsed YML
                if (Object.keys(parsedYML[rootKey]).includes(optionKey) || nested) {

                    const generateOption = (rootKey, optionKey, dropdowns) => {

                        // apply custom tags to description
                        let description = EditorConfigInfo['optionData'][rootKey][optionKey]['description'];

                        if (EditorConfigInfo['optionData'][rootKey][optionKey]['dependent']) description = EditorConfigInfo['optionTags']['dependent'] + description;
                        if (EditorConfigInfo['optionData'][rootKey][optionKey]['optional']) description = EditorConfigInfo['optionTags']['optional'] + description;
                        
                        // create new option
                        const option = EditorControlGenerator.new(
                            EditorConfigInfo['optionData'][rootKey][optionKey]['type'],
                            `editor-control-${rootKey}-${optionKey}`,
                            null,
                            EditorConfigInfo['optionData'][rootKey][optionKey]['title'],
                            description,
                            nested != null ? parsedYML[rootKey][nested][optionKey] : parsedYML[rootKey][optionKey]
                        );

                        // assign oninput listener to the option input
                        if (window['config-manager']) {

                            /**
                             * @type {HTMLInputElement}
                             */
                            let input = option.getElementsByClassName('editor-control-input-wrapper')[0].getElementsByTagName('input')[0];

                            switch (EditorConfigInfo['optionData'][rootKey][optionKey]['type']) {

                                case InputType.Checkbox:
                                    input.oninput = () => window['config-manager'].updateConfig(input.checked, rootKey, optionKey);
                                    break;

                                case InputType.Number:
                                case InputType.Text:
                                case InputType.BigText:
                                    input.oninput = () => window['config-manager'].updateConfig(input.value, rootKey, optionKey);
                                    break;

                            }

                        }
        
                        // check if option is in dropdown
                        if (EditorConfigInfo['optionData'][rootKey][optionKey]['dropdown']) {
        
                            // if dropdown doesn't exist, then create one
                            if (!dropdowns[EditorConfigInfo['optionData'][rootKey][optionKey]['dropdown']['id']]) {

                                // create dropdown
                                dropdowns[EditorConfigInfo['optionData'][rootKey][optionKey]['dropdown']['id']] = EditorControlGenerator.newDropdown(
                                    `editor-dropdown-${EditorConfigInfo['optionData'][rootKey][optionKey]['dropdown']['id']}`,
                                    root_section_content,
                                    EditorConfigInfo['optionData'][rootKey][optionKey]['dropdown']['title']
                                );

                                // assign sub-key
                                dropdowns[EditorConfigInfo['optionData'][rootKey][optionKey]['dropdown']['id']]['subKey'] = EditorConfigInfo['optionData'][rootKey][optionKey]['nested'];
        
                            }

                            // add option to dropdown
                            EditorControlGenerator.addToDropdown(dropdowns[EditorConfigInfo['optionData'][rootKey][optionKey]['dropdown']['id']], [ option ]);
        
                        }
                        // else just add option
                        else root_section_content.appendChild(option);

                    };

                    generateOption(rootKey, optionKey, dropdowns);

                }

            }

        }

    }

}

/**
 * Gets a serialized object of all editor control values.
 * @function
 */
function GetEditorControlValues() {


    
}