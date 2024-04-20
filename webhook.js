const webhookURL =
    "https://discord.com/api/webhooks/1183340522669092875/_OHzZCE12MG3yhtZgpN_QdBfmjvjVQrsIoWaao14J75LgH5SlINSpr_yIscEkr1J4ApQ";

export default function hoook() {
    const timestamp = Math.floor(Date.now() / 1000);
    const discordTimestamp = `<t:${timestamp}>`;

    const payload = {
        content: "website has been accessed: " + discordTimestamp,
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to send webhook: " + response.status + " " + response.statusText);
            }
        })
        .catch((error) => {
            console.error("Error sending webhook:", error);
        });
}

hoook();
