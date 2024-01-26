export class TokenInfoIcons35E {
    static async addTokenInfoButtons(app, html, data) {
        console.info("Token Info Icons | Adding token info buttons for D35E");
        let actor = canvas.tokens.get(data._id).actor;
        if (actor === undefined) return;

        let ac = actor.system.attributes.ac.normal.total;

        let speed = '<span class="token-info-speed" title="Land"><i class="fas fa-walking"></i> ' + actor.system.attributes.speed.land.total + '</span>';

        let initiative = null;
        if (actor.data.type === "Player") {
            initiative = actor.system.attributes.init.total;
        }

        // D35E-specific buttons
        let newdiv = '<div class="token-info-container">';
        let position = game.settings.get('token-info-icons-d35e', 'position');

        const speedButton = `<div class="control-icon token-info-icon" title="Speed">${speed}</div>`;
        const acButton = `<div class="control-icon token-info-icon" title="Armor Class: ${ac}"><i class="fas fa-shield-alt"></i> ${ac}</div>`;
        
        let defaultButtons = `${speedButton}${acButton}`;

        if (initiative != null) {
            const initiativeButton = `<div class="control-icon token-info-icon" title="Initiative: ${initiative}"><i class="fas fa-bolt"></i> ${initiative}</div>`;
            defaultButtons += initiativeButton;
        }

        let buttons = $(`<div class="col token-info-column-${position}">${defaultButtons}</div>`);

        html.find('.col.left').wrap(newdiv);
        html.find('.col.left').before(buttons);
    }
}

