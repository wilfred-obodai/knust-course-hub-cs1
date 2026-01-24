// 2. NOTIFICATION PERMISSION LOGIC
function enableNotifications() {
    if (!("Notification" in window)) {
        alert("This browser does not support notifications. On iPhone, use Safari and 'Add to Home Screen'.");
        return;
    }

    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            alert("Notifications enabled!");
            new Notification("KNUST Course Hub", {
                body: "Class alerts are now active!",
                icon: "images/knust-logo.png"
            });
        } else {
            alert("Please allow notifications in your browser settings.");
        }
    });
}

// 3. FULL CLASS SCHEDULE (Monday=1, Tuesday=2, etc.)
// Time is set 10 minutes before the actual start for reminders
const classSchedule = [
    // MONDAY
    { name: "CSM 157 (SCB-SF1)", day: 1, time: "12:50" },
    { name: "CSM 165 (SCB-SF1)", day: 1, time: "14:50" },
    { name: "MATH 161 (SCB-TF1)", day: 1, time: "16:50" },

    // TUESDAY
    { name: "CSM 153 (SCB-GF1)", day: 2, time: "07:50" },
    { name: "CSM 157 (SCB-SF1)", day: 2, time: "07:50" }, // Grp 2
    { name: "CSM 151 (SCB-SF1)", day: 2, time: "07:50" },

    // WEDNESDAY
    { name: "CSM 151 (SCB-SF8)", day: 3, time: "07:50" },
    { name: "CSM 153 (SCB-SF8)", day: 3, time: "07:50" },
    { name: "CS-SEMINAR (SCB-FF8)", day: 3, time: "10:20" },
    { name: "ENGL 157 (Room 202)", day: 3, time: "12:50" },
    { name: "CSM 157 (Practice)", day: 3, time: "15:50" },

    // THURSDAY
    { name: "ENGL 157 (SCB-GF1)", day: 4, time: "10:20" },
    { name: "MATH 161 (Calculus)", day: 4, time: "16:50" },

    // FRIDAY
    { name: "ECON 151 (New Aud)", day: 5, time: "07:50" },
    { name: "MATH 161 (SCB-FF1)", day: 5, time: "12:50" },
    { name: "CSM 165 (SCB-FF1)", day: 5, time: "14:50" },
    { name: "CSM 165 (SCB-SF1)", day: 5, time: "16:50" }
];

// 4. THE LIVE TIMER (Checks every minute)
setInterval(() => {
    const now = new Date();
    const currentDay = now.getDay(); // 0=Sun, 1=Mon...
    const currentTime = 
        now.getHours().toString().padStart(2, '0') + ":" + 
        now.getMinutes().toString().padStart(2, '0');

    if (Notification.permission === "granted") {
        classSchedule.forEach(cls => {
            if (currentDay === cls.day && currentTime === cls.time) {
                new Notification("⏰ Upcoming Class", {
                    body: `${cls.name} starts in 10 minutes!`,
                    icon: "images/KNUST logo.png"
                });
            }
        });
    }
}, 60000);


