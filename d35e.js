export class TokenInfoIcons35E {
    static async addTokenInfoButtons(app, html, data) {
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
        let position = game.settings.get('token-info-icons', 'position');

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