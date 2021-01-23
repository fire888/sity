var pubnub = new PubNub({
    publishKey: "pub-c-d40502dd-7f11-48d5-ac22-c0da5a46f143",
    subscribeKey: "sub-c-b2a71a6c-5484-11ea-b828-26d2a984a2e5",
    ssl: true
});
// Subscribe to the demo_tutorial channel


pubnub.addListener({
    message: function(message) {
        let content = message.message;

        switch (content.scenario) {
            case "onboarding" : {
                onboarding();
                break;
            }

            case "shake" : {
                shake(content.content);
                break;
            }
        }
    },
    presence: function(presenceEvent) {
        console.log(presenceEvent);
    },
    status: function(s) {
        processStatusEvent(s);
    }
});

pubnub.subscribe({
    channels: ['urbancity','user']
});

function processStatusEvent(statusEvent) {
    console.log(statusEvent, "a status event");
    if (statusEvent.category === "PNDisconnectedCategory" || statusEvent.category === "PNTimeoutCategory" || statusEvent.category === "PNNetworkIssuesCategory" || statusEvent.category === "PNNetworkDownCategory") {
        pubnub.reconnect();
        console.log('Reconnecting...');
    }
    if (statusEvent.category === "PNNetworkUpCategory") {
        console.log('Reconnected');
        pubnub.subscribe({
            channels: ['urbancity','user']
        });
    }

    if (statusEvent.category === "PNConnectedCategory") {
        console.log('Connected');
    }
}