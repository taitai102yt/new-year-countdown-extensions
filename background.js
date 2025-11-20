// うるう年判定（今年がうるう年か）
function isLeapYear(year) {
  return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

// 正確な残り日数
function daysUntilNewYear() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const newYear = new Date(nextYear, 0, 1, 0, 0, 0);
  return Math.floor((newYear - now) / (1000 * 60 * 60 * 24));
}

// 通知
function sendNotification(title, message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon128.png",
    title: title,
    message: message
  });
}

// この関数で全部の処理を管理
function checkAndUpdate() {
  const now = new Date();
  const days = daysUntilNewYear();

  // バッジ更新
  let color = "#2b6ef6";
  if (days <= 7) color = "#e74c3c";
  if (days === 0) color = "#f1c40f";

  chrome.action.setBadgeBackgroundColor({ color });
  chrome.action.setBadgeText({ text: String(days) });

  // ① 新年通知
  if (days === 0 && now.getMonth() === 0 && now.getDate() === 1) {
    sendNotification("🎉 Happy New Year!", "新年おめでとうございます！");
  }

  // ② 12月31日の特別通知
  if (now.getMonth() === 11 && now.getDate() === 31 && now.getHours() === 9) {
    sendNotification("⏰ 年越しまであと1日！", "今日が大晦日だよ！");
  }

  // ③ うるう年の 2/29 通知
  if (
    isLeapYear(now.getFullYear()) &&
    now.getMonth() === 1 &&
    now.getDate() === 29 &&
    now.getHours() === 9
  ) {
    sendNotification("✨ 今日は2月29日！", "うるう年だけの特別な日だよ！");
  }
}

// 最初の実行
checkAndUpdate();

// 毎時間チェック（通知/バッジ更新）
chrome.alarms.create("check", { periodInMinutes: 60 });
chrome.alarms.onAlarm.addListener((a) => {
  if (a.name === "check") checkAndUpdate();
});