class TokenInfoIcons {
    static async addTokenInfoButtons(app, html, data) {
        
        switch (game.world.system) {
            case "D35E":
                
                console.info("Token Info Icons | Adding token info buttons for D35E");
                return TokenInfoIcons35E.addTokenInfoButtons(app, html, data);
            default:
                console.info("Token Info Icons | Adding token info buttons for 5e, PF1, PF2 and DCC");
                break;
        }

        let actor = canvas.tokens.get(data._id).actor;
        //let actor = game.actors.get(data.actorId);
        if (actor === undefined) return;

        let ac = 10
        if (game.world.system === "pf1" || game.world.system === "D35E") {
            ac = actor.system.attributes.ac.normal.total
        }
        else if (game.world.system === "dcc") {
            ac = actor.system.attributes.ac.value
        } else {
            ac = (isNaN(parseInt(actor.system.attributes.ac.value)) || parseInt(actor.system.attributes.ac.value) === 0) ? 10 : parseInt(actor.system.attributes.ac.value);
        }

        let perceptionTitle = "Passive Perception";
        let perception = 10;
        if (game.world.system === "pf1") {
            perception = actor.system.skills.per.mod
            perceptionTitle = "Perception Mod";
        } else if (game.world.system === "pf2e") {
            perception = perception + actor.system.attributes.perception.value;
            perceptionTitle = "Perception DC";
        }
        else if (game.world.system === "dcc" || game.world.system === "D35E") {
            perception = 0
            perceptionTitle = "Perception DC";
        } else {
            perception = actor.system.skills.prc.passive;
        }

        //console.log("TokenInfoIcons", actor);

        let speed = "";

        if (game.world.system === "pf2e") {
            if (actor.data.type === "npc") {
                speed = '<span class="token-info-speed" title="Speed"><i class="fas fa-walking"></i><span style="font-size: 0.65em;"> ' + actor.system.attributes.speed.value + '</span></span>';
            } else if (actor.data.type === "familiar") {
                // Familiars seem to get either 25 ft. land or water speed
                // It can be modified by other abilities but they will be revising these later so this will likely change
                speed = '<span class="token-info-speed" title="Speed"><i class="fas fa-walking"></i> 25</span>';
            } else {
                speed = '<span class="token-info-speed" title="Land"><i class="fas fa-walking"></i> ' + actor.system.attributes.speed.total + '</span>';
            }
        } else if (game.world.system === "pf1" || game.world.system === "D35E") {
            speed = '<span class="token-info-speed" title="Land"><i class="fas fa-walking"></i> ' + actor.system.attributes.speed.land.total + '</span>';
        } else if (game.world.system === "dcc") {
            speed = '<span class="token-info-speed" title="Movement"><i class="fas fa-walking"></i> ' + actor.system.attributes.speed.base + '</span>';
        } else {
            if (actor.system.attributes.movement.walk != 0 && actor.system.attributes.movement.walk != null) speed += '<span class="token-info-speed" title="Walk"><i class="fas fa-walking"></i> ' + actor.system.attributes.movement.walk + '<span style="font-size: 0.5em;"> ' + actor.system.attributes.movement.units + "</span></span>";
            if (actor.system.attributes.movement.swim != 0 && actor.system.attributes.movement.swim != null) speed += '<span class="token-info-speed" title="Swim"><i class="fas fa-swimmer"></i> ' + actor.system.attributes.movement.swim + '<span style="font-size: 0.5em;"> ' + actor.system.attributes.movement.units + "</span></span>";
            if (actor.system.attributes.movement.fly != 0 && actor.system.attributes.movement.fly != null) speed += '<span class="token-info-speed" title="Fly"><i class="fas fa-crow"></i> ' + actor.system.attributes.movement.fly + '<span style="font-size: 0.5em;"> ' + actor.system.attributes.movement.units + "</span></span>";
            if (actor.system.attributes.movement.burrow != 0 && actor.system.attributes.movement.burrow != null) speed += '<span class="token-info-speed" title="Burrow"><i class="fas fa-mountain"></i> ' + actor.system.attributes.movement.burrow + '<span style="font-size: 0.5em;"> ' + actor.system.attributes.movement.units + "</span></span>";
            if (actor.system.attributes.movement.climb != 0 && actor.system.attributes.movement.climb != null) speed += '<span class="token-info-speed" title="Climb"><i class="fas fa-grip-lines"></i> ' + actor.system.attributes.movement.climb + '<span style="font-size: 0.5em;"> ' + actor.system.attributes.movement.units + "</span></span>";
        }


        let initiative = null;
        if (game.world.system === "D35E") {
            if (actor.data.type === "Player") {
                initiative = actor.system.attributes.init.total;
            }
        }

        // DCC luck

        let luck = null;
        if (game.world.system === "dcc") {
            if (actor.data.type === "Player") {
                luck = actor.system.abilities.lck.value;
            }
        }

        let newdiv = '<div class="token-info-container">';

        let position = game.settings.get('token-info-icons-d35e', 'position');


        const speedButton = `<div class="control-icon token-info-icon" title="Speed">${speed}</div>`;
        const acButton = `<div class="control-icon token-info-icon" title="Armor Class: ${ac}"><i class="fas fa-shield-alt"></i> ${ac}</div>`;
        
        let defaultButtons = `${speedButton}${acButton}`;
        if (!["dcc", "D35E"].includes(game.world.system)) {
            const perceptionButton = `<div class="control-icon token-info-icon" title="${perceptionTitle}: ${perception}"><i class="fas fa-eye"></i> ${perception}</div>`;
            defaultButtons += perceptionButton;
        } else {
            if (initiative != null) {
                const initiativeButton = `<div class="control-icon token-info-icon" title="Initiative: ${initiative}"><i class="fas fa-running"></i> ${initiative}</div>`;
            }
            // dcc specific
            if (luck != null) {
                const luckButton = `<div class="control-icon token-info-icon" title="Luck: ${luck}"><i class="fas fa-star"></i> ${luck}</div>`;
                defaultButtons += luckButton;
            }
        }


        let passiveSensesButtons = '';
        if (!['pf2e', 'pf1'].includes(game.world.system) && game.settings.get('token-info-icons-d35e', 'allPassiveSenses')) {
            const investigation = actor.system.skills.inv.passive;
            const insight = actor.system.skills.ins.passive;
            const stealth = actor.system.skills.ste.passive;

            const passiveInvestigationButton = `<div class="control-icon token-info-icon" title="Passive Investigation: ${investigation}"><i class="fas fa-search"></i> ${investigation}</div>`;
            const passiveInsightButton = `<div class="control-icon token-info-icon" title="Passive Insight: ${insight}"><i class="fas fa-lightbulb"></i> ${insight}</div>`;
            const passiveStealthButton = `<div class="control-icon token-info-icon" title="Passive Stealth: ${stealth}"><i class="fas fa-eye-slash"></i> ${stealth}</div>`;
            passiveSensesButtons = `${passiveInvestigationButton}${passiveInsightButton}${passiveStealthButton}`;
        }

        let buttons = $(`<div class="col token-info-column-${position}">${defaultButtons}${passiveSensesButtons}</div>`);

        html.find('.col.left').wrap(newdiv);
        html.find('.col.left').before(buttons);
    }
}

Hooks.on('ready', () => {
    const gmOnly = game.settings.get('token-info-icons-d35e', 'gmOnly');

    if (gmOnly) {
        if (game.user.isGM) {
            Hooks.on('renderTokenHUD', (app, html, data) => {
                TokenInfoIcons.addTokenInfoButtons(app, html, data)
            });
        }
    } else {
        Hooks.on('renderTokenHUD', (app, html, data) => {
            TokenInfoIcons.addTokenInfoButtons(app, html, data)
        });
    }
});

Hooks.once("init", () => {

    game.settings.register('token-info-icons-d35e', 'gmOnly', {
        name: "GM only?",
        hint: "Show the token info to the GM only or to all players?",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register('token-info-icons-d35e', 'allPassiveSenses', {
        name: 'Show all passive senses (dnd5e)',
        hint: 'Show passive perception/investigation/insight/stealth instead of just passive perception',
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register('token-info-icons-d35e', 'position', {
        name: "Token Position",
        hint: "Which side of the token should the info appear on?",
        scope: "world",
        config: true,
        type: String,
        default: "left",
        choices: {
            "left": "left",
            "right": "right",
        }
    });
});

console.log("Token Info Icons loaded");
