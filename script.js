// Ask permission for notifications
function enableNotifications() {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                alert("Notifications enabled!");
            } else {
                alert("Notifications denied.");
            }
        });
    }
}

// Alarm sound
const alarmSound = new Audio("sounds/alarm.mp3");

// CLASS DATA (example)
const classSchedule = {
    course: "CSM 157",
    venue: "SCB-SF1",
    day: 1,          // Monday = 1, Tuesday = 2 ...
    hour: 13,        // 1 PM
    minute: 0
};

// Check time every minute
setInterval(checkClassTime, 60000);

function checkClassTime() {
    const now = new Date();

    // Check day
    if (now.getDay() !== classSchedule.day) return;

    const classTime = new Date();
    classTime.setHours(classSchedule.hour);
    classTime.setMinutes(classSchedule.minute);
    classTime.setSeconds(0);

    const diffMinutes = (classTime - now) / 60000;

    // 10 minutes before
    if (diffMinutes === 10) {
        sendNotification(
            "Class Reminder",
            `${classSchedule.course} starts in 10 minutes\nVenue: ${classSchedule.venue}`
        );
    }

    // Late alert
    if (diffMinutes < 0 && diffMinutes > -5) {
        alarmSound.play();
        sendNotification(
            "You are late!",
            `${classSchedule.course} has already started`
        );
    }
}

// Notification function
function sendNotification(title, message) {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: message,
            icon: "images/knust-logo.png"
        });
    }
}
