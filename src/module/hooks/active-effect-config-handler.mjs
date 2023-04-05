.aoa-chat .dice-total.success {
    background-color: palegreen;
    border-color: green;
    color: black;
}

.aoa-chat .dice-total.failure {
    background-color: salmon;
    border-color: red;
    color: black;
}

.aoa-chat .dice-total .offset {
    font-size: 70%;
}

.chat-message {
    background: url(../assets/parchment.jpg) repeat;
    font-family: 'Aquifer', serif;
    font-weight: bolder;
}

.high .dice-tooltip .dice-rolls .roll.max {
    color: darkgreen;
    filter: sepia(0.5) hue-rotate(60deg);
}

.high .dice-tooltip .dice-rolls .roll.min {
    color: darkred;
    filter: sepia(0.5) hue-rotate(-60deg);
}

.low .dice-tooltip .dice-rolls .roll.min {
    color: darkgreen;
    filter: sepia(0.5) hue-rotate(60deg);
}

.low .dice-tooltip .dice-rolls .roll.max {
    color: darkred;
    filter: sepia(0.5) hue-rotate(-60deg);
}

.aoa-chat .actor-name {

}

#chat-log h1, #chat-log h2, #chat-log h3, #chat-log h4, #chat-log h5, #chat-log h6{
    font-variant: small-caps;
    border-bottom: none;
    font-weight: bold;
    text-decoration: 2px underline darkred;
}

#chat-log .message-sender {
    text-decoration: none;
}

.aoa-chat .header {
    border-bottom: 1px solid darkred;
}

.aoa-chat .description {
    background: var(--sheet-dark-accent);
    padding: 1px 0.4em;
}

.aoa-chat .description strong,
#chat-log .chat-message.message .message-content p strong {
    background: var(--text-strong);
}

.aoa-chat .description .inline-roll {
    padding: 0;
    border: none;
    background: inherit;
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                         <label class="rounds-label">${game.i18n.localize("COMBAT.Rounds")}:</label>
                            <div class="form-fields">
                                <a class="add" style="flex: 0;"><i class="fa-solid fa-plus"></i></a>
                                <a class="subtract" style="flex: 0;"><i class="fa-solid fa-minus"></i></a>
                            </div>
                        </div>`);


    function inputChanged() {
        actualizeRounds();
    }

    const simpleCalendarSettings = game.settings.get("foundryvtt-simple-calendar", "global-configuration");
    const secondsInCombatRound = simpleCalendarSettings ? simpleCalendarSettings.secondsInCombatRound : 6;

    function actualizeRounds() {
        const roundsLabel = html.find(".rounds-label");
        const days = Number.parseInt(html.find("[name='days']").val())
        const hours = Number.parseInt(html.find("[name='hours']").val())
        const minutes = Number.parseInt(html.find("[name='minutes']").val())
        const seconds = Number.parseInt(html.find("[name='seconds']").val())

        const ts = new TimeSpan(0,seconds, minutes, hours, days);
        const rounds = ts.totalSeconds() / secondsInCombatRound;

        roundsLabel.text(`${game.i18n.localize("COMBAT.Rounds")} (${rounds}):`);
    }

    actualizeRounds();

    durationTab.find(".add").click(function () {
        const input = html.find("[name='seconds']");

        input.val(Number.parseInt(input.val()) + secondsInCombatRound);
        actualizeRounds();
    });

    durationTab.find(".subtract").click(function () {
        const input = html.find("[name='seconds']");

        input.val(Number.parseInt(input.val()) - secondsInCombatRound);
        actualizeRounds();
    });

};

export const closeActiveEffectConfigHandler = async (config, html) => {
    const formElement = html[0].querySelector("form");
    const formData = new FormDataExtended(formElement);

    const timeSpan = new TimeSpan(0, formData.object.seconds, formData.object.minutes, formData.object.hours, formData.object.days);
    const startTime = Number.parseInt(html.find(".start-date").data("start-time"));

    const updateData = {
        duration: {}
    };

    if(config.object.duration.seconds !== (timeSpan.totalSeconds() > 0 ? timeSpan.totalSeconds() : null)) {
        updateData.duration.seconds = timeSpan.totalSeconds() > 0 ? timeSpan.totalSeconds() : null;
    }

    if(config.object.duration.startTime !== startTime) {
        updateData.duration.startTime = startTime;
    }

    await config.object.update(updateData);
};



